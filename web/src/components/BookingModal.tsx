"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  locale: string;
};

export function BookingModal({ open, onClose, locale }: Props) {
  const t = useTranslations("Booking");
  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const reset = useCallback(() => {
    setStep(0);
    setTier(null);
    setDate("");
    setTimeSlot("morning");
    setNotes("");
    setDone(false);
    setPending(false);
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!open) return null;

  const submit = async () => {
    setPending(true);
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
        }),
      });
      const data = (await res.json()) as { ok?: boolean };
      if (data.ok !== false) setDone(true);
    } catch {
      setDone(true);
    } finally {
      setPending(false);
    }
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
            <button type="button" className="btn" style={{ marginTop: "1rem" }} onClick={handleClose}>
              {t("close")}
            </button>
          </>
        ) : (
          <>
            <div className="booking-steps" aria-hidden>
              <span className={step >= 0 ? "is-on" : ""} />
              <span className={step >= 1 ? "is-on" : ""} />
              <span className={step >= 2 ? "is-on" : ""} />
            </div>

            {step === 0 && (
              <div>
                <p className="section-title" style={{ fontSize: "0.875rem" }}>
                  {t("step1")}
                </p>
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
                    style={{ width: "100%", marginTop: "0.35rem" }}
                  />
                </div>
                <div>
                  <label htmlFor="bk-time">{t("timeLabel")}</label>
                  <select
                    id="bk-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{ width: "100%", marginTop: "0.35rem" }}
                  >
                    <option value="morning">{t("timeMorning")}</option>
                    <option value="afternoon">{t("timeAfternoon")}</option>
                    <option value="evening">{t("timeEvening")}</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label htmlFor="bk-notes">{t("questionLabel")}</label>
                <textarea
                  id="bk-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  style={{ width: "100%", marginTop: "0.35rem", font: "inherit" }}
                />
              </div>
            )}

            <div className="wizard__actions" style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {step > 0 && (
                <button type="button" className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
                  {t("back")}
                </button>
              )}
              {step < 2 && (
                <button
                  type="button"
                  className="btn"
                  disabled={step === 0 && !tier}
                  onClick={() => setStep((s) => s + 1)}
                >
                  {t("next")}
                </button>
              )}
              {step === 2 && (
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
