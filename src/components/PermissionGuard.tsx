import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

interface PermissionGuardProps {
  children: ReactNode;
  allowedRoles?: string[]; // Optional: if you want to be specific
}

export function PermissionGuard({ children, allowedRoles = ["admin"] }: PermissionGuardProps) {
  const { user } = useAuth();
  if (!user || user.role === "support") {
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}