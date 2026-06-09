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

  window.dispatchEvent(new CustomEvent("languagechange", { detail: { language } }));
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

const trainingDetails = {
  lesson: {
    ja: [
      ["基礎文法だけでなく、設計・テスト・レビューまでを一連の開発体験として学びます。", "Python / JavaScript / Javaの実践演習", "Gitを使ったチーム開発とコードレビュー", "小規模アプリケーションの企画・実装"],
      ["主要クラウドの考え方を比較し、安全で運用しやすい構成を設計できる力を育てます。", "AWS・Azure・Google Cloudのサービス比較", "ネットワーク、権限、監視の基礎設計", "コストを意識したクラウド構成演習"],
      ["分析テーマの設定からモデル評価まで、ビジネス判断につながるデータ活用を実践します。", "Pythonによるデータ加工と可視化", "回帰・分類・クラスタリングの基礎", "精度評価と分析結果のプレゼンテーション"],
      ["攻撃者と防御者の両方の視点から、組織で必要となるセキュリティ対策を体系的に学びます。", "脆弱性と代表的な攻撃手法の理解", "インシデント対応とエスカレーション演習", "アクセス制御・ログ監視・安全な開発"],
      ["利用者視点の設計から公開・改善まで、Webサービス開発の流れを実装中心で経験します。", "レスポンシブUIとアクセシビリティ", "API連携とフロントエンド状態管理", "テスト、公開、パフォーマンス改善"],
      ["顧客理解とデータ分析を組み合わせ、成果を測定できるデジタル施策を設計します。", "SEO・広告・SNSのチャネル設計", "顧客導線とコンテンツ企画", "KPI設定、効果測定、改善サイクル"],
      ["大規模データを安定して処理し、意思決定に使える形へ変換する基盤を学びます。", "Hadoop・Sparkによる分散処理", "データパイプラインと品質管理", "ダッシュボードと可視化設計"],
      ["AIモデルとロボット制御の関係を理解し、自動化の可能性と限界を実機・演習で確認します。", "機械学習と画像認識の基礎", "センサー情報と制御ロジック", "安全性・倫理・社会実装の検討"],
    ],
    en: [
      ["A hands-on path from syntax to design, testing, and review, built around a complete development experience.", "Practical Python, JavaScript, and Java exercises", "Team development and code review with Git", "Planning and building a small application"],
      ["Compare major cloud platforms and learn to design secure, operable, and cost-aware environments.", "AWS, Azure, and Google Cloud service comparison", "Networking, identity, and monitoring fundamentals", "Cost-conscious cloud architecture exercises"],
      ["Practice the full analytics lifecycle, from framing a business question to evaluating and presenting a model.", "Data preparation and visualization with Python", "Regression, classification, and clustering", "Model evaluation and presentation of findings"],
      ["Learn organizational security from both attacker and defender perspectives.", "Common vulnerabilities and attack patterns", "Incident response and escalation exercises", "Access control, logging, and secure development"],
      ["Build web services from user-centered design through release and continuous improvement.", "Responsive UI and accessibility", "API integration and frontend state management", "Testing, deployment, and performance tuning"],
      ["Combine customer insight with analytics to create measurable digital growth programs.", "SEO, advertising, and social channel planning", "Customer journeys and content strategy", "KPI design, measurement, and optimization"],
      ["Learn how to process large datasets reliably and transform them into decision-ready information.", "Distributed processing with Hadoop and Spark", "Data pipelines and quality management", "Dashboard and visualization design"],
      ["Explore the connection between AI models and robotic control through practical automation exercises.", "Machine learning and computer vision basics", "Sensor data and control logic", "Safety, ethics, and real-world adoption"],
    ],
    zh: [
      ["不仅学习基础语法，还通过设计、测试与评审体验完整的软件开发流程。", "Python、JavaScript、Java 实践练习", "使用 Git 进行团队开发与代码评审", "策划并实现小型应用程序"],
      ["比较主流云平台，培养设计安全、易运维并兼顾成本的云环境能力。", "AWS、Azure、Google Cloud 服务比较", "网络、权限与监控基础设计", "兼顾成本的云架构练习"],
      ["从业务问题定义到模型评价，实践能够支持经营判断的数据分析流程。", "使用 Python 处理与可视化数据", "回归、分类与聚类基础", "模型评价与分析结果汇报"],
      ["从攻击与防御两个视角，系统学习组织所需的安全措施。", "常见漏洞与攻击方式", "安全事件响应与升级演练", "访问控制、日志监控与安全开发"],
      ["以实现为中心，体验从用户需求设计到发布和持续改善的 Web 开发流程。", "响应式界面与无障碍设计", "API 对接与前端状态管理", "测试、部署和性能优化"],
      ["结合客户洞察和数据分析，设计能够衡量成果的数字营销方案。", "SEO、广告及社交媒体规划", "客户路径与内容策略", "KPI 设置、效果衡量与持续改善"],
      ["学习稳定处理大规模数据，并将其转化为决策信息的数据平台能力。", "使用 Hadoop、Spark 进行分布式处理", "数据管道与质量管理", "仪表盘与可视化设计"],
      ["通过实践理解 AI 模型与机器人控制的关系，并认识自动化的能力和边界。", "机器学习与图像识别基础", "传感器数据与控制逻辑", "安全、伦理与社会应用"],
    ],
  },
  seminar: {
    ja: [
      ["経営課題を起点にDXロードマップを描き、投資効果を継続的に測定する考え方を共有しました。", "業務プロセスの可視化", "優先順位とKPIの設定", "金融業界の事例検討"],
      ["分散台帳の仕組みから実務導入時のリスクまで、技術とビジネスの両面を整理しました。", "暗号資産とブロックチェーンの基本構造", "スマートコントラクトの活用", "規制・セキュリティ上の論点"],
      ["金融機関を想定した脅威分析を通じ、予防・検知・復旧を一体で設計する方法を扱いました。", "リスク評価と脅威モデリング", "多層防御と監視体制", "インシデント対応計画"],
      ["データ品質を確保しながら予測モデルを業務へ組み込むための実践的な進め方を紹介しました。", "分析テーマと評価指標の設計", "予測モデルの構築と検証", "説明可能性と業務運用"],
      ["クラウド移行の判断軸と責任共有モデルを理解し、安全性と効率性を両立する構成を検討しました。", "移行方式とサービス選定", "ゼロトラストと権限管理", "コスト・可用性・監視設計"],
      ["AIを金融業務へ適用する際のモデル選定、データ管理、ガバナンスを具体例とともに解説しました。", "与信・不正検知・顧客対応の事例", "モデル精度と説明可能性", "人とAIの役割分担"],
      ["規制変更を継続的に把握し、業務・システム・証跡管理へ反映する運用モデルを整理しました。", "規制動向のモニタリング", "統制・承認プロセス", "監査証跡とレポーティング"],
      ["顧客データを安全に活用し、接点ごとに一貫した体験を作るマーケティング戦略を検討しました。", "顧客セグメントとペルソナ", "オムニチャネル施策", "獲得・継続率の効果測定"],
      ["ブロックチェーンが決済、証券、本人確認などへ与える影響を、中長期の視点で議論しました。", "金融インフラの変化", "トークン化とデジタル資産", "実証実験から事業化への課題"],
      ["キャッシュレス化、CBDC、組み込み型金融を取り上げ、次世代決済の顧客体験を考察しました。", "決済手段と利用動向", "リアルタイム決済とデータ活用", "安全性・利便性・規制のバランス"],
    ],
    en: [
      ["Shared a practical approach to building a DX roadmap from business priorities and measuring value over time.", "Business process visualization", "Prioritization and KPI design", "Financial industry case studies"],
      ["Connected distributed-ledger fundamentals with the business, security, and regulatory realities of adoption.", "Cryptocurrency and blockchain architecture", "Smart contract applications", "Regulatory and security considerations"],
      ["Used financial-sector threat scenarios to design prevention, detection, response, and recovery as one system.", "Risk assessment and threat modeling", "Layered defense and monitoring", "Incident response planning"],
      ["Introduced practical methods for embedding predictive models into operations while maintaining data quality.", "Analytics objectives and evaluation metrics", "Model development and validation", "Explainability and operational integration"],
      ["Examined cloud migration choices and shared responsibility to balance security, efficiency, and resilience.", "Migration patterns and service selection", "Zero trust and identity management", "Cost, availability, and monitoring design"],
      ["Explained model selection, data management, and governance for applying AI to financial operations.", "Credit, fraud, and customer-service use cases", "Accuracy and explainability", "Effective collaboration between people and AI"],
      ["Outlined an operating model for tracking regulatory change and reflecting it in processes, systems, and evidence.", "Regulatory monitoring", "Control and approval workflows", "Audit trails and reporting"],
      ["Explored how secure customer-data use can create a consistent experience across every channel.", "Segmentation and personas", "Omnichannel campaign design", "Acquisition and retention measurement"],
      ["Discussed the medium- and long-term impact of blockchain on payments, securities, and identity.", "Changes to financial infrastructure", "Tokenization and digital assets", "Moving from pilots to viable businesses"],
      ["Reviewed cashless payments, CBDCs, and embedded finance to envision next-generation payment experiences.", "Payment methods and user trends", "Real-time payments and data use", "Balancing security, convenience, and regulation"],
    ],
    zh: [
      ["从经营课题出发制定 DX 路线图，并介绍持续衡量投资效果的方法。", "业务流程可视化", "优先级与 KPI 设置", "金融行业案例分析"],
      ["从分布式账本原理到实际导入风险，同时梳理技术与商业层面的重点。", "加密资产与区块链结构", "智能合约应用", "监管与安全问题"],
      ["通过金融机构威胁场景，讲解如何一体化设计预防、检测、响应与恢复。", "风险评价与威胁建模", "多层防御与监控体系", "安全事件响应计划"],
      ["介绍在保证数据质量的同时，将预测模型应用于实际业务的实施方法。", "分析主题与评价指标设计", "预测模型构建与验证", "可解释性与业务运营"],
      ["理解云迁移判断标准与责任共担模式，探讨兼顾安全、效率和可用性的架构。", "迁移方式与服务选型", "零信任与权限管理", "成本、可用性与监控设计"],
      ["结合案例讲解 AI 应用于金融业务时的模型选择、数据管理和治理。", "授信、欺诈检测与客户服务案例", "模型精度与可解释性", "人员与 AI 的合理分工"],
      ["梳理持续掌握监管变化，并将其落实到业务、系统和证据管理的运营模式。", "监管趋势监控", "控制与审批流程", "审计记录与报告"],
      ["探讨如何安全利用客户数据，在不同触点提供一致的客户体验。", "客户细分与用户画像", "全渠道营销方案", "获客与留存效果衡量"],
      ["从中长期视角讨论区块链对支付、证券及身份认证的影响。", "金融基础设施变化", "通证化与数字资产", "从验证实验到商业化的挑战"],
      ["围绕无现金支付、央行数字货币和嵌入式金融，分析下一代支付体验。", "支付方式与用户趋势", "实时支付与数据应用", "安全、便利与监管的平衡"],
    ],
  },
};

