import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Github from "/images/social/github-circle.png"
import Dribble from "/images/social/dribble-1.png"
import Behance from "/images/social/behance-1.png"
import Pinterest from "/images/social/pinterest-circle.png"
import Web from "/images/social/web.png"
import {Link} from "react-router-dom";

const Portfolio = () => {
  const data = [
    {
      name: "Github",
      image: Github,
      link: "#",
    },
    {
      name: "Dribble",
      image: Dribble,
      link: "#",
    },
    {
      name: "Behance",
      image: Behance,
      link: "#",
    },
    {
      name: "Pinterest",
      image: Pinterest,
      link: "#",
    },
    {
      name: "Web",
      image: Web,
      link: "#",
    },
  ]
  return (
    <Card>
      <CardHeader className="flex-row items-center border-none mb-2">
        <CardTitle className="flex-1 opacity-80"> Portfolio </CardTitle>
        <Button
          size="icon"
          className="flex-none bg-second text-gray-500 hover:bg-second-dark rounded h-6 w-6 -mt-1"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-center">
          {data.map((item, index) => (
            <Link key={`portfolio-${index}`} href={item.link}>
              <img
                src={item.image}
                alt="image"
                className="h-9 w-9 rounded-full"
              />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Portfolio;