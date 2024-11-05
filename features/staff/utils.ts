import { Query, type Databases } from "node-appwrite";
import { STAFF_ID, DATABASE_ID } from "@/config";

interface IsUserAStaffProps {
  databases: Databases;
  userId: string;
}

export const isUserAStaff = async ({
  userId,
  databases,
}: IsUserAStaffProps) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, STAFF_ID, [
      Query.equal("userId", userId),
    ]);

    // If there is at least one document, the user is a staff member
    const isStaff = response.total > 0;
    return isStaff;
  } catch (error) {
    console.error("Error checking if user is staff:", error);
    return false;
  }
};
