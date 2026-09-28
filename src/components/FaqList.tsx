"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

export function FaqList({ items }: { items: Dictionary["faq"]["items"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-[28px] border border-line bg-cream">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.q} className="px-5 sm:px-7">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold tracking-tight"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.q}
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-base"
                  aria-hidden="true"
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={`faq-answer ${isOpen ? "open" : ""}`}>
              <p className="overflow-hidden pb-5 text-[15px] leading-7 text-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
