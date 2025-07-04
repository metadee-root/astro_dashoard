import { AgoraProvider } from "../../session/[sessionId]/[roomId]/_components/agora-rtc-provider";
import { PujaVideoCall } from "./_components/puja-video-call";
import { api } from "@/lib/api";
import { FC } from "react";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const { bookingId } = await params;

  const data = await api.puja.getAgoraTokenForBooking(bookingId);

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
        Puja Session
      </h1>
      <AgoraProvider>
        <PujaVideoCall agoraTokenResponse={data} bookingId={bookingId} />
      </AgoraProvider>
    </div>
  );
};

export default Page;
