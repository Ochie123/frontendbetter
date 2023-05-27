import { useState } from "react";
import styled from "styled-components";

import { useAddBid } from '../../../../data'
import Button from "./Button";
import { Form, Label, Input } from "./Form";

const FormWrapper = styled.div`
  width: clamp(10em, 60vw, 40em);
  border: 2px solid black;
  border-radius: 0.5em;
  padding: 2em;
  box-shadow: -6px 6px 0 black;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

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
// Authorization: `Bearer ${token}`,
  return (
    <FormWrapper>
      <h2>Add a thing</h2>
      <Form onSubmit={onSubmit}>
        <Label>
          Amount:
          <Input amount="amount" />
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
