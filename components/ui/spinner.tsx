import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";
import React, { FC } from "react";

interface SpinnerProps extends LucideProps {}

export const Spinner: FC<SpinnerProps> = ({ className, ...props }) => {
  return <Loader2 className={cn("animate-spin", className)} {...props} />;
};
