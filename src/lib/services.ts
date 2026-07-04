import {
  Headset,
  Code2,
  Smartphone,
  ServerCog,
  ShieldCheck,
  Workflow,
  Share2,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * Single source of truth for every service. Powers the services overview,
 * homepage cards, individual detail pages, navigation, sitemap and JSON-LD.
 */
export const services: Service[] = [
  {
    slug: "it-support",
    name: "IT Support",
    summary:
      "Responsive helpdesk and on-demand technical support that keeps your team productive and your systems running.",
    icon: Headset,
    heroHeadline: "Dependable IT Support That Keeps Your Business Moving",
    overview: [
      "Technology problems slow your team down and cost you money. Our IT support gives your business a reliable point of contact for the everyday issues that get in the way of real work — from device setup and account access to troubleshooting and performance tuning.",
      "We focus on fast, clear communication and lasting fixes rather than temporary workarounds, so the same problems stop coming back.",
    ],
    benefits: [
      {
        title: "Fast Response",
        description:
          "Clear communication and prompt turnaround so blockers are resolved before they disrupt your day.",
      },
      {
        title: "Root-Cause Fixes",
        description:
          "We resolve the underlying issue, not just the symptom, to reduce repeat problems over time.",
      },
      {
        title: "Tailored To Your Setup",
        description:
          "Support shaped around the tools, devices and workflows your business already relies on.",
      },
      {
        title: "Predictable Support",
        description:
          "A consistent, professional partner you can reach when something needs attention.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We learn your environment, tools and the issues affecting your team most.",
      },
      {
        title: "Plan",
        description:
          "We agree response expectations and the best way to reach us for different issues.",
      },
      {
        title: "Deliver",
        description:
          "We resolve issues quickly and document fixes so nothing gets lost.",
      },
      {
        title: "Support",
        description:
          "We stay available for ongoing help and proactively flag recurring risks.",
      },
    ],
    faqs: [
      {
        question: "What kind of issues do you handle?",
        answer:
          "Everyday technical problems including device setup, account and access issues, email, connectivity, software troubleshooting and general performance concerns.",
      },
      {
        question: "How quickly can you respond?",
        answer:
          "We prioritise fast, clear communication and agree response expectations with you up front so you always know what to expect.",
      },
      {
        question: "Do you support remote teams?",
        answer:
          "Yes. We support distributed and remote teams and shape our support around how your business actually works.",
      },
    ],
    keywords: [
      "IT support",
      "business IT help",
      "technical support",
      "helpdesk support",
    ],
  },
  {
    slug: "web-development",
    name: "Web Development",
    summary:
      "Fast, modern, conversion-focused websites and web apps built on a secure, scalable foundation.",
    icon: Code2,
    heroHeadline: "Modern Websites Built To Perform And Convert",
    overview: [
      "Your website is often the first impression a customer has of your business. We build fast, responsive and accessible websites and web applications that look professional, load quickly and turn visitors into enquiries.",
      "Every build is engineered on a clean, scalable foundation using modern technologies, so your site is easy to maintain and ready to grow with you.",
    ],
    benefits: [
      {
        title: "Performance First",
        description:
          "Optimised for speed and Core Web Vitals so pages load fast and rank well.",
      },
      {
        title: "Conversion Focused",
        description:
          "Clear structure and strong calls to action designed to generate more enquiries.",
      },
      {
        title: "Responsive By Default",
        description:
          "Flawless experiences across mobile, tablet and desktop with no layout shifts.",
      },
      {
        title: "Built To Scale",
        description:
          "Clean, maintainable code on a modern stack that grows with your business.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We clarify your goals, audience and the actions you want visitors to take.",
      },
      {
        title: "Plan",
        description:
          "We map the structure, content and design direction before development begins.",
      },
      {
        title: "Deliver",
        description:
          "We build, test and launch a fast, accessible, responsive site.",
      },
      {
        title: "Support",
        description:
          "We provide ongoing maintenance, updates and improvements after launch.",
      },
    ],
    faqs: [
      {
        question: "What technologies do you build with?",
        answer:
          "We build with modern, well-supported technologies focused on performance, security and long-term maintainability.",
      },
      {
        question: "Will my site be mobile friendly?",
        answer:
          "Yes. Every site is built mobile-first and tested across devices to ensure a consistent, fast experience.",
      },
      {
        question: "Can you improve my existing website?",
        answer:
          "Absolutely. We can improve performance, accessibility, structure and conversions on an existing site, or rebuild it where that delivers better results.",
      },
    ],
    keywords: [
      "web development",
      "website design",
      "web application development",
      "responsive websites",
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    summary:
      "Reliable, user-friendly mobile apps that extend your business into your customers' pockets.",
    icon: Smartphone,
    heroHeadline: "Mobile Apps Your Customers Will Actually Use",
    overview: [
      "A well-built mobile app puts your business directly in your customers' hands. We design and develop reliable, intuitive apps focused on the experience your users care about and the outcomes your business needs.",
      "From concept to launch, we keep the build lean and purposeful so you invest in features that matter.",
    ],
    benefits: [
      {
        title: "User-Focused Design",
        description:
          "Intuitive interfaces that make your app easy and enjoyable to use.",
      },
      {
        title: "Reliable Performance",
        description:
          "Stable, responsive apps engineered for real-world usage and devices.",
      },
      {
        title: "Purposeful Features",
        description:
          "We prioritise the features that deliver value instead of unnecessary complexity.",
      },
      {
        title: "Ongoing Improvement",
        description:
          "Support and iteration after launch as your users and needs evolve.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We define your users, goals and the core value the app must deliver.",
      },
      {
        title: "Plan",
        description:
          "We shape the experience, features and technical approach before building.",
      },
      {
        title: "Deliver",
        description:
          "We develop, test and prepare your app for a smooth launch.",
      },
      {
        title: "Support",
        description:
          "We maintain and improve the app based on real usage and feedback.",
      },
    ],
    faqs: [
      {
        question: "Do you build for iOS and Android?",
        answer:
          "Yes. We build for the platforms your audience uses and advise on the most efficient approach for your goals and budget.",
      },
      {
        question: "How do you keep costs sensible?",
        answer:
          "We focus on a well-defined core experience first, so you launch with what matters and add features as the app proves its value.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We provide ongoing support, maintenance and improvements so your app stays reliable and relevant.",
      },
    ],
    keywords: [
      "mobile app development",
      "iOS app development",
      "Android app development",
      "custom mobile apps",
    ],
  },
  {
    slug: "managed-it-services",
    name: "Managed IT Services",
    summary:
      "Proactive, ongoing management of your IT so your systems stay secure, up to date and dependable.",
    icon: ServerCog,
    heroHeadline: "Managed IT That Prevents Problems Before They Start",
    overview: [
      "Managed IT services give you a dedicated technology partner responsible for keeping your systems healthy, secure and up to date. Instead of reacting to problems, we work proactively to prevent them.",
      "You get peace of mind and predictable support, freeing your team to focus on the business rather than the technology behind it.",
    ],
    benefits: [
      {
        title: "Proactive Management",
        description:
          "We monitor and maintain your systems to catch issues before they cause disruption.",
      },
      {
        title: "Security Focused",
        description:
          "Ongoing attention to updates and best practices to keep your infrastructure protected.",
      },
      {
        title: "Predictable Support",
        description:
          "A dependable partner and clear expectations instead of ad-hoc firefighting.",
      },
      {
        title: "Long-Term Partnership",
        description:
          "We understand your setup deeply and improve it steadily over time.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We assess your current systems, tools and risks.",
      },
      {
        title: "Plan",
        description:
          "We define what we manage, monitor and maintain on your behalf.",
      },
      {
        title: "Deliver",
        description:
          "We take on ongoing management, keeping systems secure and reliable.",
      },
      {
        title: "Support",
        description:
          "We continuously review and improve your environment as your business grows.",
      },
    ],
    faqs: [
      {
        question: "What does managed IT include?",
        answer:
          "Ongoing management of your systems including proactive monitoring, maintenance, updates and support, shaped around your business needs.",
      },
      {
        question: "Is this suitable for small businesses?",
        answer:
          "Yes. We tailor managed services to businesses of different sizes so you get the right level of support without unnecessary overhead.",
      },
      {
        question: "Can you work alongside our existing tools?",
        answer:
          "Yes. We work with the systems and tools you already rely on and recommend improvements where they add value.",
      },
    ],
    keywords: [
      "managed IT services",
      "IT management",
      "proactive IT support",
      "outsourced IT",
    ],
  },
  {
    slug: "cybersecurity-consulting",
    name: "Cybersecurity Consulting",
    summary:
      "Practical, business-focused security guidance to help protect your data, systems and reputation.",
    icon: ShieldCheck,
    heroHeadline: "Protect Your Business With Practical Cybersecurity",
    overview: [
      "Security threats are a real and growing risk for businesses of every size. Our cybersecurity consulting helps you understand your risks and take practical, prioritised steps to protect your data, systems and reputation.",
      "We translate security into clear business decisions — no jargon, no fear tactics, just sensible guidance you can act on.",
    ],
    benefits: [
      {
        title: "Clear Risk Assessment",
        description:
          "A straightforward view of where your business is exposed and what matters most.",
      },
      {
        title: "Prioritised Actions",
        description:
          "Practical recommendations ordered by impact so you improve security efficiently.",
      },
      {
        title: "Business-Focused Advice",
        description:
          "Guidance framed around your operations, not generic checklists.",
      },
      {
        title: "Ongoing Guidance",
        description:
          "Support to help you maintain good security practices as you grow.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We review your systems, data and current security posture.",
      },
      {
        title: "Plan",
        description:
          "We identify risks and prioritise practical improvements.",
      },
      {
        title: "Deliver",
        description:
          "We help you implement stronger, sensible security measures.",
      },
      {
        title: "Support",
        description:
          "We provide ongoing guidance to keep your defences current.",
      },
    ],
    faqs: [
      {
        question: "We're a small business — do we really need this?",
        answer:
          "Yes. Businesses of every size are targeted. We focus on practical, proportionate steps that meaningfully reduce your risk.",
      },
      {
        question: "Will this disrupt how we work?",
        answer:
          "We recommend improvements that fit your operations, prioritising changes that protect you with minimal disruption.",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "Yes. Security is ongoing, and we can provide continued guidance to help you stay protected as your business evolves.",
      },
    ],
    keywords: [
      "cybersecurity consulting",
      "business security",
      "cyber risk assessment",
      "data protection",
    ],
  },
  {
    slug: "business-automation-solutions",
    name: "Business Automation Solutions",
    summary:
      "Automate repetitive tasks and connect your tools so your team spends time on work that matters.",
    icon: Workflow,
    heroHeadline: "Automate The Busywork And Reclaim Your Team's Time",
    overview: [
      "Manual, repetitive tasks quietly drain your team's time and introduce errors. Our automation solutions streamline your workflows and connect the tools you already use, so routine work happens reliably in the background.",
      "We identify the highest-impact opportunities first, so you see real time savings quickly.",
    ],
    benefits: [
      {
        title: "Save Time",
        description:
          "Free your team from repetitive manual tasks and focus on higher-value work.",
      },
      {
        title: "Reduce Errors",
        description:
          "Consistent, automated processes reduce the mistakes that come from manual effort.",
      },
      {
        title: "Connected Tools",
        description:
          "We integrate the systems you already use so data flows smoothly between them.",
      },
      {
        title: "Scalable Processes",
        description:
          "Workflows that keep working as your volume and business grow.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We map your current workflows and the tasks costing you the most time.",
      },
      {
        title: "Plan",
        description:
          "We prioritise the automations with the greatest impact.",
      },
      {
        title: "Deliver",
        description:
          "We build and test reliable automations and integrations.",
      },
      {
        title: "Support",
        description:
          "We refine and extend your automations as your needs change.",
      },
    ],
    faqs: [
      {
        question: "What kinds of tasks can be automated?",
        answer:
          "Repetitive, rule-based tasks and hand-offs between tools — such as data entry, notifications and routine processes — are strong candidates for automation.",
      },
      {
        question: "Will automation work with our current tools?",
        answer:
          "In most cases, yes. We integrate with the systems you already rely on and recommend the most reliable approach.",
      },
      {
        question: "How soon will we see results?",
        answer:
          "We prioritise high-impact automations first, so you typically see meaningful time savings early.",
      },
    ],
    keywords: [
      "business automation",
      "workflow automation",
      "process automation",
      "systems integration",
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    summary:
      "Consistent, professional social media presence that builds trust and keeps your business visible.",
    icon: Share2,
    heroHeadline: "A Consistent Social Presence That Builds Trust",
    overview: [
      "A consistent, professional social media presence keeps your business visible and builds trust with your audience. We manage your social channels with a clear, on-brand approach so you stay active without the time drain.",
      "We focus on quality and consistency over noise, representing your business the way you want to be seen.",
    ],
    benefits: [
      {
        title: "Consistent Presence",
        description:
          "Regular, professional activity that keeps your business visible and credible.",
      },
      {
        title: "On-Brand Content",
        description:
          "Content that represents your business clearly and professionally.",
      },
      {
        title: "Time Saved",
        description:
          "We handle the ongoing effort so you can focus on running your business.",
      },
      {
        title: "Responsive Communication",
        description:
          "A dependable partner who keeps you informed and involved.",
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We learn your brand, audience and goals for social media.",
      },
      {
        title: "Plan",
        description:
          "We agree the channels, tone and content approach that fit your business.",
      },
      {
        title: "Deliver",
        description:
          "We manage and publish consistent, professional content.",
      },
      {
        title: "Support",
        description:
          "We review, adjust and keep your presence active over time.",
      },
    ],
    faqs: [
      {
        question: "Which platforms do you manage?",
        answer:
          "We focus on the platforms where your audience actually is, so your effort goes where it delivers the most value.",
      },
      {
        question: "Do I have a say in the content?",
        answer:
          "Yes. We keep you involved and ensure everything stays on-brand and aligned with how you want your business represented.",
      },
      {
        question: "Do you guarantee specific results?",
        answer:
          "We focus on consistent, professional presence and steady improvement rather than making unrealistic promises.",
      },
    ],
    keywords: [
      "social media management",
      "social media marketing",
      "content management",
      "brand presence",
    ],
  },
];

/** Lookup a single service by slug. */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** All slugs — used for static generation and sitemap. */
export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
