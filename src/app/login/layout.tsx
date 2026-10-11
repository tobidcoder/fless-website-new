import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In — Fless",
  description: "Sign in to access your Fless employee workspace and active department desks.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
