export const siteConfig = {
    title: "狐言碎语",
    description: "不写代码的Baka不是好狐狸。随便写写，别太当真。",
    keywords: "小狐,Baka小狐,BakaXH,BakaXH日记,BakaXH的博客,BakaXH的博客网站,狐言碎语,狐言碎语博客,狐言碎语网站,狐言碎语BLOG,狐言碎语BLOG网站,狐言碎语BLOG网站",
    lang: "zh-CN",
    url: "https://blog.foxmoe.top",
    entry: "/",
    themeMode: "auto",

    defaultCover: "/images/wallhaven-qr3j1r.jpg",

    readingSpeed: 320,

    outdatedDays: 180,

    navLinks: [
        { href: "/", label: "首页" },
        { href: "/posts", label: "文章" },
        { href: "/dynamics", label: "动态" },
        { href: "/archive", label: "归档" },
        { href: "/categories", label: "分类" },
        { href: "/tools", label: "工具" },
        { href: "/links", label: "友链" },
        { href: "/about", label: "关于" },
    ],

    friendLinks: [
        { name: "菱华博客", url: "https://blog.inlyra.cn", avatar: "https://bed.foxmoe.top/file/images/1785997326402_image.png", desc: "一个分享想法的小站点" },
        { name: "胡巴的博客", url: "https://hlydwz.com", avatar: "", desc: "胡巴的博客是一个自建的全栈个人博客系统，使用 Astro + React + PocketBase 构建，自 2025 年运行至今。" },
    ],

    tools: [
        { name: "示例工具", url: "https://example.com", desc: "在这里替换为你的小工具链接", icon: "link" },
        { name: "Astro 文档", url: "https://docs.astro.build", desc: "Astro 官方文档", icon: "github" },
    ],

    socialLinks: [
        { name: "GitHub", url: "https://github.com/Foxmoe", icon: "github" },
        { name: "RSS", url: "/rss.xml", icon: "rss" },
    ],

    footer: {
        since: "2022-06-01",
        icp: "",
        beian: "",
        poweredBy: true,
    },

    license: {
        name: "CC BY-NC-SA 4.0",
        url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    },

    comments: {
        walineServer: "https://waline.foxmoe.top",
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
