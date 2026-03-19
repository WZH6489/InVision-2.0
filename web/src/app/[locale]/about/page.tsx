import { SimpleDoc } from "@/components/SimpleDoc";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <SimpleDoc params={params} ns="About" />;
}
