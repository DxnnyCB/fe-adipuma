import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Adipuma Sports"
        description="Págna ecommerce de Adipuma Sports"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
