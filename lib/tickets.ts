export type TicketId = "shoulder" | "chore" | "shopping" | "anything";

export type Ticket = {
  id: TicketId;
  title: string;
  emoji: string;
  desc: string;
};

export const TICKETS: readonly Ticket[] = [
  {
    id: "shoulder",
    title: "肩たたき券",
    emoji: "💆",
    desc: "凝った肩を心を込めて10分間マッサージします",
  },
  {
    id: "chore",
    title: "お手伝い券",
    emoji: "🧹",
    desc: "家事を1つ、なんでもお手伝いします",
  },
  {
    id: "shopping",
    title: "買い物代行券",
    emoji: "🛒",
    desc: "買い物リストを渡してくれたら代わりに行きます",
  },
  {
    id: "anything",
    title: "なんでも言うこと聞くよ券",
    emoji: "✨",
    desc: "1日、お母さんの言うことに従います",
  },
] as const;
