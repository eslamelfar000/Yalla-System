
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

import avatar1 from "/images/avatar/avatar-2.jpg"
import avatar2 from "/images/avatar/avatar-3.jpg"
import avatar3 from "/images/avatar/avatar-4.jpg"
import avatar4 from "/images/avatar/avatar-5.jpg"
import avatar5 from "/images/avatar/avatar-6.jpg"
import avatar6 from "/images/avatar/user-2.png"
import {Link} from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/16/solid";
const Connections = () => {
  const data = [
    {
      name: "Alex Smith",
      avatar: avatar1,
      count: 25
    },
    {
      name: "Darrel Barnes",
      avatar: avatar2,
      count: 26
    },
    {
      name: "Eugenia Moore",
      avatar: avatar3,
      count: 27
    },
    {
      name: "Alice Stone",
      avatar: avatar4,
      count: 28
    },
    {
      name: "Monica Bellas",
      avatar: avatar5,
      count: 29
    },
    {
      name: "Prantik Chakraborty",
      avatar: avatar6,
      count: 30
    }
  ]
  return (
    <Card>
      <CardHeader className="flex-row items-center border-none mb-2">
        <CardTitle className="flex-1 opacity-80"> My Connections </CardTitle>
        <Button
          size="icon"
          className="flex-none bg-second text-gray-500 hover:bg-second-dark rounded h-6 w-6 -mt-1"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 mb-6">
          {data.map((item, index) => (
            <div
              key={`connection-${index}`}
              className="flex items-center gap-3"
            >
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-none">
                  <img
                    src={item.avatar}
                    className="h-12 w-12 rounded-full"
                    alt={item.name}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-base font-medium text-default-700 mb-1">
                    {item.name}
                  </div>
                  <div className="text-sm text-default-500">
                    {item.count} Mutual Connections
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                className="h-8 w-8 bg-second text-main hover:bg-second-dark rounded"
              >
                <UserPlusIcon className="flex-none h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/" className="text-sm font-semibold text-main">
            View All Connections
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Connections;