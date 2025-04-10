
import React from 'react';
import PolicyPage from '@/components/contact/PolicyPage';

const TermsOfService = () => {
  return (
    <PolicyPage title="Terms of Service">
      <p className="mb-4">
        Last updated: April 10, 2025
      </p>

      <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using Calendoodles ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you should not use the Service.
      </p>

      <h2 className="text-xl font-bold mb-4">2. Description of Service</h2>
      <p className="mb-4">
        Calendoodles provides an appointment scheduling platform that allows users to create, manage, and track appointments. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
      </p>

      <h2 className="text-xl font-bold mb-4">3. User Accounts</h2>
      <p className="mb-4">
        To use certain features of our Service, you must create an account. You are responsible for:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Ensuring the accuracy of any information you provide</li>
      </ul>
      <p className="mb-4">
        We reserve the right to terminate accounts that violate these Terms or for any other reason at our discretion.
      </p>

      <h2 className="text-xl font-bold mb-4">4. User Conduct</h2>
      <p className="mb-4">
        You agree not to:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Use the Service for any illegal purpose</li>
        <li>Violate any laws in your jurisdiction</li>
        <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
        <li>Impersonate any person or entity or falsely state or otherwise misrepresent yourself</li>
        <li>Collect or store personal data about other users without their consent</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">5. Intellectual Property</h2>
      <p className="mb-4">
        The Service and its original content, features, and functionality are owned by Calendoodles and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
      </p>

      <h2 className="text-xl font-bold mb-4">6. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, Calendoodles shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
      </p>

      <h2 className="text-xl font-bold mb-4">7. Changes to Terms</h2>
      <p className="mb-4">
        We may modify these Terms at any time. We will provide notice of any material changes through the Service or by other means. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.
      </p>

      <h2 className="text-xl font-bold mb-4">8. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
      </p>

      <h2 className="text-xl font-bold mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have questions about these Terms, please contact us at terms@calendoodles.com.
      </p>
    </PolicyPage>
  );
};

export default TermsOfService;
