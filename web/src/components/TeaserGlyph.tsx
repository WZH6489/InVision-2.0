type GlyphId = "process" | "rules" | "testimonials" | "pricing" | "team" | "faq";

export function TeaserGlyph({ id }: { id: GlyphId }) {
  const common = { className: "teaser-card__glyph", "aria-hidden": true as const };
  switch (id) {
    case "process":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="44" r="4" />
          <circle cx="32" cy="20" r="4" />
          <circle cx="52" cy="40" r="4" />
          <path d="M16 42 L28 24 M36 22 L48 38" strokeLinecap="round" />
          <path d="M12 48 Q32 58 52 44" opacity="0.5" />
        </svg>
      );
    case "rules":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M32 8 L52 18 V36 Q52 48 32 56 Q12 48 12 36 V18 Z" />
          <path d="M24 30 L30 36 L42 22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "testimonials":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 22 H36 V40 H18 Z" />
          <path d="M40 22 H52 V34 H40 Z" opacity="0.7" />
          <path d="M22 44 H32" strokeLinecap="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="10" y="36" width="44" height="14" rx="2" opacity="0.4" />
          <rect x="16" y="24" width="32" height="14" rx="2" opacity="0.65" />
          <rect x="22" y="12" width="20" height="14" rx="2" />
        </svg>
      );
    case "team":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="22" cy="22" r="8" />
          <circle cx="44" cy="24" r="6" />
          <path d="M10 52 Q22 40 32 44 T54 50" strokeLinecap="round" />
        </svg>
      );
    case "faq":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="28" cy="28" r="12" />
          <path d="M36 36 L48 48" strokeLinecap="round" />
          <path d="M24 26 H30" strokeLinecap="round" />
          <circle cx="28" cy="32" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
