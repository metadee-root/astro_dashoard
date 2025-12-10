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
  Loader2,
  AlertCircle,
  ShieldAlert,
  LogIn,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getInitials } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/components/socket-provider";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface VideoCallingProps {
  type: "audio" | "video";
  sessionId: string;
  roomId: string;
}

export const VideoCalling: FC<VideoCallingProps> = ({ type, sessionId }) => {
  const { callDetails, endSession } = useSocket();
  const { data: session } = useSession();
  const [calling, setCalling] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isConnected = useIsConnected();
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const router = useRouter();

  useEffect(() => {
    if (!callDetails) {
      return;
    }

    if (callDetails.sessionId !== sessionId) {
      return;
    }

    setCalling(true);
  }, [callDetails, sessionId]);

  useJoin(
    {
      appid: callDetails?.agoraAppId || "",
      channel: callDetails?.channelName || "",
      token: callDetails?.agoraToken || null,
      uid: session?.user.name!,
    },
    calling &&
      !!callDetails?.agoraAppId &&
      !!callDetails?.channelName &&
      !!session?.user.name
  );

  let tracks = [localMicrophoneTrack];

  if (type === "video") {
    tracks.push(localCameraTrack as any);
  }

  usePublish(tracks);

  const remoteUsers = useRemoteUsers();

  if (!session?.user) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-full bg-muted">
                <LogIn className="size-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Authentication Required
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please sign in to your account to join the video call session
                </p>
              </div>
              <Button variant="outline" className="mt-2">
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!callDetails) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-full bg-muted">
                <Loader2 className="size-8 text-muted-foreground animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Initializing Call</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we set up your video call session...
                </p>
              </div>
              <div className="flex gap-2 items-center mt-4 text-sm text-muted-foreground">
                <AlertCircle className="size-4" />
                <span>This may take a few moments</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (callDetails.sessionId !== sessionId) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center w-full justify-center">
        <Card className="w-full max-w-md border-destructive">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-full bg-destructive/10">
                <ShieldAlert className="size-8 text-destructive" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-destructive">
                  Invalid Session
                </h3>
                <p className="text-sm text-muted-foreground">
                  The call details do not match this session. Please ensure you
                  have the correct link.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => router.push("/")}
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
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
                      "px-3 py-1 flex items-center [&_svg]:size-4 gap-1 text-sm bg-white dark:bg-neutral-800 dark:text-white shadow-sm font-medium rounded-md absolute",
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
                      <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700">
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
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 px-3 py-1 flex items-center gap-1 [&_svg]:size-4 shadow-sm text-sm bg-white dark:bg-neutral-800 dark:text-white font-medium rounded-md">
                      {user.hasAudio || <MicOff />} <span>{user.uid}</span>
                    </div>

                    {user.hasVideo || (
                      <Avatar className={cn("size-20 md:size-24 text-2xl")}>
                        <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700">
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
            onClick={() => {
              if (calling) {
                endSession(sessionId);
                setCalling(false);
              } else {
                setCalling(true);
              }
            }}
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
