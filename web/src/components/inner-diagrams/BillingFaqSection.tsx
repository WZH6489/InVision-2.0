import type { InnerBillingFaq } from "@/types/innerPages";

type Props = {
  data: InnerBillingFaq;
};

export function BillingFaqSection({ data }: Props) {
  return (
    <section className="reveal is-visible" aria-labelledby="billing-faq-title">
      <p className="section-kicker">{data.kicker}</p>
      <h2 id="billing-faq-title" className="section-title">
        {data.title}
      </h2>
      <div className="faq-list">
        {data.items.map((item, i) => (
          <details key={i} name="billing-faq">
            <summary>{item.q}</summary>
            <div className="faq-a">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
