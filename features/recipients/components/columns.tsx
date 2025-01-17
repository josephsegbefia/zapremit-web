"use client";

import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
// import { RecipientAvatar } from "./recipients-avatar";
// import { Badge } from "@/components/ui/badge";
import { Recipient } from "../types";
import { formatDate } from "@/lib/utils";
import { RecipientActions } from "./recipient-actions";

export const columns: ColumnDef<Recipient, unknown>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <p className="line-clamp-1 font-work-sans">{name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return <p>Email</p>;
    },
    cell: ({ row }) => {
      const email = row.original.email;

      return <p className="line-clamp-1 font-work-sans">{email}</p>;
    },
  },
  {
    accessorKey: "number",
    header: () => {
      return <p>Phone Number</p>;
    },
    cell: ({ row }) => {
      const callingCode = row.original.callingCode;
      const number = row.original.phone;
      return (
        <p className="line-clamp-1 font-work-sans">
          {callingCode}
          {number}
        </p>
      );
    },
  },
  {
    accessorKey: "country",
    header: () => {
      return <p>Country</p>;
    },
    cell: ({ row }) => {
      const country = row.original.country;

      return <p className="line-clamp-1 font-work-sans">{country}</p>;
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Added on
        </Button>
      );
    },
    cell: ({ row }) => {
      const addedon = row.original.$createdAt;
      const date = formatDate(addedon);
      return <p className="line-clamp-1 font-work-sans">{date}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;

      return (
        <RecipientActions id={id} recipientId={id}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </RecipientActions>
      );
    },
  },
];
