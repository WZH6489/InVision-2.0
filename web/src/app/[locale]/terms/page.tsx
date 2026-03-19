import { InnerShell } from "@/components/InnerShell";

export default function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="terms" />;
}
