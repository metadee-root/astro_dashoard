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
        <h1>PRIVACY POLICY</h1>
        <p>
          <strong>Last updated: December 22, 2025</strong>
        </p>

        <p>
          This Privacy Notice for Metadee Ai Pvt Ltd (&apos;we&apos;,
          &apos;us&apos;, or &apos;our&apos;), describes how and why we might
          access, collect, store, use, and/or share (&apos;process&apos;) your
          personal information when you use our services (&apos;Services&apos;),
          including when you:
        </p>
        <ul>
          <li>
            Visit our website at{" "}
            <a href="https://astrologer.sanatanvision.com">
              https://astrologer.sanatanvision.com
            </a>{" "}
            or any website of ours that links to this Privacy Notice
          </li>
          <li>
            Download and use our mobile application (astrologer-sanatanvision),
            or any other application of ours that links to this Privacy Notice
          </li>
          <li>
            Engage with us in other related ways, including any marketing or
            events
          </li>
        </ul>

        <p>
          <strong>Questions or concerns?</strong> Reading this Privacy Notice
          will help you understand your privacy rights and choices. We are
          responsible for making decisions about how your personal information
          is processed. If you do not agree with our policies and practices,
          please do not use our Services. If you still have any questions or
          concerns, please contact us at{" "}
          <a href="mailto:contact@metadeegroup.com">contact@metadeegroup.com</a>
          .
        </p>

        <h2>SUMMARY OF KEY POINTS</h2>
        <p>
          <em>
            This summary provides key points from our Privacy Notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our{" "}
            <a href="#toc">table of contents</a> below to find the section you
            are looking for.
          </em>
        </p>

        <p>
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use. Learn
          more about{" "}
          <a href="#personalinfo">personal information you disclose to us</a>.
        </p>

        <p>
          <strong>Do we process any sensitive personal information?</strong>{" "}
          Some of the information may be considered &apos;special&apos; or
          &apos;sensitive&apos; in certain jurisdictions, for example your
          racial or ethnic origins, sexual orientation, and religious beliefs.
          We may process sensitive personal information when necessary with your
          consent or as otherwise permitted by applicable law. Learn more about{" "}
          <a href="#sensitiveinfo">sensitive information we process</a>.
        </p>

        <p>
          <strong>Do we collect any information from third parties?</strong> We
          do not collect any information from third parties.
        </p>

        <p>
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so. Learn more about{" "}
          <a href="#infouse">how we process your information</a>.
        </p>

        <p>
          <strong>
            In what situations and with which parties do we share personal
            information?
          </strong>{" "}
          We may share information in specific situations and with specific
          third parties. Learn more about{" "}
          <a href="#whoshare">
            when and with whom we share your personal information
          </a>
          .
        </p>

        <p>
          <strong>How do we keep your information safe?</strong> We have
          adequate organisational and technical processes and procedures in
          place to protect your personal information. However, no electronic
          transmission over the internet or information storage technology can
          be guaranteed to be 100% secure, so we cannot promise or guarantee
          that hackers, cybercriminals, or other unauthorised third parties will
          not be able to defeat our security and improperly collect, access,
          steal, or modify your information. Learn more about{" "}
          <a href="#infosafe">how we keep your information safe</a>.
        </p>

        <p>
          <strong>What are your rights?</strong> Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Learn more about{" "}
          <a href="#privacyrights">your privacy rights</a>.
        </p>

        <p>
          <strong>How do you exercise your rights?</strong> The easiest way to
          exercise your rights is by submitting a{" "}
          <a
            href="https://app.termly.io/dsar/04f02217-09f4-4094-99f4-b57076c64489"
            target="_blank"
            rel="noopener noreferrer"
          >
            data subject access request
          </a>
          , or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </p>

        <p>
          Want to learn more about what we do with any information we collect?{" "}
          <a href="#toc">Review the Privacy Notice in full</a>.
        </p>

        <h2 id="toc">TABLE OF CONTENTS</h2>
        <ol>
          <li>
            <a href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>
          </li>
          <li>
            <a href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a>
          </li>
          <li>
            <a href="#whoshare">
              WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </li>
          <li>
            <a href="#cookies">
              DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </a>
          </li>
          <li>
            <a href="#ai">
              DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
            </a>
          </li>
          <li>
            <a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
          </li>
          <li>
            <a href="#inforetain">HOW LONG DO WE KEEP YOUR INFORMATION?</a>
          </li>
          <li>
            <a href="#infosafe">HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
          </li>
          <li>
            <a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a>
          </li>
          <li>
            <a href="#DNT">CONTROLS FOR DO-NOT-TRACK FEATURES</a>
          </li>
          <li>
            <a href="#otherlaws">
              DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
            </a>
          </li>
          <li>
            <a href="#clausea">COMPLIANCE AND DISCLAIMER</a>
          </li>
          <li>
            <a href="#clauseb">CHILDREN&apos;S PRIVACY</a>
          </li>
          <li>
            <a href="#clausec">USER RIGHTS AND CONSENT</a>
          </li>
          <li>
            <a href="#claused">SENSITIVE DATA HANDLING</a>
          </li>
          <li>
            <a href="#policyupdates">DO WE MAKE UPDATES TO THIS NOTICE?</a>
          </li>
          <li>
            <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
          </li>
          <li>
            <a href="#request">
              HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </a>
          </li>
        </ol>

        <h2 id="infocollect">1. WHAT INFORMATION DO WE COLLECT?</h2>

        <h3 id="personalinfo">Personal information you disclose to us</h3>
        <p>
          <em>
            <strong>In Short:</strong> We collect personal information that you
            provide to us.
          </em>
        </p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </p>
        <p>
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </p>
        <ul>
          <li>names</li>
          <li>phone numbers</li>
          <li>email addresses</li>
          <li>contact or authentication data</li>
        </ul>

        <p id="sensitiveinfo">
          <strong>Sensitive Information.</strong> When necessary, with your
          consent or as otherwise permitted by applicable law, we process the
          following categories of sensitive information.
        </p>

        <p>
          <strong>Payment Data.</strong> We may collect data necessary to
          process your payment if you choose to make purchases, such as your
          payment instrument number, and the security code associated with your
          payment instrument. All payment data is handled and stored by
          razorpay/IAP. You may find their privacy notice link(s) here:{" "}
          <a
            href="https://razorpay.com/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://razorpay.com/privacy/
          </a>
          .
        </p>

        <p>
          <strong>Social Media Login Data.</strong> We may provide you with the
          option to register with us using your existing social media account
          details, like your Facebook, X, or other social media account. If you
          choose to register in this way, we will collect certain profile
          information about you from the social media provider, as described in
          the section called{" "}
          <a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>{" "}
          below.
        </p>

        <p>
          <strong>Application Data.</strong> If you use our application(s), we
          also may collect the following information if you choose to provide us
          with access or permission:
        </p>
        <ul>
          <li>
            <em>Geolocation Information.</em> We may request access or
            permission to track location-based information from your mobile
            device, either continuously or while you are using our mobile
            application(s), to provide certain location-based services. If you
            wish to change our access or permissions, you may do so in your
            device&apos;s settings.
          </li>
          <li>
            <em>Push Notifications.</em> We may request to send you push
            notifications regarding your account or certain features of the
            application(s). If you wish to opt out from receiving these types of
            communications, you may turn them off in your device&apos;s
            settings.
          </li>
        </ul>
        <p>
          This information is primarily needed to maintain the security and
          operation of our application(s), for troubleshooting, and for our
          internal analytics and reporting purposes.
        </p>
        <p>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>

        <h3>Information automatically collected</h3>
        <p>
          <em>
            <strong>In Short:</strong> Some information — such as your Internet
            Protocol (IP) address and/or browser and device characteristics — is
            collected automatically when you visit our Services.
          </em>
        </p>
        <p>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </p>
        <p>
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </p>
        <p>The information we collect includes:</p>
        <ul>
          <li>
            <em>Log and Usage Data.</em> Log and usage data is service-related,
            diagnostic, usage, and performance information our servers
            automatically collect when you access or use our Services and which
            we record in log files. Depending on how you interact with us, this
            log data may include your IP address, device information, browser
            type, and settings and information about your activity in the
            Services (such as the date/time stamps associated with your usage,
            pages and files viewed, searches, and other actions you take such as
            which features you use), device event information (such as system
            activity, error reports (sometimes called &apos;crash dumps&apos;),
            and hardware settings).
          </li>
          <li>
            <em>Location Data.</em> We collect location data such as information
            about your device&apos;s location, which can be either precise or
            imprecise. How much information we collect depends on the type and
            settings of the device you use to access the Services. For example,
            we may use GPS and other technologies to collect geolocation data
            that tells us your current location (based on your IP address). You
            can opt out of allowing us to collect this information either by
            refusing access to the information or by disabling your Location
            setting on your device. However, if you choose to opt out, you may
            not be able to use certain aspects of the Services.
          </li>
        </ul>

        <h3>Google API</h3>
        <p>
          Our use of information received from Google APIs will adhere to{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Limited Use requirements
          </a>
          .
        </p>

        <h2 id="infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
        <p>
          <em>
            <strong>In Short:</strong> We process your information to provide,
            improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We may also
            process your information for other purposes with your consent.
          </em>
        </p>
        <p>
          <strong>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </strong>
        </p>
        <ul>
          <li>
            <strong>
              To facilitate account creation and authentication and otherwise
              manage user accounts.
            </strong>{" "}
            We may process your information so you can create and log in to your
            account, as well as keep your account in working order.
          </li>
          <li>
            <strong>
              To deliver and facilitate delivery of services to the user.
            </strong>{" "}
            We may process your information to provide you with the requested
            service.
          </li>
          <li>
            <strong>
              To respond to user inquiries/offer support to users.
            </strong>{" "}
            We may process your information to respond to your inquiries and
            solve any potential issues you might have with the requested
            service.
          </li>
          <li>
            <strong>To request feedback.</strong> We may process your
            information when necessary to request feedback and to contact you
            about your use of our Services.
          </li>
          <li>
            <strong>
              To send you marketing and promotional communications.
            </strong>{" "}
            We may process the personal information you send to us for our
            marketing purposes, if this is in accordance with your marketing
            preferences. You can opt out of our marketing emails at any time.
            For more information, see{" "}
            <a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a> below.
          </li>
          <li>
            <strong>To deliver targeted advertising to you.</strong> We may
            process your information to develop and display personalised content
            and advertising tailored to your interests, location, and more.
          </li>
          <li>
            <strong>To comply with our legal obligations.</strong> We may
            process your information to comply with our legal obligations,
            respond to legal requests, and exercise, establish, or defend our
            legal rights.
          </li>
        </ul>

        <h2 id="whoshare">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </h2>
        <p>
          <em>
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following third
            parties.
          </em>
        </p>
        <p>
          We may need to share your personal information in the following
          situations:
        </p>
        <ul>
          <li>
            <strong>Business Transfers.</strong> We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
          </li>
          <li>
            <strong>When we use Google Maps Platform APIs.</strong> We may share
            your information with certain Google Maps Platform APIs (e.g. Google
            Maps API, Places API). We use certain Google Maps Platform APIs to
            retrieve certain information when you make location-specific
            requests. Google Maps uses GPS, Wi-Fi, and cell towers to estimate
            your location. GPS is accurate to about 20 meters, while Wi-Fi and
            cell towers help improve accuracy when GPS signals are weak, like
            indoors. This data helps Google Maps provide directions, but it is
            not always perfectly precise. The Google Maps Platform APIs that we
            use store and access cookies and other information on your devices.
            If you are a user currently in the European Economic Area (EU
            countries, Iceland, Liechtenstein, and Norway) or the United
            Kingdom, please take a look at our Cookie Notice.
          </li>
          <li>
            <strong>Offer Wall.</strong> Our application(s) may display a
            third-party hosted &apos;offer wall&apos;. Such an offer wall allows
            third-party advertisers to offer virtual currency, gifts, or other
            items to users in return for the acceptance and completion of an
            advertisement offer. Such an offer wall may appear in our
            application(s) and be displayed to you based on certain data, such
            as your geographic area or demographic information. When you click
            on an offer wall, you will be brought to an external website
            belonging to other persons and will leave our application(s). A
            unique identifier, such as your user ID, will be shared with the
            offer wall provider in order to prevent fraud and properly credit
            your account with the relevant reward.
          </li>
        </ul>

        <h2 id="cookies">
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </h2>
        <p>
          <em>
            <strong>In Short:</strong> We may use cookies and other tracking
            technologies to collect and store your information.
          </em>
        </p>
        <p>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to gather information when you interact with our Services.
          Some online tracking technologies help us maintain the security of our
          Services and your account, prevent crashes, fix bugs, save your
          preferences, and assist with basic site functions.
        </p>
        <p>
          We also permit third parties and service providers to use online
          tracking technologies on our Services for analytics and advertising,
          including to help manage and display advertisements, to tailor
          advertisements to your interests, or to send abandoned shopping cart
          reminders (depending on your communication preferences). The third
          parties and service providers use their technology to provide
          advertising about products and services tailored to your interests
          which may appear either on our Services or on other websites.
        </p>
        <p>
          Specific information about how we use such technologies and how you
          can refuse certain cookies is set out in our Cookie Notice.
        </p>

        <h3>Google Analytics</h3>
        <p>
          We may share your information with Google Analytics to track and
          analyse the use of the Services. The Google Analytics Advertising
          Features that we may use include: Google Analytics Demographics and
          Interests Reporting. To opt out of being tracked by Google Analytics
          across the Services, visit{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tools.google.com/dlpage/gaoptout
          </a>
          . You can opt out of Google Analytics Advertising Features through{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ads Settings
          </a>{" "}
          and Ad Settings for mobile apps. Other opt out means include{" "}
          <a
            href="http://optout.networkadvertising.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://optout.networkadvertising.org/
          </a>{" "}
          and{" "}
          <a
            href="http://www.networkadvertising.org/mobile-choice"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.networkadvertising.org/mobile-choice
          </a>
          . For more information on the privacy practices of Google, please
          visit the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy & Terms page
          </a>
          .
        </p>

        <h2 id="ai">5. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2>
        <p>
          <em>
            <strong>In Short:</strong> We offer products, features, or tools
            powered by artificial intelligence, machine learning, or similar
            technologies.
          </em>
        </p>
        <p>
          As part of our Services, we offer products, features, or tools powered
          by artificial intelligence, machine learning, or similar technologies
          (collectively, &apos;AI Products&apos;). These tools are designed to
          enhance your experience and provide you with innovative solutions. The
          terms in this Privacy Notice govern your use of the AI Products within
          our Services.
        </p>

        <h3>Use of AI Technologies</h3>
        <p>
          We provide the AI Products through third-party service providers
          (&apos;AI Service Providers&apos;), including Amazon Web Services
          (AWS) AI. As outlined in this Privacy Notice, your input, output, and
          personal information will be shared with and processed by these AI
          Service Providers to enable your use of our AI Products for purposes
          outlined in{" "}
          <a href="#whoshare">
            WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </a>{" "}
          You must not use the AI Products in any way that violates the terms or
          policies of any AI Service Provider.
        </p>

        <h3>Our AI Products</h3>
        <p>Our AI Products are designed for the following functions:</p>
        <ul>
          <li>AI bots</li>
        </ul>

        <h3>How We Process Your Data Using AI</h3>
        <p>
          All personal information processed using our AI Products is handled in
          line with our Privacy Notice and our agreement with third parties.
          This ensures high security and safeguards your personal information
          throughout the process, giving you peace of mind about your
          data&apos;s safety.
        </p>

        <h3>How to Opt Out</h3>
        <p>
          We believe in giving you the power to decide how your data is used. To
          opt out, you can:
        </p>
        <ul>
          <li>Contact us using the contact information provided</li>
          <li>Log in to your account settings and update your user account</li>
        </ul>

        <h2 id="sociallogins">6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
        <p>
          <em>
            <strong>In Short:</strong> If you choose to register or log in to
            our Services using a social media account, we may have access to
            certain information about you.
          </em>
        </p>
        <p>
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Facebook or X
          logins). Where you choose to do this, we will receive certain profile
          information about you from your social media provider. The profile
          information we receive may vary depending on the social media provider
          concerned, but will often include your name, email address, friends
          list, and profile picture, as well as other information you choose to
          make public on such a social media platform.
        </p>
        <p>
          We will use the information we receive only for the purposes that are
          described in this Privacy Notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use, and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </p>

        <h2 id="inforetain">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
        <p>
          <em>
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfil the purposes outlined in this Privacy Notice
            unless otherwise required by law.
          </em>
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this Privacy Notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than six
          (6) months past the termination of the user&apos;s account.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymise such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>

        <h2 id="infosafe">8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <p>
          <em>
            <strong>In Short:</strong> We aim to protect your personal
            information through a system of organisational and technical
            security measures.
          </em>
        </p>
        <p>
          We have implemented appropriate and reasonable technical and
          organisational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorised third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </p>

        <h2 id="privacyrights">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        <p>
          <em>
            <strong>In Short:</strong> You may review, change, or terminate your
            account at any time, depending on your country, province, or state
            of residence.
          </em>
        </p>

        <h3>Withdrawing your consent</h3>
        <p>
          If we are relying on your consent to process your personal
          information, which may be express and/or implied consent depending on
          the applicable law, you have the right to withdraw your consent at any
          time. You can withdraw your consent at any time by contacting us by
          using the contact details provided in the section{" "}
          <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>{" "}
          below.
        </p>
        <p>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </p>

        <h3>Opting out of marketing and promotional communications</h3>
        <p>
          You can unsubscribe from our marketing and promotional communications
          at any time by clicking on the unsubscribe link in the emails that we
          send, replying &apos;STOP&apos; or &apos;UNSUBSCRIBE&apos; to the SMS
          messages that we send, or by contacting us using the details provided
          in the section{" "}
          <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>{" "}
          below. You will then be removed from the marketing lists. However, we
          may still communicate with you — for example, to send you
          service-related messages that are necessary for the administration and
          use of your account, to respond to service requests, or for other
          non-marketing purposes.
        </p>

        <h3>Account Information</h3>
        <p>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </p>
        <ul>
          <li>Log in to your account settings and update your user account.</li>
        </ul>
        <p>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
        </p>

        <h3>Cookies and similar technologies</h3>
        <p>
          Most Web browsers are set to accept cookies by default. If you prefer,
          you can usually choose to set your browser to remove cookies and to
          reject cookies. If you choose to remove cookies or reject cookies,
          this could affect certain features or services of our Services.
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at{" "}
          <a href="mailto:contact@metadeegroup.com">contact@metadeegroup.com</a>
          .
        </p>

        <h2 id="DNT">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
        <p>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (&apos;DNT&apos;) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage, no uniform technology standard for recognising and
          implementing DNT signals has been finalised. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this Privacy Notice.
        </p>

        <h2 id="otherlaws">
          11. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
        </h2>
        <p>
          <em>
            <strong>In Short:</strong> You may have additional rights based on
            the country you reside in.
          </em>
        </p>

        <h3>Australia and New Zealand</h3>
        <p>
          We collect and process your personal information under the obligations
          and conditions set by Australia&apos;s Privacy Act 1988 and New
          Zealand&apos;s Privacy Act 2020 (Privacy Act).
        </p>
        <p>
          This Privacy Notice satisfies the notice requirements defined in both
          Privacy Acts, in particular: what personal information we collect from
          you, from which sources, for which purposes, and other recipients of
          your personal information.
        </p>
        <p>
          If you do not wish to provide the personal information necessary to
          fulfil their applicable purpose, it may affect our ability to provide
          our services, in particular:
        </p>
        <ul>
          <li>offer you the products or services that you want</li>
          <li>respond to or help with your requests</li>
          <li>manage your account with us</li>
          <li>confirm your identity and protect your account</li>
        </ul>
        <p>
          At any time, you have the right to request access to or correction of
          your personal information. You can make such a request by contacting
          us by using the contact details provided in the section{" "}
          <a href="#request">
            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </a>
        </p>
        <p>
          If you believe we are unlawfully processing your personal information,
          you have the right to submit a complaint about a breach of the
          Australian Privacy Principles to the{" "}
          <a
            href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            Office of the Australian Information Commissioner
          </a>{" "}
          and a breach of New Zealand&apos;s Privacy Principles to the{" "}
          <a
            href="https://www.privacy.org.nz/your-rights/making-a-complaint/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Office of New Zealand Privacy Commissioner
          </a>
          .
        </p>

        <h3>Republic of South Africa</h3>
        <p>
          At any time, you have the right to request access to or correction of
          your personal information. You can make such a request by contacting
          us by using the contact details provided in the section{" "}
          <a href="#request">
            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </a>
        </p>
        <p>
          If you are unsatisfied with the manner in which we address any
          complaint with regard to our processing of personal information, you
          can contact the office of the regulator, the details of which are:
        </p>
        <p>
          <a
            href="https://inforegulator.org.za/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Information Regulator (South Africa)
          </a>
          <br />
          General enquiries:{" "}
          <a href="mailto:enquiries@inforegulator.org.za">
            enquiries@inforegulator.org.za
          </a>
          <br />
          Complaints (complete POPIA/PAIA form 5):{" "}
          <a href="mailto:PAIAComplaints@inforegulator.org.za">
            PAIAComplaints@inforegulator.org.za
          </a>{" "}
          &amp;{" "}
          <a href="mailto:POPIAComplaints@inforegulator.org.za">
            POPIAComplaints@inforegulator.org.za
          </a>
        </p>

        <h2 id="clausea">12. COMPLIANCE AND DISCLAIMER</h2>
        <p>
          Policies reference GDPR, CCPA, IT (Reasonable Security Practices)
          Rules 2011, and appoint a Grievance Officer for India users. No
          liability for prediction accuracy or user mental health risks; data
          may share with law enforcement if needed. International data transfers
          use safeguards like standard clauses for non-EU servers.
        </p>

        <h2 id="clauseb">13. CHILDREN&apos;S PRIVACY</h2>
        <p>
          Services target users over 18; no knowing collection from under-13s,
          with immediate deletion if discovered. Age verification via birth date
          prevents minors&apos; access to paid features.
        </p>

        <h2 id="clausec">14. USER RIGHTS AND CONSENT</h2>
        <p>
          Explicit opt-in consent covers processing birth data for horoscopes,
          with easy deletion options via app settings. For voice/audio queries,
          microphone access requires separate permission, used only for chat
          processing.
        </p>

        <h2 id="claused">15. SENSITIVE DATA HANDLING</h2>
        <p>
          Birth date, time, place, and location data qualify as sensitive
          personal information used solely for astrological predictions and
          services. Apps commit not to sell, rent, or share this data indirectly
          through predictions, except for explicit service delivery to the user.
          Astrologers or service providers access limited data only as needed,
          with assurances of non-disclosure beyond consultations. Data
          minimization limits collection to essentials, with retention only as
          long as necessary for services.
        </p>

        <h2 id="policyupdates">16. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
        <p>
          <em>
            <strong>In Short:</strong> Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </em>
        </p>
        <p>
          We may update this Privacy Notice from time to time. The updated
          version will be indicated by an updated &apos;Revised&apos; date at
          the top of this Privacy Notice. If we make material changes to this
          Privacy Notice, we may notify you either by prominently posting a
          notice of such changes or by directly sending you a notification. We
          encourage you to review this Privacy Notice frequently to be informed
          of how we are protecting your information.
        </p>

        <h2 id="contact">17. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
        <p>
          If you have questions or comments about this notice, you may email us
          at{" "}
          <a href="mailto:contact@metadeegroup.com">contact@metadeegroup.com</a>{" "}
          or contact us by post at:
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

        <h2 id="request">
          18. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </h2>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          details about how we have processed it, correct inaccuracies, or
          delete your personal information. You may also have the right to
          withdraw your consent to our processing of your personal information.
          These rights may be limited in some circumstances by applicable law.
          To request to review, update, or delete your personal information,
          please fill out and submit a{" "}
          <a
            href="https://app.termly.io/dsar/04f02217-09f4-4094-99f4-b57076c64489"
            target="_blank"
            rel="noopener noreferrer"
          >
            data subject access request
          </a>
          .
        </p>
      </article>
    </div>
  );
};

export default PrivacyPolicyPage;
