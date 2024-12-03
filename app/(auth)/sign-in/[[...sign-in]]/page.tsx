import { SignIn } from "@clerk/nextjs";
import AuthTemplate from "../../AuthTemplate";

export default function Page() {
  return (
    <>
      <AuthTemplate>
        <SignIn />
      </AuthTemplate>
    </>
  );
}
