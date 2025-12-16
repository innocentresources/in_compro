"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  backgroundImage: string;
};

export default function HeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Responsible Mineral Development",
        subtitle:
          "Delivering disciplined exploration and mining operations across Southern Africa with long-term stewardship.",
        cta: "Learn About Us",
        href: "/company",
        backgroundImage: "/hero-bg.jpg",
      },
      {
        title: "Sustainability at the Core",
        subtitle:
          "Minimizing impact, supporting communities, and operating with transparent governance and safety-first standards.",
        cta: "Our Commitment",
        href: "/sustainability",
        backgroundImage: "/hero-bg-3.png",
      },
      {
        title: "Opportunities for Growth",
        subtitle:
          "Building reliable mineral supply chains through responsible development and technology-enabled execution.",
        cta: "Explore Opportunities",
        href: "/opportunities",
        backgroundImage: "/hero-bg-2.png",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="hero-slider" aria-label="Hero slider">
      {slides.map((slide, i) => (
        <div
          key={slide.href}
          className={`hero-slide ${i === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          aria-hidden={i !== activeIndex}
        >
          <div className="hero-overlay" />

          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title fade-in">{slide.title}</h1>
              <p className="hero-subtitle fade-in">{slide.subtitle}</p>

              <a className="btn fade-in" href={slide.href}>
                {slide.cta}
              </a>

              {/* Optional small nav indicator (clean + minimal) */}
              <div className="hero-dots" aria-label="Slide indicators">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`hero-dot ${idx === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
