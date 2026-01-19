// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { ReactNode } from 'react';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <DashboardLayout>{children}</DashboardLayout>;
// }


import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // ⏳ Wait until auth state is resolved
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  // 🔒 Not authenticated → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

 
  return <DashboardLayout>{children}</DashboardLayout>;
}
