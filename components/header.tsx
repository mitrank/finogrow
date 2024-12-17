import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { Loader2 } from "lucide-react";
import { WelcomeMessage } from "./welcome-msg";
import { Filters } from "./filters";
import Image from "next/image";

export const Header = () => {
  return (
    <>
      <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-14 w-full">
            <div className="flex items-center lg:gap-x-16">
              <HeaderLogo />
              <Navigation />
            </div>
            <div className="flex justify-center items-center gap-x-2 lg:hidden">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
              <span className="text-base text-white">FinoGrow</span>
            </div>
            <ClerkLoaded>
              <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </ClerkLoading>
          </div>
          <WelcomeMessage />
          <Filters />
        </div>
      </header>
    </>
  );
};
