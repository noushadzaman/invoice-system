import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export default async function Home() {
  const result = await db.execute(sql`SELECT current_database()`);
  return (
    <div className="flex flex-col justify-center h-full  mx-auto max-w-5xl">
      <div className="flex justify-between my-12">
        <h1 className="text-3xl font-semibold">Create invoice</h1>
      </div>
      {JSON.stringify(result)}

      <form className="grid gap-4">
        <div>
          <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
            Billing Name
          </Label>
          <Input name="name" id="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
            Billing Email
          </Label>
          <Input name="email" id="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
            Value
          </Label>
          <Input name="value" id="value" type="text" />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block mb-2 font-semibold text-sm"
          >
            Description
          </Label>
          <Textarea name="description" id="description" />
        </div>
        <div>
          <Button className="w-full font-semibold">Submit</Button>
        </div>
      </form>
    </div>
  );
}
