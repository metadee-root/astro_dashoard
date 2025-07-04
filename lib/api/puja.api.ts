import { axiosClient } from "@/lib/axios-client";
import { handleAPIError } from "@/lib/utils";

export interface AgoraTokenResponse {
  channelName: string;
  token: string;
  role: "user" | "pandit";
  callSessionId: string;
  isBookingPaidInFull: boolean;
  appId: string;
}

export interface PujaBooking {
  payment: {
    amount: number;
    paymentType: "full" | "half";
    status: "half-paid" | "completed";
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  bookingDateTime: string;
  pandit: {
    rating: {
      average: number;
    };
    _id: string;
    name: string;
    profileImage: string;
    languages: string[];
  };
  poojaId: {
    name: {
      en: string;
      hi: string;
    };
    _id: string;
    images: string[];
    reviews: {
      userId: string;
      rating: number;
      comment: string;
      _id: string;
      createdAt: string;
    }[];
  };
  status: "pending" | "confirmed" | "completed" | "cancelled";
  transactionId: string;
  createdAt: string;
}

const getBookings = async () => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/book-my-pooja/pandit/bookings"
    );
    return data.data as PujaBooking[];
  } catch (error) {
    throw handleAPIError(error);
  }
};

const getAgoraTokenForBooking = async (bookingId: string) => {
  try {
    const { data } = await axiosClient.get(
      `/bookings/${bookingId}/agora-token`
    );
    return data.data as AgoraTokenResponse;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const completeAndEndCall = async (bookingId: string) => {
  try {
    const { data } = await axiosClient.put(
      `/bookings/${bookingId}/complete-and-end-call`
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const getActiveCallSession = async () => {
  try {
    const { data } = await axiosClient.get(`/call-session/active`);
    return data.data as {
      bookingId: string;
      panditId: string;
      pujaId: string;
    };
  } catch (error) {
    console.log(error);
    throw handleAPIError(error);
  }
};

export const pujaApi = {
  getBookings,
  getAgoraTokenForBooking,
  completeAndEndCall,
  getActiveCallSession,
};
