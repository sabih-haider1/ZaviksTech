import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms of Service" });

export default function TermsPage() {
  return (
    <section className="container pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
      <p className="meta flex items-center gap-4 text-accent">
        <span aria-hidden="true" className="h-px w-10 bg-accent" />
        Legal
      </p>
      <div className="prose-legal mt-8">
        <h1>Terms of Service</h1>
        <p>
          These terms describe the basis on which ZaviksTech provides website,
          IT and digital services. By using this site or engaging our services,
          you agree to these terms.
        </p>
        <h2>Scope of work</h2>
        <p>
          Each project is defined by its agreed proposal, scope, timeline and
          commercial terms. Any work outside that scope may require additional
          approval or fees.
        </p>
        <h2>Client responsibilities</h2>
        <p>
          You agree to provide accurate information, timely feedback and any
          materials required for us to complete the work.
        </p>
        <h2>Payments</h2>
        <p>
          Payment terms will be confirmed in the relevant proposal or invoice.
          Work may pause if agreed payments are overdue.
        </p>
        <h2>Service availability</h2>
        <p>
          We aim to provide reliable service, but we do not guarantee
          uninterrupted website availability or delivery outcomes outside the
          agreed scope.
        </p>
        <h2>Limitation</h2>
        <p>
          To the extent permitted by law, ZaviksTech will not be liable for
          indirect or consequential losses arising from use of our website or
          services.
        </p>
      </div>
    </section>
  );
}