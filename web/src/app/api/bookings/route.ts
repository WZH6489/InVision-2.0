import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

const TIERS = new Set(["essential", "standard", "full"]);
const SLOTS = new Set(["morning", "afternoon", "evening"]);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const tier = typeof b.tier === "string" ? b.tier : "";
  const date = typeof b.date === "string" ? b.date : "";
  const timeSlot = typeof b.timeSlot === "string" ? b.timeSlot : "";
  const notes = typeof b.notes === "string" ? b.notes.slice(0, 4000) : "";
  const locale = typeof b.locale === "string" ? b.locale.slice(0, 16) : "";

  if (!TIERS.has(tier)) {
    return NextResponse.json({ ok: false, error: "tier" }, { status: 400 });
  }
  if (!SLOTS.has(timeSlot)) {
    return NextResponse.json({ ok: false, error: "time" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("bookings").insert({
      tier,
      preferred_date: date || null,
      time_slot: timeSlot,
      notes: notes || null,
      locale: locale || null,
      created_at: new Date().toISOString(),
    });
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, persisted: false },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, persisted: true });
  }

  return NextResponse.json({ ok: true, persisted: false });
}
