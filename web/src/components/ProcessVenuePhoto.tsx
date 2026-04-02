import Image from "next/image";
import type { InnerVenuePhoto } from "@/types/innerPages";

type Props = InnerVenuePhoto;

export function ProcessVenuePhoto({ kicker, alt, caption }: Props) {
  return (
    <figure className="inner-venue-photo reveal is-visible">
      {kicker ? <p className="section-kicker inner-venue-photo__kicker">{kicker}</p> : null}
      <div className="inner-venue-photo__frame">
        <Image
          src="/illustrations/sleeping-pods.png"
          alt={alt}
          fill
          sizes="(max-width: 899px) 100vw, min(960px, 92vw)"
          className="inner-venue-photo__img"
          priority={false}
        />
      </div>
      <figcaption className="inner-venue-photo__cap">{caption}</figcaption>
    </figure>
  );
}
