import React from "react";
import { Container } from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import LoginForm from "./LoginForm";

export default function page() {
  return (
    <Container>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </Container>
  );
}
