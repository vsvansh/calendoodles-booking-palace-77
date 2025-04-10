
import PolicyPage from "@/components/contact/PolicyPage";

const PrivacyPolicy = () => {
  return (
    <PolicyPage title="Privacy Policy">
      <h2>Introduction</h2>
      <p>
        This Privacy Policy explains how Calendoodles ("we", "us", "our") collects, uses, and discloses your personal information when you use our scheduling and appointment management service.
      </p>
      
      <h2>Information We Collect</h2>
      <p>
        We collect information that you provide directly to us, such as when you create an account, schedule appointments, or contact us for support.
      </p>
      
      <h3>Personal Information</h3>
      <ul>
        <li>Name, email address, and contact information</li>
        <li>Profile information and preferences</li>
        <li>Calendar data and scheduling information</li>
        <li>Communications with us and other users</li>
      </ul>
      
      <h3>Usage Information</h3>
      <ul>
        <li>Log data and device information</li>
        <li>Cookies and tracking technologies</li>
        <li>Analytics information about how you use our services</li>
      </ul>
      
      <h2>How We Use Your Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and send related information</li>
        <li>Send technical notices, updates, security alerts, and support messages</li>
        <li>Respond to your comments and questions</li>
        <li>Personalize your experience</li>
        <li>Monitor and analyze trends and usage</li>
        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
        <li>Comply with our legal obligations</li>
      </ul>
      
      <h2>Data Retention</h2>
      <p>
        We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
      </p>
      
      <h2>Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>
      
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at privacy@calendoodles.com.
      </p>
      
      <p className="text-sm text-gray-500 mt-8">
        Last updated: April 10, 2025
      </p>
    </PolicyPage>
  );
};

export default PrivacyPolicy;
