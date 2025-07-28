import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get booking type from location state or localStorage
  const bookingType =
    location.state?.bookingType ||
    localStorage.getItem("last_booking_type") ||
    "regular";
  const isPayAfter = bookingType === "payafter";

  useEffect(() => {
    // Clear any remaining booking data to prevent conflicts
    localStorage.removeItem("booking_data");
    localStorage.removeItem("last_booking_type");

    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const handleViewBookings = () => {
    navigate("/profile", { replace: true });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckBadgeIcon className="h-10 w-10 text-green-600" />
            </div>

            {/* Success Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Booking Successful!
            </h2>

            {/* Success Message */}
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                {isPayAfter
                  ? "Your booking request has been sent successfully."
                  : "Your payment and booking have been processed successfully."}
              </p>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Icon
                    icon="heroicons:information-circle"
                    className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                  />
                  <div className="text-sm text-blue-800">
                    {isPayAfter ? (
                      <p>
                        <strong>Pay After Booking:</strong> Payment will be
                        collected after your last session. We will send payment
                        details to your email.
                      </p>
                    ) : (
                      <p>
                        <strong>Booking Confirmation:</strong> Your booking will
                        be confirmed within 24 hours. You'll receive an email
                        with session details.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  What's Next?
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check your email for booking confirmation</li>
                  <li>• Prepare for your session</li>
                  <li>• Contact support if you have questions</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                onClick={handleGoHome}
                className="flex-1 bg-main hover:bg-main-dark text-white"
              >
                <Icon icon="heroicons:home" className="h-4 w-4 mr-2" />
                Go to Home
              </Button>

              <Button
                onClick={handleViewBookings}
                variant="outline"
                className="flex-1"
              >
                <Icon icon="heroicons:calendar" className="h-4 w-4 mr-2" />
                View My Bookings
              </Button>
            </div>

            {/* Auto-redirect notice */}
            <p className="text-xs text-gray-500 mt-4">
              You'll be automatically redirected to home in 5 seconds...
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SuccessPage;
