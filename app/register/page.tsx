import { Container } from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import RegisterForm from "./RegisterForm";

export default function page() {
  return (
    <Container>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </Container>
  );
}
