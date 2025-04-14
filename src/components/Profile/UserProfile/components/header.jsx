"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import coverImage from "/images/all-img/user-cover.png"
import {Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import User from "/images/avatar/user.png";
import {profileUser} from "../../../Chat/chat/data"
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
const Header = () => {
  const {pathname} = useLocation();
  return (
    <Fragment>
      <div className="cover bg-white p-5 rounded-xl">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">
              <Home className="h-4 w-4 hover:text-main" />
            </Link>
          </BreadcrumbItem>
          {/* <BreadcrumbItem>Pages</BreadcrumbItem> */}
          {/* <BreadcrumbItem>Utility</BreadcrumbItem> */}
          <BreadcrumbItem>
            <span className="text-main font-[500]">User Profile</span>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Card className="mt-6 rounded-t-2xl ">
        <CardContent className="p-0">
          <div
            className="relative h-[200px] lg:h-[296px] rounded-t-2xl w-full object-cover bg-no-repeat"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            {/* <div className="flex justify-end pt-6 pr-6  divide-x divide-primary-foreground  gap-4">
              <div>
                <div className="text-xl font-semibold text-primary-foreground">
                  24.5K
                </div>
                <div className="text-sm text-default-200">Followers</div>
              </div>
              <div className="pl-4">
                <div className="text-xl font-semibold text-primary-foreground">
                  22.5K
                </div>
                <div className="text-sm text-default-200">Following</div>
              </div>
            </div> */}
            <div className="flex lg:items-center gap-4 absolute ltr:left-10 rtl:right-10 -bottom-5 lg:-bottom-8">
              <div>
                <img
                  src={profileUser?.avatar}
                  alt="user"
                  className="h-20 w-20 lg:w-32 lg:h-32 rounded-full"
                />
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-semibold text-primary-foreground mb-1">
                  {profileUser?.fullName}
                </div>
                <div className="text-xs lg:text-sm font-medium text-default-100 dark:text-default-900 pb-1.5 text-white">
                  {profileUser?.bio}
                </div>
              </div>
            </div>
            {pathname === "/profile" && (
              <Button
                asChild
                className="absolute top-4 md:bottom-5 ltr:right-6 rtl:left-6 rounded px-5 bg-main-dark"
                size="sm"
              >
                <Link to="/profile-setting">
                  <Icon
                    className="w-4 h-4 ltr:mr-1 rtl:ml-1"
                    icon="heroicons:pencil-square"
                  />
                  Edit
                </Link>
              </Button>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-4 lg:gap-8 px-6">
            {[
              {
                title: "Overview",
                link: "/profile",
              },
              // {
              //   title: "Documents",
              //   link: "/user-profile/documents",
              // },
              // {
              //   title: "Activity",
              //   link: "/user-profile/activity",
              // },
              {
                title: "Settings",
                link: "/profile-setting",
              },
            ].map((item, index) => (
              <Link
                key={`user-profile-link-${index}`}
                to={item.link}
                className={cn(
                  "text-sm font-semibold text-default-500 hover:text-primary relative before:absolute before:-bottom-0 before:left-0 before:w-full before:h-[3px] before:bg-transparent py-5",
                  {
                    "text-primary before:bg-main": pathname === item.link,
                  }
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;