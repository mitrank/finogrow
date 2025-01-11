"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMessage = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome back
        {isSignedIn ? `, ${user?.username || user?.username}👋` : " "}
      </h2>
      <p className="text-sm lg:text-base text-[#89B6FD]">
        This is your Financial Overview Report
      </p>
    </div>
  );
};
