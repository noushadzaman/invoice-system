import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction } from "@/app/actions";
import { ChevronDown } from "lucide-react";

export default async function Home({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { userId } = await auth();
  const { invoiceId: invoiceIdString } = await params;
  const invoiceId = parseInt(invoiceIdString);

  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    throw new Error("Invalid invoice ID");
  }

  if (!userId) return;

  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full justify-center h-full text-center">
      <Container>
        <div className="flex justify-between my-12">
          <h1 className="text-3xl font-semibold">Invoices {invoiceId}</h1>
          <p></p>
        </div>
        <p>{new Date(result.createTs).toLocaleDateString()}</p>
        <p>{result.name}</p>
        <p>{result.email}</p>
        <p>
          <Badge
            className={cn(
              "rounded-full capitalize",
              result.status === "open" && "bg-blue-500",
              result.status === "paid" && "bg-green-600",
              result.status === "void" && "bg-zinc-700",
              result.status === "uncollectible" && "bg-red-600"
            )}
          >
            {result.status}
          </Badge>
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2" variant={"outline"}>
              Change status
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {AVAILABLE_STATUSES.map((status) => {
              return (
                <form action={updateStatusAction}>
                  <input type="hidden" name="id" value={invoiceId} />
                  <input type="hidden" name="status" value={status.id} />
                  <Button>
                    <DropdownMenuItem key={status.id}>
                      {status.label}
                    </DropdownMenuItem>
                  </Button>
                </form>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <p>${(result.value / 100).toFixed(2)}</p>
      </Container>
    </div>
  );
}
