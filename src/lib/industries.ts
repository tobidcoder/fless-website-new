export type Industry = {
  id: string
  name: string
  line: string
}

/** Sectors with a dedicated /solutions/[slug] page. */
export const SOLUTION_PAGES = new Set(["healthcare", "education", "retail", "finance", "hospitality"])

export const industries: Industry[] = [
  { id: "healthcare", name: "Healthcare", line: "Clinics, hospitals, health tech, wellness" },
  { id: "retail", name: "Retail & E-commerce", line: "Online stores, retail brands, D2C" },
  { id: "education", name: "Education", line: "Schools, universities, coaching, e-learning" },
  { id: "finance", name: "Finance", line: "Financial services, advisory, accounting" },
  { id: "banking", name: "Banking", line: "Banks, credit unions, neo banks" },
  { id: "fintech", name: "FinTech", line: "Digital finance, payments, lending" },
  { id: "consulting", name: "Consulting", line: "Consulting firms, agencies, advisors" },
  { id: "realestate", name: "Real Estate", line: "Agents, developers, property management" },
  { id: "manufacturing", name: "Manufacturing", line: "Factories, production lines, logistics" },
  { id: "hospitality", name: "Hospitality", line: "Hotels, restaurants, travel agencies" },
  { id: "media", name: "Media & Entertainment", line: "Publishing, streaming, gaming" },
  { id: "logistics", name: "Logistics & Supply", line: "Freight, shipping, inventory" },
  { id: "agriculture", name: "Agriculture", line: "Farming, agritech, food production" },
  { id: "construction", name: "Construction", line: "Builders, contractors, civil engineering" },
  { id: "energy", name: "Energy & Utilities", line: "Renewables, oil & gas, power grids" },
  { id: "telecom", name: "Telecommunications", line: "ISPs, mobile networks, comms tech" },
  { id: "automotive", name: "Automotive", line: "Car manufacturing, dealerships, EV tech" },
  { id: "aerospace", name: "Aerospace & Defense", line: "Aviation, space tech, defense contractors" },
  { id: "pharma", name: "Pharmaceuticals", line: "Drug research, biotech, medical devices" },
  { id: "legal", name: "Legal Services", line: "Law firms, legal tech, compliance" },
  { id: "nonprofit", name: "Non-Profit & NGO", line: "Charities, foundations, social causes" },
  { id: "government", name: "Government", line: "Public sector, municipalities, federal" },
  { id: "software", name: "Software & IT", line: "SaaS, enterprise tech, development" },
  { id: "cybersecurity", name: "Cybersecurity", line: "InfoSec, threat intelligence, privacy" },
  { id: "design", name: "Design & Creative", line: "UI/UX, graphic design, studios" },
  { id: "fashion", name: "Fashion & Apparel", line: "Clothing, accessories, fashion tech" },
  { id: "fitness", name: "Fitness & Sports", line: "Gyms, sports tech, wellness coaches" },
  { id: "music", name: "Music & Audio", line: "Labels, streaming, audio tech" },
  { id: "events", name: "Events & Planning", line: "Conferences, weddings, event tech" },
  { id: "architecture", name: "Architecture", line: "Design, urban planning, drafting" },
  { id: "biotech", name: "Biotechnology", line: "Life sciences, genetics, biology" },
  { id: "mining", name: "Mining & Metals", line: "Extraction, refinement, geology" },
  { id: "maritime", name: "Maritime & Shipping", line: "Ports, vessels, ocean freight" },
  { id: "veterinary", name: "Veterinary", line: "Animal health, clinics, pet care" },
  { id: "other", name: "Other", line: "Not listed? We've got you covered." },
]

export const topIndustries = industries.slice(0, 6)
export const featuredIndustries = industries.slice(0, 8)
export const footerIndustries = industries.slice(0, 6)

export function industryHref(industry: Industry) {
  if (SOLUTION_PAGES.has(industry.id)) return `/solutions/${industry.id}`
  return `/start?industry=${encodeURIComponent(industry.name)}`
}
