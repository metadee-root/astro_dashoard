import { AgoraProvider } from "../../session/[sessionId]/[roomId]/_components/agora-rtc-provider";
import { PujaVideoCall } from "./_components/puja-video-call";
import { api } from "@/lib/api";

interface PageProps {
  params: { bookingId: string };
}

const Page = async ({ params }: PageProps) => {
  const { bookingId } = params;

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
