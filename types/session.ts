type ConsultationMode = "call" | "video" | "chat";

export interface ConsultationDetails {
  fullName: string;
  dateTimeOfBirth: string;
  gender: string;
  placeOfBirth: string;
  concern: string;
  latitude?: number;
  longitude?: number;
}

export interface SessionRequest {
  sessionId: string;
  userId: string;
  mode: ConsultationMode;
  consultationDetails: ConsultationDetails;
  roomId: string;
}

export interface ChatMessage {
  messageId: string;
  senderId: string;
  message: string;
  type: "text" | "image" | "file";
  timestamp: number;
  mediaUrl?: string;
  fileName?: string;
  mimeType?: string;
}
