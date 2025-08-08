import React from "react";
import EmailVerificationBar from "../EmailVerificationBar/EmailVerificationBar";
import { useCurrentUserData } from "@/hooks/useCurrentUserData";
import useAuthToken from "@/hooks/use-auth-token";

const LayoutWithVerification = ({ children }) => {
  const { getToken } = useAuthToken();
  const token = getToken();
  const { userData, isAuthenticated } = useCurrentUserData();

  return (
    <>
      {/* Show verification bar only if user is authenticated and email is not verified */}
      {token && userData && isAuthenticated && (
        <EmailVerificationBar user={userData} />
      )}
      {children}
    </>
  );
};

export default LayoutWithVerification;
