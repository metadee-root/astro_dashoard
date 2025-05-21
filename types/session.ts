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
  mode: string;
  consultationDetails: ConsultationDetails;
  roomId: string;
}
