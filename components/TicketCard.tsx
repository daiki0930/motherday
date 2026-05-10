"use client";

import { useEffect, useState } from "react";
import type { Ticket } from "@/lib/tickets";
import { useTickets } from "@/lib/useTickets";
import { ConfirmDialog } from "./ConfirmDialog";
import { Confetti } from "./Confetti";
import styles from "./TicketCard.module.css";

type Props = {
  ticket: Ticket;
};

function formatUsedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export function TicketCard({ ticket }: Props) {
  const { isUsed, usedAt, markUsed } = useTickets();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [justUsed, setJustUsed] = useState(false);

  useEffect(() => {
    if (!bursting) return;
    const t = setTimeout(() => setBursting(false), 1900);
    return () => clearTimeout(t);
  }, [bursting]);

  const used = isUsed(ticket.id);
  const usedDate = used ? formatUsedDate(usedAt(ticket.id) ?? "") : "";

  const handleConfirm = () => {
    setConfirmOpen(false);
    markUsed(ticket.id);
    setJustUsed(true);
    setBursting(true);
  };

  return (
    <>
      <article
        className={`${styles.card} ${used ? styles.used : ""}`}
        aria-label={`${ticket.title}${used ? "（使用済み）" : ""}`}
      >
        <div className={styles.emojiBox} aria-hidden="true">
          {ticket.emoji}
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.body}>
          <h3 className={styles.title}>{ticket.title}</h3>
          <p className={styles.desc}>{ticket.desc}</p>

          <div className={styles.actions}>
            {used ? (
              <span className={styles.usedLabel}>使用済み（{usedDate}）</span>
            ) : (
              <button type="button" className={styles.useBtn} onClick={() => setConfirmOpen(true)}>
                使用する
              </button>
            )}
          </div>
        </div>

        {used && (
          <span className={`${styles.stamp} ${justUsed ? styles.stampAnim : ""}`} aria-hidden="true">
            USED
          </span>
        )}
      </article>

      <ConfirmDialog
        open={confirmOpen}
        title={`${ticket.title}を使う`}
        body={"このチケットを使用しますか？\n使用したら戻せません。"}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />

      {bursting && <Confetti />}
    </>
  );
}
