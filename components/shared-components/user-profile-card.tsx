import { Models } from "node-appwrite";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { RecipientAvatar } from "@/features/recipients/components/recipients-avatar";
import { formatDate } from "@/lib/utils";
import { DottedSeparator } from "./dotted-separator";
import { Separator } from "../ui/separator";
import { UserProfileCountrySwitcher } from "./user-profile-country-switcher";

interface UserProfileCardProps {
  user: Models.User<Models.Preferences>;
}
export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const splitName = user.name.split(/\s+/);
  const firstName = splitName[0];
  const lastName = splitName[1];
  return (
    <Card className="w-2/4 h-full border-none shadow-none">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex font-work-sans font-bold text-teal-600 items-center">
          <RecipientAvatar
            className="size-10 mr-5"
            fallbackClassName="font-work-sans text-lg"
            firstName={firstName}
            lastName={lastName}
          />
          <p> Hey, {user.name}!</p>
        </CardTitle>
        <p className="text-muted-foreground text-sm font-work-sans">
          Member since - {formatDate(user.$createdAt)}
        </p>
        <DottedSeparator className="mt-3 mb-5" />
        <div className="flex flex-row justify-around">
          <div className="bg-teal-50 px-5 py-2 rounded-lg">
            <p className="text-muted-foreground font-work-sans text-sm font-bold">
              Points
            </p>
            <p className="text-teal-600 font-work-sans text-lg font-bold text-center">
              0
            </p>
          </div>

          <div className="bg-teal-50 px-5 py-2 rounded-lg">
            <p className="text-muted-foreground font-work-sans text-sm font-bold">
              Balance
            </p>
            <p className="text-teal-600 font-work-sans text-lg font-bold text-center">
              0
            </p>
          </div>

          <div className="bg-teal-50 px-5 py-2 rounded-lg">
            <p className="text-muted-foreground font-work-sans text-sm font-bold text-center">
              Sending to
            </p>
            <UserProfileCountrySwitcher />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
