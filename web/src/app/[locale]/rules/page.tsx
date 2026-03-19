import { InnerShell } from "@/components/InnerShell";

export default function RulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="rules" />;
}
