"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

export function SimulationAmbientSound() {
  const t = useTranslations("Simulation");
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    try {
      oscRef.current?.stop();
    } catch {
      /* already stopped */
    }
    oscRef.current = null;
    gainRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
    setOn(false);
  }, []);

  const start = useCallback(async () => {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 52;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    const now = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
    setOn(true);
  }, []);

  useEffect(() => () => stop(), [stop]);

  const toggle = () => {
    if (on) stop();
    else void start();
  };

  return (
    <button
      type="button"
      className="sim-ambient-btn cursor-magnetic"
      onClick={toggle}
      aria-pressed={on}
      aria-label={t("ambientAria")}
    >
      {on ? t("ambientOff") : t("ambientOn")}
    </button>
  );
}
