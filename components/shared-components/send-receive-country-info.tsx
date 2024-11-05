import { Models } from "node-appwrite";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { RecipientAvatar } from "@/features/recipients/components/recipients-avatar";
import { formatDate } from "@/lib/utils";
import { DottedSeparator } from "./dotted-separator";
import { Separator } from "../ui/separator";
import { UserProfileCountrySwitcher } from "./user-profile-country-switcher";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";

interface SendReceiveCountryInfoProps {
  user: Models.User<Models.Preferences>;
}
export const SendReceiveCountryInfo = ({
  user,
}: SendReceiveCountryInfoProps) => {
  return (
    <Card className="lg:w-1/3 h-full border-none shadow-none w-full">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify justify-between font-work-sans font-bold text-teal-600 items-center">
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
      </CardHeader>
    </Card>
  );
};
