import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton />
      <div>This is an authenticated page.</div>
    </>
  );
}
