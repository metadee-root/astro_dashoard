import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Sanatan Vision - Pandit Ji",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/sign-in">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy – Sanatan Vision - Pandit Ji</h1>
        <p>
          <strong>Effective Date: December 22, 2025</strong>
          <br />
          <strong>Last Updated: December 22, 2025</strong>
        </p>

        <h2>1. Introduction</h2>
        <p>
          Sanatan Vision - Pandit Ji (&quot;Company&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) is committed to protecting the
          privacy, confidentiality, and security of personal information
          provided by astrologers who register on our mobile application and
          website (collectively, the &quot;Platform&quot;).
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, share, and
          protect information provided by astrologers during registration and
          while using the Platform.
        </p>
        <p>
          This Platform is only for astrologer (Pandit Ji) registration, profile
          management, and professional onboarding. No AI Astrologer or automated
          prediction services are used in this app.
        </p>
        <p>
          By registering or using the Platform, you confirm that you have read,
          understood, and agreed to this Privacy Policy. If you do not agree,
          please do not register or use the Platform.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>
          2.1 Information You Provide Directly (Astrologer Registration Data)
        </h3>

        <h4>Personal Identification Information:</h4>
        <ul>
          <li>Full name</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Date of birth</li>
          <li>Time of birth</li>
          <li>Gender (optional)</li>
          <li>Profile photograph</li>
          <li>Residential address (city, state, country)</li>
        </ul>

        <h4>Professional Information:</h4>
        <ul>
          <li>Astrological qualifications and certifications</li>
          <li>
            Areas of specialization (e.g., Vedic astrology, numerology, vastu,
            palmistry)
          </li>
          <li>Years of professional experience</li>
          <li>Languages spoken</li>
          <li>Biography and profile description</li>
        </ul>

        <h4>Verification and Compliance Information:</h4>
        <ul>
          <li>Government-issued ID (for identity verification)</li>
          <li>PAN card / Aadhaar (where legally required)</li>
          <li>Address proof (if required)</li>
        </ul>

        <h4>Financial Information (for payouts):</h4>
        <ul>
          <li>Bank account details</li>
          <li>IFSC code</li>
          <li>Account holder name</li>
          <li>Payout history</li>
        </ul>

        <h4>Services and Availability:</h4>
        <ul>
          <li>
            Consultation Prices for:
            <ul>
              <li>Chat Consultation</li>
              <li>Audio Consultation</li>
              <li>Video Consultation</li>
            </ul>
          </li>
          <li>Consultation availability and preferences</li>
          <li>Working days</li>
        </ul>

        <h4>Communication and Support Data:</h4>
        <ul>
          <li>Messages sent to support</li>
          <li>Verification-related communications</li>
          <li>Feedback and queries</li>
          <li>Complaint details</li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>

        <h4>Device Information:</h4>
        <ul>
          <li>Device type and model</li>
          <li>Operating system and version</li>
          <li>Device identifiers (IDFA, Android ID)</li>
          <li>IP address</li>
          <li>Mobile network information</li>
        </ul>

        <h4>Usage Data:</h4>
        <ul>
          <li>Pages/features accessed</li>
          <li>Time spent on features</li>
          <li>Clicks and interactions</li>
          <li>Search queries</li>
          <li>Consultation history</li>
          <li>Feature preferences</li>
        </ul>

        <h4>Location Data:</h4>
        <ul>
          <li>GPS location (only with explicit permission)</li>
          <li>Approximate location from IP address</li>
          <li>City and state information</li>
        </ul>

        <h4>Cookies and Tracking Technologies:</h4>
        <ul>
          <li>Session cookies</li>
          <li>Persistent cookies</li>
          <li>Analytics pixels</li>
          <li>Device fingerprinting</li>
          <li>Web beacons</li>
        </ul>

        <h4>Log Data:</h4>
        <ul>
          <li>Access timestamps</li>
          <li>Error logs</li>
          <li>API call logs</li>
          <li>Authentication logs</li>
        </ul>

        <h3>2.3 Information from Third Parties</h3>
        <ul>
          <li>Social media platforms (if you log in via social login)</li>
          <li>Payment gateways and processors</li>
          <li>Identity verification services</li>
          <li>Push notification services</li>
          <li>Analytics and marketing platforms</li>
          <li>Astrologer ratings from partner platforms</li>
        </ul>

        <h2>3. Purpose of Data Collection</h2>
        <p>We collect astrologer data strictly for the following purposes:</p>

        <h3>3.1 Registration and Verification</h3>
        <ul>
          <li>Create and manage astrologer accounts</li>
          <li>Verify identity, credentials, and eligibility</li>
          <li>Ensure platform authenticity and trust</li>
        </ul>

        <h3>3.2 Platform Operations</h3>
        <ul>
          <li>Enable profile creation and updates</li>
          <li>Manage availability and onboarding processes</li>
          <li>Facilitate communication with the Company</li>
        </ul>

        <h3>3.3 Payments and Compliance</h3>
        <ul>
          <li>Process astrologer payouts</li>
          <li>Maintain financial and tax records</li>
          <li>Comply with RBI, tax, and accounting regulations</li>
        </ul>

        <h3>3.4 Communication</h3>
        <ul>
          <li>Send verification updates</li>
          <li>Share important platform-related notifications</li>
          <li>Respond to support requests</li>
        </ul>

        <h3>3.5 Safety, Security, and Legal Compliance</h3>
        <ul>
          <li>Detect and prevent fraud</li>
          <li>Identify and prevent abuse</li>
          <li>Protect against unauthorized access</li>
          <li>Investigate and resolve complaints</li>
          <li>Maintain system security</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h3>3.6 Compliance and Legal</h3>
        <ul>
          <li>Comply with applicable laws and regulations</li>
          <li>Respond to government requests</li>
          <li>Enforce Terms and Conditions</li>
          <li>Protect company rights and property</li>
          <li>Maintain audit trails</li>
        </ul>

        <h3>3.7 Marketing and Analytics</h3>
        <ul>
          <li>Measure campaign effectiveness</li>
          <li>Analyze user behavior and trends</li>
          <li>Conduct A/B testing</li>
          <li>Create aggregate analytics</li>
          <li>Optimize conversion funnels</li>
        </ul>

        <h2>4. Legal Basis for Processing</h2>

        <h3>4.1 Consent</h3>
        <ul>
          <li>
            Explicit consent for optional services (marketing, analytics,
            location tracking)
          </li>
          <li>Opt-in consent for promotional communications</li>
          <li>Prior consent for cookie-based tracking</li>
        </ul>

        <h3>4.2 Contractual Necessity</h3>
        <ul>
          <li>Processing required to deliver services you&apos;ve requested</li>
          <li>Payment processing and billing</li>
          <li>Account management and authentication</li>
          <li>Consultation services</li>
        </ul>

        <h3>4.3 Legal Obligation</h3>
        <ul>
          <li>Compliance with applicable laws and regulations</li>
          <li>
            Anti-money laundering (AML) and Know Your Customer (KYC)
            requirements
          </li>
          <li>Tax and financial reporting</li>
          <li>Data retention requirements</li>
          <li>Response to legal process</li>
        </ul>

        <h3>4.4 Legitimate Interests</h3>
        <ul>
          <li>Platform security and fraud prevention</li>
          <li>Service improvement and optimization</li>
          <li>Protecting user safety</li>
          <li>Business operations and analytics</li>
          <li>Direct marketing (where permitted)</li>
        </ul>

        <h2>5. Data Sharing and Disclosure</h2>

        <h3>5.1 Data We May Share</h3>

        <h4>With Service Providers:</h4>
        <ul>
          <li>Payment processors (PCI-DSS compliant)</li>
          <li>Cloud hosting providers (AWS, Google Cloud)</li>
          <li>Email and SMS service providers</li>
          <li>Analytics providers (Google Analytics, Mixpanel)</li>
          <li>Push notification services</li>
          <li>Customer support tools</li>
          <li>Identity verification services</li>
        </ul>

        <h4>With Business Partners:</h4>
        <ul>
          <li>Aggregate analytics data</li>
          <li>Marketing partners (anonymized data only)</li>
          <li>Referral partners</li>
        </ul>

        <h4>With Legal Authorities:</h4>
        <ul>
          <li>Government agencies (with valid legal request)</li>
          <li>Law enforcement (in case of illegal activity)</li>
          <li>Regulatory bodies</li>
          <li>Court orders or subpoenas</li>
        </ul>

        <h3>5.2 Data We Do NOT Share</h3>
        <ul>
          <li>Astrologer personal data with advertisers</li>
          <li>Bank details with unauthorized third parties</li>
          <li>Identity documents for marketing purposes</li>
          <li>Personal information beyond stated purposes</li>
          <li>Financial information with unrelated third parties</li>
          <li>Complete chat histories without user request</li>
          <li>Personal data with unauthorized marketers</li>
          <li>Data for purposes other than stated above</li>
        </ul>

        <h3>5.3 Third-Party Links and Services</h3>
        <p>
          The Platform may contain links to third-party websites and services.
          We are not responsible for their privacy practices. We encourage you
          to read their privacy policies before providing any personal
          information.
        </p>

        <h2>6. Data Security</h2>

        <h3>6.1 Security Measures</h3>
        <p>
          We implement comprehensive security measures to protect your data:
        </p>

        <h4>Technical Security:</h4>
        <ul>
          <li>AES-256 encryption for data at rest</li>
          <li>TLS 1.3 encryption for data in transit</li>
          <li>End-to-end encryption for sensitive consultations</li>
          <li>Secure password hashing (bcrypt, Argon2)</li>
          <li>Multi-factor authentication (MFA) support</li>
          <li>Regular security audits and penetration testing</li>
          <li>Intrusion detection systems</li>
          <li>Web Application Firewall (WAF)</li>
        </ul>

        <h4>Organizational Security:</h4>
        <ul>
          <li>Limited employee access to personal data</li>
          <li>Confidentiality agreements with all staff</li>
          <li>Regular security training and awareness</li>
          <li>Background checks for sensitive positions</li>
          <li>Incident response procedures</li>
          <li>Data protection by design principles</li>
        </ul>

        <h4>Operational Security:</h4>
        <ul>
          <li>Regular database backups</li>
          <li>Disaster recovery procedures</li>
          <li>Secure deletion protocols</li>
          <li>Access logging and monitoring</li>
          <li>Change management procedures</li>
          <li>Vendor security assessments</li>
        </ul>

        <h3>6.2 Important Security Notice</h3>
        <p>
          While we implement robust security measures, no method of transmission
          over the internet or electronic storage is 100% secure. We cannot
          guarantee absolute security of your data. You use the Platform at your
          own risk.
        </p>

        <h2>7. Data Retention</h2>
        <p>We retain your personal data for the following periods:</p>

        <table>
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Retention Period</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account Information</td>
              <td>Duration of account + 3 years</td>
              <td>Legal compliance, dispute resolution</td>
            </tr>
            <tr>
              <td>Consultation Records</td>
              <td>5 years</td>
              <td>Service improvement, dispute resolution</td>
            </tr>
            <tr>
              <td>Payment Records</td>
              <td>7 years</td>
              <td>Tax and financial compliance</td>
            </tr>
            <tr>
              <td>Chat History</td>
              <td>User configurable (max 3 years)</td>
              <td>Service provision</td>
            </tr>
            <tr>
              <td>Marketing Data</td>
              <td>Until unsubscribe + 6 months</td>
              <td>Compliance with opt-out</td>
            </tr>
            <tr>
              <td>Support Tickets</td>
              <td>3 years</td>
              <td>Quality assurance</td>
            </tr>
            <tr>
              <td>Device Logs</td>
              <td>90 days</td>
              <td>Security and performance</td>
            </tr>
            <tr>
              <td>Location Data</td>
              <td>30 days</td>
              <td>Service optimization</td>
            </tr>
          </tbody>
        </table>

        <h2>8. Your Rights and Choices</h2>

        <h3>8.1 Data Principal Rights (DPDP Act, 2023)</h3>
        <p>
          Under India&apos;s Digital Personal Data Protection Act, you have the
          following rights:
        </p>

        <h4>Right to Access:</h4>
        <ul>
          <li>Request a copy of all personal data we hold about you</li>
          <li>Obtain information about data processing activities</li>
          <li>Receive data in a portable, structured format</li>
        </ul>

        <h4>Right to Correct:</h4>
        <ul>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request updates to your personal information</li>
          <li>Ensure data accuracy</li>
        </ul>

        <h4>Right to Erase:</h4>
        <ul>
          <li>Request deletion of your personal data</li>
          <li>Have data removed from active systems</li>
          <li>Request removal from backup systems (where feasible)</li>
        </ul>

        <h4>Right to Restrict Processing:</h4>
        <ul>
          <li>Limit how your data is used</li>
          <li>Opt-out of specific processing activities</li>
          <li>Withdraw consent for non-contractual processing</li>
        </ul>

        <h4>Right to Grievance Redressal:</h4>
        <ul>
          <li>Lodge complaints about data handling</li>
          <li>Request investigation of violations</li>
          <li>Seek compensation for damages</li>
        </ul>

        <h3>8.2 Communication Preferences</h3>
        <p>You can control how we communicate with you:</p>

        <h4>Email Communications:</h4>
        <ul>
          <li>Unsubscribe from marketing emails via link in each email</li>
          <li>Manage preferences in account settings</li>
          <li>Opt-out of specific communication types</li>
        </ul>

        <h4>Push Notifications:</h4>
        <ul>
          <li>Disable notifications in device settings</li>
          <li>Customize notification preferences in app</li>
          <li>Opt-out of promotional push notifications</li>
        </ul>

        <h4>SMS Communications:</h4>
        <ul>
          <li>Reply STOP to any SMS</li>
          <li>Manage SMS preferences in settings</li>
          <li>Request removal from SMS list</li>
        </ul>

        <h4>Personalization:</h4>
        <ul>
          <li>Opt-out of personalized recommendations</li>
          <li>Disable tracking and analytics</li>
          <li>Restrict location data collection</li>
        </ul>

        <h3>8.3 Cookie Management</h3>
        <p>You can control cookies through:</p>
        <ul>
          <li>Browser cookie settings</li>
          <li>Opt-out tools in account preferences</li>
          <li>Privacy settings on the Platform</li>
          <li>Do Not Track (DNT) settings in your browser</li>
        </ul>
        <p>
          Note: Disabling certain cookies may affect Platform functionality.
        </p>

        <h3>8.4 Location Data</h3>
        <ul>
          <li>We only collect GPS location with explicit permission</li>
          <li>You can revoke location permission in device settings</li>
          <li>
            Approximate location from IP address cannot be disabled without
            affecting service
          </li>
        </ul>

        <h2>9. Children&apos;s Data</h2>
        <p>
          This Platform is not intended for individuals under 18 years of age.
          We do not knowingly collect data from minors.
        </p>

        <h2>10. International Data Transfers</h2>

        <h3>10.1 Data Processing Location</h3>
        <p>
          Your data is primarily processed and stored in India. However, some
          processing may occur in:
        </p>
        <ul>
          <li>United States (AWS cloud services)</li>
          <li>European Union (GDPR-compliant providers)</li>
          <li>Other countries (identified in specific services)</li>
        </ul>

        <h3>10.2 Data Transfer Mechanisms</h3>
        <p>For international transfers, we use:</p>
        <ul>
          <li>Standard contractual clauses</li>
          <li>Privacy Shield equivalence assessments</li>
          <li>Adequacy decisions</li>
          <li>Explicit consent (where required)</li>
          <li>Localization for sensitive data</li>
        </ul>

        <h2>11. Data Protection Impact Assessment</h2>
        <p>
          As per Rule 13 of the DPDP Rules, 2025, Sanatan Vision - Pandit Ji
          conducts:
        </p>
        <ul>
          <li>Annual Data Protection Impact Assessment (DPIA)</li>
          <li>Compliance audit of all data handling practices</li>
          <li>Assessment of technical and algorithmic safeguards</li>
          <li>Review of data risks and mitigation measures</li>
          <li>Reporting to the Data Protection Board (if applicable)</li>
        </ul>
        <p>
          The findings of these assessments are used to improve our data
          protection practices continually.
        </p>

        <h2>12. Significant Data Fiduciary Obligations</h2>
        <p>
          If Sanatan Vision - Pandit Ji qualifies as a Significant Data
          Fiduciary under the DPDP Act:
        </p>
        <ul>
          <li>Annual DPIA and compliance audits (Rule 13)</li>
          <li>Data Protection Officer designation</li>
          <li>Enhanced security measures</li>
          <li>Vulnerability disclosure program</li>
          <li>Regular algorithm and system audits</li>
          <li>Data localization requirements</li>
          <li>Cross-border transfer protocols</li>
        </ul>

        <h2>13. Third-Party Services and Integrations</h2>

        <h3>13.1 Social Login</h3>
        <p>If you use social login (Google, Facebook, Apple), we receive:</p>
        <ul>
          <li>Basic profile information</li>
          <li>Email address</li>
          <li>Profile picture</li>
          <li>Device information</li>
        </ul>
        <p>Third-party privacy policies govern their data collection.</p>

        <h3>13.2 Payment Gateways</h3>
        <p>
          Payment processors handle your financial data according to their
          privacy policies and PCI-DSS standards. We do not store complete
          credit card information.
        </p>

        <h3>13.3 Analytics Providers</h3>
        <p>We use Google Analytics and similar tools that collect:</p>
        <ul>
          <li>Usage patterns</li>
          <li>Session information</li>
          <li>Device information</li>
          <li>Approximate location</li>
        </ul>
        <p>You can opt-out of the analytics collection.</p>

        <h2>14. Grievance Redressal</h2>

        <h3>14.1 Contact Us</h3>
        <p>For privacy concerns and grievances:</p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:contact@metadeegroup.com">
              contact@metadeegroup.com
            </a>
          </li>
          <li>Phone: +91-8779833529</li>
          <li>
            Address: Sanatan Vision - Pandit Ji C/O Metadee, Unit 505, Ansal
            Chambers 1, 3-Bhikaji Cama Place, New Delhi - 110066
          </li>
        </ul>
        <p>
          Response Time: We will acknowledge your grievance within 48 hours and
          provide resolution within 30 days.
        </p>

        <h3>14.2 Escalation</h3>
        <p>If you are unsatisfied with our response, you can:</p>
        <ul>
          <li>Appeal to the Data Protection Board (under DPDP Act)</li>
          <li>File a complaint with regulatory authorities</li>
          <li>Seek legal redress through courts</li>
        </ul>

        <h2>15. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices, technology, legal requirements, or other factors. We
          will:
        </p>
        <ul>
          <li>Post the updated policy on our website and app</li>
          <li>Update the &quot;Last Updated&quot; date</li>
          <li>Notify you of material changes via email</li>
          <li>Seek your consent for significant changes (where required)</li>
        </ul>
        <p>
          Your continued use of the Platform after any updates constitutes
          acceptance of the modified Privacy Policy.
        </p>

        <h2>16. Compliance and Regulatory Framework</h2>
        <p>This Privacy Policy complies with:</p>
        <ul>
          <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
          <li>Digital Personal Data Protection Rules, 2025</li>
          <li>Information Technology Act, 2000</li>
          <li>Consumer Protection Act, 2019</li>
          <li>Indian Contract Act, 1872</li>
          <li>RBI guidelines for payment systems</li>
          <li>GDPR (for European users)</li>
          <li>CCPA (for California users)</li>
          <li>Other applicable data protection laws</li>
        </ul>

        <h2>17. Contact Information</h2>
        <p>For all privacy-related inquiries:</p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:contact@metadeegroup.com">
              contact@metadeegroup.com
            </a>
          </li>
          <li>Phone: +91-8779833529</li>
          <li>
            Address: Sanatan Vision - Pandit Ji C/O Metadee, Unit 505, Ansal
            Chambers 1, 3-Bhikaji Cama Place, New Delhi - 110066
          </li>
        </ul>

        <hr />

        <p>
          By using Sanatan Vision - Pandit Ji, you acknowledge that you have
          read and understood this Privacy Policy and agree to its terms.
        </p>
        <p>
          This Privacy Policy is effective from December 22, 2025, and complies
          with India&apos;s Digital Personal Data Protection Act, 2023.
        </p>
      </article>
    </div>
  );
};

export default PrivacyPolicyPage;
