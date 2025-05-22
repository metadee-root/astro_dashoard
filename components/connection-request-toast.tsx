import React from "react";
import { toast as sonnerToast } from "sonner";
import { ConnectRequestCard } from "./connect-request-card";
import { SessionRequest } from "@/types/session";

interface ToastProps {
  request: SessionRequest;
}

export function connectionRequestToast(props: ToastProps) {
  return sonnerToast.custom((id) => (
    <ConnectRequestCard key={id} request={props.request} />
  ));
}
