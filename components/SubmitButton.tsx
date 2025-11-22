"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full font-semibold">
      <span className={pending ? "text-transparent" : ""}>Submit</span>
      {pending && (
        <div className="flex items-center justify-center w-full h-full absolute">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
    </Button>
  );
};

export default SubmitButton;
