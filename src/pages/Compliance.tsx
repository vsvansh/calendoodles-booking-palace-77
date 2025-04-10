
import React from 'react';
import PolicyPage from '@/components/contact/PolicyPage';

const Compliance = () => {
  return (
    <PolicyPage title="Compliance">
      <p className="mb-4">
        Last updated: April 10, 2025
      </p>

      <h2 className="text-xl font-bold mb-4">1. Overview</h2>
      <p className="mb-4">
        At Calendoodles, we are committed to maintaining the highest standards of legal and regulatory compliance in all aspects of our business operations. This page outlines our approach to compliance with various laws and regulations that govern our services.
      </p>

      <h2 className="text-xl font-bold mb-4">2. Data Protection Compliance</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">GDPR Compliance</h3>
        <p className="mb-2">
          We comply with the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA). This includes:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Transparent data collection and processing practices</li>
          <li>Legal basis for processing personal data</li>
          <li>Data subject rights (access, rectification, erasure, etc.)</li>
          <li>Data breach notification procedures</li>
          <li>Data Protection Impact Assessments when necessary</li>
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">CCPA Compliance</h3>
        <p className="mb-2">
          We comply with the California Consumer Privacy Act (CCPA) for users in California, which includes:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Right to know what personal information is collected</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of the sale of personal information</li>
          <li>Right to non-discrimination for exercising CCPA rights</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold mb-4">3. Accessibility Compliance</h2>
      <p className="mb-4">
        We strive to ensure our services are accessible to all users, including those with disabilities. We aim to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards and continuously work to improve the accessibility of our platform.
      </p>

      <h2 className="text-xl font-bold mb-4">4. Industry-Specific Compliance</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">HIPAA Compliance</h3>
        <p>
          For healthcare providers using our platform, we offer features designed to help with Health Insurance Portability and Accountability Act (HIPAA) compliance, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Secure transmission and storage of protected health information (PHI)</li>
          <li>Business Associate Agreements (BAAs) for eligible customers</li>
          <li>Access controls and audit logs</li>
          <li>Encryption of sensitive data</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold mb-4">5. Security Standards</h2>
      <p className="mb-4">
        We implement and maintain appropriate technical, administrative, and physical safeguards to protect your data, including:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>TLS/SSL encryption for data in transit</li>
        <li>Encryption of sensitive data at rest</li>
        <li>Regular security assessments and penetration testing</li>
        <li>Employee security training and awareness programs</li>
        <li>Incident response procedures</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">6. Compliance Updates</h2>
      <p className="mb-4">
        We regularly review and update our compliance measures to address new and evolving legal requirements and industry best practices. We communicate significant changes to our customers and users as appropriate.
      </p>

      <h2 className="text-xl font-bold mb-4">7. Reporting Concerns</h2>
      <p className="mb-4">
        If you have concerns regarding our compliance with applicable laws or regulations, please contact us at compliance@calendoodles.com. We take all reports seriously and will investigate promptly.
      </p>
    </PolicyPage>
  );
};

export default Compliance;
