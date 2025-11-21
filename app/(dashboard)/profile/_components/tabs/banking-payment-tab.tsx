import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import { AlertCircle, Shield, CreditCard, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Constants from onboarding
const ACCOUNT_TYPES = [
  { value: "savings", label: "Savings Account" },
  { value: "current", label: "Current Account" },
  { value: "salary", label: "Salary Account" },
  { value: "nre", label: "NRE Account" },
  { value: "nro", label: "NRO Account" },
];

const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "upi", label: "UPI" },
  { value: "paypal", label: "PayPal" },
  { value: "payoneer", label: "Payoneer" },
  { value: "wise", label: "Wise" },
];

const PAYOUT_FREQUENCY = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "bi_weekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

const bankingPaymentSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  accountNumber: z.string().min(1, "Bank account number is required"),
  confirmAccountNumber: z.string().min(1, "Confirm account number is required"),
  ifscCode: z.string().min(1, "IFSC code is required"),
  branchName: z.string().min(1, "Branch name is required"),
  accountType: z.string().min(1, "Account type is required"),
  upiId: z.string().optional(),
  panNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  preferredPaymentMethod: z.array(z.string()).min(1, "Select at least one payment method"),
  payoutFrequency: z.string().min(1, "Payout frequency is required"),
})
.refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers do not match",
  path: ["confirmAccountNumber"],
});

type BankingPaymentData = z.infer<typeof bankingPaymentSchema>;

interface BankingPaymentTabProps {
  profile: any;
}

export const BankingPaymentTab = ({ profile }: BankingPaymentTabProps) => {
  const queryClient = useQueryClient();

  const form = useForm<BankingPaymentData>({
    resolver: zodResolver(bankingPaymentSchema),
    defaultValues: {
      bankName: profile?.bankDetails?.bankName || "",
      accountHolderName: profile?.bankDetails?.accountHolderName || "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: profile?.bankDetails?.ifscCode || "",
      branchName: profile?.bankDetails?.branchName || "",
      accountType: profile?.bankDetails?.accountType || "",
      upiId: profile?.bankDetails?.upiId || "",
      panNumber: profile?.panNumber || "",
      gstNumber: profile?.gstNumber || "",
      preferredPaymentMethod: profile?.preferredPaymentMethod || [],
      payoutFrequency: profile?.payoutFrequency || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: BankingPaymentData) => {
      // Transform the data to match the API expected format
      const apiData = {
        ...data,
        bankDetails: JSON.stringify({
          bankName: data.bankName,
          accountHolderName: data.accountHolderName,
          ifscCode: data.ifscCode,
          branchName: data.branchName,
          accountType: data.accountType,
          upiId: data.upiId,
        })
      };
      return api.auth.updateProfile(apiData);
    },
    onSuccess: () => {
      toast.success("Banking and payment information updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update banking and payment information");
    },
  });

  const onSubmit = (data: BankingPaymentData) => {
    updateMutation.mutate(data);
  };

  const bankAccountNumber = form.watch("accountNumber");
  const confirmBankAccountNumber = form.watch("confirmAccountNumber");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Banking & Payment Information</CardTitle>
        <CardDescription>
          Set up your payment details for receiving consultation earnings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="size-4" />
                Bank Account Details
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account Number</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your bank account number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmAccountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Account Number</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter your account number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {bankAccountNumber &&
                      confirmBankAccountNumber &&
                      bankAccountNumber !== confirmBankAccountNumber && (
                        <div className="text-sm text-red-600">
                          Account numbers do not match
                        </div>
                      )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountHolderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name as per bank records"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACCOUNT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter branch name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter IFSC code (e.g., HDFC0001234)"
                      className="uppercase"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="font-semibold mb-4">Additional Payment Methods</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="upiId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input placeholder="your-upi-id@paytm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Tax Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABCDE1234F"
                            className="uppercase"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.toUpperCase())
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12ABCDE1234F1ZV"
                            className="uppercase"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.toUpperCase())
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Payment Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredPaymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Payment Methods</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            value={
                              field.value?.map((method) => ({
                                value: method,
                                label:
                                  PAYMENT_METHODS.find(
                                    (opt) => opt.value === method
                                  )?.label || method,
                              })) || []
                            }
                            onChange={(options) =>
                              field.onChange(options.map((opt) => opt.value))
                            }
                            options={[...PAYMENT_METHODS]}
                            placeholder="Select preferred payment methods"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payoutFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payout Frequency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select payout frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PAYOUT_FREQUENCY.map((freq) => (
                              <SelectItem key={freq.value} value={freq.value}>
                                {freq.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-4 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Important Information
                  </h4>
                  <ul className="text-sm text-yellow-800 space-y-1 list-disc -ml-4">
                    <li>
                      Bank details will be used for processing your consultation
                      earnings
                    </li>
                    <li>
                      Your financial information is encrypted and stored
                      securely
                    </li>
                    <li>
                      Payouts are processed according to your selected frequency
                    </li>
                    <li>Platform commission will be deducted before payout</li>
                    <li>
                      You can update payment details later from your dashboard
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};