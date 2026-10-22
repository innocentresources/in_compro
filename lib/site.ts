/**
 * Verified company facts, taken from the current innocentresources.com
 * content and the source repository. Nothing here is a resource estimate,
 * production figure, financial result, approval or partnership.
 */
export type Jurisdiction = {
  country: string;
  commodities: string[];
};

export const jurisdictions: Jurisdiction[] = [
  {
    country: "Namibia",
    commodities: ["Base metals", "Precious metals / rare earths"],
  },
  {
    country: "South Africa",
    commodities: ["Chrome", "Platinum group metals"],
  },
  {
    country: "Botswana",
    commodities: ["Precious stones"],
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
