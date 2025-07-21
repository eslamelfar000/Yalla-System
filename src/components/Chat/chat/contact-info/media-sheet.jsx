"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getChatMedia } from "../chat-config";
import MediaSkeleton from "./media-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";

const MediaSheet = ({ showDrawer, handleDrawer, chatId = 1 }) => {
  const [mediaData, setMediaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediaData = async () => {
      if (!showDrawer) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getChatMedia(chatId);
        setMediaData(response.data);
      } catch (err) {
        console.error("Error fetching media data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaData();
  }, [showDrawer, chatId]);

  // Helper function to format file size
  const formatFileSize = (size) => {
    if (!size) return "Unknown size";

    const sizeNum = parseInt(size);
    if (isNaN(sizeNum)) return size;

    if (sizeNum < 1024) return `${sizeNum} B`;
    if (sizeNum < 1024 * 1024) return `${(sizeNum / 1024).toFixed(1)} KB`;
    if (sizeNum < 1024 * 1024 * 1024)
      return `${(sizeNum / (1024 * 1024)).toFixed(1)} MB`;
    return `${(sizeNum / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Helper function to get file icon based on extension
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return "mdi:file-pdf-box";
      case "doc":
      case "docx":
        return "mdi:file-word-box";
      case "xls":
      case "xlsx":
        return "mdi:file-excel-box";
      case "ppt":
      case "pptx":
        return "mdi:file-powerpoint-box";
      case "txt":
        return "mdi:file-text-edit-outline";
      case "zip":
      case "rar":
        return "mdi:folder-zip";
      default:
        return "mdi:file";
    }
  };

  return (
    <Card className="absolute top-0 right-0 w-full h-full z-10 bg-card">
      <CardHeader className="mb-0">
        <div className="flex gap-2.5 items-center">
          <Button
            type="button"
            size="icon"
            className="rounded-full bg-transparent hover:bg-second text-main"
            onClick={() => handleDrawer(null)}
          >
            <Icon icon="mynaui:arrow-left" className="text-main size-5" />
          </Button>
          <span className="text-base font-medium text-default-900">
            {" "}
            Media, Files and Links
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-5 h-full">
        <Tabs
          defaultValue={showDrawer ? showDrawer : "media"}
          className="h-full"
        >
          <TabsList className="flex flex-wrap gap-2 bg-second">
            <TabsTrigger value="media" className="flex-1 ">
              Media
            </TabsTrigger>
            <TabsTrigger value="files" className="flex-1">
              Files
            </TabsTrigger>
            <TabsTrigger value="links" className="flex-1">
              Links
            </TabsTrigger>
          </TabsList>
          <div className="h-[calc(100%-91px)] ">
            <ScrollArea className="h-full">
              <TabsContent value="media">
                {isLoading ? (
                  <MediaSkeleton />
                ) : error ? (
                  <div className="flex items-center justify-center h-32 text-default-500">
                    <Icon icon="mdi:alert-circle" className="w-6 h-6 mr-2" />
                    {error}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-8">
                    {mediaData?.images?.map((image) => (
                      <Link
                        key={image.id}
                        href={image.link}
                        target="_blank"
                        download
                        className="block"
                      >
                        <img
                          src={image.link}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='12'%3EImage%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="files">
                {isLoading ? (
                  <div className="space-y-4 mt-5">
                    {[1, 2, 3].map((i) => (
                      <Skeleton
                        key={i}
                        className="h-16 w-full bg-gray-300 rounded-md"
                      />
                    ))}
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-32 text-default-500">
                    <Icon icon="mdi:alert-circle" className="w-6 h-6 mr-2" />
                    {error}
                  </div>
                ) : (
                  <div className="mt-5">
                    {mediaData?.files?.map((file) => (
                      <a
                        key={file.id}
                        href={file.link}
                        target="_blank"
                        download
                        className="flex items-center justify-between gap-2 border-b border-default-200 group py-2 last:border-none hover:bg-second p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-16 w-16 rounded-sm bg-second flex justify-center items-center">
                            <Icon
                              icon={getFileIcon(file.name)}
                              className="text-6xl text-default-700 bg-second rounded-md p-3"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-default-500 group-hover:text-default-800">
                              {file.name}
                            </div>
                            <p className="text-sm text-default-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-main  cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.link, "_blank");
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </a>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="links">
                {isLoading ? (
                  <div className="space-y-4 mt-8">
                    {[1, 2, 3].map((i) => (
                      <Skeleton
                        key={i}
                        className="h-16 w-full bg-gray-300 rounded-md"
                      />
                    ))}
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-32 text-default-500">
                    <Icon icon="mdi:alert-circle" className="w-6 h-6 mr-2" />
                    {error}
                  </div>
                ) : (
                  <div className="mt-5 space-y-2">
                    {mediaData?.links?.map((link, index) => (
                      <a
                        key={index}
                        target="_blank"
                        href={link}
                        className="flex items-center justify-between gap-2 border-b border-default-200 group py-2 last:border-none hover:bg-second p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-16 w-16 rounded-sm bg-default-50 flex justify-center items-center">
                            <Icon
                              icon="bx:link"
                              className="text-3xl text-default-700"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-default-500 group-hover:text-default-800">
                              {new URL(link).hostname}
                            </div>
                            <p className="text-sm text-default-500 truncate max-w-[200px]">
                              {link}
                            </p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-main  cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(link, "_blank");
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </a>
                    ))}
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MediaSheet;
