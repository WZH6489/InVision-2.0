"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingModal } from "./BookingModal";

type Ctx = {
  openBooking: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function useBooking() {
  const v = useContext(BookingContext);
  if (!v) throw new Error("useBooking outside BookingProvider");
  return v;
}

export function BookingProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} locale={locale} />
    </BookingContext.Provider>
  );
}
