import { Card, CardContent } from "@/components/ui/card";
import CommingSoonImage from "/images/all-img/comming-soon.png"
const CommingSoon = () => {
  return (
    <Card className="rounded-t-none">
      <CardContent className="min-h-[545px] flex flex-col justify-center items-center">
        <img src={CommingSoonImage} alt="comming soon" />
        <div className="mt-10 text-3xl lg:text-5xl font-medium text-default-700">Coming Soon!</div>
      </CardContent>
    </Card>
  );
};

export default CommingSoon;