import { ColumnDef } from "@tanstack/react-table";
import { Recipient } from "../types";

export const columns: ColumnDef<Recipient, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: (info) => info.getValue(),
  },
];
