// components/about/ContactForm.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

/** Doc 12.4 — formulaire de contact, même pattern d'envoi simulé que la Boîte à suggestions */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  if (sent) {
    return (
      <Card className="p-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">
          Message envoyé, on te répond rapidement.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-3 text-sm font-medium text-secondary hover:text-secondary/80"
        >
          Envoyer un autre message
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          required
          placeholder="Ton nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <input
          type="email"
          required
          placeholder="Ton adresse e-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <textarea
          required
          rows={4}
          placeholder="Ton message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {sending ? "Envoi en cours…" : "Envoyer"}
        </button>
      </form>
    </Card>
  );
}