"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function CoverPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/tickets");
  }, [router]);

  const goNext = () => router.push("/tickets");

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className={styles.cover}
      onClick={goNext}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="プレゼントを開く"
    >
      <span className={styles.flowerTopLeft} aria-hidden="true">
        🌸
      </span>
      <span className={styles.flowerBottomRight} aria-hidden="true">
        🌷
      </span>

      <h1 className={styles.heading}>
        お母さん、
        <br />
        いつもありがとう
      </h1>

      <p className={`${styles.sub} ${styles.sub1}`}>お体には気をつけて。</p>
      <p className={`${styles.sub} ${styles.sub2}`}>
        これからもたくさんの🍼を生産しましょう！
      </p>

      <div className={styles.cta}>
        <span>画面をタップしてプレゼントを開く</span>
        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </div>
    </div>
  );
}
