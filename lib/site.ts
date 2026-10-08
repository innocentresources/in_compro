/**
 * Verified company facts, taken from the current innocentresources.com
 * content and the source repository. Nothing here is a resource estimate,
 * production figure, financial result, approval or partnership.
 */
export type Jurisdiction = {
  country: string;
  commodities: string[];
  stageKey: "plan" | "ops" | "asset";
  stageLabel: string;
  description: string;
  siteWording: string;
};

export const jurisdictions: Jurisdiction[] = [
  {
    country: "Namibia",
    commodities: ["Lithium", "Copper", "Gold"],
    stageKey: "plan",
    stageLabel: "Exploration & development",
    description:
      "Namibia is the company's exploration and development focus, covering lithium, copper and gold.",
    siteWording: "Lithium, copper, and gold exploration and development.",
  },
  {
    country: "South Africa",
    commodities: ["Chrome", "Platinum", "Titanium"],
    stageKey: "ops",
    stageLabel: "Operations focus",
    description:
      "South Africa is the company's operations focus, covering chrome, platinum and titanium, and is home to its head office in Sandton.",
    siteWording: "Chrome, platinum, and titanium operations.",
  },
  {
    country: "Botswana",
    commodities: ["Diamonds", "Precious stones"],
    stageKey: "asset",
    stageLabel: "Asset holding",
    description:
      "Botswana is where the company describes holding diamond and precious stone assets.",
    siteWording: "Diamonds and precious stone assets.",
  },
];

/** Canonical origin for sitemap, robots and share links. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.innocentresources.com"
).replace(/[/]$/, "");

export const contact = {
  address: "101 Katherine Street, Sandton, South Africa",
  email: "Info@InnocentResources.com",
  hotline: "+27 79 919 0205",
  hotlineTel: "+27799190205",
};
