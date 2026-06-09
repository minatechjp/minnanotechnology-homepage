const pageCopy = {
  ja: {
    htmlLang: "ja",
    title: "みんなのテクノロジー合同会社 | AI・DX・システム開発",
    description: "みんなのテクノロジー合同会社は、Salesforce導入支援、受託ソフトウェア開発、クラウド導入、IT人材育成・派遣を提供するITパートナーです。",
  },
  en: {
    htmlLang: "en",
    title: "Minna no Technology LLC | AI, DX and System Development",
    description: "Minna no Technology LLC provides Salesforce implementation, custom software development, cloud adoption, IT training, and staffing services.",
  },
  zh: {
    htmlLang: "zh-CN",
    title: "大家的科技合同会社 | AI、DX 与系统开发",
    description: "みんなのテクノロジー合同会社提供 Salesforce 导入、软件委托开发、云服务导入、IT 人才培养与派遣服务。",
  },
};

function setLanguage(language) {
  const copy = pageCopy[language] || pageCopy.ja;
  document.documentElement.dataset.lang = language;
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;
  document.querySelector("meta[name='description']")?.setAttribute("content", copy.description);
  localStorage.setItem("companyLanguage", language);

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    const selected = button.dataset.langButton === language;
    button.setAttribute("aria-pressed", String(selected));
  });
}

document.querySelectorAll("[data-lang-button]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langButton || "ja"));
});

const savedLanguage = localStorage.getItem("companyLanguage");
const browserLanguage = navigator.language?.toLowerCase().startsWith("zh")
  ? "zh"
  : navigator.language?.toLowerCase().startsWith("en")
    ? "en"
    : "ja";

setLanguage(pageCopy[savedLanguage] ? savedLanguage : browserLanguage);

document.querySelectorAll("[data-outlook-compose]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const to = link.dataset.emailTo || "info@minnanotechnology.com";
    const subject = link.dataset.emailSubject || "";
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}`;
    const outlookUrl = `ms-outlook://compose?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}`;

    event.preventDefault();
    window.location.href = outlookUrl;
    window.setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 700);
  });
});

document.querySelectorAll("[data-open-map]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const mapUrl = link.href;
    const opened = window.open(mapUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
      window.location.href = mapUrl;
    }
  });
});
