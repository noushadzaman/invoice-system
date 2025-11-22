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
import { db } from "@/db";
import { Invoices } from "@/db/schema";

export default async function Home() {
  const results = await db.select().from(Invoices);

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
          {results.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className="font-medium text-left p-0">
                  <Link href={`/invoices/${result.id}`} className="p-4 block">
                    {new Date(result.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link className="p-4 block" href={`/invoices/${result.id}`}>
                    {result.name}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link className="p-4 block" href={`/invoices/${result.id}`}>
                    {result.email}
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link className="p-4 block" href={`/invoices/${result.id}`}>
                    <Badge>{result.status}</Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link className="p-4 block" href={`/invoices/${result.id}`}>
                    ${(result.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
