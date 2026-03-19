import { InnerShell } from "@/components/InnerShell";

export default function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <InnerShell params={params} page="testimonials" />;
}
