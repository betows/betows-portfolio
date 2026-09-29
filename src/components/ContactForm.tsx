"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";

const fieldClass =
  "border-[3px] border-[#0f380f] bg-[#8bac0f] px-2 py-1.5 text-lg text-[#0f380f] outline-none placeholder:text-[#306230]";

export function ContactForm({ copy }: { copy: Dictionary["contact"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `${name || "Project"} — ${site.name}`;
    const body = [name && `Name: ${name}`, email && `Email: ${email}`, "", message]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2 font-[family-name:var(--font-lcd)] text-lg">
      <label className="grid gap-1">
        {copy.name}
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={copy.namePh}
          autoComplete="name"
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1">
        {copy.emailLabel}
        <input
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.emailPh}
          autoComplete="email"
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1">
        {copy.message}
        <textarea
          name="message"
          required
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePh}
          className={`${fieldClass} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="pixel-press border-[3px] border-[#0f380f] bg-[#0f380f] px-3 py-1.5 font-[family-name:var(--font-pixel)] text-sm text-[#9bbc0f] shadow-[3px_3px_0_#0f380f]"
      >
        {copy.submit}
      </button>
      <p className="text-base leading-5 text-[#306230]">{copy.hint}</p>
    </form>
  );
}
