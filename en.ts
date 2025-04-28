export default {
  nav: {
    home: 'Home',
    features: 'Features',
    tools: 'Tools',
    faq: 'FAQ',
    contact: 'Contact Us'
  },
  modals: {
    contact: {
      title: 'Contact Us',
      description: 'Have a question or feedback? We\'d love to hear from you!',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...',
        cancel: 'Cancel',
        success: 'Thank you for your message! We will get back to you soon.',
        error: 'An error occurred while sending your message. Please try again later.'
      }
    },
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          title: 'Information We Collect',
          content: 'We collect information that you provide directly to us when using our services.',
          items: [
            'Name and contact information',
            'Usage data and preferences',
            'Device and browser information'
          ]
        },
        {
          title: 'How We Use Your Information',
          content: 'We use the collected information to provide and improve our services.',
          items: [
            'To provide and maintain our services',
            'To notify you about changes to our services',
            'To provide customer support'
          ]
        },
        {
          title: 'Data Security',
          content: 'We implement appropriate security measures to protect your personal information.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By accessing and using our services, you accept and agree to be bound by these Terms.'
        },
        {
          title: 'User Responsibilities',
          content: 'You are responsible for maintaining the confidentiality of your account.',
          items: [
            'Providing accurate information',
            'Protecting your password',
            'Reporting unauthorized access'
          ]
        },
        {
          title: 'Service Modifications',
          content: 'We reserve the right to modify or discontinue our services at any time.'
        }
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      sections: [
        {
          title: 'What Are Cookies',
          content: 'Cookies are small text files that are stored on your device when you visit our website.'
        },
        {
          title: 'How We Use Cookies',
          content: 'We use cookies to improve your browsing experience and provide personalized services.',
          items: [
            'Essential cookies for website functionality',
            'Analytics cookies to understand usage',
            'Preference cookies to remember your settings'
          ]
        },
        {
          title: 'Managing Cookies',
          content: 'You can control and/or delete cookies as you wish through your browser settings.'
        }
      ]
    }
  }
}; 