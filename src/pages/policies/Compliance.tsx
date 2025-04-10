
import PolicyPage from "@/components/contact/PolicyPage";

const Compliance = () => {
  return (
    <PolicyPage title="Compliance Information">
      <h2>Our Commitment to Compliance</h2>
      <p>
        At Calendoodles, we are committed to maintaining the highest standards of legal and regulatory compliance in all aspects of our business. This page outlines our approach to compliance with various laws and regulations that may apply to our services.
      </p>
      
      <h2>Data Protection and Privacy</h2>
      <p>
        We are committed to protecting your privacy and handling your personal data in compliance with applicable data protection laws, including:
      </p>
      <ul>
        <li>General Data Protection Regulation (GDPR) for users in the European Union</li>
        <li>California Consumer Privacy Act (CCPA) for California residents</li>
        <li>Personal Information Protection and Electronic Documents Act (PIPEDA) for Canadian users</li>
        <li>Other applicable local and international data protection regulations</li>
      </ul>
      
      <p>
        For more information on how we handle your personal data, please refer to our <a className="text-calendoodle-blue hover:underline" href="/privacy-policy">Privacy Policy</a>.
      </p>
      
      <h2>Accessibility</h2>
      <p>
        We strive to ensure our website and services are accessible to all users, including those with disabilities. We are working towards compliance with:
      </p>
      <ul>
        <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
        <li>Americans with Disabilities Act (ADA)</li>
      </ul>
      
      <h2>Information Security</h2>
      <p>
        We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
      </p>
      <ul>
        <li>Encryption of personal data</li>
        <li>Ability to ensure ongoing confidentiality, integrity, availability, and resilience of processing systems and services</li>
        <li>Regular testing, assessing, and evaluating the effectiveness of technical and organizational measures for ensuring the security of processing</li>
      </ul>
      
      <h2>Health Information Compliance</h2>
      <p>
        For customers in the healthcare sector, we understand the importance of compliance with health information privacy and security regulations, including:
      </p>
      <ul>
        <li>Health Insurance Portability and Accountability Act (HIPAA) in the United States</li>
        <li>Similar health data protection regulations in other jurisdictions</li>
      </ul>
      
      <h2>Anti-Discrimination and Fair Treatment</h2>
      <p>
        We are committed to providing our services in a manner that does not discriminate against any individual or group. We comply with applicable anti-discrimination laws and regulations.
      </p>
      
      <h2>Updates to Our Compliance Policies</h2>
      <p>
        As laws and regulations evolve, we regularly review and update our compliance policies and procedures. We will notify users of significant changes as required by applicable laws.
      </p>
      
      <h2>Contact Us</h2>
      <p>
        If you have any questions about our compliance efforts or policies, please contact us at compliance@calendoodles.com.
      </p>
      
      <p className="text-sm text-gray-500 mt-8">
        Last updated: April 10, 2025
      </p>
    </PolicyPage>
  );
};

export default Compliance;
