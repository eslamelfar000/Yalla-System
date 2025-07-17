"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import MuteNotification from "./mute-notification";
import EditNickname from "./edit-nickname";
import ChangeTheme from "./change-theme";
import BlockUser from "./block-user";
import MediaSheet from "./media-sheet";
import { AlertTriangle, FolderClosed, Image } from "lucide-react";

const ContactInfo = ({ handleSetIsOpenSearch, handleShowInfo, contact }) => {
  const [showDrawer, setShowDrawer] = useState(null);
  const handleDrawer = (itemKey) => {
    setShowDrawer(itemKey);
  };

  // Safety check for contact data
  const safeContact = contact || {};
  const contactName =
    safeContact.fullName || safeContact.name || "Unknown User";
  const contactAvatar = safeContact.avatar || safeContact.image;
  const contactAbout =
    safeContact.about || safeContact.bio || "No status available";

  return (
    <div className="w-[300px] absolute xl:relative  right-0 h-full z-50 ">
      {showDrawer !== null && (
        <MediaSheet showDrawer={showDrawer} handleDrawer={handleDrawer} />
      )}

      <Card className="h-full overflow-hidden !space-y-0 !mb-0 !pb-0">
        <CardHeader>
          <div className="absolute xl:hidden">
            <Button
              size="icon"
              className="rounded-full bg-default-100 text-default-500 hover:bg-default-200"
              onClick={handleShowInfo}
            >
              <Icon icon="formkit:arrowright" className="text-lg" />
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="w-16 h-16 lg:h-24 lg:w-24">
              <AvatarImage src={contactAvatar} alt="" />
              <AvatarFallback>
                {contactName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="mt-3 text-lg lg:text-xl font-semibold text-default-900">
              {contactName}
            </div>
            <span className="text-sm text-default-600 capitalize  text-center line-clamp-2">
              {contactAbout}
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-0 border-0 h-[calc(100%-260px)] overflow-hidden ">
          <ScrollArea className="h-full">
            <Accordion type="single" collapsible className="w-full  space-y-0 ">
              <AccordionItem
                value="item-2"
                className="shadow-none dark:shadow-none dark:bg-card/90 px-4"
              >
                <AccordionTrigger>Shared Files</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <Button
                      type="button"
                      className="w-full justify-start gap-3 bg-transparent hover:bg-second px-1.5 group mb-2"
                      onClick={() => handleDrawer("media")}
                    >
                      <Image className="w-8 h-8 text-main bg-second rounded-full p-2 flex justify-center items-center" />
                      <span className="text-xs text-main">Media</span>
                    </Button>
                    <Button
                      type="button"
                      className="w-full justify-start gap-3 bg-transparent hover:bg-second group px-1.5 mb-2"
                      onClick={() => handleDrawer("files")}
                    >
                      <FolderClosed className="w-8 h-8 text-main bg-second rounded-full p-2 flex justify-center items-center" />
                      <span className="text-xs text-main">File</span>
                    </Button>
                    <Button
                      type="button"
                      className="w-full justify-start gap-3  bg-transparent hover:bg-second group px-1"
                      onClick={() => handleDrawer("links")}
                    >
                      <Icon
                        icon="heroicons:link"
                        className="w-8 h-8 text-main bg-second rounded-full p-2 flex justify-center items-center"
                      />
                      <span className="text-xs text-main">Links</span>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
