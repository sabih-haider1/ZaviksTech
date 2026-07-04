import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Privacy Policy" });

export default function PrivacyPolicyPage() {
  return (
    <section className="container pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
      <p className="meta flex items-center gap-4 text-accent">
        <span aria-hidden="true" className="h-px w-10 bg-accent" />
        Legal
      </p>
      <div className="prose-legal mt-8">
        <h1>Privacy Policy</h1>
        <p>
          ZaviksTech respects your privacy and only collects the information
          needed to respond to enquiries, provide services and maintain the
          security of our website and systems.
        </p>
        <h2>Information we collect</h2>
        <p>
          When you submit a contact or lead form, we may collect your name,
          email address, phone number, company name, service request and
          message. We may also retain basic technical data such as IP address
          for security and abuse prevention.
        </p>
        <h2>How we use information</h2>
        <p>
          We use your information to respond to enquiries, provide quotations,
          manage projects, send confirmation emails and improve our services.
        </p>
        <h2>Sharing</h2>
        <p>
          We do not sell your data. We may share it only with trusted service
          providers that help us operate our website, email and hosting
          infrastructure.
        </p>
        <h2>Retention</h2>
        <p>
          We keep enquiry records for as long as needed for business, legal and
          administrative purposes.
        </p>
        <h2>Contact</h2>
        <p>
          If you have questions about this policy, contact ZaviksTech through
          the details listed on our Contact page.
        </p>
      </div>
    </section>
  );
}