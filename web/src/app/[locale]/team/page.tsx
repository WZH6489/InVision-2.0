import { InnerShell } from "@/components/InnerShell";

export default function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="team" />;
}
