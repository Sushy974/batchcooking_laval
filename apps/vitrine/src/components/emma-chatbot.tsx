"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import {
  CHATBOT_QUESTIONS,
  CHATBOT_SALUTATION,
  type QuestionChatbot,
} from "@/lib/chatbot-fixtures";

interface Message {
  id: number;
  from: "emma" | "user";
  texte: string;
}

export function EmmaChatbot() {
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [enTrainDecrire, setEnTrainDecrire] = useState(false);

  const compteur = useRef(0);
  const finRef = useRef<HTMLDivElement>(null);
  const minuteurRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, enTrainDecrire, ouvert]);

  useEffect(
    () => () => {
      if (minuteurRef.current) clearTimeout(minuteurRef.current);
    },
    [],
  );

  const poserQuestion = (q: QuestionChatbot) => {
    setMessages((prev) => [
      ...prev,
      { id: compteur.current++, from: "user", texte: q.question },
    ]);
    setEnTrainDecrire(true);
    minuteurRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: compteur.current++, from: "emma", texte: q.reponse },
      ]);
      setEnTrainDecrire(false);
    }, 750);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Panneau de discussion */}
      {ouvert && (
        <section
          role="dialog"
          aria-label="Discuter avec Emma"
          className="animate-chat-pop flex h-[26rem] w-[20rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        >
          {/* En-tête */}
          <header className="flex items-center gap-3 bg-dark px-4 py-3 text-dark-foreground">
            <Mascotte taille={36} />
            <div className="leading-tight">
              <p className="font-headings text-sm font-bold">Emma</p>
              <p className="flex items-center gap-1 text-xs text-cream">
                <span className="size-2 rounded-full bg-green-400" aria-hidden />
                En ligne
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOuvert(false)}
              aria-label="Fermer la discussion"
              className="ml-auto rounded-full p-1 transition-colors hover:bg-white/10"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>

          {/* Fil de discussion */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <Bulle from="emma">{CHATBOT_SALUTATION}</Bulle>
            {messages.map((m) => (
              <Bulle key={m.id} from={m.from}>
                {m.texte}
              </Bulle>
            ))}
            {enTrainDecrire && <Typing />}
            <div ref={finRef} />
          </div>

          {/* Questions suggérées */}
          <div className="flex flex-wrap gap-2 border-t border-border p-3">
            {CHATBOT_QUESTIONS.map((q) => (
              <button
                key={q.question}
                type="button"
                onClick={() => poserQuestion(q)}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {q.question}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Bulle d'accroche (fermé) */}
      {!ouvert && (
        <button
          type="button"
          onClick={() => setOuvert(true)}
          className="animate-chat-pop max-w-[14rem] rounded-2xl rounded-br-sm border border-border bg-background px-4 py-2 text-left text-sm shadow-lg"
        >
          Une question ? Discutons&nbsp;👋
        </button>
      )}

      {/* Bouton mascotte */}
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-label={ouvert ? "Fermer la discussion" : "Discuter avec Emma"}
        aria-expanded={ouvert}
        className="relative origin-bottom-right transition hover:scale-105 active:scale-95"
      >
        <span className={ouvert ? "block" : "block animate-mascotte"}>
          <Mascotte taille={156} />
        </span>
        {!ouvert && (
          <span className="absolute right-6 top-6 flex size-4" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-4 rounded-full border-2 border-background bg-primary" />
          </span>
        )}
      </button>
    </div>
  );
}

function Mascotte({ taille }: { taille: number }) {
  const [chargee, setChargee] = useState(false);
  return (
    <span
      className="relative block shrink-0"
      style={{ width: taille, height: taille }}
    >
      {/* Repli emoji tant que l'image (PNG détouré) n'est pas chargée / absente. */}
      {!chargee && (
        <span
          aria-hidden
          className="absolute inset-0 flex select-none items-center justify-center"
          style={{ fontSize: taille * 0.5 }}
        >
          👩‍🍳
        </span>
      )}
      <Image
        src="/emma.png"
        alt=""
        fill
        sizes={`${taille}px`}
        className="object-contain drop-shadow-lg"
        onLoad={() => setChargee(true)}
        onError={() => setChargee(false)}
      />
    </span>
  );
}

function Bulle({
  from,
  children,
}: {
  from: "emma" | "user";
  children: React.ReactNode;
}) {
  if (from === "user") {
    return (
      <div className="animate-chat-pop ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-dark px-3 py-2 text-sm text-dark-foreground">
        {children}
      </div>
    );
  }
  return (
    <div className="animate-chat-pop mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-3 py-2 text-sm text-foreground">
      {children}
    </div>
  );
}

function Typing() {
  return (
    <div className="mr-auto flex gap-1 rounded-2xl rounded-bl-sm bg-secondary px-3 py-3">
      {[0, 150, 300].map((delai) => (
        <span
          key={delai}
          className="size-2 animate-bounce rounded-full bg-warm"
          style={{ animationDelay: `${delai}ms` }}
        />
      ))}
    </div>
  );
}
