import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FigmaImage from "/images/all-img/figma.png"
import ReactImage from "/images/all-img/react.png"
import { PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import { MdLocationCity } from "react-icons/md";
import { Calendar1Icon, CalendarCheck } from "lucide-react";
const UserInfo = () => {
  const userInfo = [
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: "Full Name",
      value: "Jennyfer Frankin"
    },
    {
      icon: <PhoneIcon className="w-4 h-4" />,
      label: "Mobile",
      value: "+(1) 987 6543"
    },
    {
      icon: <MdLocationCity className="w-4 h-4" />,
      label: "Location",
      value: "101, California"
    },
    {
      icon: < CalendarCheck className="w-4 h-4" />,
      label: "Joining Date",
      value: "24 Nov 2021"
    },
    {
      icon: <Calendar1Icon className="w-4 h-4" />,
      label: "Last Task Complete ",
      value: "09 Mar 2024"
    },
  ]
  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800 opacity-80">
          Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-default-600 opacity-80">
          Tart I love sugar plum I love oat cake. Sweet roll caramels I love
          jujubes. Topping cake wafer..
        </p>
        <ul className="mt-6 space-y-4">
          {userInfo.map((item, index) => (
            <li key={`user-info-${index}`} className="flex items-center">
              <div className="flex-none  2xl:w-56 flex items-center gap-1.5">
                <span className="text-main">{item.icon}</span>
                <span className="text-sm font-medium text-default-800 opacity-80">
                  {item.label}:
                </span>
              </div>
              <div className="flex-1 text-sm text-default-700 opacity-80">
                {item.value}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-lg font-medium text-default-800 mb-4 opacity-80">
          Active Teams
        </div>
        <div className="space-y-3">
          {[
            {
              title: "UI/UX Designer",
              img: FigmaImage,
              total: 65,
            },
            {
              title: "Frontend Developer",
              img: ReactImage,
              total: 126,
            },
          ].map((item, index) => (
            <div
              key={`active-team-${index}`}
              className="flex items-center gap-2"
            >
              <img src={item.img} alt={item.title} className="w-4 h-4" />
              <div className="text-sm font-medium text-default-800 opacity-80">
                {item.title}
                <span className="font-normal">({item.total} members)</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;