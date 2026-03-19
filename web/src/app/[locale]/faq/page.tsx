import { InnerShell } from "@/components/InnerShell";

export default function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="faq" />;
}
