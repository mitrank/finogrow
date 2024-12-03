import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function AuthTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center">
          <ClerkLoaded>{children}</ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin" />
          </ClerkLoading>
        </div>
        <div className="hidden bg-blue-600 lg:flex justify-center items-center">
          <Image src="/logo.svg" alt="logo" width={96} height={96} />
        </div>
      </div>
    </>
  );
}