const detailLabels = {
  ja: { lesson: "レッスン詳細", seminar: "セミナー詳細", close: "閉じる" },
  en: { lesson: "Lesson details", seminar: "Seminar details", close: "Close" },
  zh: { lesson: "课程详情", seminar: "研讨会详情", close: "关闭" },
};

const detailBackdrop = document.createElement("div");
detailBackdrop.className = "detail-backdrop";
detailBackdrop.setAttribute("aria-hidden", "true");

const detailPopover = document.createElement("aside");
detailPopover.className = "detail-popover";
detailPopover.setAttribute("role", "dialog");
detailPopover.setAttribute("aria-modal", "true");
detailPopover.setAttribute("aria-hidden", "true");
detailPopover.innerHTML = `
  <button class="detail-popover-close" type="button" aria-label="Close">&times;</button>
  <p class="detail-popover-kicker"></p>
  <h3></h3>
  <p class="detail-popover-summary"></p>
  <ul class="detail-popover-list"></ul>
`;

document.body.append(detailBackdrop, detailPopover);

let activeDetailItem = null;
let detailCloseTimer = null;

function currentLanguage() {
  return document.documentElement.dataset.lang || "ja";
}

function visibleText(item, selector, language) {
  return item.querySelector(`${selector} [data-lang="${language}"]`)?.textContent?.trim() || "";
}

