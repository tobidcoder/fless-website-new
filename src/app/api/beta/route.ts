import { NextResponse } from "next/server"
import { betaGoogleForm, buildGoogleFormBody, type BetaPayload } from "@/lib/betaForm"

export async function POST(req: Request) {
  let payload: BetaPayload
  try {
    payload = (await req.json()) as BetaPayload
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  if (!payload?.name || !payload?.email) {
    return NextResponse.json({ ok: false, error: "missing" }, { status: 400 })
  }

  const res = await fetch(betaGoogleForm.action, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: buildGoogleFormBody(payload).toString(),
    redirect: "follow",
  })

  const html = await res.text()
  if (!html.includes("Your response has been recorded")) {
    return NextResponse.json({ ok: false, error: "not-recorded" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
