"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  locale: string;
};

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const STEPS = 3;

type SubmitUi = "idle" | "encrypting" | "transmit";

export function BookingModal({ open, onClose, locale }: Props) {
  const t = useTranslations("Booking");
  const [step, setStep] = useState(0);
  const [trajectory, setTrajectory] = useState<string | null>(null);
  const [ethicsAck, setEthicsAck] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [submitUi, setSubmitUi] = useState<SubmitUi>("idle");
  const [queueId, setQueueId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const reset = useCallback(() => {
    setStep(0);
    setTrajectory(null);
    setEthicsAck(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setDone(false);
    setSubmitUi("idle");
    setQueueId(null);
    setFormError("");
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const validateContact = () => {
    if (!fullName.trim()) {
      setFormError(t("nameRequired"));
      return false;
    }
    if (!validEmail(email)) {
      setFormError(t("emailInvalid"));
      return false;
    }
    setFormError("");
    return true;
  };

  const goNext = () => {
    if (step === 0 && !trajectory) return;
    if (step === 1 && !ethicsAck) return;
    if (step === 2) {
      if (!validateContact()) return;
      void runSubmit();
      return;
    }
    setFormError("");
    setStep((s) => Math.min(s + 1, STEPS - 1));
  };

  const goBack = () => {
    setFormError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const runSubmit = async () => {
    if (!validateContact()) return;
    setFormError("");
    setSubmitUi("encrypting");
    const t0 = Date.now();
    const minMs = 2000;
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trajectory,
          tension: "clarity",
          tier: "standard",
          date: "",
          timeSlot: "morning",
          notes: "terminal-flow",
          locale,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          ethics_boundary_ack: true,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };
      const elapsed = Date.now() - t0;
      if (elapsed < minMs) {
        await new Promise((r) => setTimeout(r, minMs - elapsed));
      }
      if (data.ok !== false) {
        setQueueId(typeof data.id === "string" ? data.id : null);
        setSubmitUi("transmit");
        await new Promise((r) => setTimeout(r, 900));
        setDone(true);
      } else if (data.error === "ethics") {
        setFormError(t("ethicsRequired"));
        setSubmitUi("idle");
      } else {
        setFormError(t("submitFailed"));
        setSubmitUi("idle");
      }
    } catch {
      const elapsed = Date.now() - t0;
      if (elapsed < minMs) await new Promise((r) => setTimeout(r, minMs - elapsed));
      setSubmitUi("transmit");
      await new Promise((r) => setTimeout(r, 600));
      setDone(true);
    }
  };

  if (!open) return null;

  const inputStyle = {
    width: "100%" as const,
    marginTop: "0.35rem",
    padding: "0.5rem 0.65rem",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "4px",
    background: "rgba(255,255,255,0.03)",
    color: "var(--ink-bright, #e4e8ef)",
    font: "inherit",
  };

  const trajOpts = [
    ["career", "trajectoryCareer"],
    ["personal", "trajectoryPersonal"],
    ["legacy", "trajectoryLegacy"],
  ] as const;

  const stepTitle = (i: number) => {
    const keys = ["terminalStepDomain", "terminalStepEthics", "terminalStepContact"] as const;
    return t(keys[i]);
  };

  const nextDisabled =
    (step === 0 && !trajectory) || (step === 1 && !ethicsAck) || submitUi !== "idle";

  return (
    <div
      className="booking-overlay booking-overlay--immersive"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="booking-dialog booking-dialog--immersive booking-dialog--terminal">
        <button
          type="button"
          className="booking-dialog__close cursor-magnetic"
          onClick={handleClose}
          aria-label={t("close")}
        >
          ×
        </button>

        <h2
          id="booking-title"
          className={`section-title${done || submitUi !== "idle" ? " sr-only" : ""}`}
          style={{ marginTop: 0 }}
        >
          {t("title")}
        </h2>
        {!done && submitUi === "idle" ? (
          <p style={{ fontSize: "0.75rem", color: "var(--mist)", marginBottom: "1rem" }}>
            {t("demoNotice")}
          </p>
        ) : null}

        {done ? (
          <>
            <p style={{ color: "var(--ink-bright, #e8ecf4)", fontWeight: 600 }}>{t("successKeyLine")}</p>
            <p style={{ fontSize: "0.875rem", color: "var(--mist)", marginTop: "0.5rem" }}>
              {t("successDetail")}
            </p>
            {queueId ? (
              <p style={{ fontSize: "0.8125rem", color: "var(--signal)", marginTop: "0.75rem" }}>
                {t("referenceId", { id: queueId })}
              </p>
            ) : null}
            <button type="button" className="btn cursor-magnetic" style={{ marginTop: "1rem" }} onClick={handleClose}>
              {t("close")}
            </button>
          </>
        ) : submitUi === "idle" ? (
          <>
            <p className="section-title" style={{ fontSize: "0.8125rem", marginBottom: "0.75rem" }}>
              {stepTitle(step)}
            </p>
            <div className="booking-steps" aria-hidden>
              {Array.from({ length: STEPS }, (_, i) => (
                <span key={i} className={step >= i ? "is-on" : ""} />
              ))}
            </div>

            {step === 0 && (
              <div className="booking-domain-grid">
                {trajOpts.map(([id, labelKey]) => (
                  <button
                    key={id}
                    type="button"
                    className={`booking-domain-card cursor-magnetic${trajectory === id ? " is-selected" : ""}`}
                    onClick={() => setTrajectory(id)}
                  >
                    <span className="booking-domain-card__glow" aria-hidden />
                    <span className="booking-domain-card__label">{t(labelKey)}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="booking-ethics booking-ethics--terminal">
                <label className="booking-ethics__check cursor-magnetic booking-ethics__check--solo">
                  <input
                    type="checkbox"
                    checked={ethicsAck}
                    onChange={(e) => setEthicsAck(e.target.checked)}
                  />
                  <span>{t("terminalEthicsCheckbox")}</span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="form-grid" style={{ display: "grid", gap: "0.85rem" }}>
                <div>
                  <label htmlFor="bk-name">{t("nameLabel")}</label>
                  <input
                    id="bk-name"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="bk-email">{t("emailLabel")}</label>
                  <input
                    id="bk-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone">{t("phoneLabel")}</label>
                  <input
                    id="bk-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
            )}

            {formError ? (
              <p role="alert" style={{ color: "#e8a598", fontSize: "0.8125rem", marginTop: "0.75rem" }}>
                {formError}
              </p>
            ) : null}

            <div
              className="wizard__actions"
              style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
            >
              {step > 0 && (
                <button type="button" className="btn btn-ghost cursor-magnetic" onClick={goBack}>
                  {t("back")}
                </button>
              )}
              {step < STEPS - 1 && (
                <button type="button" className="btn cursor-magnetic" disabled={nextDisabled} onClick={goNext}>
                  {t("next")}
                </button>
              )}
              {step === STEPS - 1 && (
                <button type="button" className="btn cursor-magnetic" disabled={nextDisabled} onClick={goNext}>
                  {t("submit")}
                </button>
              )}
            </div>
          </>
        ) : submitUi === "encrypting" || submitUi === "transmit" ? (
          <div className="booking-terminal-process" aria-live="assertive">
            <div className={`booking-terminal-loader${submitUi === "transmit" ? " is-done" : ""}`} aria-hidden />
            <p className="booking-terminal-process__text">
              {submitUi === "encrypting" ? t("processingEncrypt") : t("processingTransmit")}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
