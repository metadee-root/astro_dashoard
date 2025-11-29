import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type Status = "onboarding" | "verified" | "in_review" | "rejected";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
    status: Status;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      token: string;
      status: Status;
    };
  }

  interface User extends User {
    id: string;
    token: string;
    status: Status;
  }
}
