import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center md:text-left">
          <span
            className="font-display"
            style={{ fontWeight: 600, color: "var(--color-text-primary)" }}
          >
            {SITE.name}
          </span>
          <span
            className="md:text-center"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Designed by Prateek Saxena
          </span>
          <a
            href={`mailto:${SITE.email}`}
            className="link-muted md:text-right"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
