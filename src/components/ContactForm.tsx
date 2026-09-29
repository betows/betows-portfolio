"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";

const fieldClass =
  "rounded-lg border border-[#1d4e7a] bg-[#061018] px-3 py-2 text-sm text-[#e7f4ff] outline-none placeholder:text-[#6f93b3] focus:border-[#7fd3ff]";

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
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="grid gap-1 text-xs font-medium uppercase tracking-wide text-[#8eb4d4]">
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
      <label className="grid gap-1 text-xs font-medium uppercase tracking-wide text-[#8eb4d4]">
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
      <label className="grid gap-1 text-xs font-medium uppercase tracking-wide text-[#8eb4d4]">
        {copy.message}
        <textarea
          name="message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePh}
          className={`${fieldClass} resize-y`}
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-[#ffd15c] px-4 py-2 text-sm font-semibold text-[#2a1408]"
      >
        {copy.submit}
      </button>
      <p className="text-xs leading-5 text-[#8eb4d4]">{copy.hint}</p>
    </form>
  );
}
