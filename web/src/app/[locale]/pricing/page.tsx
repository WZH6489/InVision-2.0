import { InnerShell } from "@/components/InnerShell";

export default function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="pricing" />;
}
