import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

type LoadingButtonProps = {
  loading: boolean;
} & ButtonProps;

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
