import { SignIn } from "./_components/sign-in";
import planetsImage from "@/public/planets.jpg";
import Image from "next/image";

export const metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="relative flex-1 hidden md:flex">
        <Image src={planetsImage} alt="Planets" fill className="object-cover" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
