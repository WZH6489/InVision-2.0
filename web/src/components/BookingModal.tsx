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

const STEPS = 7;

export function BookingModal({ open, onClose, locale }: Props) {
  const t = useTranslations("Booking");
  const [step, setStep] = useState(0);
  const [trajectory, setTrajectory] = useState<string | null>(null);
  const [ethicsAck, setEthicsAck] = useState(false);
  const [tension, setTension] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [queueId, setQueueId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const reset = useCallback(() => {
    setStep(0);
    setTrajectory(null);
    setEthicsAck(false);
    setTension(null);
    setTier(null);
    setDate("");
    setTimeSlot("morning");
    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setDone(false);
    setPending(false);
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
    if (step === 2 && !tension) return;
    if (step === 3 && !tier) return;
    if (step === 5) {
      if (!validateContact()) return;
    }
    setFormError("");
    setStep((s) => Math.min(s + 1, STEPS - 1));
  };

  const goBack = () => {
    setFormError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  if (!open) return null;

  const submit = async () => {
    if (!validateContact()) return;
    setPending(true);
    setFormError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trajectory,
          tension,
          tier,
          date,
          timeSlot,
          notes,
          locale,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          ethics_boundary_ack: true,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };
      if (data.ok !== false) {
        setQueueId(typeof data.id === "string" ? data.id : null);
        setDone(true);
      } else if (data.error === "ethics") {
        setFormError(t("ethicsRequired"));
      } else {
        setFormError(t("submitFailed"));
      }
    } catch {
      setFormError(t("submitFailed"));
    } finally {
      setPending(false);
    }
  };

  const stepTitle = (i: number) => {
    const keys = [
      "conciergeStep0",
      "conciergeStepEthics",
      "conciergeStep1",
      "conciergeStep2",
      "conciergeStep3",
      "conciergeStep4",
      "conciergeStep5",
    ] as const;
    return t(keys[i]);
  };

  const inputStyle = {
    width: "100%" as const,
    marginTop: "0.35rem",
    padding: "0.5rem 0.65rem",
    border: "1px solid var(--line)",
    borderRadius: "2px",
    background: "rgba(255,255,255,0.03)",
    color: "var(--ink-bright, #e4e8ef)",
    font: "inherit",
  };

  const trajOpts = [
    ["career", "trajectoryCareer"],
    ["legacy", "trajectoryLegacy"],
    ["personal", "trajectoryPersonal"],
  ] as const;

  const tensionOpts = [
    ["clarity", "tensionClarity"],
    ["decision", "tensionDecision"],
    ["relation", "tensionRelation"],
    ["other", "tensionOther"],
  ] as const;

  const nextDisabled =
    (step === 0 && !trajectory) ||
    (step === 1 && !ethicsAck) ||
    (step === 2 && !tension) ||
    (step === 3 && !tier);

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
      <div className="booking-dialog booking-dialog--immersive">
        <button
          type="button"
          className="booking-dialog__close cursor-magnetic"
          onClick={handleClose}
          aria-label={t("close")}
        >
          ×
        </button>

        <h2 id="booking-title" className="section-title" style={{ marginTop: 0 }}>
          {t("title")}
        </h2>
        <p style={{ fontSize: "0.75rem", color: "var(--mist)", marginBottom: "1rem" }}>
          {t("demoNotice")}
        </p>

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
        ) : (
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
              <div className="tier-grid">
                {trajOpts.map(([id, labelKey]) => (
                  <button
                    key={id}
                    type="button"
                    className={`tier-btn cursor-magnetic${trajectory === id ? " is-selected" : ""}`}
                    onClick={() => setTrajectory(id)}
                  >
                    {t(labelKey)}
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="booking-ethics">
                <p className="booking-ethics__body">{t("ethicsBody")}</p>
                <label className="booking-ethics__check cursor-magnetic">
                  <input
                    type="checkbox"
                    checked={ethicsAck}
                    onChange={(e) => setEthicsAck(e.target.checked)}
                  />
                  <span>{t("ethicsCheckbox")}</span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="tier-grid">
                {tensionOpts.map(([id, labelKey]) => (
                  <button
                    key={id}
                    type="button"
                    className={`tier-btn cursor-magnetic${tension === id ? " is-selected" : ""}`}
                    onClick={() => setTension(id)}
                  >
                    {t(labelKey)}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="tier-grid">
                {(
                  [
                    ["essential", "tierEssential"],
                    ["standard", "tierStandard"],
                    ["full", "tierFull"],
                  ] as const
                ).map(([id, labelKey]) => (
                  <button
                    key={id}
                    type="button"
                    className={`tier-btn cursor-magnetic${tier === id ? " is-selected" : ""}`}
                    onClick={() => setTier(id)}
                  >
                    {t(labelKey)}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="form-grid" style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label htmlFor="bk-date">{t("dateLabel")}</label>
                  <input
                    id="bk-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="bk-time">{t("timeLabel")}</label>
                  <select
                    id="bk-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="morning">{t("timeMorning")}</option>
                    <option value="afternoon">{t("timeAfternoon")}</option>
                    <option value="evening">{t("timeEvening")}</option>
                  </select>
                </div>
              </div>
            )}

            {step === 5 && (
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

            {step === 6 && (
              <div>
                <label htmlFor="bk-notes">{t("questionLabel")}</label>
                <textarea
                  id="bk-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  style={{ ...inputStyle, marginTop: "0.35rem", resize: "vertical" as const }}
                />
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
                <button type="button" className="btn cursor-magnetic" disabled={pending} onClick={submit}>
                  {pending ? "…" : t("submit")}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
