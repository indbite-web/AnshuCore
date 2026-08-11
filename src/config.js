export const CONFIG = {
  company: {
    name: "AnshuCore",
    tagline: "Building software that feels simpler.",
    description:
      "AnshuCore is a technology brand focused on creating useful, modern and thoughtfully designed digital products.",
    supportEmail: "Corexanshu@gmail.com",
    githubUrl: "https://github.com/indbite-web"
  },

  apps: [
    {
      id: "anshu-mock",
      name: "Anshu Mock",
      developer: "AnshuCore",
      platform: "Android",
      category: "Exam Preparation",
      badge: "Featured App",
      tagline: "Smarter Mock Tests. Better Preparation.",
      shortDescription:
        "A smart Android mock-test and exam preparation app designed for focused practice and a smoother learning experience.",
      fullDescription:
        "Anshu Mock by AnshuCore brings intelligent exam preparation, AI-powered question generation and a modern mock-test experience into one powerful Android app.",
      github: {
        owner: "indbite-web",
        repo: "Anshu-Mock-",
        url: "https://github.com/indbite-web/Anshu-Mock-"
      },
      features: [
        {
          id: "mcq-gen",
          title: "AI-Powered MCQ Generation",
          description: "Generate practice MCQs intelligently for focused preparation.",
          iconName: "Sparkles"
        },
        {
          id: "mock-test",
          title: "Mock Test Experience",
          description: "Practice exams through a clean and distraction-free test interface.",
          iconName: "ClipboardCheck"
        },
        {
          id: "exam-focused",
          title: "Exam-Focused Practice",
          description: "Prepare through structured question-based practice.",
          iconName: "Target"
        },
        {
          id: "smart-practice",
          title: "Smart Practice Experience",
          description: "Make repeated practice easier through a modern mobile experience.",
          iconName: "Zap"
        },
        {
          id: "profile-pers",
          title: "Profile Personalization",
          description: "Provide a personalized user experience including profile customization.",
          iconName: "UserCheck"
        },
        {
          id: "modern-ui",
          title: "Modern Interface",
          description: "Fast, responsive and polished Android experience.",
          iconName: "Smartphone"
        }
      ]
    }
  ],

  github: {
    cacheDuration: 3 * 60 * 1000 // 3 minutes
  }
};
