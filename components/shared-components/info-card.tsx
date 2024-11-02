import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "./dotted-separator";
// import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { History, List, RepeatIcon, Send } from "lucide-react";

interface InfoCardProps {
  title: string;
  recipientName?: string;
  isTransferCard?: boolean;
  transferAmount?: string;
  transferDate?: Date;
}
const InfoCard = ({
  title,
  recipientName,
  isTransferCard,
  transferAmount,
}: // transferDate,
InfoCardProps) => {
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex px-7 py-3">
        <CardTitle className="text-xl flex justify-between font-work-sans font-bold text-teal-600">
          {title}
          {isTransferCard && (
            <div className="flex">
              <Button
                asChild
                size="sm"
                className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
              >
                {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
                <Link href="/">
                  <RepeatIcon />
                  Repeat Transfer
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
              >
                {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
                <Link href="/">
                  <History />
                  View All Transfers
                </Link>
              </Button>
            </div>
          )}
          {!isTransferCard && (
            <>
              <Button
                asChild
                size="sm"
                className="bg-teal-600 font-work-sans text-white hover:bg-white hover:text-teal-600 border hover:border-teal-600 cursor-pointer"
              >
                {/* TODO => CHANGE THE HREF TO POINT TO THE APPROPRIATE PAGE */}
                <Link href="/">
                  <Send />
                  Send Money Now
                </Link>
              </Button>
            </>
          )}
        </CardTitle>

        <DottedSeparator className="mt-4" />
      </CardHeader>
      <CardContent className="px-7 py-3">
        {isTransferCard && (
          <>
            <p className="font-bold font-work-sans text-muted-foreground">
              Recipient -{" "}
              <span className="font-semibold font-work-sans">
                {recipientName}
              </span>
            </p>
            <p className="font-bold font-work-sans text-muted-foreground">
              Amount Sent -{" "}
              <span className="font-semibold font-work-sans">
                {transferAmount}
              </span>
            </p>
            <p className="font-bold font-work-sans text-muted-foreground">
              Date -{" "}
              <span className="font-semibold font-work-sans">
                {/* {transferDate && formatDate(transferDate)} */}
              </span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
