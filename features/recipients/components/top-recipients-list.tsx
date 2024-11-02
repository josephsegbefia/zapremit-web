"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MoreVerticalIcon, Send, Trash, Users } from "lucide-react";
import Link from "next/link";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { Fragment } from "react";
import { RecipientAvatar } from "@/features/recipients/components/recipients-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";

const recipients = [
  { firstName: "Kofi", lastName: "Agbeko" },
  { firstName: "Akofa", lastName: "Tamakloe" },
  { firstName: "Elorm", lastName: "Gbedemah" },
  { firstName: "Mawuli", lastName: "Kumordzi" },
  { firstName: "Sena", lastName: "Amedorme" },
];

export const TopRecipientsList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove Recipient",
    "This recipient will be removed from",
    "destructive"
  );

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify-between font-work-sans font-bold text-teal-600">
          Top Recipients
          <Button
            asChild
            size="sm"
            className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
          >
            {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
            <Link href="/">
              <Users />
              View All Recipients
            </Link>
          </Button>
        </CardTitle>
        <DottedSeparator />
      </CardHeader>

      <CardContent className="px-7 py-3">
        {recipients.map((recipient, index) => (
          <Fragment key={index}>
            <div className="flex items-center gap-2">
              <RecipientAvatar
                className="size-10"
                fallbackClassName="font-work-sans text-lg"
                firstName={recipient.firstName}
                lastName={recipient.lastName}
              />
              <div className="flex flex-col">
                <p className="text-lg font-work-sans font-medium text-teal-600">
                  {recipient.firstName} {recipient.lastName}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="ml-auto bg-white border-none outline-none hover:bg-teal-50"
                    size="icon"
                  >
                    <MoreVerticalIcon className="size-4 text-teal-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" align="start">
                  <DropdownMenuItem
                    className="font-medium text-teal-600 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => {}}
                  >
                    <Send />
                    Send Money
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-teal-600 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => {}}
                  >
                    <Eye />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-red-600 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => {}}
                  >
                    <Trash />
                    Remove Recipient
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < recipients.length - 1 && <Separator className="my-2.5" />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
