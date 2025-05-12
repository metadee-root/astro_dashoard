import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export const BankAccountDetailsForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Account Details</CardTitle>
        <CardDescription>
          Please add your bank account details to enable withdrawals.
        </CardDescription>
      </CardHeader>
      <CardContent>{/* Bank details form here */}</CardContent>
    </Card>
  );
};
