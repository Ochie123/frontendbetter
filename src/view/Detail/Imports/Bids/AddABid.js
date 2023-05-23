import { useState } from "react";

import { useAddBid } from '../../../../data'

function AddABid() {
  const addBid = useAddBid();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdding) {
    return <Button onClick={() => setIsAdding(true)}>Add a thing</Button>;
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    addBid(Object.fromEntries(new FormData(evt.target)));
    evt.target.reset();
    setIsAdding(false);
  };

  return (
    <FormWrapper>
      <h2>Add a thing</h2>
      <Form onSubmit={onSubmit}>
        <Label>
          Name:
          <Input name="name" />
        </Label>
        <Label>
          Description:
          <Input name="description" />
        </Label>
        <ButtonWrapper>
          <Button>Add</Button>
          <Button type="button" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  );
}

export default AddABid;
