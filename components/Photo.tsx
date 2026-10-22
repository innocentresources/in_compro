import Image from "next/image";

export const photos = {
  terrain: {
    src: "/img/rock-terrain.jpg",
    alt: "Weathered granite boulders on a rocky desert plain under a stormy sky",
    credit: "Lesly Derksen / Unsplash",
    position: "50% 55%",
  },
  spitzkoppe: {
    src: "/img/hero-spitzkoppe.jpg",
    alt: "Granite peaks at Spitzkoppe, Namibia, at dusk",
    credit: "Nir Himi / Unsplash",
    position: "50% 60%",
  },
  canyonSunset: {
    src: "/img/canyon-sunset.jpg",
    alt: "A desert canyon at sunset in Southern Africa",
    credit: "Andrew Svk / Unsplash",
    position: "50% 55%",
  },
  duneCurve: {
    src: "/img/dune-curve.jpg",
    alt: "The curved ridge of a sand dune under a clear sky",
    credit: "Chris Stenger / Unsplash",
    position: "50% 50%",
  },
} as const;

/** Illustrative stock photograph, labelled so it is never mistaken for a company site. */
export default function Photo({
  photo,
  className = "",
}: {
  photo: (typeof photos)[keyof typeof photos];
  className?: string;
}) {
  return (
    <figure className={`photo ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 900px) 100vw, 1000px"
        quality={90}
        style={{ objectPosition: photo.position }}
      />
    </figure>
  );
}
