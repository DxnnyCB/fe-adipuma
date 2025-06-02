import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Adipuma Sports"
        description="Págna ecommerce de Adipuma Sports"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
