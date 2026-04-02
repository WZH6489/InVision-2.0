import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

const TIERS = new Set(["trial", "essential", "standard", "full"]);
const SLOTS = new Set(["morning", "afternoon", "evening"]);

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

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
  const fullName = typeof b.fullName === "string" ? b.fullName.trim().slice(0, 200) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 320) : "";
  const phone =
    b.phone === null || b.phone === undefined
      ? null
      : typeof b.phone === "string"
        ? b.phone.trim().slice(0, 40) || null
        : null;
  const trajectory = typeof b.trajectory === "string" ? b.trajectory.slice(0, 64) : "";
  const tension = typeof b.tension === "string" ? b.tension.slice(0, 64) : "";
  const ethics_boundary_ack = b.ethics_boundary_ack === true;

  if (!ethics_boundary_ack) {
    return NextResponse.json({ ok: false, error: "ethics" }, { status: 400 });
  }

  if (!TIERS.has(tier)) {
    return NextResponse.json({ ok: false, error: "tier" }, { status: 400 });
  }
  if (!SLOTS.has(timeSlot)) {
    return NextResponse.json({ ok: false, error: "time" }, { status: 400 });
  }
  if (!fullName) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!validEmail(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (!trajectory || !tension) {
    return NextResponse.json({ ok: false, error: "intake" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const row = {
      tier,
      preferred_date: date || null,
      time_slot: timeSlot,
      notes: notes || null,
      locale: locale || null,
      full_name: fullName,
      email,
      phone,
      trajectory,
      tension,
      ethics_boundary_ack: true,
      created_at: new Date().toISOString(),
    };

    let ins = await supabase.from("bookings").insert(row).select("id").single();

    if (ins.error?.message?.includes("ethics_boundary")) {
      const { ethics_boundary_ack: _drop, ...compat } = row;
      ins = await supabase.from("bookings").insert(compat).select("id").single();
    }

    if (ins.error) {
      return NextResponse.json(
        { ok: false, error: ins.error.message, persisted: false },
        { status: 500 },
      );
    }

    const data = ins.data;
    const id = data && typeof data === "object" && "id" in data ? String((data as { id: unknown }).id) : undefined;
    return NextResponse.json({ ok: true, persisted: true, id });
  }

  return NextResponse.json({ ok: true, persisted: false });
}
