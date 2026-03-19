import { SimpleDoc } from "@/components/SimpleDoc";

export default function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <SimpleDoc params={params} ns="Services" />;
}
