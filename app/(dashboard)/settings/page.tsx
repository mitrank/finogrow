"use client";

import { PlaidLink } from "@/components/plaid-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const SettingsPage = () => {
  const [isSubscriptionActive, setIsSubscriptionActive] =
    useState<boolean>(false);

  const handleManageSubscription = () => {
    // TODO: Add Paywall

    setIsSubscriptionActive(!isSubscriptionActive); // TODO: Change the active status based on the api response from paywall
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 lg:py-4 gap-y-4 lg:gap-y-0">
            <div className="flex flex-1 justify-between lg:justify-start">
              <h2 className="text-base font-medium w-full lg:max-w-[200px]">
                Bank Account
              </h2>
              <p className="text-muted-foreground">
                No bank accounts connected
              </p>
            </div>
            <PlaidLink />
          </div>
          <Separator />
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-6 lg:pt-4 gap-y-4 lg:gap-y-0">
            <div className="flex flex-1 justify-between lg:justify-start">
              <h2 className="text-base font-medium w-full lg:max-w-[200px]">
                Subscription Status
              </h2>
              <Badge
                variant="outline"
                className={`px-3 py-1 min-w-fit flex justify-between gap-x-2.5 ${
                  isSubscriptionActive ? "bg-emerald-100" : "bg-yellow-100"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isSubscriptionActive ? "bg-emerald-500" : "bg-yellow-500"
                  }`}
                />
                <span className="text-sm font-semibold text-gray-600">
                  {isSubscriptionActive ? "Active" : "Inactive"}
                </span>
              </Badge>
            </div>
            <Button className="lg:w-[170px]" onClick={handleManageSubscription}>
              Manage Subscriptions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
