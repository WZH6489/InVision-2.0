"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

type Props = {
  backLabel: string;
};

/**
 * Cryptographic-style client gate: WebAuthn prompt when available,
 * otherwise a deliberate “hardware key required” state.
 */
export function PortalSecureGate({ backLabel }: Props) {
  const t = useTranslations("Portal");
  const [status, setStatus] = useState<"idle" | "prompt" | "unsupported" | "blocked">("idle");
  const [detail, setDetail] = useState<string | null>(null);

  const tryWebAuthn = useCallback(async () => {
    setDetail(null);
    if (typeof window === "undefined" || !window.PublicKeyCredential) {
      setStatus("unsupported");
      return;
    }
    setStatus("prompt");
    try {
      const c = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          timeout: 12_000,
          rpId: window.location.hostname,
          userVerification: "required",
          allowCredentials: [],
        },
      });
      setStatus(c ? "blocked" : "blocked");
      setDetail(t("gateNoCredential"));
    } catch (e) {
      setStatus("blocked");
      setDetail(e instanceof Error ? e.message : t("gateAborted"));
    }
  }, [t]);

  return (
    <div className="portal-secure">
      <div className="portal-secure__grid" aria-hidden>
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className="portal-secure__cell" />
        ))}
      </div>
      <div className="portal-secure__panel">
        <p className="portal-secure__kicker">{t("gateKicker")}</p>
        <h1 className="portal-secure__title">{t("gateTitle")}</h1>
        <p className="portal-secure__lead">{t("gateLead")}</p>

        <div className="portal-secure__channels">
          <button type="button" className="portal-secure__keybtn cursor-magnetic" onClick={tryWebAuthn}>
            <span className="portal-secure__keyicon" aria-hidden />
            <span>
              <span className="portal-secure__keylabel">{t("gateYubikey")}</span>
              <span className="portal-secure__keysubl">{t("gateYubikeySub")}</span>
            </span>
          </button>
          <button type="button" className="portal-secure__keybtn portal-secure__keybtn--secondary cursor-magnetic" disabled>
            <span className="portal-secure__bioicon" aria-hidden />
            <span>
              <span className="portal-secure__keylabel">{t("gateBiometric")}</span>
              <span className="portal-secure__keysubl">{t("gateBiometricSub")}</span>
            </span>
          </button>
        </div>

        <p className="portal-secure__status" role="status">
          {status === "idle" ? t("gateStatusIdle") : null}
          {status === "prompt" ? t("gateStatusPrompt") : null}
          {status === "unsupported" ? t("gateStatusUnsupported") : null}
          {status === "blocked" ? t("gateStatusBlocked") : null}
          {detail ? <span className="portal-secure__detail"> · {detail}</span> : null}
        </p>

        <p className="portal-secure__footnote">{t("gateFootnote")}</p>

        <Link className="btn btn-ghost portal-secure__back" href="/">
          {backLabel}
          <span className="btn__arrow" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
