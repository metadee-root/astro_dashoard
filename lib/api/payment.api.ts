import { axiosClient } from "@/lib/axios-client";
import { handleAPIError } from "@/lib/utils";

type FundTransferRequestStatus =
  | "pending"
  | "processing"
  | "approved"
  | "rejected";

export interface FundTransferRequest {
  _id: string;
  astrologerId: string;
  amount: number;
  status: FundTransferRequestStatus;
  requestDate: string;
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
}

interface FundTransferPayload {
  amount: number;
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
}

export const createFundTransferRequest = async (
  payload: FundTransferPayload
): Promise<FundTransferRequest> => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/fund-transfer-request",
      payload
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const getFundTransferRequests = async ({
  status,
  page = 1,
  limit = 10,
}: {
  status?: FundTransferRequestStatus | FundTransferRequestStatus[];
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/fund-transfer-requests",
      {
        params: {
          status: Array.isArray(status) ? status.join(",") : status,
          page,
          limit,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const paymentApi = {
  createFundTransferRequest,
  getFundTransferRequests,
};
