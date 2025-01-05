import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createRecipientSchema, updateRecipientSchema } from "../schemas";
import { DATABASE_ID, RECIPIENTS_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { Recipient } from "../types";

const app = new Hono()
  .post(
    "/",
    zValidator("json", createRecipientSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const {
        customerId,
        name,
        email,
        street_address,
        city,
        callingCode,
        phone,
        country,
      } = c.req.valid("json");

      try {
        const foundExistingRecipient = await databases.listDocuments<Recipient>(
          DATABASE_ID,
          RECIPIENTS_ID,
          [Query.equal("phone", phone)]
        );

        if (foundExistingRecipient.documents[0]) {
          return c.json(
            {
              error: "A recipient with the same number already exists",
            },
            409
          );
        }

        const recipient = await databases.createDocument(
          DATABASE_ID,
          RECIPIENTS_ID,
          ID.unique(),
          {
            customerId,
            name,
            email,
            street_address,
            city,
            callingCode,
            phone,
            country,
            userId: user.$id,
          }
        );

        return c.json({ data: recipient });
      } catch (error) {
        console.error("Error creating recipient:", error);
        return c.json({ error: "Internal server error" }, 500);
      }
    }
  )
  .get(
    "/",
    sessionMiddleware,
    // zValidator("query", z.object({ customerId: z.string() })),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const userId = user.$id;

      if (!userId) {
        return c.json({ error: "Missing user Id" }, 400);
      }

      const recipients = await databases.listDocuments(
        DATABASE_ID,
        RECIPIENTS_ID,
        [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
      );

      return c.json({ data: recipients });
    }
  )
  .get("/:recipientId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const { recipientId } = c.req.param();

    try {
      // Use the getDocument method with $id directly
      const recipient = await databases.getDocument(
        DATABASE_ID,
        RECIPIENTS_ID,
        recipientId
      );

      return c.json({ data: recipient });
    } catch (error) {
      console.error("Error Fetching Recipient:", error);
      return c.json({ error: "Recipient not found or invalid ID" }, 404);
    }
  })
  .patch(
    "/:recipientId",
    sessionMiddleware,
    zValidator("json", updateRecipientSchema),
    async (c) => {
      const databases = c.get("databases");

      const { recipientId } = c.req.param();

      const { name, email, street_address, city, callingCode, phone, country } =
        c.req.valid("json");

      // const getRecipientToUpdate = await databases.getDocument<Recipient>(
      //   DATABASE_ID,
      //   RECIPIENTS_ID,
      //   recipientId
      // );
      const recipient = await databases.updateDocument(
        DATABASE_ID,
        RECIPIENTS_ID,
        recipientId,
        { name, email, street_address, city, callingCode, phone, country }
      );

      return c.json({ data: recipient });
    }
  )
  .delete("/:recipientId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    // const user = c.get("user");

    const { recipientId } = c.req.param();

    const existingRecipient = await databases.getDocument<Recipient>(
      DATABASE_ID,
      RECIPIENTS_ID,
      recipientId
    );

    if (!existingRecipient) {
      return c.json({ error: "Recipient not found" }, 404);
    }

    await databases.deleteDocument(DATABASE_ID, RECIPIENTS_ID, recipientId);
    return c.json({ data: { $id: existingRecipient.$id } });
  });

export default app;