function renderDetail(item) {
  const type = item.classList.contains("lesson-item") ? "lesson" : "seminar";
  const items = [...document.querySelectorAll(type === "lesson" ? ".lesson-item" : ".seminar-item")];
  const index = items.indexOf(item);
  const language = currentLanguage();
  const detail = trainingDetails[type][language]?.[index] || trainingDetails[type].ja[index];
  const labels = detailLabels[language] || detailLabels.ja;

  detailPopover.querySelector(".detail-popover-kicker").textContent = labels[type];
  detailPopover.querySelector("h3").textContent = visibleText(item, "h4", language);
  detailPopover.querySelector(".detail-popover-summary").textContent = detail[0];
  detailPopover.querySelector(".detail-popover-list").innerHTML = detail
    .slice(1)
    .map((point) => `<li>${point}</li>`)
    .join("");

  const closeButton = detailPopover.querySelector(".detail-popover-close");
  closeButton.setAttribute("aria-label", labels.close);
  closeButton.title = labels.close;
}

function showDetail(item) {
  window.clearTimeout(detailCloseTimer);
  activeDetailItem?.classList.remove("is-detail-active");
  activeDetailItem = item;
  activeDetailItem.classList.add("is-detail-active");
  renderDetail(item);
  detailBackdrop.classList.add("is-visible");
  detailPopover.classList.add("is-visible");
  detailPopover.setAttribute("aria-hidden", "false");
}

