import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const ChatDemo = () => {
  const [demoMessages, setDemoMessages] = useState([
    {
      id: 1,
      message: "Hey! Check out this cool website: https://example.com",
      user: { id: 1, name: "John Doe", avatar: null },
      time: new Date().toISOString(),
      files: [],
    },
    {
      id: 2,
      message: "Here's a document I wanted to share",
      user: { id: 2, name: "Jane Smith", avatar: null },
      time: new Date().toISOString(),
      acttachmets: [
        {
          id: 7,
          type: "file",
          name: "4.pdf",
          size: "679396",
          link: "https://indigo-ferret-819035.hostingersite.com/storage/files/pdf/4235417529309104.pdf",
        },
      ],
    },
    {
      id: 3,
      message: "Look at this image!",
      user: { id: 1, name: "John Doe", avatar: null },
      time: new Date().toISOString(),
      acttachmets: [
        {
          id: 8,
          type: "image",
          name: "photo.jpg",
          size: "2048000",
          link: "https://picsum.photos/400/300",
        },
      ],
    },
    {
      id: 4,
      message: "Here's a photo from my trip!",
      user: { id: 1, name: "John Doe", avatar: null },
      time: new Date().toISOString(),
      acttachmets: [
        {
          id: 9,
          type: "image",
          name: "photo1.jpg",
          size: "1024000",
          link: "https://picsum.photos/400/300?random=1",
        },
      ],
    },
  ]);

  const addDemoMessage = (message, attachments = []) => {
    const newMessage = {
      id: Date.now(),
      message,
      user: { id: 1, name: "You", avatar: null },
      time: new Date().toISOString(),
      acttachmets: attachments,
    };
    setDemoMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon="tabler:message-circle" className="text-2xl text-main" />
            Enhanced Chat Demo
          </CardTitle>
          <div className="text-sm text-gray-600">
            This demo shows the enhanced chat functionality with link detection
            and file uploads.
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                    Link detection and rendering
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                    File upload support
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                    Image preview and display
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                    Video and audio support
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                    Document attachments
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Demo Actions:</h3>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      addDemoMessage("Check out this link: https://reactjs.org")
                    }
                    className="w-full"
                  >
                    Add Message with Link
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addDemoMessage("Here's an image:", [
                        {
                          id: Date.now(),
                          name: "demo-image.jpg",
                          size: 1500000,
                          url: "https://picsum.photos/300/200",
                          type: "image/jpeg",
                        },
                      ])
                    }
                    className="w-full"
                  >
                    Add Message with Image
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addDemoMessage("Document attached:", [
                        {
                          id: Date.now(),
                          type: "file",
                          name: "report.pdf",
                          size: "2500000",
                          link: "#",
                        },
                      ])
                    }
                    className="w-full"
                  >
                    Add Message with Document
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addDemoMessage("Single Image", [
                        {
                          id: Date.now() + 1,
                          type: "image",
                          name: "photo1.jpg",
                          size: "1024000",
                          link: "https://picsum.photos/400/300?random=4",
                        },
                      ])
                    }
                    className="w-full"
                  >
                    Add Message with Single Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Chat Messages:</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {demoMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-main text-white flex items-center justify-center text-xs font-semibold">
                      {msg.user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {msg.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.time).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        {msg.message && (
                          <div className="mb-2">
                            {msg.message.includes("http") ? (
                              <div>
                                {msg.message
                                  .split(/(https?:\/\/[^\s]+)/)
                                  .map((part, index) =>
                                    part.match(/^https?:\/\/[^\s]+$/) ? (
                                      <a
                                        key={index}
                                        href={part}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline"
                                      >
                                        {part}
                                      </a>
                                    ) : (
                                      part
                                    )
                                  )}
                              </div>
                            ) : (
                              msg.message
                            )}
                          </div>
                        )}

                        {msg.acttachmets && msg.acttachmets.length > 0 && (
                          <div className="space-y-2">
                            {msg.acttachmets.map((file, index) => (
                              <div
                                key={index}
                                className="border rounded p-2 bg-gray-50"
                              >
                                <div className="flex items-center gap-2">
                                  <Icon
                                    icon={
                                      file.type === "image"
                                        ? "tabler:photo"
                                        : file.type === "video"
                                        ? "tabler:video"
                                        : file.type === "audio"
                                        ? "tabler:music"
                                        : "tabler:file"
                                    }
                                    className="text-lg text-gray-500"
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {file.size} bytes
                                    </p>
                                  </div>
                                </div>
                                {file.type === "image" && file.link && (
                                  <img
                                    src={file.link}
                                    alt={file.name}
                                    className="mt-2 max-w-full max-h-32 object-cover rounded"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatDemo;
