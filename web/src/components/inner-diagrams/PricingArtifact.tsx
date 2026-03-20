import type { InnerPricingArtifact } from "@/types/innerPages";

const strongStyle = { color: "rgba(232, 236, 244, 0.92)" as const };

type Props = {
  data: InnerPricingArtifact;
};

export function PricingArtifact({ data }: Props) {
  return (
    <section id="artifact" className="artifact reveal is-visible" aria-labelledby="artifact-title">
      <p className="section-kicker">{data.kicker}</p>
      <h2 id="artifact-title" className="section-title">
        {data.title}
      </h2>
      <p className="section-lead">{data.lead}</p>
      <div className="artifact__grid">
        <div>
          <h3 className="section-title" style={{ fontSize: "1.0625rem", marginBottom: "0.75rem" }}>
            {data.columnTitle}
          </h3>
          <p style={{ fontSize: "0.9375rem", maxWidth: "36em" }}>
            <strong style={strongStyle}>{data.bold1}</strong>
            {data.part1}
            <strong style={strongStyle}>{data.bold2}</strong>
            {data.part2}
          </p>
        </div>
        <div className="artifact__mock" aria-hidden="true">
          <div className="artifact__mock-header">
            <span>{data.mockHeader}</span>
            <div className="artifact__mock-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="artifact__mock-body">
            <span className="artifact__seal">{data.mockSeal}</span>
            <div className="artifact__rows">
              <div className="artifact__row" />
              <div className="artifact__row artifact__row--short" />
              <div className="artifact__row artifact__row--redact" />
              <div className="artifact__row" />
            </div>
            <div className="artifact__panel">
              <div className="artifact__panel-title">{data.mockPanelTitle}</div>
              <div className="artifact__path-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
