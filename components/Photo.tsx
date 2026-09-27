import Image from "next/image";

export const photos = {
  pit: {
    src: "/img/open-pit.jpg",
    alt: "Terraced walls of a large open-pit mine under a cloudy sky",
    credit: "Matthew de Livera / Unsplash",
    position: "50% 72%",
  },
  kalahari: {
    src: "/img/kalahari-dusk.jpg",
    alt: "Sunset over a wide Kalahari plain with scattered acacia trees",
    credit: "Bernd Dittrich / Unsplash",
    position: "60% 50%",
  },
  spitzkoppe: {
    src: "/img/hero-spitzkoppe.jpg",
    alt: "Granite peaks at Spitzkoppe, Namibia, at dusk",
    credit: "Nir Himi / Unsplash",
    position: "50% 60%",
  },
  namibiaDunes: {
    src: "/img/namibia-dunes.jpg",
    alt: "Red sand dunes and camel thorn trees in the Namib desert",
    credit: "Jules Bassoleil / Unsplash",
    position: "50% 55%",
  },
  southAfricaCanyon: {
    src: "/img/south-africa-canyon.jpg",
    alt: "A river canyon in the Mpumalanga escarpment, South Africa",
    credit: "Arthur Hickinbotham / Unsplash",
    position: "50% 45%",
  },
  botswanaSky: {
    src: "/img/botswana-sky.jpg",
    alt: "A storm cloud over open grassland in Botswana",
    credit: "Hans-Jurgen Mager / Unsplash",
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
