import { BookButton } from "@/components/BookButton";
import { Link } from "@/i18n/navigation";
import type { InnerPricingTiersSection } from "@/types/innerPages";

type Props = {
  section: InnerPricingTiersSection;
};

export function PricingTierCards({ section }: Props) {
  return (
    <section className="reveal is-visible" aria-labelledby="pricing-tiers-title">
      <h2 id="pricing-tiers-title" className="section-title">
        {section.title}
      </h2>
      <div className="pricing-grid">
        {section.tiers.map((tier) => (
          <div
            key={tier.title}
            className={`price-card${tier.featured ? " price-card--featured" : ""}`}
          >
            <h3>{tier.title}</h3>
            <p className="tier-desc">{tier.desc}</p>
            <p className="amount">
              {tier.amount}
              {tier.amountSmall ? <small>{tier.amountSmall}</small> : null}
            </p>
            <ul>
              {tier.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {tier.cta === "book" ? (
              tier.featured ? (
                <BookButton variant="primary">
                  {tier.bookLabel}
                  <span className="btn__arrow" aria-hidden>
                    →
                  </span>
                </BookButton>
              ) : (
                <BookButton variant="ghost">{tier.bookLabel}</BookButton>
              )
            ) : (
              <Link href="/contact" className="btn btn-ghost">
                {tier.contactCta}
                <span className="btn__arrow" aria-hidden>
                  →
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
