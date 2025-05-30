import { axiosClient } from "@/lib/axios-client";
import { handleAPIError } from "@/lib/utils";

export interface PujaBooking {
  payment: {
    amount: number;
    paymentType: "full" | "partial";
    status: "pending" | "completed" | "failed";
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

export const pujaApi = {
  getBookings,
};
