import React, { FC } from "react";
import { Chat } from "./_components/chat";
import { AgoraProvider } from "./_components/agora-rtc-provider";
import { VideoCalling } from "./_components/video-calling";

interface PageProps {
  params: Promise<{
    sessionId: string;
    roomId: string;
  }>;
  searchParams: Promise<{
    mode?: "chat" | "video" | "call";
  }>;
}

const Page: FC<PageProps> = async ({ params, searchParams }) => {
  const { roomId, sessionId } = await params;
  let { mode } = await searchParams;

  mode = mode || "chat";

  return (
    <div className="flex">
      {mode === "chat" && <Chat roomId={roomId} sessionId={sessionId} />}
      {(mode === "call" || mode === "video") && (
        <AgoraProvider>
          <VideoCalling
            type={mode === "call" ? "audio" : "video"}
            sessionId={sessionId}
            roomId={roomId}
          />
        </AgoraProvider>
      )}
    </div>
  );
};

export default Page;
