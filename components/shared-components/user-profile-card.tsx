import { Models } from "node-appwrite";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { RecipientAvatar } from "@/features/recipients/components/recipients-avatar";
import { formatDate } from "@/lib/utils";
import { DottedSeparator } from "./dotted-separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";

interface UserProfileCardProps {
  user: Models.User<Models.Preferences>;
}
export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const splitName = user.name.split(/\s+/);
  const firstName = splitName[0];
  const lastName = splitName[1];
  return (
    <Card className="lg:w-1/2 sm:h-[200px] md:h-[300px] lg:h-[200px] border-none shadow-none w-full">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify justify-between font-work-sans font-bold text-teal-600 items-center">
          <div className="flex items-center">
            <RecipientAvatar
              className="size-10 mr-5"
              fallbackClassName="font-work-sans text-lg"
              firstName={firstName}
              lastName={lastName}
            />
            <p> Hey, {firstName}!</p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
          >
            {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
            <Link href="/">
              <User />
              View Profile
            </Link>
          </Button>
        </CardTitle>
        <p className="text-muted-foreground text-sm font-work-sans">
          Member since - {formatDate(user.$createdAt)}
        </p>
        <DottedSeparator className="mt-3 mb-5" />
      </CardHeader>
      <CardContent className="py-3">
        <div className="flex flex-row justify-evenly gap-2">
          <div className="bg-teal-50 px-10 py-2 rounded-lg">
            <p className="text-muted-foreground font-work-sans text-sm font-bold">
              Points
            </p>
            <p className="text-teal-600 font-work-sans text-lg font-bold text-center">
              0
            </p>
          </div>

          <div className="bg-teal-50 px-10 py-2 rounded-lg">
            <p className="text-muted-foreground font-work-sans text-sm font-bold">
              Balance
            </p>
            <p className="text-teal-600 font-work-sans text-lg font-bold text-center">
              0
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
