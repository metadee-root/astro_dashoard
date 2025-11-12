import { authApi } from "./auth.api";
import { pujaApi } from "./puja.api";
import { consultationApi } from "./consultation.api";
import { reviewsApi } from "./reviews.api";
import { paymentApi } from "./payment.api";
import { analyticsApi } from "./analytics.api";

export const api = {
  auth: authApi,
  puja: pujaApi,
  consultation: consultationApi,
  reviews: reviewsApi,
  payment: paymentApi,
  analytics: analyticsApi,
};
