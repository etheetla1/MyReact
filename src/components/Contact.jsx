import { CONTACT } from "../constants";
import { PageHeader, AnimatedSection, Footer } from "./common";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${CONTACT.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${CONTACT.phoneNo}`;
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: CONTACT.email,
      action: handleEmailClick,
      description: "Drop me a line anytime"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: CONTACT.phoneNo,
      action: handlePhoneClick,
      description: "Let's have a conversation"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: CONTACT.address,
      description: "Based in Atlanta, GA"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/elisha-theetla",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/etheetla1",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.container}>
        <PageHeader
          title="Get In Touch"
          subtitle="Let's discuss your next project or collaboration opportunity"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Information */}
          <div className="space-y-8">
            <AnimatedSection delay={0.2} direction="slideLeft">
              <div className="space-y-6">
                <h3 className={cn(theme.typography.heading, "text-white mb-6")}>
                  Let's Connect
                </h3>
                <p className={cn(theme.typography.body, "leading-relaxed")}>
                  I'm always interested in discussing new opportunities, innovative projects, 
                  and collaborations. Whether you have a project in mind or just want to chat 
                  about technology, feel free to reach out.
                </p>
              </div>
            </AnimatedSection>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <AnimatedSection
                  key={index}
                  delay={0.4 + index * 0.1}
                  direction="slideLeft"
                >
                  <div
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-lg",
                      theme.components.card,
                      method.action && "cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    )}
                    onClick={method.action}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={cn(theme.typography.bodySmall, "text-white font-medium")}>
                        {method.label}
                      </h4>
                      <p className={cn(theme.typography.bodySmall, "text-gray-300")}>
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        {method.description}
                      </p>
                    </div>
                    {method.action && (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Social Links */}
            <AnimatedSection delay={0.8} direction="slideLeft">
              <div className="pt-8">
                <h4 className={cn(theme.typography.bodySmall, "text-white mb-4")}>
                  Find me online
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-gray-300",
                        "hover:bg-white/20 hover:text-white transition-all duration-300",
                        "hover:scale-110"
                      )}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Call to Action */}
          <AnimatedSection delay={0.6} direction="slideRight">
            <div className={cn("p-8 rounded-lg", theme.components.card)}>
              <h3 className={cn(theme.typography.heading, "text-white mb-6")}>
                Ready to Start?
              </h3>
              <p className={cn(theme.typography.body, "mb-8 leading-relaxed")}>
                I'm currently available for new projects and collaborations. 
                Let's discuss how we can work together to bring your ideas to life.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleEmailClick}
                  className={theme.components.button.primary}
                >
                  Send Email
                  <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <div className="text-center">
                  <span className="text-gray-500 text-sm">or</span>
                </div>
                
                <button
                  onClick={handlePhoneClick}
                  className={theme.components.button.secondary}
                >
                  Schedule a Call
                  <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
