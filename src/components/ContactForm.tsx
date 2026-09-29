"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";

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
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium">
        {copy.name}
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={copy.namePh}
          autoComplete="name"
          className="rounded-2xl border border-line bg-white px-4 py-3 text-base font-normal outline-none ring-lime focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {copy.emailLabel}
        <input
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.emailPh}
          autoComplete="email"
          className="rounded-2xl border border-line bg-white px-4 py-3 text-base font-normal outline-none ring-lime focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {copy.message}
        <textarea
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePh}
          className="resize-y rounded-2xl border border-line bg-white px-4 py-3 text-base font-normal outline-none ring-lime focus:ring-2"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-deep"
      >
        {copy.submit}
      </button>
      <p className="text-sm leading-6 text-muted">{copy.hint}</p>
    </form>
  );
}
