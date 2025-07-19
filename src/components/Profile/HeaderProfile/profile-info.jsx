import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { profileUser } from "../../Chat/chat/data";
import useAuthToken from "@/hooks/use-auth-token";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { useMutate } from "@/hooks/UseMutate";
import { toast } from "sonner";
import Cookies from "js-cookie";

const ProfileInfo = ({ user_data }) => {
  const navigate = useNavigate();
  const { logout } = useAuthToken();

  const { mutate, isPending } = useMutate({
    method: "GET", // Changed from GET to POST
    endpoint: "logout-api", // Changed endpoint name
    queryKey: ["logout"],
    text: "Logged out successfully!",
    onSuccess: () => {
      // Use comprehensive logout function
      logout();
      navigate("/");
      localStorage.removeItem("user_data");
      Cookies.remove("auth_token");
    },
    onError: (error) => {
      // Even if API fails, still logout locally
      logout();
    },
  });

  const handleLogout = () => {
    // Try API logout first, but fallback to client-side logout
    try {
      mutate({}); // Send empty object as data
    } catch (error) {
      // If mutation fails, do client-side logout
      logout();
    }
  };

  return (
    <DropdownMenu>
      {isPending && (
        <div className="absolute top-1 left-1 bg-black flex items-center py-3 px-5 rounded-sm text-white ">
          <BtnLoading size="6" />
          <span className="text-md font-[600]">Logging out ...</span>
        </div>
      )}
      <DropdownMenuTrigger
        asChild
        className=" cursor-pointer user-select-none border-2 border-main rounded-full p-0.5 select-none"
      >
        <div className="flex items-center">
          <img
            src={user_data?.image || profileUser?.avatar}
            alt={""}
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0 " align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3 ">
          <img
            src={user_data?.image || profileUser?.avatar}
            alt={""}
            width={36}
            height={36}
            className="border-2 border-main rounded-full p-0.5"
          />
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {user_data?.name ?? "Your Name"}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              <span className="text-sm opacity-50 font-xs">
                @{user_data?.role ?? "@Your Role"}
              </span>
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "profile",
              icon: "heroicons:user",
              href: "/profile",
            },
            // {
            //   name: "Billing",
            //   icon: "heroicons:megaphone",
            //   href:"/dashboard"
            // },
            {
              name: "Settings",
              icon: "heroicons:paper-airplane",
              href: "/profile-setting",
            },
            // {
            //   name: "Keyboard shortcuts",
            //   icon: "heroicons:language",
            //   href:"/dashboard"
            // },
          ].map((item, index) => (
            <Link
              to={item.href}
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 hover:bg-second cursor-pointer opacity-70 hover:opacity-100 transition">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 bg-border" />
        <DropdownMenuItem
          disabled={isPending}
          onClick={handleLogout}
          className="flex items-center justify-between gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 hover:bg-second cursor-pointer opacity-70 hover:opacity-100 transition"
        >
          <div className="flex items-center gap-2">
            <Icon icon="heroicons:power" className="w-4 h-4" />
            Log out
          </div>
          {isPending && <BtnLoading size="5" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
