import type { InnerProseItem } from "@/types/innerPages";

type Props = {
  id: string;
  kicker?: string;
  title: string;
  lead?: string;
  items: InnerProseItem[];
};

/** Progressive disclosure for strict operating clauses (rules page). */
export function RulesAccordionSection({ id, kicker, title, lead, items }: Props) {
  return (
    <section className="lux-rules-acc reveal is-visible" aria-labelledby={`${id}-h`}>
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2 id={`${id}-h`} className="section-title">
        {title}
      </h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
      <div className="lux-accordion-list">
        {items.map((item, i) => (
          <details key={i} className="lux-accordion" name={id}>
            <summary className="lux-accordion__summary">{item.h}</summary>
            <div className="lux-accordion__panel">{item.p}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
