import { InnerShell } from "@/components/InnerShell";

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="privacy" />;
}
