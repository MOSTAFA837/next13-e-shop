import { RedirectIfAuth } from "@/utils/redirectIfAuth";
import { Container } from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import RegisterForm from "./RegisterForm";

export default async function page() {
  await RedirectIfAuth();

  return (
    <Container>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </Container>
  );
}
