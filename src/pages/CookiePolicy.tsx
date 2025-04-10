
import React from 'react';
import PolicyPage from '@/components/contact/PolicyPage';

const CookiePolicy = () => {
  return (
    <PolicyPage title="Cookie Policy">
      <p className="mb-4">
        Last updated: April 10, 2025
      </p>

      <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
      <p className="mb-4">
        This Cookie Policy explains how Calendoodles ("we", "us", or "our") uses cookies and similar technologies on our website and application. This policy is designed to help you understand what cookies are, how we use them, and what choices you have regarding their use.
      </p>

      <h2 className="text-xl font-bold mb-4">2. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies can be "persistent" or "session" cookies.
      </p>

      <h2 className="text-xl font-bold mb-4">3. How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
        <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
        <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization, such as remembering your preferences.</li>
        <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant advertisements on other sites.</li>
      </ul>

      <h2 className="text-xl font-bold mb-4">4. Types of Cookies We Use</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">First-Party Cookies</h3>
        <p>These are cookies that are set by our website directly. These include:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Session cookies to maintain your session while using our services</li>
          <li>Authentication cookies to identify you when you log in</li>
          <li>Preference cookies to remember your settings and preferences</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Third-Party Cookies</h3>
        <p>These are cookies set by our partners and service providers, including:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Analytics cookies to help us understand how you use our website</li>
          <li>Marketing cookies to show you relevant advertisements</li>
          <li>Social media cookies to enable you to share content on social platforms</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold mb-4">5. Managing Cookies</h2>
      <p className="mb-4">
        Most web browsers allow you to manage your cookie preferences. You can:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Delete cookies from your browser</li>
        <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
        <li>Set your browser to notify you when you receive a cookie</li>
      </ul>
      <p className="mb-4">
        Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of our website, and some services may not function properly.
      </p>

      <h2 className="text-xl font-bold mb-4">6. Changes to This Cookie Policy</h2>
      <p className="mb-4">
        We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
      </p>

      <h2 className="text-xl font-bold mb-4">7. Contact Us</h2>
      <p className="mb-4">
        If you have questions about our Cookie Policy, please contact us at cookies@calendoodles.com.
      </p>
    </PolicyPage>
  );
};

export default CookiePolicy;
