import { handleAPIError } from "@/lib/utils";
import { axiosClient } from "@/lib/axios-client";

export interface AstrologerDetails {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  languages: string[];
  expertise: string[];
  availability: "online" | "offline" | "busy";
  chatPrice: number;
  callPrice: number;
  videoPrice: number;
  role: string;
  about: string;
  rating: {
    average: number;
    reviewsCount: number;
  };
  createdAt: string;
}

interface WalletDetails {
  balance: number;
  currency: string;
  lastTransaction?: {
    amount: number;
    type: "credit" | "debit";
    timestamp: string;
  };
  pendingPayouts: number;
}

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

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const login = async (body: { email: string; password: string }) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/login",
      body
    );
    return data.data as {
      id: string;
      name: string;
      email: string;
      token: string;
    };
  } catch (error) {
    throw handleAPIError(error);
  }
};

const getDetails = async (): Promise<AstrologerDetails> => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/details"
    );
    return data.data as AstrologerDetails;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const getWallet = async (): Promise<WalletDetails> => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/wallet"
    );
    return data.data as WalletDetails;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const getConsultationRecords = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<ConsultationRecord>> => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/consultation-records",
      {
        params: { page, limit },
      }
    );
    return data as PaginatedResponse<ConsultationRecord>;
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const authApi = {
  login,
  getDetails,
  getWallet,
  getConsultationRecords,
};
