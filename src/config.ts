export const siteConfig = {
    title: "狐言乱语",
    description: "不写代码的Baka不是好狐狸。随便写写，别太当真。",
    keywords: "小狐,Baka小狐,BakaXH,BakaXH日记,BakaXH的博客,BakaXH的博客网站,狐言乱语,狐言乱语博客,狐言乱语网站,狐言乱语BLOG,狐言乱语BLOG网站,狐言乱语BLOG网站",
    lang: "zh-CN",
    url: "https://blog.foxmoe.top",
    entry: "/",
    themeMode: "auto",

    /* 默认头图 */
    defaultCover: "/images/wallhaven-qr3j1r.jpg",

    /* 阅读速度 */
    readingSpeed: 320,

    /* 文章超过该天数未更新则提示“内容可能已过期” */
    outdatedDays: 180,

    /* 导航链接 */
    navLinks: [
        { href: "/", label: "首页" },
        { href: "/posts", label: "文章" },
        { href: "/dynamics", label: "动态" },
        { href: "/archive", label: "归档" },
        { href: "/tags", label: "标签" },
        { href: "/categories", label: "分类" },
        { href: "/tools", label: "工具" },
        { href: "/links", label: "友链" },
        { href: "/about", label: "关于" },
    ],

    /* 友链 */
    friendLinks: [
        { name: "Astro", url: "https://astro.build", avatar: "https://astro.build/favicon.svg", desc: "The web framework for content-driven websites" },
        { name: "示例友链", url: "https://example.com", avatar: "", desc: "在这里替换为你的友链伙伴 ~" },
    ],

    /* 工具 */
    tools: [
        { name: "示例工具", url: "https://example.com", desc: "在这里替换为你的小工具链接", icon: "link" },
        { name: "Astro 文档", url: "https://docs.astro.build", desc: "Astro 官方文档", icon: "github" },
    ],

    /* 社交 */
    socialLinks: [
        { name: "GitHub", url: "https://github.com/Foxmoe", icon: "github" },
        { name: "RSS", url: "/rss.xml", icon: "rss" },
    ],

    /* 页脚信息 */
    footer: {
        since: "2022-06-01",
        icp: "",
        beian: "",
        poweredBy: true,
    },

    /* 文章许可 */
    license: {
        name: "CC BY-NC-SA 4.0",
        url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    },

    /* 评论系统 */
    comments: {
        // 部署在 Cloudflare Pages Functions 的 Twikoo 函数地址，例如 https://your-domain/twikoo
        twikooEnv: "",
        twikooSrc:
            "https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.all.min.js",
    },
}

export const profileConfig = {
    name: "小狐",
    avatar: "/images/avatar.jpg",
    bio: "不写代码的Baka不是好狐狸。随便写写，别太当真。",
    social: [
        { name: "GitHub", url: "https://github.com/Foxmoe", icon: "github" },
        { name: "Email", url: "mailto:hi@foxmoe.top", icon: "mail" },
    ],
}

export default siteConfig;
