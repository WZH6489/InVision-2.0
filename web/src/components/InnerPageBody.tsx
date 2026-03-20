import { Fragment } from "react";
import { CaseStudyDiagram } from "@/components/inner-diagrams/CaseStudyDiagram";
import { PricingCompareTable } from "@/components/inner-diagrams/PricingCompareTable";
import { ProcessFlowDiagram } from "@/components/inner-diagrams/ProcessFlowDiagram";
import { ProcessTimelineNarrative } from "@/components/inner-diagrams/ProcessTimelineNarrative";
import type { InnerPagePayload } from "@/types/innerPages";

type Props = {
  data: InnerPagePayload;
  /** InnerShell route id (enables process/pricing diagrams). */
  page?: string;
};

export function InnerPageBody({ data, page }: Props) {
  const showProcessViz = page === "process";
  const showPricingTable = page === "pricing" && data.compareTable;

  return (
    <>
      {showProcessViz && data.flowLabels ? <ProcessFlowDiagram labels={data.flowLabels} /> : null}
      {showProcessViz && data.timeline ? <ProcessTimelineNarrative timeline={data.timeline} /> : null}
      {showPricingTable && data.compareTable ? <PricingCompareTable table={data.compareTable} /> : null}

      {data.stepsIntro && data.steps?.length ? (
        <section className="reveal is-visible" aria-labelledby="inner-steps-title">
          <p className="section-kicker">{data.stepsIntro.kicker}</p>
          <h2 id="inner-steps-title" className="section-title">
            {data.stepsIntro.title}
          </h2>
          <p className="section-lead">{data.stepsIntro.lead}</p>
          <div className="steps">
            {data.steps.map((s) => (
              <article key={s.num} className="step-card">
                <p className="step-card__num">{s.num}</p>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {data.prose?.length ? (
        <div className="prose-block reveal is-visible">
          {data.prose.map((item, i) => (
            <Fragment key={i}>
              <h3>{item.h}</h3>
              <p>{item.p}</p>
            </Fragment>
          ))}
        </div>
      ) : null}

      {data.legalProse?.length ? (
        <div className="prose reveal is-visible">
          {data.legalProse.map((item, i) => (
            <Fragment key={i}>
              <h2>{item.h}</h2>
              <p>{item.p}</p>
            </Fragment>
          ))}
        </div>
      ) : null}

      {data.spec ? (
        <section
          className="spec spec--terminal reveal is-visible"
          aria-labelledby="inner-spec-title"
        >
          <p className="section-kicker">{data.spec.kicker}</p>
          <h2 id="inner-spec-title" className="section-title">
            {data.spec.title}
          </h2>
          <p className="section-lead">{data.spec.lead}</p>
          {data.spec.articles.map((art, i) => (
            <article key={i}>
              <h2>{art.h}</h2>
              <p>{art.p}</p>
            </article>
          ))}
        </section>
      ) : null}

      {data.faqItems?.length ? (
        <div className="faq-list reveal is-visible">
          {data.faqItems.map((item, i) => (
            <details key={i} name="inner-faq">
              <summary>{item.q}</summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
        </div>
      ) : null}

      {data.trustLogos?.length ? (
        <div className="trust-logos reveal is-visible" aria-label="Partners">
          {data.trustLogos.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}

      {data.quotes?.length ? (
        <div className="prose-block reveal is-visible" style={{ marginTop: "1.5rem" }}>
          {data.quotes.map((q, i) => (
            <figure className="testimonial" key={i}>
              <blockquote>{q.quote}</blockquote>
              <footer>
                — <cite>{q.cite}</cite>
              </footer>
            </figure>
          ))}
        </div>
      ) : null}

      {data.cases?.length ? (
        <div className="case-row reveal is-visible">
          {data.cases.map((c, i) => (
            <div className="case-card" key={i}>
              <h3>{c.h}</h3>
              {c.diagram ? <CaseStudyDiagram variant={c.diagram} /> : null}
              {c.metrics ? (
                <div className="case-metrics">
                  <span className="before">{c.metrics.before}</span>
                  <span className="arrow">→</span>
                  <span className="after">{c.metrics.after}</span>
                </div>
              ) : null}
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      ) : null}

      {data.teamMission ? (
        <section className="mission reveal is-visible" style={{ border: "none", paddingTop: 0 }}>
          <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)", marginBottom: "0.75rem" }}>
            {data.teamMission}
          </h2>
          {data.teamTagline ? (
            <p style={{ fontSize: "1.0625rem", maxWidth: "40em" }}>{data.teamTagline}</p>
          ) : null}
        </section>
      ) : null}

      {data.teamMembers?.length ? (
        <div className="steps" style={{ marginTop: "2rem" }}>
          {data.teamMembers.map((m) => (
            <article key={m.name} className="team-member step-card">
              <div className="team-member__avatar" aria-hidden="true">
                {m.initial}
              </div>
              <h3>{m.name}</h3>
              <p className="role">{m.role}</p>
              <p>{m.bio}</p>
            </article>
          ))}
        </div>
      ) : null}

      {data.footnote ? <p className="footnote reveal is-visible">{data.footnote}</p> : null}
    </>
  );
}
