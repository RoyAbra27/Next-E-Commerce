import { SignIn } from "@clerk/nextjs";

const Login = () => (
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  );

export default Login;
