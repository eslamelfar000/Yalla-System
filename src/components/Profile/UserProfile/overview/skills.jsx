import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Skills = () => {

  return (
    <Card>
      <CardHeader className="flex-row items-center border-none mb-2">
        <CardTitle className="flex-1 opacity-80"> Skills </CardTitle>
        <Button
          size="icon"
          className="flex-none bg-second text-gray-500 hover:bg-second-dark rounded h-6 w-6 -mt-1"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 items-center">
          {[
            "HTML",
            "HTML 5",
            "CSS",
            "JavaScript",
            "React",
            "Nextjs",
            "Vue JS",
            "Nuxt JS",
            "PHP",
            "Tailwind",
          ].map((item, index) => (
            <Badge
              key={`skill-${index}`}
              className="text-xs font-medium text-gray-600 bg-second"
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;