function hideDetail() {
  window.clearTimeout(detailCloseTimer);
  activeDetailItem?.classList.remove("is-detail-active");
  activeDetailItem = null;
  detailBackdrop.classList.remove("is-visible");
  detailPopover.classList.remove("is-visible");
  detailPopover.setAttribute("aria-hidden", "true");
}

function scheduleDetailClose() {
  window.clearTimeout(detailCloseTimer);
  detailCloseTimer = window.setTimeout(hideDetail, 650);
}

document.querySelectorAll(".lesson-item, .seminar-item").forEach((item) => {
  item.tabIndex = 0;
  item.setAttribute("aria-haspopup", "dialog");
  item.addEventListener("mouseenter", () => showDetail(item));
  item.addEventListener("mouseleave", scheduleDetailClose);
  item.addEventListener("focus", () => showDetail(item));
  item.addEventListener("blur", scheduleDetailClose);
  item.addEventListener("click", () => {
    if (activeDetailItem === item && detailPopover.classList.contains("is-visible")) {
      hideDetail();
    } else {
      showDetail(item);
    }
  });
});

detailPopover.addEventListener("mouseenter", () => window.clearTimeout(detailCloseTimer));
detailPopover.addEventListener("mouseleave", scheduleDetailClose);
detailPopover.querySelector(".detail-popover-close").addEventListener("click", hideDetail);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDetail();
  }
});

window.addEventListener("languagechange", () => {
  if (activeDetailItem) {
    renderDetail(activeDetailItem);
  }
});

const revealTargets = document.querySelectorAll(
  ".section-heading, .training-subheading, .service-card, .lesson-item, .seminar-item, .capability-copy, .process-list li, .company-panel, .address-panel, .career-card"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((element) => element.classList.add("reveal-ready"));
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );
  revealTargets.forEach((element) => revealObserver.observe(element));
}
