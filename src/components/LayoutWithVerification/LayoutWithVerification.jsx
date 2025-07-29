import React from "react";
import EmailVerificationBar from "../EmailVerificationBar/EmailVerificationBar";
import { useUserData } from "@/hooks/useUserData";
import useAuthToken from "@/hooks/use-auth-token";

const LayoutWithVerification = ({ children }) => {
  const { getToken } = useAuthToken();
  const token = getToken();

  // Only fetch user data if user is authenticated
  const { data: userData, isLoading } = useUserData();
  const user = userData?.data;
  const user_data = JSON.parse(localStorage.getItem("user_data"));

  return (
    <>
      {/* Show verification bar only if user is authenticated and email is not verified */}
      {token && user && user_data && <EmailVerificationBar user={user} />}
      {children}
    </>
  );
};

export default LayoutWithVerification;
