"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { MailIcon, MailMinus, Webcam, WebhookIcon } from 'lucide-react';
import { BiMailSend } from 'react-icons/bi';
import { RiUserSettingsFill } from 'react-icons/ri';

const AboutSecton = () => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center mb-3 border-none">
        <CardTitle className="text-lg font-medium text-default-800">
          About
        </CardTitle>
        <Button
          size="icon"
          className="w-6 h-6 bg-default-100 dark:bg-default-50 text-default-500 hover:bg-default-100"
        >
          <Icon icon="heroicons:ellipsis-vertical" className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-md text-gray-500 mb-7">
          Hi I'm Jennyfer Frankin, It will be as simple as Occidental; in fact,
          it will be Occidental. To an English person, it will seem like
          simplified English, as a skeptical Cambridge friend of mine told me
          what Occidental is European languages are members of the same family.
        </div>
        <div className="text-md text-gray-500">
          You always want to make sure that your fonts work well together and
          try to limit the number of fonts you use to three or less. Experiment
          and play around with the fonts that you already have in the software
          you’re working with reputable font websites. This may be the most
          commonly encountered tip I received from the designers I spoke with.
          They highly encourage that you use different fonts in one design, but
          do not over-exaggerate and go overboard.
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-6 2xl:gap-16">
          {[
            {
              title: "Designation",
              position: "Lead UX/UI Designer",
              icon: <RiUserSettingsFill className="w-6 h-6 text-main" />,
            },
            {
              title: "Designation",
              position: "Lead UX/UI Designer",
              icon: <WebhookIcon className="w-6 h-6 text-main" />,
            },
            {
              title: "Mail",
              position: "jennyfer.frankin@gmail.com",
              icon: <BiMailSend className="w-6 h-6 text-main" />,
            },
          ].map((item, index) => (
            <div key={`about-${index}`} className="flex items-center gap-2">
              <div className="bg-second text-primary h-10 w-10 grid place-content-center rounded">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-default-800 ">
                  {item.title}
                </div>
                <div className="text-xs font-medium text-gray-600">
                  {item.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSecton;