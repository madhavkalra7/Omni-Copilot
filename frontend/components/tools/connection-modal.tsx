"use client";

import { AuthModal } from "@/components/ui/auth-modal";

interface ConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolLabel: string;
  onConnected: () => void;
}

export function ConnectionModal({ open, onOpenChange, toolLabel, onConnected }: ConnectionModalProps) {
  return (
    <AuthModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Connect ${toolLabel}`}
      onGoogleContinue={() => {
        onConnected();
        onOpenChange(false);
      }}
      onEmailContinue={() => {
        onConnected();
        onOpenChange(false);
      }}
    />
  );
}
