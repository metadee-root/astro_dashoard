"use client";
import dynamic from "next/dynamic";
import React, { FC } from "react";

interface AgoraProviderProps {
  children: React.ReactNode;
}

const DynamicAgoraProvider = dynamic(
  async () => {
    const { AgoraRTCProvider } = await import("agora-rtc-react");
    const AgoraRTC = (await import("agora-rtc-react")).default;

    const AgoraProviderComponent: FC<AgoraProviderProps> = ({ children }) => {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
    };

    return AgoraProviderComponent;
  },
  { ssr: false }
);

export const AgoraProvider: FC<AgoraProviderProps> = ({ children }) => {
  return <DynamicAgoraProvider>{children}</DynamicAgoraProvider>;
};
