import { setupWorker, rest, createResponseComposition, context } from "msw";
import { v4 as uuid } from "uuid";

const delayedResponse = createResponseComposition(null, [
  context.delay("real"),
]);

const CACHE_KEY = "100-things-msw-better-reactive";
const store = JSON.parse(localStorage.getItem(CACHE_KEY)) || {
  things: [],
 
};
function updateStore(newStore) {
  Object.assign(store, newStore);
  localStorage.setItem(CACHE_KEY, JSON.stringify(store));
}




const worker = setupWorker(
  // - AUTHORIZATION NOT REQUIRED -


  // - AUTHORIZATION REQUIRED -

  // GET USER

  // GET ALL THINGS
  rest.get("/api/things", (req, res, ctx) => {

    const minimalThings = store.things.map(({ id, name, done }) => ({
      id,
      name,
      count: done.length,
    }));
    return delayedResponse(() => res(ctx.json(minimalThings)));
  }),
  // GET SINGLE THING
  rest.get("/api/things/:tid", (req, res, ctx) => {

    const { tid } = req.params;
    const thing = store.things.find(({ id }) => id === tid);
    return delayedResponse(() => res(ctx.json(thing)));
  }),
  // DELETE THING
  rest.delete("/api/things/:tid", (req, res, ctx) => {

    const { tid } = req.params;
    const things = store.things.filter(({ id }) => id !== tid);
    updateStore({ things });
    return delayedResponse(() => res(ctx.json({ status: "THING_DELETED" })));
  }),
  // ADD A THING
  rest.post("/api/things", async (req, res, ctx) => {

    const { name, description } = await req.json();
    const things = store.things.concat([
      { id: uuid(), done: [], name, description },
    ]);
    updateStore({ things });
    return delayedResponse(() => res(ctx.json({ status: "THING_CRAETED" })));
  }),
  // DELETE LAST DONE FOR THING
  rest.delete("/api/things/:tid/done/last", (req, res, ctx) => {

    const { tid } = req.params;
    let updatedThing = null;
    const things = store.things.map((thing) => {
      if (thing.id !== tid) return thing;
      updatedThing = { ...thing, done: thing.done.slice(0, -1) };
      return updatedThing;
    });
    updateStore({ things });
    return delayedResponse(() => res(ctx.json(updatedThing)));
  }),
  // DELETE DONE FOR THING
  rest.delete("/api/things/:tid/done/:did", (req, res, ctx) => {

    const { tid, did } = req.params;
    let updatedThing = null;
    const things = store.things.map((thing) => {
      if (thing.id !== tid) return thing;
      updatedThing = {
        ...thing,
        done: thing.done.filter(({ id }) => id !== did),
      };
      return updatedThing;
    });
    updateStore({ things });
    return delayedResponse(() => res(ctx.json(updatedThing)));
  }),
  // DO A THING (ADD A DONE)
  rest.post("/api/things/:tid/done", (req, res, ctx) => {

    const { tid } = req.params;
    let updatedThing = null;
    const things = store.things.map((thing) => {
      if (thing.id !== tid) return thing;
      updatedThing = {
        ...thing,
        done: thing.done.concat({ id: uuid(), time: new Date().getTime() }),
      };
      return updatedThing;
    });
    updateStore({ things });
    return delayedResponse(() => res(ctx.json(updatedThing)));
  })
);

// Register the Service Worker and enable the mocking
export default worker;
