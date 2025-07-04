"use client";
import { api } from "@/lib/api";
import React, { FC } from "react";
import { AgoraProvider } from "../../session/[sessionId]/[roomId]/_components/agora-rtc-provider";
import { PujaVideoCall } from "./_components/puja-video-call";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

const Page: FC<PageProps> = ({ params }) => {
  // const { bookingId } = await params;
  const { bookingId } = useParams();

  const { data } = useQuery({
    queryKey: ["agora-token", bookingId],
    queryFn: () => api.puja.getAgoraTokenForBooking(bookingId as string),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
        Puja Session
      </h1>

      {/* <AgoraProvider>
        <PujaVideoCall agoraTokenResponse={data} bookingId={bookingId} />
      </AgoraProvider> */}
    </div>
  );
};

export default Page;
