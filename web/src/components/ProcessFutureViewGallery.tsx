import Image from "next/image";
import type { InnerFutureViewGallery } from "@/types/innerPages";

const FUTURE_VIEW_SRC = [
  "/illustrations/vision-pro-portrait.png",
  "/illustrations/vision-pro-immersive-seated.png",
  "/illustrations/vision-pro-immersive-standing.png",
] as const;

type Props = InnerFutureViewGallery;

export function ProcessFutureViewGallery({ kicker, title, lead, items }: Props) {
  const n = Math.min(items.length, FUTURE_VIEW_SRC.length);

  return (
    <section
      className="process-future-gallery reveal is-visible"
      aria-labelledby="process-future-gallery-h"
    >
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2 id="process-future-gallery-h" className="section-title">
        {title}
      </h2>
      {lead ? <p className="section-lead process-future-gallery__lead">{lead}</p> : null}

      <div className="process-future-gallery__grid">
        {items.slice(0, n).map((item, i) => (
          <figure key={i} className="process-future-gallery__figure">
            <div className="process-future-gallery__frame">
              <Image
                src={FUTURE_VIEW_SRC[i]}
                alt={item.alt}
                fill
                sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 31vw"
                className="process-future-gallery__img"
                priority={false}
              />
            </div>
            <figcaption className="process-future-gallery__cap">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
