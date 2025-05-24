"use client";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState, useEffect, FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneCall,
  PhoneOff,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getInitials } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoCallingProps {
  type: "audio" | "video";
}

export const VideoCalling: FC<VideoCallingProps> = ({ type }) => {
  const { data: session } = useSession();
  const [calling, setCalling] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState("b353b1b203dc4a698a4cab5632c64b69");
  const [channel, setChannel] = useState("test-channel");
  const [token, setToken] = useState(
    "007eJxTYJBlfX/bfFnA3Ib+ddvYM3+c/hHqvXg+y+37pueK5Wf9s96swJBkbGqcZJhkZGCckmySaGZpkWiSnJhkamZslGxmkmRm2VhskNEQyMjQO/syCyMDBIL4PAwlqcUluskZiXl5qTkMDADS3iQI"
  );
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin(
    {
      appid: appId,
      channel: channel,
      token: token ? token : null,
      uid: session?.user.name!,
    },
    calling
  );

  let tracks = [localMicrophoneTrack];

  if (type === "video") {
    tracks.push(localCameraTrack as any);
  }

  usePublish(tracks);

  const remoteUsers = useRemoteUsers();

  return (
    <div>
      <div>
        {isConnected ? (
          <div className="relative aspect-[9/16] md:aspect-square lg:aspect-video">
            <div
              className={cn(
                "overflow-hidden z-10 isolate aspect-[9/16] md:aspect-square lg:aspect-video rounded-xl",
                remoteUsers.length > 0
                  ? "absolute w-32 md:w-40 lg:w-52 bottom-4 right-4"
                  : "relative"
              )}
            >
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                playAudio={false}
                videoTrack={localCameraTrack}
                style={{ width: "100%", height: "100%" }}
              >
                <div
                  className={cn(
                    "p-2 md:p-4 h-full w-full flex items-center justify-center relative",
                    cameraOn
                      ? ""
                      : remoteUsers.length > 0
                      ? "bg-background"
                      : "bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "px-3 py-1 flex items-center [&_svg]:size-4 gap-1 text-sm bg-white shadow-sm font-medium rounded-md absolute",
                      remoteUsers.length > 0
                        ? "top-2 left-2"
                        : "top-2 md:top-4 left-2 md:left-4"
                    )}
                  >
                    {micOn || <MicOff />}
                    <span>You</span>
                  </div>

                  {cameraOn || (
                    <Avatar
                      className={cn(
                        remoteUsers.length > 0
                          ? "size-12"
                          : "size-20 md:size-24 text-2xl"
                      )}
                    >
                      <AvatarImage src={session?.user.image!} />
                      <AvatarFallback className="bg-neutral-200">
                        {getInitials(session?.user.name || "")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div
                key={user.uid}
                className="w-full aspect-[9/16] md:aspect-square lg:aspect-video rounded-xl overflow-hidden"
              >
                <RemoteUser
                  user={user}
                  style={{ width: "100%", height: "100%" }}
                >
                  <div
                    className={cn(
                      "p-2 md:p-4 h-full w-full flex items-center justify-center relative",
                      user.hasVideo ? "" : "bg-accent"
                    )}
                  >
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 px-3 py-1 flex items-center gap-1 [&_svg]:size-4 shadow-sm text-sm bg-white font-medium rounded-md">
                      {user.hasAudio || <MicOff />} <span>{user.uid}</span>
                    </div>

                    {user.hasVideo || (
                      <Avatar className={cn("size-20 md:size-24 text-2xl")}>
                        <AvatarFallback className="bg-neutral-200">
                          {getInitials(user.uid.toString() || "")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <Skeleton className="aspect-[9/16] md:aspect-square lg:aspect-video w-full rounded-xl" />
        )}
      </div>
      {isConnected && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            onClick={() => setMic((a) => !a)}
            variant="secondary"
            size={isMobile ? "icon" : "default"}
          >
            {micOn ? <Mic /> : <MicOff />}
            <span className="hidden md:inline">Microphone</span>
          </Button>
          {type === "video" && (
            <Button
              onClick={() => setCamera((a) => !a)}
              variant={"secondary"}
              size={isMobile ? "icon" : "default"}
            >
              {cameraOn ? <Camera /> : <CameraOff />}
              <span className="hidden md:inline">Camera</span>
            </Button>
          )}
          <Button
            onClick={() => setCalling((a) => !a)}
            variant={calling ? "destructive" : "default"}
            size={isMobile ? "icon" : "default"}
          >
            {calling ? <PhoneOff /> : <PhoneCall />}
            <span className="hidden md:inline">
              {calling ? "Leave" : "Join Call"}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};
