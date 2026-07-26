// components/suggestions/SuggestionForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

type SubmitState = "idle" | "sending" | "success" | "error";

const MAX_LENGTH = 500;

/** Doc section 13 — formulaire anonyme */
export function SuggestionForm() {
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || state === "sending") return;

    setState("sending");

    // Pas de backend branché pour l'instant : simulation d'un envoi réseau.
    // À remplacer par le vrai appel API quand il sera prêt.
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setState("success");
      setMessage("");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <Card className="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <CheckCircle2 size={26} />
        </motion.div>
        <p className="font-heading text-lg font-semibold text-foreground">
          Message envoyé, merci. On l&rsquo;a bien reçu.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-medium text-secondary hover:text-secondary/80"
        >
          Envoyer un autre message
        </button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-start gap-2 rounded-xl bg-primary/5 px-3 py-2.5 text-sm text-primary">
        <Lock size={16} className="mt-0.5 shrink-0" />
        <span>
          Ce formulaire est 100% anonyme — aucune donnée personnelle n&rsquo;est
          transmise.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Écris ton message ici…"
          rows={5}
          disabled={state === "sending"}
          className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
        <span className="self-end text-xs text-muted-foreground">
          {message.length} / {MAX_LENGTH}
        </span>

        <AnimatePresence>
          {state === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
            >
              <AlertCircle size={16} className="shrink-0" />
              L&rsquo;envoi a échoué. Réessaie dans un instant.
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={!message.trim() || state === "sending"}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "sending" ? (
            "Envoi en cours…"
          ) : (
            <>
              <Send size={15} />
              Envoyer anonymement
            </>
          )}
        </button>
      </form>
    </Card>
  );
}