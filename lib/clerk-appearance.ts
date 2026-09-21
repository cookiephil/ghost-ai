import { dark } from "@clerk/ui/themes";
import type { Appearance } from "@clerk/ui";

export const clerkLocalization = {
  socialButtonsBlockButtonManyInView: "Continue with {{provider|titleize}}",
};

export const clerkAppearance: Appearance = {
  theme: dark,
  options: {
    socialButtonsVariant: "blockButton",
  },
  elements: {
    socialButtons: {
      display: "flex",
      flexDirection: "column",
    },
    socialButtonsBlockButton: {
      border: "1px solid var(--border-default)",
    },
  },
  variables: {
    colorBackground: "var(--bg-surface)",
    colorForeground: "var(--text-primary)",
    colorMuted: "var(--bg-subtle)",
    colorMutedForeground: "var(--text-muted)",
    colorPrimary: "var(--accent-primary)",
    colorPrimaryForeground: "var(--bg-base)",
    colorNeutral: "var(--text-primary)",
    colorInput: "var(--bg-elevated)",
    colorInputForeground: "var(--text-primary)",
    colorBorder: "var(--border-default)",
    colorRing: "var(--accent-primary)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
    colorModalBackdrop: "var(--bg-base)",
    fontFamily: "var(--font-geist-sans)",
    borderRadius: "var(--radius)",
  },
};
