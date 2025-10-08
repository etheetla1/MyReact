import { PageHeader, AnimatedSection, Footer } from "./common";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const Blogs = () => {
  // Placeholder blog posts - you can replace this with actual blog data
  const blogPosts = [
    {
      title: "Building Scalable Cloud-Native Applications with AWS",
      excerpt: "Exploring best practices for designing and deploying cloud-native applications using AWS services like Lambda, ECS, and API Gateway.",
      date: "Coming Soon",
      readTime: "8 min read",
      tags: ["AWS", "Cloud", "Serverless", "Architecture"],
      status: "draft"
    },
    {
      title: "Modern Frontend Development with React and TypeScript",
      excerpt: "A comprehensive guide to building robust, type-safe React applications with modern tooling and best practices.",
      date: "Coming Soon",
      readTime: "12 min read",
      tags: ["React", "TypeScript", "Frontend", "JavaScript"],
      status: "draft"
    },
    {
      title: "DevOps Automation: CI/CD Pipelines with GitHub Actions",
      excerpt: "Learn how to set up automated deployment pipelines using GitHub Actions for seamless software delivery.",
      date: "Coming Soon",
      readTime: "10 min read",
      tags: ["DevOps", "CI/CD", "GitHub Actions", "Automation"],
      status: "draft"
    },
    {
      title: "AI Integration in Web Applications",
      excerpt: "Practical approaches to integrating AI and machine learning capabilities into modern web applications.",
      date: "Coming Soon",
      readTime: "15 min read",
      tags: ["AI", "Machine Learning", "Web Development", "Python"],
      status: "draft"
    }
  ];

  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.container}>
        <PageHeader
          title="Blog"
          subtitle="Thoughts on technology, development, and the future of software engineering"
        />

        {/* Coming Soon Notice */}
        <AnimatedSection delay={0.2}>
          <div className={cn(
            "p-8 rounded-lg mb-12 text-center",
            theme.components.card,
            "border border-white/20"
          )}>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className={cn(theme.typography.heading, "text-white mb-3")}>
              Blog Coming Soon
            </h3>
            <p className={cn(theme.typography.body, "max-w-2xl mx-auto")}>
              I&apos;m currently working on creating valuable content about software development, 
              cloud architecture, and emerging technologies. Stay tuned for insightful articles 
              and tutorials!
            </p>
          </div>
        </AnimatedSection>

        {/* Preview of Upcoming Posts */}
        <div className="space-y-8">
          <AnimatedSection delay={0.4}>
            <h3 className={cn(theme.typography.heading, "text-white mb-8 text-center")}>
              Upcoming Articles
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection
                key={index}
                delay={0.6 + index * 0.1}
                direction={index % 2 === 0 ? "slideLeft" : "slideRight"}
              >
                <div className={cn(
                  "p-6 rounded-lg h-full",
                  theme.components.card,
                  "hover:scale-[1.02] transition-transform duration-300",
                  "opacity-75"
                )}>
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full",
                      "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    )}>
                      {post.status === 'draft' ? 'Coming Soon' : post.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Post Content */}
                  <h4 className={cn(theme.typography.subheading, "text-white mb-3")}>
                    {post.title}
                  </h4>
                  
                  <p className={cn(theme.typography.body, "mb-4 leading-relaxed")}>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded",
                          "bg-white/5 text-gray-400 border border-white/10"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    {post.date}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <AnimatedSection delay={1.0}>
          <div className={cn(
            "mt-16 p-8 rounded-lg text-center",
            theme.components.card
          )}>
            <h3 className={cn(theme.typography.heading, "text-white mb-4")}>
              Stay Updated
            </h3>
            <p className={cn(theme.typography.body, "mb-6 max-w-2xl mx-auto")}>
              Want to be notified when I publish new articles? Connect with me on LinkedIn 
              or follow my GitHub for updates on new content and projects.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://linkedin.com/in/elisha-theetla"
                target="_blank"
                rel="noopener noreferrer"
                className={theme.components.button.primary}
              >
                Follow on LinkedIn
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/etheetla1"
                target="_blank"
                rel="noopener noreferrer"
                className={theme.components.button.secondary}
              >
                Follow on GitHub
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </AnimatedSection>

        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
