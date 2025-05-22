import React, { FC } from "react";
import { Chat } from "./_components/chat";

interface PageProps {
  params: Promise<{
    sessionId: string;
    roomId: string;
  }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const { roomId, sessionId } = await params;

  const mode = "chat";

  return (
    <div className="h-[calc(100svh-7rem)] flex">
      {mode === "chat" && <Chat roomId={roomId} sessionId={sessionId} />}
    </div>
  );
};

export default Page;
