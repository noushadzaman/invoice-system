import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-full text-center mx-auto max-w-5xl">
      <div className="flex justify-between my-12">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p>
          <Button className="" variant="ghost" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" />
              Create invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left p-4">
              <span>INV001</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span>Paid</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span> Paid</span>
            </TableCell>
            <TableCell className="text-center p-4">
              <Badge>
                <span>Open</span>
              </Badge>
            </TableCell>
            <TableCell className="text-right p-4">
              <span>$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
