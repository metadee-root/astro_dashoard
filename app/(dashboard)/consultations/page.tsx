import { api } from "@/lib/api";
import React from "react";

export const metadata = {
  title: "Consultations",
};

const Page = async () => {
  const data = await api.consultation.getConsultationRecords();
  console.log(data);
  return <div>Page</div>;
};

export default Page;
