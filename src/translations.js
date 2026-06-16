export const translations = {
  en: {
    name: "Hasan Abouminyar",
    title: "Software Engineer | Enterprise & ERP Systems Developer",
    subtitle: "Software Developer",
    quote: '"Coding is just advanced Ctrl+C and Ctrl+V — with a little bit of magic in between."',
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      guestbook: "Notes",
      contact: "Contact",
    },
    about: {
      title: "About Me",
      summaryTitle: "Professional Summary",
      summary: "Software Engineer specializing in backend architecture and development of enterprise systems, with a strategic focus on designing and building Enterprise Resource Planning (ERP) systems and multi-tenant Software as a Service (SaaS) applications. Highly proficient in designing scalable software architectures and applying Clean Code standards using the Laravel framework. Distinguished by analytical capability to optimize database performance, handle complex concurrent operations, and deploy advanced technical solutions to ensure the highest levels of efficiency, stability, and information security for organizational operational processes.",
      quote: "I believe programming is not just writing code but an artistic craft that requires a blend of skill, logical thinking, and a bit of magic!",
    },
    skills: {
      title: "Technical and Soft Skills",
      techTitle: "Technical Skills",
      softTitle: "Soft Skills",
      techList: [
        {
          name: "Backend Architecture",
          desc: "Professional system and API development using PHP and the Laravel framework."
        },
        {
          name: "Database Management",
          desc: "Designing relational databases (MySQL), handling concurrent transactions, and ensuring data integrity."
        },
        {
          name: "Frontend Technologies",
          desc: "Practical knowledge of the JavaScript ecosystem, including Next.js and Vue.js frameworks for UI integration and development."
        },
        {
          name: "Version Control",
          desc: "Using Git and GitHub for code management and ensuring the quality and continuity of the development cycle."
        }
      ],
      soft: [
        "Analytical Thinking",
        "Time & Task Management",
        "Effective Communication",
        "Persistence & Problem Solving",
        "Self-Learning",
        "Creativity & Design Thinking",
        "Teamwork & Collaboration",
      ],
    },
    projects: {
      title: "My Projects",
      subtitle: "Here's a selection of projects I've worked on. Each one presented unique challenges and opportunities for growth, from financial tracking systems to HR management.",
      viewMore: "Details & Features",
      techUsed: "Technologies Used",
      items: [
        {
          title: "Financial Follow-up System | Passport, Nationality & Foreigners Affairs Department",
          description: "An enterprise web system designed to track financial receipts and manage the lifecycle of material disbursements.",
          achievements: [
            "High-precision automation of receipt book tracking and recording citizens' financial transactions.",
            "Management and control of material disbursement requests and logistical delivery movements between central warehouses and branches.",
            "Engineering and implementing a flexible Role-Based Access Control (RBAC) system, enabling advanced permission management customized to the administrative structure of the department."
          ],
          tags: ["Laravel", "Next.js"]
        },
        {
          title: "Human Resource Management System (HRMS) | Judicial Police Force",
          description: "A highly secure local (On-Premise) management system to organize public forces and track the movement of officers and employees.",
          achievements: [
            "Engineering an advanced automation engine to calculate automatic promotions based on precise seniority algorithms (day/month/year).",
            "Developing an interactive module for generating official documents, integrated with a comprehensive audit logs system to ensure administrative and security accountability.",
            "Designing a database architecture based on database transactions to ensure the integrity of sensitive personally identifiable information (PII) and prevent any data conflict or loss."
          ],
          tags: ["Electron.js", "Node.js", "Next.js", "Laravel", "MySQL"]
        }
      ]
    },
    education: {
      title: "Get to know my Education.",
      subtitle: "A quick look at my academic background and achievements.",
      items: [
        {
          institution: 'University of Tripoli',
          degree: 'Software Engineering',
          department: 'Faculty of Information Technology',
        },
        {
          institution: 'International College for Languages',
          degree: 'High Diploma in English Language',
          department: 'English Language Department',
        },
      ]
    },
    guestbook: {
      eyebrow: "Guestbook Wall",
      title: "Sticky Notes Wall",
      subtitle: "Leave advice, a recommendation, or a clear short message. Your note appears instantly for everyone.",
      addNote: "Add note",
      live: "Live sync on",
      connecting: "Connecting live sync",
      canvasLabel: "Interactive sticky notes wall. Double-click empty space to write a note.",
      loading: "Loading notes...",
      empty: "Leave the first note, recommendation, or clear message here.",
      configError: "Supabase is not configured yet.",
      loadError: "Notes could not be loaded. Run supabase/schema.sql in Supabase first.",
      postError: "Note could not be posted. Please try again.",
      updateError: "Note position could not be saved.",
      validation: {
        required: "Write a short message first.",
      },
      form: {
        message: "Message",
        placeholder: "Advice, recommendation, or hello...",
        color: "Note color",
        post: "Post",
        posting: "Posting...",
        cancel: "Close",
      },
      colors: {
        yellow: "Yellow",
        pink: "Pink",
        blue: "Blue",
        green: "Green",
      },
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Open to new opportunities and collaborations—feel free to connect or reach out with any questions!",
      connect: "Connect >",
      channelsTitle: "Direct Channels",
      channelsSubtitle: "Choose the channel that fits best. The message form is available in the footer.",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@example.com",
        subject: "Subject",
        subjectPlaceholder: "Project, opportunity, or question",
        message: "Message",
        messagePlaceholder: "Write your message here",
        send: "Send Message",
        sending: "Sending...",
        success: "Your message has been sent successfully.",
        error: "Message could not be sent right now. Please try again.",
        configError: "Supabase is not configured yet.",
        validation: {
          name: "Please enter a valid name.",
          email: "Please enter a valid email address.",
          subject: "Please enter a subject.",
          message: "Please write a message with at least 10 characters.",
          links: "Links are not allowed in this form.",
          unsafe: "The message contains unsafe characters or code-like content.",
          repeated: "The message contains too many repeated characters.",
          rateLimit: "Too many messages. Try again after",
          duplicate: "This message was already submitted recently.",
        },
      },
      labels: {
        WhatsApp: "WhatsApp",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        TikTok: "TikTok",
        YouTube: "YouTube",
        LinkedIn: "LinkedIn",
        GitHub: "GitHub"
      }
    },
    admin: {
      dashboard: "Admin",
      title: "Admin Dashboard",
      loginTitle: "Admin Login",
      loginSubtitle: "Welcome Hasan",
      loginImageAlt: "Admin login illustration",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing in...",
      showPassword: "Show password",
      hidePassword: "Hide password",
      logout: "Logout",
      inbox: "Incoming Messages",
      refresh: "Refresh",
      loading: "Loading messages...",
      noMessages: "No messages found.",
      reply: "Reply",
      markRead: "Mark Read",
      archive: "Archive",
      delete: "Delete",
      confirmDelete: "Delete this message permanently?",
      configError: "Missing Supabase variables:",
      configMissing: "Supabase is not configured yet. Check the .env values and restart the dev server.",
      projectUrlError: "The Supabase Project URL is incorrect. Use the base URL only, without /rest/v1.",
      loginError: "Invalid email or password.",
      invalidCredentials: "The email or password is incorrect.",
      tooManyAttempts: "Too many login attempts. Try again after",
      setupMissing: "The contact_messages table does not exist yet. Run supabase/schema.sql in the Supabase SQL Editor first.",
      setupPermission: "Supabase rejected the request because the database schema permissions are not ready.",
      networkError: "Could not reach the Supabase project URL. Check the Project URL in .env.",
      loadError: "Messages could not be loaded.",
      actionError: "Action could not be completed.",
      filters: {
        all: "All",
        new: "New",
        read: "Read",
        archived: "Archived",
      },
      stats: {
        total: "Total",
        new: "New",
        read: "Read",
        archived: "Archived",
      },
      status: {
        new: "New",
        read: "Read",
        archived: "Archived",
      },
    },
    footer: {
      formEyebrow: "Contact Form",
      formTitle: "Send a Message",
      formSubtitle: "Use this form for project details, opportunities, or any question that needs a structured reply.",
      rights: "All rights reserved.",
      magic: "Built with a touch of magic ✨"
    }
  },
  ar: {
    name: "حـسـن ابومنيار",
    title: "مهندس برمجيات | مطور أنظمة مؤسسية (Backend & ERP Systems)",
    subtitle: "مهندس برمجيات ومطور أنظمة مؤسسية",
    quote: '"كتابة الكود هي مجرد عملية نسخ ولصق متقدمة — مع القليل من السحر بينهما."',
    nav: {
      about: "عني",
      skills: "المهارات",
      projects: "المشاريع",
      education: "التعليم",
      guestbook: "الملاحظات",
      contact: "اتصل بي",
    },
    about: {
      title: "من أنا",
      summaryTitle: "الملخص المهني",
      summary: "مهندس برمجيات متخصص في هندسة وتطوير الواجهات الخلفية (Backend) للأنظمة المؤسسية (Enterprise Systems)، مع تركيز استراتيجي على تصميم وبناء أنظمة تخطيط موارد المؤسسات (ERP) وتطبيقات البرمجيات كخدمة (SaaS) متعددة المستأجرين. أمتلك كفاءة عالية في تصميم معماريات برمجية قابلة للتوسع، وتطبيق معايير \"الكود النظيف\" (Clean Code) بالاعتماد على إطار عمل Laravel. أتميز بالقدرة التحليلية لتحسين أداء قواعد البيانات، ومعالجة العمليات المتزامنة المعقدة، وتوظيف الحلول التقنية المتقدمة لضمان تحقيق أعلى مستويات الكفاءة، الاستقرار، والأمن المعلوماتي للعمليات التشغيلية للمؤسسات.",
      quote: "أؤمن بأن البرمجة ليست مجرد كتابة كود، بل هي حرفة فنية تتطلب مزيجاً من المهارة، التفكير المنطقي، وقليلاً من السحر!",
    },
    skills: {
      title: "الكفاءات والمهارات المهنية",
      techTitle: "الكفاءات التقنية",
      softTitle: "المهارات الشخصية",
      techList: [
        {
          name: "هندسة الواجهات الخلفية (Backend Architecture)",
          desc: "احتراف تطوير النظم وواجهات برمجة التطبيقات (APIs) باستخدام (PHP) وإطار عمل (Laravel)."
        },
        {
          name: "إدارة قواعد البيانات",
          desc: "تصميم قواعد البيانات العلائقية (MySQL)، معالجة العمليات المتزامنة، وضمان تكامل البيانات (Data Integrity)."
        },
        {
          name: "تقنيات الواجهات الأمامية (Frontend)",
          desc: "معرفة تطبيقية بمنظومة (JavaScript)، تشمل أطر عمل (Next.js) و (Vue.js) لدمج وتطوير واجهات المستخدم."
        },
        {
          name: "إدارة التحكم في الإصدارات (Version Control)",
          desc: "استخدام (Git) و (GitHub) لإدارة الأكواد البرمجية وضمان جودة واستمرارية دورة التطوير."
        }
      ],
      soft: [
        "التفكير التحليلي",
        "إدارة الوقت والمهام",
        "التواصل الفعال",
        "المثابرة وحل المشكلات",
        "التعلم الذاتي",
        "الإبداع والتفكير التصميمي",
        "العمل الجماعي والتعاون",
      ],
    },
    projects: {
      title: "مشاريعي التقنية",
      subtitle: "إليكم مجموعة مختارة من المشاريع والأنظمة المؤسسية التي قمت بهندستها وتطويرها، والتي تغطي الأنظمة المالية وإدارة الموارد البشرية الحساسة.",
      viewMore: "التفاصيل والمميزات",
      techUsed: "التقنيات المستخدمة",
      items: [
        {
          title: "نظام المتابعة المالية | مصلحة الجوازات والجنسية وشؤون الأجانب",
          description: "نظام ويب مؤسسي مصمم لتتبع الإيصالات المالية وإدارة دورة حياة صرف المواد.",
          achievements: [
            "أتمتة عمليات تتبع دفاتر الإيصالات وتسجيل المعاملات المالية للمواطنين بدقة عالية.",
            "إدارة ورقابة طلبات صرف المواد وحركة التسليمات اللوجستية بين المخازن المركزية والفروع.",
            "هندسة وتطبيق نظام تحكم في الوصول مبني على الأدوار (Role-Based Access Control - RBAC) يتسم بالمرونة، مما يتيح إدارة الصلاحيات المتقدمة وتخصيصها وفقاً للهيكل الإداري للمصلحة."
          ],
          tags: ["Laravel", "Next.js"]
        },
        {
          title: "نظام إدارة الموارد البشرية (HRMS) | جهاز الشرطة القضائية",
          description: "نظام إدارة محلي (On-Premise) عالي الأمان لتنظيم القوة العمومية وتتبع حركة الضباط والموظفين.",
          achievements: [
            "هندسة محرك أتمتة متقدم لاحتساب الترقيات التلقائية استناداً إلى خوارزميات أقدمية دقيقة (يوم/شهر/سنة).",
            "تطوير وحدة تفاعلية لتوليد الوثائق الرسمية، مدمجة مع سجل تدقيق شامل (Audit Logs) لضمان المساءلة الإدارية والأمنية.",
            "تصميم معمارية قواعد بيانات تعتمد على إدارة المعاملات (Database Transactions) لضمان سلامة بيانات التعريف الشخصية (PII) الحساسة ومنع أي تضارب أو فقدان للبيانات."
          ],
          tags: ["Electron.js", "Node.js", "Next.js", "Laravel", "MySQL"]
        }
      ]
    },
    education: {
      title: "تعرف على مسيرتي التعليمية",
      subtitle: "نظرة سريعة على خلفيتي الأكاديمية ومؤهلاتي.",
      items: [
        {
          institution: 'جامعة طرابلس',
          degree: 'هندسة البرمجيات',
          department: 'كلية تقنية المعلومات',
        },
        {
          institution: 'الكلية الدولية للغات',
          degree: 'دبلوم عالي في اللغة الإنجليزية',
          department: 'قسم اللغة الإنجليزية',
        },
      ]
    },
    guestbook: {
      eyebrow: "جدار الزوار",
      title: "جدار الملاحظات التفاعلي",
      subtitle: "اترك نصيحة، توصية، أو رسالة قصيرة وواضحة. ستظهر الملاحظة مباشرة لكل الزوار.",
      addNote: "أضف ملاحظة",
      live: "المزامنة المباشرة تعمل",
      connecting: "جاري ربط المزامنة",
      canvasLabel: "جدار ملاحظات تفاعلي. انقر نقراً مزدوجاً على مساحة فارغة لكتابة ملاحظة.",
      loading: "جاري تحميل الملاحظات...",
      empty: "اترك أول ملاحظة أو نصيحة أو توصية واضحة هنا.",
      configError: "لم يتم إعداد Supabase بعد.",
      loadError: "تعذر تحميل الملاحظات. شغّل ملف supabase/schema.sql في Supabase أولاً.",
      postError: "تعذر نشر الملاحظة. حاول مرة أخرى.",
      updateError: "تعذر حفظ موقع الملاحظة.",
      validation: {
        required: "اكتب رسالة قصيرة أولاً.",
      },
      form: {
        message: "الرسالة",
        placeholder: "نصيحة، توصية، أو تحية قصيرة...",
        color: "لون الملاحظة",
        post: "نشر",
        posting: "جاري النشر...",
        cancel: "إغلاق",
      },
      colors: {
        yellow: "أصفر",
        pink: "وردي",
        blue: "أزرق",
        green: "أخضر",
      },
    },
    contact: {
      title: "تواصل معي",
      subtitle: "مستعد دائماً لمناقشة فرص التعاون والمشاريع الجديدة—لا تتردد في التواصل معي أو طرح أي استفسار!",
      connect: "تواصل معي >",
      channelsTitle: "قنوات التواصل المباشر",
      channelsSubtitle: "اختر القناة الأنسب. نموذج الرسائل موجود في التذييل.",
      form: {
        name: "الاسم",
        namePlaceholder: "اكتب اسمك",
        email: "البريد الإلكتروني",
        emailPlaceholder: "you@example.com",
        subject: "الموضوع",
        subjectPlaceholder: "مشروع، فرصة، أو استفسار",
        message: "نص الرسالة",
        messagePlaceholder: "اكتب رسالتك هنا",
        send: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        success: "تم إرسال رسالتك بنجاح.",
        error: "تعذر إرسال الرسالة حالياً. حاول مرة أخرى.",
        configError: "لم يتم إعداد Supabase بعد.",
        validation: {
          name: "يرجى إدخال اسم صحيح.",
          email: "يرجى إدخال بريد إلكتروني صحيح.",
          subject: "يرجى إدخال موضوع الرسالة.",
          message: "يرجى كتابة رسالة لا تقل عن 10 أحرف.",
          links: "الروابط غير مسموحة في نموذج التواصل.",
          unsafe: "الرسالة تحتوي على رموز أو محتوى غير آمن.",
          repeated: "الرسالة تحتوي على تكرار مزعج للحروف.",
          rateLimit: "عدد الرسائل كبير. حاول مرة أخرى بعد",
          duplicate: "تم إرسال هذه الرسالة مؤخراً.",
        },
      },
      labels: {
        WhatsApp: "واتساب",
        Email: "البريد الإلكتروني",
        Facebook: "فيسبوك",
        Instagram: "إنستغرام",
        TikTok: "تيك توك",
        YouTube: "يوتيوب",
        LinkedIn: "لينكد إن",
        GitHub: "جيت هاب"
      }
    },
    admin: {
      dashboard: "الإدارة",
      title: "لوحة التحكم",
      loginTitle: "تسجيل دخول الإدارة",
      loginSubtitle: "مرحبا حسن",
      loginImageAlt: "صورة صفحة تسجيل دخول الإدارة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signIn: "تسجيل الدخول",
      signingIn: "جاري الدخول...",
      showPassword: "إظهار كلمة المرور",
      hidePassword: "إخفاء كلمة المرور",
      logout: "خروج",
      inbox: "الرسائل الواردة",
      refresh: "تحديث",
      loading: "جاري تحميل الرسائل...",
      noMessages: "لا توجد رسائل.",
      reply: "رد",
      markRead: "تعيين كمقروءة",
      archive: "أرشفة",
      delete: "حذف",
      confirmDelete: "هل تريد حذف هذه الرسالة نهائياً؟",
      configError: "متغيرات Supabase الناقصة:",
      configMissing: "لم يتم إعداد Supabase بعد. تأكد من قيم .env وأعد تشغيل الخادم.",
      projectUrlError: "رابط مشروع Supabase غير صحيح. استخدم الرابط الأساسي فقط بدون /rest/v1.",
      loginError: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      tooManyAttempts: "محاولات تسجيل الدخول كثيرة. حاول مرة أخرى بعد",
      setupMissing: "جدول contact_messages غير موجود بعد. شغّل ملف supabase/schema.sql من SQL Editor أولاً.",
      setupPermission: "Supabase رفض العملية بسبب صلاحيات قاعدة البيانات على schema public.",
      networkError: "تعذر الوصول إلى رابط مشروع Supabase. تحقق من Project URL في ملف .env.",
      loadError: "تعذر تحميل الرسائل.",
      actionError: "تعذر تنفيذ العملية.",
      filters: {
        all: "الكل",
        new: "جديدة",
        read: "مقروءة",
        archived: "مؤرشفة",
      },
      stats: {
        total: "الإجمالي",
        new: "جديدة",
        read: "مقروءة",
        archived: "مؤرشفة",
      },
      status: {
        new: "جديدة",
        read: "مقروءة",
        archived: "مؤرشفة",
      },
    },
    footer: {
      formEyebrow: "نموذج التواصل",
      formTitle: "أرسل رسالة",
      formSubtitle: "استخدم هذا النموذج لتفاصيل المشاريع، فرص التعاون، أو أي استفسار يحتاج رداً منظماً.",
      rights: "جميع الحقوق محفوظة.",
      magic: "صُنع بلمسة من السحر ✨"
    }
  }
};
