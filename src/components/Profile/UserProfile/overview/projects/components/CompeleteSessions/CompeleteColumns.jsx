"use client";

// import { Badge } from "@/components/ui/badge";
// import { DataTableRowActions } from "./data-table-row-actions";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const colors = {
  completed: "success",
  review: "warning",
  "in progress": "info",
  cancelled: "destructive",
}
export const CompeleteColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 max-w-[240px] truncate  ">
          <img
            src={row.original.projectImage}
            alt={row.getValue("title")}
            height={32}
            width={32}
            className="rounded"
          />
          <span className="text-sm font-medium text-default-900 whitespace-nowrap">
            {" "}
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         <Badge
  //           color={colors[row.getValue("status")] || ""}
  //           variant="outline"
  //           className="capitalize whitespace-nowrap"
  //         >
  //           {row.getValue("status")}
  //         </Badge>
  //       </div>
  //     );
  //   },
  // },

  {
    accessorKey: "assign",
    header: "Teacher",
    cell: ({ row }) => {
      return (
        <>
          <AvatarGroup
            max={1}
            total={row?.original?.assign?.length}
            countClass="w-7 h-7"
            className="flex justify-center"
          >
            {row?.original?.assign?.map((item, i) => (
              <div key={`assined-team-member-${i}`}>
                {typeof item === "object" ? (
                  <TooltipProvider>
                    <Tooltip>
                      <div className="cover flex items-center justify-center gap-3">
                        <Avatar className=" ring-1 ring-background ring-offset-[2px]  ring-offset-background h-9 w-9">
                          <AvatarImage src={item?.image} />
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <div className="cover">
                          <span className="text-md font-medium whitespace-nowrap">
                            {item?.label}
                          </span>
                        </div>
                      </div>
                      {/* <TooltipContent className="bg-main border-main">
                        <p>{item?.label}</p>
                      </TooltipContent> */}
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div>{item}</div>
                )}
              </div>
            ))}
          </AvatarGroup>
        </>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => {
      return (
        <div className="min-w-[190px] text-left">
          <p>
            Wednesday, 11th November | 13:00 PM
          </p>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
