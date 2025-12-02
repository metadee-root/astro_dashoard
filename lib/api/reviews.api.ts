import { axiosClient } from "@/lib/axios-client";
import { handleAPIError } from "@/lib/utils";

export interface IReview {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  feedback: string;
  createdAt: string;
}

export const getReviews = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await axiosClient.get(
      "/api/astrology/auth/astrologer/reviews",
      {
        params: { page, limit },
      }
    );
    return data as {
      data: {
        rating: {
          average: number;
          reviewsCount: number;
        };
        reviews: IReview[];
      };
      pagination: {
        totalItems: number;
        totalPages: number;
        page: number;
      };
    };
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const reviewsApi = {
  getReviews,
};
