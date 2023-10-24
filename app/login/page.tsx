import React from "react";
import { Container } from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import LoginForm from "./LoginForm";
import { RedirectIfAuth } from "@/utils/redirectIfAuth";

export default async function page() {
  await RedirectIfAuth();

  return (
    <Container>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </Container>
  );
}
