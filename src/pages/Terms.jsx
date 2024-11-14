import React, { useState, useEffect } from 'react';
import { 
  InfoIcon, Banknote, Ticket, Shield, 
  Activity, ScanFace, QrCode, TicketCheck
} from 'lucide-react';

const Terms = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add state for active section
  const [activeSection, setActiveSection] = useState('acceptance');

  // Add useEffect to handle scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex max-w-[1400px] mx-auto px-6 lg:px-8 py-12 pt-32 relative gap-8">
      {/* Sidebar Table of Contents */}
      <aside className="hidden lg:block w-72 sticky top-24 h-fit">
        <nav className="space-y-3">
          {[
            { id: 'acceptance', title: 'Acceptance of Terms' },
            { id: 'purchases', title: 'Ticket Purchases and Refunds' },
            { id: 'organizer', title: 'Event Organizer Terms' },
            { id: 'resale', title: 'Ticket Resale and Transfer' },
            { id: 'fees', title: 'Platform Fees and Payments' },
            { id: 'attendance', title: 'Event Attendance and Conduct' },
            { id: 'liability', title: 'Liability and Disclaimers' },
            { id: 'modifications', title: 'Platform Modifications' },
            { id: 'privacy', title: 'Privacy and Data Protection' },
            { id: 'intellectual', title: 'Intellectual Property Rights' },
            { id: 'communication', title: 'Communication Policies' },
            { id: 'international', title: 'International Use' },
            { id: 'account', title: 'Account Management' },
            { id: 'compliance', title: 'Legal Compliance' },
            { id: 'dispute', title: 'Dispute Resolution' },
            { id: 'accessibility', title: 'Accessibility Standards' },
            { id: 'sustainability', title: 'Environmental Policy' },
            { id: 'partnerships', title: 'Partner Programs' },
            { id: 'security', title: 'Security Measures' },
            { id: 'support', title: 'Customer Support' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-[14px] w-full text-left py-1 transition-colors duration-200 ${
                activeSection === item.id 
                ? 'text-primary-500 dark:text-primary-400 font-medium' 
                : 'text-gray-600 dark:text-gray-50 hover:text-gray-900 dark:hover:text-gray-50'
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-5xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-12">
          <section id="acceptance" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <InfoIcon className="h-6 w-6" /> Acceptance of Terms
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Agreement to Terms</h3>
              <p className="text-gray-600 text-[16px]">
                By accessing and using Tickrfly's platform ("Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>

              <h3 className="text-2xl font-medium">Eligibility</h3>
              <p className="text-gray-600 text-[16px]">
                You must be at least 18 years old to use our services. By using the Platform, you represent and warrant that you have the legal capacity to enter into these Terms. If you are using the Platform on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
              </p>

              <h3 className="text-2xl font-medium">Term Updates</h3>
              <p className="text-gray-600 text-[16px]">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Platform. Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </div>
          </section>

          <section id="purchases" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Ticket className="h-6 w-6" /> Ticket Purchases and Refunds
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Ticket Purchase Process</h3>
              <p className="text-gray-600 text-[16px]">
                When purchasing tickets through our Platform, you agree to provide accurate, current, and complete information. Tickets are only confirmed upon receipt of full payment and confirmation email from Tickrfly.
              </p>

              <h3 className="text-2xl font-medium">Pricing and Availability</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-50 text-[16px] space-y-2">
                <li>All ticket prices are listed in the local currency of the event</li>
                <li>Prices may vary based on demand and timing of purchase</li>
                <li>Service fees and taxes will be clearly displayed before checkout</li>
                <li>Ticket availability is not guaranteed until purchase is completed</li>
              </ul>

              <h3 className="text-2xl font-medium">Refund Policy</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-50">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Canceled Events:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Full refund of ticket price will be processed automatically</li>
                  <li>Refunds will be issued within 10 business days</li>
                  <li>Original payment method will be used for refund</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Rescheduled Events:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Tickets remain valid for the new date</li>
                  <li>Refund requests accepted within 14 days of rescheduling announcement</li>
                  <li>Refund requests must be submitted through our Platform</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Non-Refundable Items:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Service fees are non-refundable except where required by law</li>
                  <li>Delivery fees are non-refundable if delivery has been completed</li>
                  <li>Insurance charges are subject to the insurance provider's policy</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Payment Processing</h3>
              <p className="text-gray-600 text-[16px]">
                All payments are processed securely through our authorized payment providers. We accept major credit cards, debit cards, and other specified payment methods. Multiple payment attempts without sufficient funds may result in account restrictions.
              </p>
            </div>
          </section>

          <section id="organizer" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6" /> Event Organizer Terms
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Organizer Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-50 text-[16px] space-y-2">
                <li>Maintain accurate event details, including date, time, venue, and pricing</li>
                <li>Ensure compliance with local laws and regulations regarding public gatherings</li>
                <li>Obtain necessary permits, licenses, and insurance for events</li>
                <li>Provide timely updates regarding any changes to event details</li>
                <li>Handle customer inquiries related to event-specific details</li>
              </ul>

              <h3 className="text-2xl font-medium">Event Creation and Management</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-50">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Event Listing Requirements:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-50">
                  <li>Clear and accurate event description</li>
                  <li>High-quality event images that meet platform standards</li>
                  <li>Accurate venue information and seating arrangements</li>
                  <li>Complete pricing details including all ticket tiers</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Content Guidelines:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>No misleading or false information</li>
                  <li>No inappropriate or offensive content</li>
                  <li>No intellectual property violations</li>
                  <li>Age restrictions must be clearly stated</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium">Financial Terms</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Payout Schedule:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Standard payout within 5-7 business days after event completion</li>
                  <li>Option for advance payouts subject to approval</li>
                  <li>Minimum payout threshold of $50</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Fee Structure:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Platform fee of 2.5% per ticket sold</li>
                  <li>Payment processing fee of 2.9% + $0.30 per transaction</li>
                  <li>Additional fees for premium features or services</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="resale" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Ticket className="h-6 w-6" /> Ticket Resale and Transfer
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Authorized Resale</h3>
              <p className="text-gray-600 dark:text-gray-50 text-[16px]">
                Tickets may only be resold through our official resale marketplace. Unauthorized resale through third-party platforms is strictly prohibited and may result in ticket cancellation without refund.
              </p>

              <h3 className="text-2xl font-medium">Resale Restrictions</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-50 text-[16px] space-y-2">
                <li>Maximum resale price capped at 120% of original ticket value</li>
                <li>Bulk purchasing for resale is prohibited</li>
                <li>Automated purchasing systems or bots are not permitted</li>
                <li>Geographic restrictions may apply to certain events</li>
              </ul>

              <h3 className="text-2xl font-medium">Ticket Transfer</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Transfer Process:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Transfers must be completed through the platform</li>
                  <li>Both parties must have verified accounts</li>
                  <li>Transfer fees may apply</li>
                  <li>Original ticket becomes void upon transfer</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Transfer Limitations:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Some tickets may be non-transferable</li>
                  <li>Maximum of 4 transfers per ticket</li>
                  <li>Transfers must be completed 24 hours before event</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="fees" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Banknote className="h-6 w-6" /> Platform Fees and Payments
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Fee Structure</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Buyer Fees:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Service fee: 15% of ticket price</li>
                  <li>Processing fee: 2.9% + $0.30 per transaction</li>
                  <li>Delivery fees where applicable</li>
                  <li>Optional insurance fees</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Seller Fees:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Platform commission: 2.5%</li>
                  <li>Payment processing: 2.9% + $0.30</li>
                  <li>Premium listing fees (optional)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Payment Methods</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-50 text-[16px] space-y-2">
                <li>Major credit cards (Visa, MasterCard, American Express)</li>
                <li>Digital wallets (Apple Pay, Google Pay)</li>
                <li>Bank transfers (ACH)</li>
                <li>Platform-specific credit</li>
              </ul>

              <h3 className="text-2xl font-medium">Currency and Exchange</h3>
              <p className="text-gray-600 text-[16px]">
                All transactions are processed in the local currency of the event. Currency conversion fees may apply for international purchases. Exchange rates are determined at the time of transaction.
              </p>
            </div>
          </section>

          <section id="attendance" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ScanFace className="h-6 w-6" /> Event Attendance and Conduct
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Entry Requirements</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Ticket Validation:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Valid ticket must be presented (digital or physical)</li>
                  <li>Government-issued photo ID matching ticket name</li>
                  <li>Proof of age for age-restricted events</li>
                  <li>Additional documentation as required by event organizer</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Security Measures:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Bag checks and security screening may be required</li>
                  <li>Prohibited items will be confiscated or denied entry</li>
                  <li>Compliance with venue-specific security protocols</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium">Attendee Conduct</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Expected Behavior:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Respect for other attendees, staff, and performers</li>
                  <li>Compliance with venue rules and regulations</li>
                  <li>No unauthorized recording or photography</li>
                  <li>No disruptive or dangerous behavior</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Prohibited Activities:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Illegal substances or weapons</li>
                  <li>Unauthorized selling or solicitation</li>
                  <li>Harassment or discriminatory behavior</li>
                  <li>Damage to venue property</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Health and Safety</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Compliance with public health guidelines</li>
                  <li>Adherence to capacity restrictions</li>
                  <li>Following emergency evacuation procedures</li>
                  <li>Reporting safety concerns to event staff</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="liability" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6" /> Liability and Disclaimers
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Platform Liability</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Limitation of Liability:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Platform provided "as is" without warranties</li>
                  <li>No responsibility for event cancellations or changes</li>
                  <li>Maximum liability limited to ticket purchase price</li>
                  <li>No liability for third-party actions or content</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Force Majeure:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Natural disasters or weather events</li>
                  <li>Government actions or regulations</li>
                  <li>Public health emergencies</li>
                  <li>Other circumstances beyond reasonable control</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">User Indemnification</h3>
              <p className="text-gray-600 dark:text-gray-50 text-[16px]">
                Users agree to indemnify and hold harmless Tickrfly, its employees, and partners from any claims, 
                damages, or expenses arising from their use of the platform or attendance at events.
              </p>

              <h3 className="text-2xl font-medium">Dispute Resolution</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px]">
                  <li>Mandatory arbitration for all disputes</li>
                  <li>Class action waiver</li>
                  <li>Governing law and jurisdiction specifications</li>
                  <li>Time limitation on claims</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="modifications" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <QrCode className="h-6 w-6" /> Platform Modifications
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Service Changes</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Right to modify or discontinue services</li>
                  <li>Changes to features and functionality</li>
                  <li>Updates to user interface and experience</li>
                  <li>Modification of fee structures</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Notice of Changes</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Communication Methods:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Email notifications for significant changes</li>
                  <li>Platform announcements and updates</li>
                  <li>Website notifications and banners</li>
                  <li>30-day notice for material changes</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="privacy" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ScanFace className="h-6 w-6" /> Privacy and Data Protection
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Data Collection</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Types of Data Collected:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Personal identification information</li>
                  <li>Transaction and payment details</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Data Usage:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Service improvement and personalization</li>
                  <li>Transaction processing and verification</li>
                  <li>Marketing communications (with consent)</li>
                  <li>Legal compliance and security</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Data Security</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Industry-standard encryption protocols</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Data breach notification procedures</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">User Rights</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Right to access personal data</li>
                  <li>Right to request data correction</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent</li>
                  <li>Right to be forgotten</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="intellectual" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <div className="flex">
                <QrCode className="h-6 w-6" />
                <QrCode className="h-6 w-6 -ml-1" />
              </div>
              Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Platform Content</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Ownership:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>All platform content is owned by Tickrfly or licensed partners</li>
                  <li>Includes logos, trademarks, design, and software</li>
                  <li>User-generated content rights and licenses</li>
                  <li>Third-party content attribution requirements</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Usage Restrictions:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>No unauthorized reproduction or distribution</li>
                  <li>No modification of platform materials</li>
                  <li>No commercial use without written permission</li>
                  <li>No reverse engineering of platform software</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium">Event Content</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Event Materials:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Copyright protection for event descriptions and images</li>
                  <li>Organizer rights to event-specific content</li>
                  <li>Limited license for promotional purposes</li>
                  <li>Content removal procedures</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="communication" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TicketCheck className="h-6 w-6" /> Communication Policies
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Platform Communications</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Notification Types:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Transaction confirmations and receipts</li>
                  <li>Event updates and changes</li>
                  <li>Platform maintenance notifications</li>
                  <li>Security alerts and warnings</li>
                  <li>Marketing communications (opt-in required)</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Communication Methods:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Email notifications</li>
                  <li>SMS alerts for time-sensitive information</li>
                  <li>In-app notifications</li>
                  <li>Push notifications (mobile app)</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium">User Communication</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Acceptable Use:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>No spam or unsolicited messages</li>
                  <li>No harassment or threatening communication</li>
                  <li>No fraudulent or misleading information</li>
                  <li>No commercial solicitation</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="international" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <QrCode className="h-6 w-6" /> International Use
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cross-Border Transactions</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Currency Handling:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Multiple currency support</li>
                  <li>Exchange rate calculations</li>
                  <li>International processing fees</li>
                  <li>Currency conversion timing</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Regional Restrictions:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Geographic limitations on purchases</li>
                  <li>Country-specific regulations</li>
                  <li>Export control compliance</li>
                  <li>Regional pricing variations</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium">International Compliance</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>GDPR compliance for EU users</li>
                  <li>International tax regulations</li>
                  <li>Cross-border data transfer protocols</li>
                  <li>Local law adherence requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="account" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TicketCheck className="h-6 w-6" /> Account Management
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Account Security</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Security Requirements:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Strong password requirements</li>
                  <li>Two-factor authentication options</li>
                  <li>Session management and timeout policies</li>
                  <li>Account recovery procedures</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">User Responsibilities:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Maintaining account confidentiality</li>
                  <li>Reporting unauthorized access</li>
                  <li>Keeping contact information current</li>
                  <li>Regular security review</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium">Account Termination</h3>
              <div className="space-y-2 text-gray-600">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Voluntary Termination:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Account closure process</li>
                  <li>Data retention policies</li>
                  <li>Refund handling</li>
                  <li>Active ticket management</li>
                </ul>

                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Involuntary Termination:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Terms violation consequences</li>
                  <li>Fraud prevention measures</li>
                  <li>Appeal process</li>
                  <li>Account reinstatement conditions</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="compliance" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Banknote className="h-6 w-6" /> Legal Compliance
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Regulatory Compliance</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Compliance with local entertainment laws</li>
                  <li>Tax reporting and collection requirements</li>
                  <li>Consumer protection regulations</li>
                  <li>Electronic commerce directives</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Industry Standards</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>PCI DSS compliance for payments</li>
                  <li>Digital accessibility guidelines</li>
                  <li>Event industry best practices</li>
                  <li>Ticketing security standards</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="dispute" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ScanFace className="h-6 w-6" /> Dispute Resolution
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Resolution Process</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Initial customer service contact</li>
                  <li>Mediation procedures</li>
                  <li>Arbitration requirements</li>
                  <li>Legal jurisdiction specifications</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Claims Process</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Filing requirements and deadlines</li>
                  <li>Required documentation</li>
                  <li>Resolution timeframes</li>
                  <li>Appeals process</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="accessibility" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6" /> Accessibility Standards
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Platform Accessibility</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>WCAG 2.1 compliance</li>
                  <li>Screen reader compatibility</li>
                  <li>Keyboard navigation support</li>
                  <li>Color contrast standards</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Event Accessibility</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Venue accessibility information</li>
                  <li>Special accommodation requests</li>
                  <li>Assistant ticket policies</li>
                  <li>Service animal guidelines</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="sustainability" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TicketCheck className="h-6 w-6" /> Environmental Policy
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Digital Initiatives</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Paperless ticketing options</li>
                  <li>Digital receipt preferences</li>
                  <li>Energy-efficient hosting</li>
                  <li>Carbon offset programs</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Event Sustainability</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Eco-friendly event guidelines</li>
                  <li>Waste reduction initiatives</li>
                  <li>Sustainable vendor requirements</li>
                  <li>Environmental impact reporting</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="partnerships" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <QrCode className="h-6 w-6" /> Partner Programs
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Partner Types</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Venue partnerships</li>
                  <li>Promoter collaborations</li>
                  <li>Technology integrations</li>
                  <li>Marketing affiliates</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Partnership Terms</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Revenue sharing models</li>
                  <li>Service level agreements</li>
                  <li>Brand usage guidelines</li>
                  <li>Termination conditions</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="security" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <QrCode className="h-6 w-6" /> Security Measures
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Platform Security</h3>
              <div className="space-y-2 text-gray-600 text-[16px]">
                <p className="text-[16px] text-gray-600 dark:text-gray-50 font-semibold">Infrastructure Security:</p>
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>DDoS protection and mitigation</li>
                  <li>24/7 security monitoring</li>
                  <li>Regular penetration testing</li>
                  <li>Vulnerability assessments</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Fraud Prevention</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>AI-powered fraud detection</li>
                  <li>Transaction monitoring systems</li>
                  <li>Identity verification procedures</li>
                  <li>Suspicious activity alerts</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="support" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TicketCheck className="h-6 w-6" /> Customer Support
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Support Channels</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>24/7 live chat support</li>
                  <li>Email support response times</li>
                  <li>Phone support availability</li>
                  <li>Social media support channels</li>
                </ul>
              </div>

              <h3 className="text-2xl font-medium">Service Level Agreements</h3>
              <div className="space-y-2 text-gray-600">
                <ul className="list-disc pl-6 space-y-1 text-[16px] text-gray-600 dark:text-gray-50">
                  <li>Priority support for urgent issues</li>
                  <li>Response time guarantees</li>
                  <li>Escalation procedures</li>
                  <li>Resolution time targets</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;