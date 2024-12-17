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
        <div className="flex justify-center items-center bg-blue-600 lg:bg-white">
          <ClerkLoaded>{children}</ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin" />
          </ClerkLoading>
        </div>
        <div className="hidden bg-blue-600 lg:flex lg:flex-col justify-center items-center gap-y-8">
          <div className="flex gap-x-2 justify-center items-center">
            <span className="text-5xl text-white">FinoGrow</span>
            <Image src="/logo.svg" alt="logo" width={72} height={72} />
          </div>
          <div>
            <span className="text-xl text-white">
              Manage your Expenses to Grow your Finance
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
