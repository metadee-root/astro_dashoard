import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { UserInteractionCard } from "./user-interaction-card";
import Link from "next/link";

export const RecentUserInteractions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-[22px]">
          Recent User Interactions
        </CardTitle>
        <CardAction>
          <Button variant="outline" asChild>
            <Link href="/interactions">View All</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <UserInteractionCard key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
