import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type RespoonseType = InferResponseType<
  (typeof client.api.recipients)[":recipientId"]["$delete"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.recipients)[":recipientid"]["$delete"]
>;
