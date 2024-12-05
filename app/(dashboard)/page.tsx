"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <>
      <div>This is an authenticated Dashboard page.</div>
      <Button onClick={onOpen}>Add an Account</Button>
    </>
  );
}
