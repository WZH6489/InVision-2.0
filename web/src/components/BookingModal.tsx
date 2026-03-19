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

export function BookingModal({ open, onClose, locale }: Props) {
  const t = useTranslations("Booking");
  const [step, setStep] = useState(0);
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

  const validateStep2Contact = () => {
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
    if (step === 2 && !validateStep2Contact()) return;
    setFormError("");
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setFormError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  if (!open) return null;

  const submit = async () => {
    setPending(true);
    setFormError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          date,
          timeSlot,
          notes,
          locale,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; id?: string };
      if (data.ok !== false) {
        setQueueId(typeof data.id === "string" ? data.id : null);
        setDone(true);
      }
    } catch {
      setDone(true);
    } finally {
      setPending(false);
    }
  };

  const stepTitle = (i: number) => {
    if (i === 0) return t("step1");
    if (i === 1) return t("step2");
    if (i === 2) return t("step3");
    return t("step4");
  };

  const inputStyle = {
    width: "100%" as const,
    marginTop: "0.35rem",
    padding: "0.5rem 0.65rem",
    border: "1px solid var(--line)",
    borderRadius: "2px",
    background: "rgba(255,255,255,0.03)",
    color: "#e8ecf4",
    font: "inherit",
  };

  return (
    <div
      className="booking-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="booking-dialog">
        <h2 id="booking-title" className="section-title" style={{ marginTop: 0 }}>
          {t("title")}
        </h2>
        <p style={{ fontSize: "0.75rem", color: "var(--mist)", marginBottom: "1rem" }}>
          {t("demoNotice")}
        </p>

        {done ? (
          <>
            <p style={{ color: "rgba(232,236,244,0.92)" }}>{t("success")}</p>
            <p style={{ fontSize: "0.875rem", color: "var(--mist)" }}>{t("successDetail")}</p>
            {queueId ? (
              <p style={{ fontSize: "0.8125rem", color: "var(--signal)", marginTop: "0.75rem" }}>
                {t("referenceId", { id: queueId })}
              </p>
            ) : null}
            <button type="button" className="btn" style={{ marginTop: "1rem" }} onClick={handleClose}>
              {t("close")}
            </button>
          </>
        ) : (
          <>
            <p className="section-title" style={{ fontSize: "0.8125rem", marginBottom: "0.75rem" }}>
              {stepTitle(step)}
            </p>
            <div className="booking-steps" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={step >= i ? "is-on" : ""} />
              ))}
            </div>

            {step === 0 && (
              <div>
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
                      className={`tier-btn${tier === id ? " is-selected" : ""}`}
                      onClick={() => setTier(id)}
                    >
                      {t(labelKey)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
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

            {step === 3 && (
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
              <p role="alert" style={{ color: "#f87171", fontSize: "0.8125rem", marginTop: "0.75rem" }}>
                {formError}
              </p>
            ) : null}

            <div
              className="wizard__actions"
              style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
            >
              {step > 0 && (
                <button type="button" className="btn btn-ghost" onClick={goBack}>
                  {t("back")}
                </button>
              )}
              {step < 3 && (
                <button type="button" className="btn" disabled={step === 0 && !tier} onClick={goNext}>
                  {t("next")}
                </button>
              )}
              {step === 3 && (
                <button type="button" className="btn" disabled={pending} onClick={submit}>
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
