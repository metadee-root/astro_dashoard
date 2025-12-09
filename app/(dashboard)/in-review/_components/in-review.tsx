"use client";
import React from "react";
import { Clock, AlertCircle, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

const InReviewSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center p-4">
      <Skeleton className="size-24 rounded-full" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-20 w-96 max-w-full" />
      <Skeleton className="h-24 w-96 max-w-full rounded-lg" />
    </div>
  );
};

const InReviewError = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle className="size-6 text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Failed to Load Status</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t fetch your profile status. Please check your
          connection and try again.
        </EmptyDescription>
      </EmptyHeader>
      <Button onClick={onRetry} variant="outline" className="gap-2">
        <RefreshCw className="size-4" />
        Retry
      </Button>
    </Empty>
  );
};

export const InReview = () => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profile-status"],
    queryFn: async () => {
      const data = await api.auth.getStatus();
      return data;
    },
  });

  React.useEffect(() => {
    if (data && session?.user && session.user.status !== data.status) {
      updateSession({ status: data.status });
      // Use hard redirect to ensure middleware handles the new status correctly
      if (data.status === "verified") {
        window.location.href = "/";
      } else {
        window.location.reload();
      }
    }
  }, [data, session, updateSession]);

  if (isLoading) {
    return <InReviewSkeleton />;
  }

  if (isError) {
    return <InReviewError onRetry={() => refetch()} />;
  }

  return (
    <Empty className="font-medium">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Clock />
        </EmptyMedia>
        <EmptyTitle className="font-semibold">Profile Under Review</EmptyTitle>
        <EmptyDescription className="mx-auto max-w-md">
          Your profile is currently being reviewed by our team. This process
          usually takes 24-48 hours. You will be notified once your profile is
          verified.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {session?.user && (
          <div>
            <p className="mb-1 text-sm font-medium">Status:</p>
            <p className="text-sm text-muted-foreground">
              {session.user.status}
            </p>
          </div>
        )}
        {data?.adminNote && (
          <div className="w-full max-w-md rounded-lg bg-muted p-4 text-left">
            <p className="mb-1 text-sm font-medium">Admin Note:</p>
            <p className="text-sm text-muted-foreground">{data.adminNote}</p>
          </div>
        )}
      </EmptyContent>
    </Empty>
  );
};
