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

const signup = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/signup",
      body
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

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

const verifyMail = async (body: { email: string; otp: string }) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/verify-mail",
      body
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const validateToken = async (token: string) => {
  try {
    const { data } = await axiosClient.post(
      `/api/astrology/auth/astrologer/validate-token?token=${token}`
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const resetPassword = async (body: {
  email: string;
  otp: string;
  password: string;
}) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/reset-password",
      body
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const forgotPasswordOtp = async (body: { email: string }) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/forgot-password-otp",
      body
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const logout = async () => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/logout"
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const resendOtp = async (body: { email: string }) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/resend-otp",
      body
    );
    return data.data;
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

interface UpdateProfileFormData {
  profileImage?: File;
  identityProof?: File;
  name?: string;
  about?: string;
  chatPrice?: string;
  callPrice?: string;
  videoPrice?: string;
}

const updateProfile = async (formData: UpdateProfileFormData) => {
  try {
    const form = new FormData();

    // Append all optional fields
    if (formData.profileImage) {
      form.append("profileImage", formData.profileImage);
    }
    if (formData.identityProof) {
      form.append("identityProof", formData.identityProof);
    }
    if (formData.name) {
      form.append("name", formData.name);
    }
    if (formData.about) {
      form.append("about", formData.about);
    }
    if (formData.chatPrice) {
      form.append("chatPrice", formData.chatPrice);
    }
    if (formData.callPrice) {
      form.append("callPrice", formData.callPrice);
    }
    if (formData.videoPrice) {
      form.append("videoPrice", formData.videoPrice);
    }

    const { data } = await axiosClient.patch(
      "/api/astrology/auth/astrologer/profile",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

const changePassword = async (body: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const { data } = await axiosClient.post(
      "/api/astrology/auth/astrologer/change-password",
      body
    );
    return data.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

interface OnboardingFormData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  primaryLanguage: string;
  languages: string[];
  expertise: string[];
  yearsOfExperience: string;
  astrologySystems: string[];
  otherPractices: string[];
  teachers: string;
  lineage: string;
  formalEducation: string;
  maxConsultationsPerDay: string;
  workingDays: string[];
  timeSlots: string[];
  expectedResponseTime: string;
  remediesTypes: string[];
  excludedPredictionAreas: string[];
  createHoroscopeContent: string;
  createDailyPredictions: string;
  bankDetails: string;
  about: string;
  chatPrice: string;
  callPrice: string;
  videoPrice: string;
  canPerformPuja: string;
  profileImage?: File;
  aadharCard?: File;
  addressProof?: File;
  educationCertificates?: File[];
}

const submitOnboarding = async (formData: OnboardingFormData) => {
  try {
    const form = new FormData();

    // Append all text fields
    form.append("fullName", formData.fullName);
    form.append("dateOfBirth", formData.dateOfBirth);
    form.append("timeOfBirth", formData.timeOfBirth);
    form.append("placeOfBirth", formData.placeOfBirth);
    form.append("primaryLanguage", formData.primaryLanguage);
    form.append("languages", JSON.stringify(formData.languages));
    form.append("expertise", JSON.stringify(formData.expertise));
    form.append("yearsOfExperience", formData.yearsOfExperience);
    form.append("astrologySystems", JSON.stringify(formData.astrologySystems));
    form.append("otherPractices", JSON.stringify(formData.otherPractices));
    form.append("teachers", formData.teachers);
    form.append("lineage", formData.lineage);
    form.append("formalEducation", formData.formalEducation);
    form.append("maxConsultationsPerDay", formData.maxConsultationsPerDay);
    form.append("workingDays", JSON.stringify(formData.workingDays));
    form.append("timeSlots", JSON.stringify(formData.timeSlots));
    form.append("expectedResponseTime", formData.expectedResponseTime);
    form.append("remediesTypes", JSON.stringify(formData.remediesTypes));
    form.append(
      "excludedPredictionAreas",
      JSON.stringify(formData.excludedPredictionAreas)
    );
    form.append("createHoroscopeContent", formData.createHoroscopeContent);
    form.append("createDailyPredictions", formData.createDailyPredictions);
    form.append("bankDetails", formData.bankDetails);
    form.append("about", formData.about);
    form.append("chatPrice", formData.chatPrice);
    form.append("callPrice", formData.callPrice);
    form.append("videoPrice", formData.videoPrice);
    form.append("canPerformPuja", formData.canPerformPuja);

    // Append files
    if (formData.profileImage) {
      form.append("profileImage", formData.profileImage);
    }
    if (formData.aadharCard) {
      form.append("aadharCard", formData.aadharCard);
    }
    if (formData.addressProof) {
      form.append("addressProof", formData.addressProof);
    }
    if (formData.educationCertificates) {
      formData.educationCertificates.forEach((file) => {
        form.append("educationCertificates", file);
      });
    }

    const { data } = await axiosClient.post(
      "/api/astrology/onboarding/onboarding",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const authApi = {
  signup,
  login,
  verifyMail,
  validateToken,
  resetPassword,
  forgotPasswordOtp,
  logout,
  resendOtp,
  getDetails,
  getWallet,
  updateProfile,
  changePassword,
  submitOnboarding,
};
