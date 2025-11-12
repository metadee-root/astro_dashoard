import React, { Suspense } from "react";
import { VerifyEmail } from "./_components/verifiy-email";

export const metadata = {
  title: "Verify",
};

const Page = () => {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
};

export default Page;
