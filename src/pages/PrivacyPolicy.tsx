
import React from 'react';
import PolicyPage from '@/components/contact/PolicyPage';

const PrivacyPolicy = () => {
  return (
    <PolicyPage title="Privacy Policy">
      <p className="mb-4">
        Last updated: April 10, 2025
      </p>

      <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Calendoodles ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our appointment scheduling service.
      </p>

      <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
      <p className="mb-4">
        We collect several types of information from and about users of our services:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Personal Information:</strong> Name, email address, phone number, and profile photos.</li>
        <li><strong>Usage Data:</strong> Information about how you use our services, including appointment history.</li>
        <li><strong>Device Information:</strong> Information about the device you use to access our services.</li>
        <li><strong>Communication Data:</strong> Communications we have with you, including customer support interactions.</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">3. How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Providing, maintaining, and improving our services</li>
        <li>Sending appointment confirmations, reminders, and important updates</li>
        <li>Processing payments and managing accounts</li>
        <li>Communicating with you about our services</li>
        <li>Analyzing usage patterns to enhance user experience</li>
        <li>Protecting our services and users from fraudulent or harmful activities</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">4. Sharing Your Information</h2>
      <p className="mb-4">
        We may share your information with:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Service Providers:</strong> Companies that perform services on our behalf, such as payment processing.</li>
        <li><strong>Business Partners:</strong> With your consent, we may share information with business partners who offer products or services that may interest you.</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights or the safety of users.</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">5. Your Choices</h2>
      <p className="mb-4">
        You can control your personal information in the following ways:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Update or correct your account information at any time</li>
        <li>Opt out of marketing communications</li>
        <li>Request access to or deletion of your personal information</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">6. Security</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
      </p>

      <h2 className="text-xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
      </p>

      <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this Privacy Policy, please contact us at privacy@calendoodles.com.
      </p>
    </PolicyPage>
  );
};

export default PrivacyPolicy;
