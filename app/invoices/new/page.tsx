"use client";

import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, SyntheticEvent, useState } from "react";
import Form from "next/form";

export default function Home() {
  const [state, setState] = useState("ready");

  const handleonSubmit = async (e: SyntheticEvent) => {
    if (state === "pending") {
      e.preventDefault();
      return;
    }
    setState("pending");
    // e.preventDefault();
    // if (state === "pending") {
    //   return;
    // }
    // setState("pending");
    // const target = e.target as HTMLFormElement;

    // startTransition(async () => {
    //   const formData = new FormData(target);
    //   await createAction(formData);
    // });
  };

  return (
    <div className="flex flex-col justify-center h-full  mx-auto max-w-5xl">
      <div className="flex justify-between my-12">
        <h1 className="text-3xl font-semibold">Create invoice</h1>
      </div>
      <Form
        action={createAction}
        onSubmit={handleonSubmit}
        className="grid gap-4"
      >
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
          <SubmitButton />
        </div>
      </Form>
    </div>
  );
}
