import { axiosClient } from "@/lib/axios-client";
import { handleAPIError } from "@/lib/utils";

interface ConsultationRecord {
  id: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  duration: number;
  amount: number;
  status: "completed" | "cancelled" | "no-show";
  rating?: number;
  feedback?: string;
}

const getConsultationRecords = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/consultation-records",
      {
        params: { page, limit },
      }
    );
    return data as { data: ConsultationRecord[] };
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const consultationApi = {
  getConsultationRecords,
};
