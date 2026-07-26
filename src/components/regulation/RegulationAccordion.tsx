// components/regulation/RegulationAccordion.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { RegulationSection } from "@/lib/regulation-mock-data";

interface RegulationAccordionProps {
  sections: RegulationSection[];
  /** Ouvre toutes les sections par défaut (doc 9.4 — recommandé sur desktop) */
  defaultOpenOnDesktop?: boolean;
}

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: RegulationSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="font-heading text-base font-semibold uppercase tracking-wide text-foreground sm:text-lg">
          {section.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
              {section.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

/** Doc 9.1 + 9.4 — accordéon, sections ouvertes par défaut sur desktop (plus d'espace) */
export function RegulationAccordion({
  sections,
  defaultOpenOnDesktop = true,
}: RegulationAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpenOnDesktop ? new Set(sections.map((s) => s.id)) : new Set(),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          section={section}
          isOpen={openIds.has(section.id)}
          onToggle={() => toggle(section.id)}
        />
      ))}
    </div>
  );
}