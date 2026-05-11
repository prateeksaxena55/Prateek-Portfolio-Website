import ContactCard from "@/components/ContactCard";
import { CONTACT_CARDS, CONTACT_INTRO } from "@/lib/constants";

const GLASS_BG =
  "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="container-wide">
        <div
          className="type-eyebrow text-center"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 16 }}
        >
          SECTION 05 · CONTACT
        </div>

        <div
          className="mx-auto text-center"
          style={{
            maxWidth: 720,
            background: GLASS_BG,
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 8px 32px rgba(10, 10, 10, 0.05)",
            marginBottom: 64,
          }}
        >
          <h2
            className="font-display text-[28px] md:text-[36px]"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--color-text-primary)",
              marginBottom: 12,
            }}
          >
            {CONTACT_INTRO.heading}
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--color-text-secondary)",
            }}
          >
            {CONTACT_INTRO.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px] mx-auto">
          {CONTACT_CARDS.map((card, i) => (
            <ContactCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
