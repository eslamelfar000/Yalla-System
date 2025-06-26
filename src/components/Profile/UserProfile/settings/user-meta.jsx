"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { profileUser } from "../../../Chat/chat/data";

const UserMeta = ({ user_data, setPublicPreviewImage }) => {
  const defaultImage = user_data?.image || profileUser?.avatar;
  const [previewImage, setPreviewImage] = useState(defaultImage);

  const handleImageChange = (e) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setPreviewImage(imageURL);
      setPublicPreviewImage({
        image: imageURL,
        file: imageFile,
      }); // Update the public preview image
    }
  };

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-[124px] h-[124px] relative rounded-full">
          <img
            src={previewImage || defaultImage}
            alt="User avatar"
            className="w-full h-full object-cover rounded-full"
          />
          <Button
            asChild
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0 bg-main"
          >
            <Label htmlFor="avatar">
              <Icon
                className="w-5 h-5 text-primary-foreground"
                icon="heroicons:pencil-square"
              />
            </Label>
          </Button>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="mt-4 text-xl font-semibold text-default-900">
          {user_data?.name || profileUser?.fullName}
        </div>
        <div className="mt-1.5 text-sm font-medium text-default-500">
          @{user_data?.role || profileUser?.bio}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMeta;
