import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  financialSchema,
  FinancialData,
} from "../../_schemas/financial.schema";
import { StepProps } from "../../_types/step.types";
import {
  ACCOUNT_TYPES,
  PAYMENT_METHODS,
  PAYOUT_FREQUENCY,
} from "../../_constants/form-options";
import { useOnboardingStore } from "../../_hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Shield, CreditCard } from "lucide-react";

export const FinancialStep = () => {
  const { updateStepData, getStepData, nextStep, previousStep } = useOnboardingStore();

  const savedData = getStepData("financial");

  const form = useForm<FinancialData>({
    resolver: zodResolver(financialSchema),
    defaultValues: savedData || {
      bankAccountNumber: "",
      confirmBankAccountNumber: "",
      bankName: "",
      ifscCode: "",
      accountHolderName: "",
      branchName: "",
      accountType: "",
      upiId: "",
      paypalEmail: "",
      panNumber: "",
      gstNumber: "",
      preferredPaymentMethod: [],
      payoutFrequency: "",
      consentToTerms: false,
      consentToDataSharing: false,
    },
  });

  const onSubmit = (data: FinancialData) => {
    updateStepData("financial", data);
    nextStep();
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    const currentData = form.getValues();
    updateStepData("financial", currentData);
    previousStep();
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateStepData("financial", value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateStepData]);

  const bankAccountNumber = form.watch("bankAccountNumber");
  const confirmBankAccountNumber = form.watch("confirmBankAccountNumber");

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Financial Information</h2>
        <p className="text-gray-600">
          Set up your payment details for receiving consultation fees
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Bank Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bankAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account Number *</FormLabel>
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
                  name="confirmBankAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Account Number *</FormLabel>
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
                      <FormLabel>Account Holder Name *</FormLabel>
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
                      <FormLabel>Account Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
                      <FormLabel>Bank Name *</FormLabel>
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
                      <FormLabel>Branch Name *</FormLabel>
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
                    <FormLabel>IFSC Code *</FormLabel>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Additional Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your-upi-id@paytm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paypalEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PayPal Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your-email@paypal.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Number (Optional)</FormLabel>
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
                      <FormLabel>GST Number (Optional)</FormLabel>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredPaymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Payment Methods *</FormLabel>
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
                      <FormLabel>Payout Frequency *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Terms & Consents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="consentToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to the payment terms and conditions *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consentToDataSharing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I consent to share necessary financial information for
                        payment processing *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">
                  Important Information
                </h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>
                    • Bank details will be used for processing your consultation
                    earnings
                  </li>
                  <li>
                    • Your financial information is encrypted and stored
                    securely
                  </li>
                  <li>
                    • Payouts are processed according to your selected frequency
                  </li>
                  <li>• Platform commission will be deducted before payout</li>
                  <li>
                    • You can update payment details later from your dashboard
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
