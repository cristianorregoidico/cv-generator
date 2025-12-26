import { ThemeName } from "./cv";

export const themeTokens: Record<
  ThemeName,
  { accent: string; text: string; muted: string; background: string }
> = {
  slate: {
    accent: "#334155",
    text: "#0f172a",
    muted: "#475569",
    background: "#f8fafc",
  },
  teal: {
    accent: "#0f766e",
    text: "#062925",
    muted: "#0f766e",
    background: "#ecfeff",
  },
  rose: {
    accent: "#be123c",
    text: "#3f0a1a",
    muted: "#be123c",
    background: "#fff1f2",
  },
};
