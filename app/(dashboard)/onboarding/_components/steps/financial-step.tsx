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
  const { updateStepData, getStepData, nextStep, previousStep } =
    useOnboardingStore();

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
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
        <CardDescription>
          Set up your payment details for receiving consultation fees
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
                name="bankAccountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bank Account Number{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Confirm Account Number{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
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
                        <div className="text-sm text-destructive">
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
                    <FormLabel>
                      Account Holder Name{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Account Type <span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Bank Name <span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Branch Name <span className="text-destructive">*</span>
                    </FormLabel>
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
                  <FormLabel>
                    IFSC Code <span className="text-destructive">*</span>
                  </FormLabel>
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

                  <FormField
                    control={form.control}
                    name="paypalEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PayPal Email</FormLabel>
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
                        <FormLabel>
                          Preferred Payment Methods{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          Payout Frequency{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
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

            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="size-4" />
                Terms & Consents
              </h3>
              <div className="space-y-4">
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
              </div>
            </div>

            <div className="bg-muted/50 border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-4 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Important Information
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
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
      </CardContent>
    </Card>
  );
};
