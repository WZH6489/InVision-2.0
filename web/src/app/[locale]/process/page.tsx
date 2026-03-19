import { InnerShell } from "@/components/InnerShell";

export default function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="process" />;
}
