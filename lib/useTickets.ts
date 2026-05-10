"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { TicketId } from "./tickets";

const STORAGE_KEY = "motherday.usedTickets";
const EVENT = "motherday:used-tickets-changed";

type UsedMap = Partial<Record<TicketId, string>>;

function readStorage(): UsedMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as UsedMap;
    return {};
  } catch {
    return {};
  }
}

function writeStorage(map: UsedMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // quota or privacy mode — silently ignore
  }
}

const EMPTY: UsedMap = Object.freeze({});

let cachedSnapshot: UsedMap | null = null;
let cachedSerialized = "";

function getSnapshot(): UsedMap {
  const fresh = readStorage();
  const serialized = JSON.stringify(fresh);
  if (cachedSnapshot && serialized === cachedSerialized) {
    return cachedSnapshot;
  }
  cachedSnapshot = fresh;
  cachedSerialized = serialized;
  return fresh;
}

function getServerSnapshot(): UsedMap {
  return EMPTY;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => callback();
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useTickets() {
  const used = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const markUsed = useCallback((id: TicketId) => {
    const current = readStorage();
    if (current[id]) return;
    const next = { ...current, [id]: new Date().toISOString() };
    writeStorage(next);
  }, []);

  const usedAt = useCallback((id: TicketId): string | null => used[id] ?? null, [used]);
  const isUsed = useCallback((id: TicketId): boolean => Boolean(used[id]), [used]);

  return { used, markUsed, usedAt, isUsed };
}
