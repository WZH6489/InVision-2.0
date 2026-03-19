import { SimpleDoc } from "@/components/SimpleDoc";

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <SimpleDoc params={params} ns="Contact" />;
}
