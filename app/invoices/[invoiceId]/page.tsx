import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId: invoiceIdString } = await params;
  const invoiceId = parseInt(invoiceIdString);

  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    throw new Error("Invalid invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center h-full text-center mx-auto max-w-5xl">
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
      <p>${(result.value / 100).toFixed(2)}</p>
    </div>
  );
}
