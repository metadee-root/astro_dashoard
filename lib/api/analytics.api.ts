import { handleAPIError } from "@/lib/utils";
import { axiosClient } from "@/lib/axios-client";
import queryString from "query-string";

interface AnalyticsParams {
  period: "daily" | "weekly" | "monthly" | "yearly";
  year: number;
  month?: number;
  day?: number;
}

interface MonthlyTrend {
  month: number;
  earnings: number;
  sessions: number;
}

interface ByMode {
  chat: { sessions: number; earnings: number; duration: number };
  call: { sessions: number; earnings: number; duration: number };
  video: { sessions: number; earnings: number; duration: number };
}

interface AnalyticsResponse {
  success: boolean;
  data: {
    period: {
      type: 'monthly' | 'weekly' | 'daily' | 'yearly';
      startDate: string;
      endDate: string;
      year: number;
      month?: number;
    };
    wallet: {
      currentBalance: number;
      currency: string;
    };
    overview: {
      totalEarnings: number;
      totalSessions: number;
      totalDuration: number;
      pendingConsultations: number;
    };
    currentPeriod: {
      earnings: number;
      sessions: number;
      byMode: ByMode;
    };
    today: {
      sessions: number;
      earnings: number;
      byMode: {
        chat: number;
        call: number;
        video: number;
      };
    };
    monthlyTrend: MonthlyTrend[];
    performance: {
      averageSessionDuration: number;
      completionRate: number;
    };
  };
  message: string;
}

const getAnalytics = async (
  params: AnalyticsParams
): Promise<AnalyticsResponse> => {
  try {
    const queryParams: Record<string, string | number> = {
      period: params.period,
      year: params.year,
    };

    if (params.month !== undefined) {
      queryParams.month = params.month;
    }
    if (params.day !== undefined) {
      queryParams.day = params.day;
    }

    const url = queryString.stringifyUrl({
      url: "/api/astrology/auth/astrologer/analytics",
      query: queryParams,
    });

    const { data } = await axiosClient.get(url);
    return data as AnalyticsResponse;
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const analyticsApi = {
  getAnalytics,
};
