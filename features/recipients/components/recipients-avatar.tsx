import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecipientAvatarProps {
  firstName?: string;
  lastName?: string;
  className?: string;
  fallbackClassName?: string;
}

export const RecipientAvatar = ({
  firstName,
  lastName,
  className,
  fallbackClassName,
}: RecipientAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "size-5 transition bg-teal-600 hover:opacity-75 rounded-full",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-teal-600 hover:opacity-75 transition font-medium text-white items-center justify-center",
          fallbackClassName
        )}
      >
        {firstName?.charAt(0).toUpperCase()}
        {lastName?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
