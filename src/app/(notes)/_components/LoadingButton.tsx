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
    <Button>
      {loading && <Loader2 className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}
