import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Sanatan Vision - Pandit Ji",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/sign-in">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>TERMS AND CONDITIONS</h1>
        <p>
          <strong>Last updated: December 22, 2025</strong>
        </p>

        <p>
          Please read these Terms and Conditions (&quot;Terms&quot;, &quot;Terms
          and Conditions&quot;) carefully before using the Sanatan Vision -
          Pandit Ji Astrologers application and website operated by Metadee Ai
          Pvt Ltd (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
        </p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using our Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the Service.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          Our Service allows astrologers to provide consultation services to
          users. You must be at least 18 years old to use this Service.
        </p>

        <h2>3. Astrologer Obligations</h2>
        <p>As an astrologer using our platform, you agree to:</p>
        <ul>
          <li>Provide accurate information during registration</li>
          <li>Maintain professional conduct during consultations</li>
          <li>Protect user data and maintain confidentiality</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of Metadee Ai Pvt Ltd.
        </p>

        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall Metadee Ai Pvt Ltd, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential or punitive damages.
        </p>

        <h2>7. Disclaimer</h2>
        <p>
          The astrological services provided through this platform are for
          entertainment and guidance purposes only. We do not guarantee the
          accuracy of any predictions or readings.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of India, without regard to its conflict of law provisions.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. We will provide notice of any changes by
          posting the new Terms on this page.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:contact@metadeegroup.com">contact@metadeegroup.com</a>
          .
        </p>

        <address className="not-italic">
          Metadee Ai Pvt Ltd
          <br />
          505, Ansal Chamber-1
          <br />
          3 Bhikaji Cama place
          <br />
          New Delhi, Delhi 110066
          <br />
          India
        </address>
      </article>
    </div>
  );
};

export default TermsAndConditionsPage;
