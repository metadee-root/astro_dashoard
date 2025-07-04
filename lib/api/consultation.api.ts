import { axiosClient } from "@/lib/axios-client";
import { handleAPIError } from "@/lib/utils";

export interface ConsultationRecord {
  _id: string;
  userId: string;
  expertId: string;
  fullName: string;
  dateTimeOfBirth: string;
  gender: "male" | "female";
  placeOfBirth: string;
  concern: string;
  status: "completed" | "cancelled" | "no-show";
  mode: "video" | "voice" | "chat";
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  page: number;
}

const getConsultationRecords = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/consultation-records",
      {
        params: { page, limit },
      }
    );
    return data as { data: ConsultationRecord[]; pagination: Pagination };
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const consultationApi = {
  getConsultationRecords,
};
