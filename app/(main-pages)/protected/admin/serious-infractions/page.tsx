"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ConductHistory() {
  const [inPending, setInPending] = useState(true);
  return (
    <div>
      <div className="flex">
        <Button
          onClick={() => {
            setInPending(true);
          }}
        >
          Pending
        </Button>
        <Button
          onClick={() => {
            setInPending(false);
          }}
        >
          Reviewed
        </Button>
      </div>
      <div>
        {inPending && <div>This is pending page.</div>}
        {!inPending && <div>This is reviewed page.</div>}
      </div>
    </div>
  );
}
