export type Country = { name: string; iso: string; dial: string }

export const countries: Country[] = [
  { name: "Afghanistan", iso: "AF", dial: "+93" },
  { name: "Albania", iso: "AL", dial: "+355" },
  { name: "Algeria", iso: "DZ", dial: "+213" },
  { name: "Argentina", iso: "AR", dial: "+54" },
  { name: "Armenia", iso: "AM", dial: "+374" },
  { name: "Australia", iso: "AU", dial: "+61" },
  { name: "Austria", iso: "AT", dial: "+43" },
  { name: "Azerbaijan", iso: "AZ", dial: "+994" },
  { name: "Bahrain", iso: "BH", dial: "+973" },
  { name: "Bangladesh", iso: "BD", dial: "+880" },
  { name: "Belgium", iso: "BE", dial: "+32" },
  { name: "Benin", iso: "BJ", dial: "+229" },
  { name: "Bolivia", iso: "BO", dial: "+591" },
  { name: "Brazil", iso: "BR", dial: "+55" },
  { name: "Bulgaria", iso: "BG", dial: "+359" },
  { name: "Cambodia", iso: "KH", dial: "+855" },
  { name: "Cameroon", iso: "CM", dial: "+237" },
  { name: "Canada", iso: "CA", dial: "+1" },
  { name: "Chile", iso: "CL", dial: "+56" },
  { name: "China", iso: "CN", dial: "+86" },
  { name: "Colombia", iso: "CO", dial: "+57" },
  { name: "Costa Rica", iso: "CR", dial: "+506" },
  { name: "Côte d’Ivoire", iso: "CI", dial: "+225" },
  { name: "Croatia", iso: "HR", dial: "+385" },
  { name: "Czechia", iso: "CZ", dial: "+420" },
  { name: "Denmark", iso: "DK", dial: "+45" },
  { name: "Ecuador", iso: "EC", dial: "+593" },
  { name: "Egypt", iso: "EG", dial: "+20" },
  { name: "Estonia", iso: "EE", dial: "+372" },
  { name: "Ethiopia", iso: "ET", dial: "+251" },
  { name: "Finland", iso: "FI", dial: "+358" },
  { name: "France", iso: "FR", dial: "+33" },
  { name: "Germany", iso: "DE", dial: "+49" },
  { name: "Ghana", iso: "GH", dial: "+233" },
  { name: "Greece", iso: "GR", dial: "+30" },
  { name: "Hong Kong", iso: "HK", dial: "+852" },
  { name: "Hungary", iso: "HU", dial: "+36" },
  { name: "India", iso: "IN", dial: "+91" },
  { name: "Indonesia", iso: "ID", dial: "+62" },
  { name: "Ireland", iso: "IE", dial: "+353" },
  { name: "Israel", iso: "IL", dial: "+972" },
  { name: "Italy", iso: "IT", dial: "+39" },
  { name: "Japan", iso: "JP", dial: "+81" },
  { name: "Jordan", iso: "JO", dial: "+962" },
  { name: "Kenya", iso: "KE", dial: "+254" },
  { name: "Kuwait", iso: "KW", dial: "+965" },
  { name: "Latvia", iso: "LV", dial: "+371" },
  { name: "Lebanon", iso: "LB", dial: "+961" },
  { name: "Lithuania", iso: "LT", dial: "+370" },
  { name: "Luxembourg", iso: "LU", dial: "+352" },
  { name: "Malaysia", iso: "MY", dial: "+60" },
  { name: "Mexico", iso: "MX", dial: "+52" },
  { name: "Morocco", iso: "MA", dial: "+212" },
  { name: "Netherlands", iso: "NL", dial: "+31" },
  { name: "New Zealand", iso: "NZ", dial: "+64" },
  { name: "Nigeria", iso: "NG", dial: "+234" },
  { name: "Norway", iso: "NO", dial: "+47" },
  { name: "Oman", iso: "OM", dial: "+968" },
  { name: "Pakistan", iso: "PK", dial: "+92" },
  { name: "Peru", iso: "PE", dial: "+51" },
  { name: "Philippines", iso: "PH", dial: "+63" },
  { name: "Poland", iso: "PL", dial: "+48" },
  { name: "Portugal", iso: "PT", dial: "+351" },
  { name: "Qatar", iso: "QA", dial: "+974" },
  { name: "Romania", iso: "RO", dial: "+40" },
  { name: "Rwanda", iso: "RW", dial: "+250" },
  { name: "Saudi Arabia", iso: "SA", dial: "+966" },
  { name: "Senegal", iso: "SN", dial: "+221" },
  { name: "Singapore", iso: "SG", dial: "+65" },
  { name: "Slovakia", iso: "SK", dial: "+421" },
  { name: "South Africa", iso: "ZA", dial: "+27" },
  { name: "South Korea", iso: "KR", dial: "+82" },
  { name: "Spain", iso: "ES", dial: "+34" },
  { name: "Sri Lanka", iso: "LK", dial: "+94" },
  { name: "Sweden", iso: "SE", dial: "+46" },
  { name: "Switzerland", iso: "CH", dial: "+41" },
  { name: "Taiwan", iso: "TW", dial: "+886" },
  { name: "Tanzania", iso: "TZ", dial: "+255" },
  { name: "Thailand", iso: "TH", dial: "+66" },
  { name: "Tunisia", iso: "TN", dial: "+216" },
  { name: "Turkey", iso: "TR", dial: "+90" },
  { name: "Uganda", iso: "UG", dial: "+256" },
  { name: "Ukraine", iso: "UA", dial: "+380" },
  { name: "United Arab Emirates", iso: "AE", dial: "+971" },
  { name: "United Kingdom", iso: "GB", dial: "+44" },
  { name: "United States", iso: "US", dial: "+1" },
  { name: "Vietnam", iso: "VN", dial: "+84" },
  { name: "Zambia", iso: "ZM", dial: "+260" },
  { name: "Zimbabwe", iso: "ZW", dial: "+263" },
]

export function countryByIso(iso: string) {
  return countries.find((c) => c.iso === iso)
}

export function nationalPhoneDigits(iso: string, input: string) {
  const country = countryByIso(iso)
  const cc = country?.dial.replace(/\D/g, "") ?? ""
  let digits = input.replace(/\D/g, "")
  if (cc && digits.startsWith(cc)) digits = digits.slice(cc.length)
  if (digits.startsWith("0")) digits = digits.slice(1)
  return digits.slice(0, 12)
}

export function formatInternationalPhone(iso: string, national: string) {
  const country = countryByIso(iso)
  if (!country) return national
  const grouped = national.replace(/(\d{3})(?=\d)/g, "$1 ").trim()
  return grouped ? `${country.dial} ${grouped}` : `${country.dial} `
}

export function phonePlaceholder(iso: string) {
  const country = countryByIso(iso)
  if (!country) return "70 123 4567"
  return `${country.dial} 70 123 4567`
}
