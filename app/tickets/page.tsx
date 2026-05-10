import Link from "next/link";
import { TicketCard } from "@/components/TicketCard";
import { TICKETS } from "@/lib/tickets";
import styles from "./page.module.css";

export default function TicketsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.canvas}>
        <header className={styles.header}>
          <span className={styles.brand}>Happy Mother&apos;s Day</span>
          <h1 className={styles.title}>母の日のチケット</h1>
          <p className={styles.lead}>
            気が向いたときに、好きなチケットを使ってね。
            <br />
            ぜんぶ心をこめて。
          </p>
        </header>

        <div className={styles.list}>
          {TICKETS.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        <div className={styles.back}>
          <Link href="/" className={styles.backLink}>
            ← 表紙にもどる
          </Link>
        </div>
      </div>
    </main>
  );
}
