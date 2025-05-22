type ConsultationMode = "call" | "video" | "chat";
export interface ConsultationDetails {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  timeOfBirth: string;
  placeOfBirth: string;
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
}
