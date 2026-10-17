// Public URLs for the Fless platform, set per deployment.
// NEXT_PUBLIC_API_URL: the backend API origin, e.g. https://api.getfless.com
// NEXT_PUBLIC_APP_URL: the customer dashboard origin, e.g. https://app.getfless.com

const trim = (v: string | undefined) => (v ? v.replace(/\/+$/, "") : undefined)

export const API_URL = trim(process.env.NEXT_PUBLIC_API_URL)
export const APP_URL = trim(process.env.NEXT_PUBLIC_APP_URL)
