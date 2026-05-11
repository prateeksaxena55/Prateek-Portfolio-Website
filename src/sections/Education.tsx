import EducationCard from "@/components/EducationCard";
import { EDUCATION } from "@/lib/constants";

export default function Education() {
  return (
    <section id="education" className="relative py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "12%",
            width: 460,
            height: 460,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45, 91, 255, 0.12) 0%, rgba(45, 91, 255, 0) 70%)",
            filter: "blur(70px)",
            animation: "blob-drift-2 22s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "8%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(15, 122, 90, 0.10) 0%, rgba(15, 122, 90, 0) 70%)",
            filter: "blur(80px)",
            animation: "blob-drift-1 26s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "35%",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217, 119, 87, 0.08) 0%, rgba(217, 119, 87, 0) 70%)",
            filter: "blur(65px)",
            animation: "blob-drift-3 30s ease-in-out infinite",
          }}
        />
      </div>
      <div className="container-wide">
        <div
          className="type-eyebrow"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 16 }}
        >
          SECTION 04 · EDUCATION
        </div>
        <h2
          className="type-h2"
          style={{ color: "var(--color-text-primary)", marginBottom: 24 }}
        >
          Where I learned to think in systems.
        </h2>
        <p
          className="max-w-[640px]"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            marginBottom: 64,
          }}
        >
          A quantitative engineering foundation, then a focused master&apos;s in
          customer analytics and predictive modeling — the path that led to
          building AI systems for business workflows.
        </p>

        <div className="flex flex-col gap-4">
          {EDUCATION.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}
