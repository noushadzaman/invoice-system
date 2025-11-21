import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-full text-center mx-auto max-w-5xl">
      <h1 className="text-5xl font-bold">Invoicipedia</h1>
      <p>
        <Button>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </div>
  );
}
