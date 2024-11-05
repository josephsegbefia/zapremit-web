import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createStaffSchema, staffLoginSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { DATABASE_ID, STAFF_ID, STAFF_IMAGES_BUCKET_ID } from "@/config";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { deleteCookie, setCookie } from "hono/cookie";

const app = new Hono()
  .post(
    "/create-staff",
    zValidator("form", createStaffSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      const { name, email, roleId, createdBy, image, password } =
        c.req.valid("form");

      const { account } = await createAdminClient();

      // TODO => later create a functionality to create temporary passwords and send it to new staff by email
      const tempPassword = "123456789";

      const newStaffUserAccount = account.create(
        ID.unique(),
        email,
        password,
        name
      );

      let uploadedStaffImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          STAFF_IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          STAFF_IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedStaffImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }
      const newStaff = await databases.createDocument(
        DATABASE_ID,
        STAFF_ID,
        ID.unique(),
        {
          name,
          email,
          roleId,
          createdBy: user.$id,
          imageUrl: uploadedStaffImageUrl,
        }
      );

      return c.json({ staffAccount: newStaffUserAccount, staff: newStaff });
    }
  )
  .post("/staff-login", zValidator("json", staffLoginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
    });

    return c.json({ success: true });
  })
  .post("/staff-logout", sessionMiddleware, async (c) => {
    const account = c.get("account");
    deleteCookie(c, AUTH_COOKIE);

    await account.deleteSession("current");

    return c.json({ success: true });
  });
