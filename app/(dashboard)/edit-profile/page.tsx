import React from "react";
import { EditProfileForm } from "./_components/edit-profile-form";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Edit Profile
        </h1>
        <p className="text-muted-foreground font-medium">
          Complete your profile to increase visibility to seekers
        </p>
      </div>
      <EditProfileForm />
    </div>
  );
};

export default Page;
