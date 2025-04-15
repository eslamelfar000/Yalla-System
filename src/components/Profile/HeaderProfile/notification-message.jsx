// import { Bell } from "@/components/svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { notifications } from "./notification-data";
import shortImage from "/images/all-img/short-image-2.png";
import { BellAlertIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/Store/Reducer/notificationSlice";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useState } from "react";

const NotificationMessage = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.notification);

  return (
    <DropdownMenu>
      <AlertModal
        show={show}
        setShow={setShow}
        note={notification}
        loading={loading}
      />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100  dark:data-[state=open]:bg-default-200 
           hover:text-primary text-default-500 dark:text-default-800  rounded-full  cursor-pointer select-none"
        >
          <BellAlertIcon className="size-6 text-main" />
          <Badge className=" w-4 h-4 p-0 text-xs  font-medium bg-red-500  items-center justify-center absolute left-[calc(100%-18px)] bottom-[calc(100%-16px)] ring-2 ring-primary-foreground">
            5
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" z-[999] mx-4 lg:w-[412px] p-0"
      >
        <DropdownMenuLabel
          style={{ backgroundImage: `url(${shortImage})` }}
          className="w-full h-full bg-cover bg-no-repeat p-4 flex items-center"
        >
          <span className="text-base font-semibold text-white flex-1">
            Notification
          </span>
          <span className="text-xs font-medium text-white cursor-pointer hover:underline hover:decoration-default-100">
            Mark all as read
          </span>
        </DropdownMenuLabel>
        <div className="h-[300px] xl:h-[350px]">
          <ScrollArea className="h-full">
            {notifications.map((item, index) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                className="flex gap-9 py-2 px-4 cursor-pointer hover:bg-second"
                onClick={() => {
                  dispatch(
                    setNotification({
                      notification: item,
                    })
                  );
                  setShow(true);
                  setLoading(true);

                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              >
                <div className="flex-1 flex items-center gap-2">
                  <Avatar className="h-10 w-10 rounded">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div className="opacity-80">
                    <div className="text-sm font-medium text-default-900 mb-[2px] whitespace-nowrap">
                      {item.fullName}
                    </div>
                    <div className="text-xs text-default-900 truncate max-w-[100px] lg:max-w-[185px]">
                      {" "}
                      {item.message}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "text-xs font-medium text-default-900 whitespace-nowrap opacity-60",
                    {
                      "text-main opacity-100": !item.unreadmessage,
                    }
                  )}
                >
                  {item.date}
                </div>
                <div
                  className={cn("w-2 h-2 rounded-full mr-2", {
                    "bg-main": !item.unreadmessage,
                  })}
                ></div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </div>
        <DropdownMenuSeparator />
        {/* <div className="m-4">
          <Button asChild type="text" className="w-full bg-main">
            <Link href="/dashboard">View All</Link>
          </Button>
        </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMessage;
