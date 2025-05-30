import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth";

export const getAuthToken = async () => {
  try {
    if (typeof window === "undefined") {
      // Server-side
      const session = await getServerSession(authOptions);
      return session?.user?.token;
    } else {
      // Client-side
      const session = await getSession();
      return session?.user?.token;
    }
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};
