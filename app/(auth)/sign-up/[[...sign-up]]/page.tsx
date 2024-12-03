import { SignUp } from "@clerk/nextjs";
import AuthTemplate from "../../AuthTemplate";

export default function Page() {
  return (
    <>
      <AuthTemplate>
        <SignUp path="/sign-up" />
      </AuthTemplate>
    </>
  );
}
