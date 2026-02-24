import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import ProductSpecs from "../components/ProductSpecs";

const isLocal: boolean = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export default function LandingPage() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  const t: Record<string, any> = {
    ko: {
      headerSubtitle: "Hyperlocal Air Quality Network",
      login: "로그인",
      heroTag: "DEPIN AIR QUALITY NETWORK",
      heroTitlePrefix: "공기질 데이터를",
      heroTitleHighlight: "보상",
      heroTitleMid: "과",
      heroTitleSuffix: "Airvent-AI 검증",
      heroTitleEnd: "으로 연결하는 미래",
      heroDesc: "기존 공기질 측정기는 비싸고 데이터 신뢰성이 부족합니다. AirVent는 **구독형(0원 시작)** 모델과 **AI 검증** 기술로 누구나 쉽게 참여하고 보상받는 생태계를 만듭니다.",
      howItWorks: "작동 원리",
      networkNews: "네트워크 소식",
      footer: {
        docs: "문서",
        github: "깃허브",
        blog: "블로그",
        privacy: "개인정보 처리방침",
        terms: "이용약관"
      },
      subTitle: "구독→노드 구매 (PRO 기준)",
      subDesc: "무료로 시작하고, 필요할 때 구독으로 바우처 크레딧을 적립해 노드 구매 시 결제 소계의 최대 60%까지 사용합니다.",
      howItWorksTitle: "Airvent-AI가 작동하는 방식",
      steps: [
        {
          title: "하드웨어 설치",
          desc: "초정밀 Airvent 노드를 설치하여 AI 기반 대기질 모니터링 네트워크에 참여합니다.",
          icon: "🔧"
        },
        {
          title: "실시간 데이터 수집",
          desc: "매 분마다 하이퍼로컬 대기질 데이터를 수집하여 솔라나 기반 보안 네트워크로 전송합니다.",
          icon: "📡"
        },
        {
          title: "Airvent-AI 감사",
          desc: "Airvent-AI가 영지식 증명을 사용하여 데이터 무결성을 실시간으로 감사하고 검증합니다.",
          icon: "🛡️"
        },
        {
          title: "토큰 리워드 보상",
          desc: "검증된 데이터를 기여한 대가로 솔라나 체인에서 즉시 AIVT 토큰 보상을 지급받습니다.",
          icon: "💎"
        }
      ],
      newsTitle: "네트워크 주요 소식",
      newsItems: [
        {
          tag: "Partnership",
          title: "슈퍼팀코리아 스타트업 빌리지 파트너십",
          desc: "솔라나 생태계의 DePIN 솔루션 확장을 위해 슈퍼팀코리아와 전략적 협업을 시작했습니다.",
          date: "2026.02.24"
        },
        {
          tag: "Roadmap",
          title: "2026 메인넷 로드맵 및 기술 백서 공개",
          desc: "고밀도 환경 센서 네트워크 확장을 위한 차세대 프로토콜 로드맵이 발표되었습니다.",
          date: "2026.02.20"
        },
        {
          tag: "Governance",
          title: "탈중앙화 거버넌스 및 투표 시스템 예고",
          desc: "AIVT 홀더들은 향후 네트워크의 데이터 정책 및 보상 분배 알고리즘에 참여할 수 있습니다.",
          date: "2026.02.15"
        }
      ],
      globalTitle: "글로벌 가격 (PRO 기준, USD)",
      globalDesc: "정가 $499/대 기준. 초기 구매자는 ‘제네시스’ 혜택(얼리버드/세트)으로 시작하며, 물량 소진 시 정가로 복귀합니다.",
      plans: [
        {
          name: "무료 (Free)",
          credits: 800,
          perks: ["공개 익스플로러 + 에어배지", "개인 대시보드(기본)", "베타(미션/리퍼럴) 참여 가능", "업그레이드 시 구매 크레딧 적립"]
        },
        {
          name: "프로 (Pro)",
          credits: 2800,
          perks: ["고급 인사이트", "우선 알림", "더 빠른 크레딧 적립"]
        },
        {
          name: "옵스 (Ops)",
          credits: 8000,
          perks: ["멀티사이트 운영 기능", "CSV 내보내기/정책", "조직 크레딧 뱅크"]
        }
      ],
      unit: "월 적립",
      creditDisclaimer: "크레딧은 바우처(현금화/양도 불가)이며, 결제 소계의 최대 60%까지 사용할 수 있습니다.",
      rewardsTitle: "REWARDS",
      earlyBird: "초기 구매자 혜택",
      standard: "기본 구성",
      set3: "3대 세트",
      listPrice: "정가",
      globalDisclaimer: "구독자는 AirVent 크레딧으로 결제 소계의 최대 60%까지 사용할 수 있습니다.",
      cta: "대시보드 시작하기",
      btnSubscription: "구독 시작하기",
      btnNode: "노드 구매하기"
    },
    en: {
      headerSubtitle: "Hyperlocal Air Quality Network",
      login: "Login",
      heroTag: "DEPIN AIR QUALITY NETWORK",
      heroTitlePrefix: "The Future Connecting",
      heroTitleHighlight: "Rewards",
      heroTitleMid: "and",
      heroTitleSuffix: "Airvent-AI Verification",
      heroTitleEnd: "with Air Quality Data",
      heroDesc: "Traditional air quality monitors are expensive and lack data reliability. AirVent creates an ecosystem where anyone can easily participate and be rewarded with a **Subscription (Start for $0)** model and **AI Verification** technology.",
      howItWorks: "How it Works",
      networkNews: "Network News",
      footer: {
        docs: "Docs",
        github: "GitHub",
        blog: "Blog",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      },
      subTitle: "Subscription → Node Purchase (Based on PRO)",
      subDesc: "Start for free, accumulate voucher credits via subscription, and use them for up to 60% of the node purchase subtotal.",
      howItWorksTitle: "How Airvent-AI Works",
      steps: [
        {
          title: "Hardware Setup",
          desc: "Install high-precision Airvent nodes to join our AI-driven air quality monitoring network.",
          icon: "🔧"
        },
        {
          title: "Live Data Streaming",
          desc: "Collect hyperlocal data every minute and stream it to our Solana-integrated secure network.",
          icon: "📡"
        },
        {
          title: "Airvent-AI Audit",
          desc: "Airvent-AI uses ZK-Proofs to audit and verify data integrity in real-time.",
          icon: "🛡️"
        },
        {
          title: "Token Rewards",
          desc: "Receive AIVT token rewards directly on the Solana chain for verified data contributions.",
          icon: "💎"
        }
      ],
      newsTitle: "Network Highlights",
      newsItems: [
        {
          tag: "Partnership",
          title: "Superteam Korea Startup Village Partnership",
          desc: "Strategic collaboration with Superteam Korea to expand DePIN solutions in the Solana ecosystem.",
          date: "2026.02.24"
        },
        {
          tag: "Roadmap",
          title: "2026 Mainnet Roadmap & Whitepaper Release",
          desc: "Announcing our next-gen protocol roadmap for global dense sensor network expansion.",
          date: "2026.02.20"
        },
        {
          tag: "Governance",
          title: "Decentralized Governance & Voting Preview",
          desc: "AIVT holders will soon be able to participate in network data policy and reward distribution.",
          date: "2026.02.15"
        }
      ],
      globalTitle: "Global Pricing (Based on PRO, USD)",
      globalDesc: "Based on standard price $499/unit. Early buyers start with 'Genesis' benefits (Early Bird/Set), returning to standard price when sold out.",
      plans: [
        {
          name: "Free",
          credits: 800,
          perks: ["Public Explorer + AirBadge", "Personal Dashboard (Basic)", "Beta Access (Missions/Referral)", "Credits accrue upon upgrade"]
        },
        {
          name: "Pro",
          credits: 2800,
          perks: ["Advanced Insights", "Priority Alerts", "Faster Credit Accumulation"]
        },
        {
          name: "Ops",
          credits: 8000,
          perks: ["Multi-site Operations", "CSV Export/Policy", "Org Credit Bank"]
        }
      ],
      unit: "Monthly Credit",
      creditDisclaimer: "Credits are vouchers (non-cashable/non-transferable) and can be used for up to 60% of the payment subtotal.",
      rewardsTitle: "REWARDS",
      earlyBird: "Early Bird Benefit",
      standard: "Standard Kit",
      set3: "Set of 3",
      listPrice: "List Price",
      globalDisclaimer: "Subscribers can use AirVent credits for up to 60% of the payment subtotal.",
      cta: "Start Dashboard",
      btnSubscription: "Start Subscription",
      btnNode: "Buy Node"
    }
  };

  const text = t[lang];

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 relative"
      style={{
        backgroundImage: "url('/product_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/90 pointer-events-none" />

      <div className="relative z-10">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <Container>
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 flex items-center">
                    <img
                      src="/airvent-logo-v3.png"
                      alt="Airvent Logo"
                      className="h-full w-auto object-contain drop-shadow-lg scale-110"
                    />
                  </div>
                  <div className="hidden sm:block border-l border-slate-800 pl-3 ml-1">
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none">Airvent DePIN</div>
                  </div>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">{text.howItWorks}</a>
                  <a href="#network-news" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">{text.networkNews}</a>
                  {isLocal && (
                    <Link
                      to="/judge"
                      className="text-[10px] font-black text-sky-400 hover:text-sky-300 transition-all border border-sky-400/20 bg-sky-400/5 px-2.5 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                      Airvent AI (Demo)
                    </Link>
                  )}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 bg-slate-900 rounded-full p-1 border border-slate-800">
                  <button
                    onClick={() => setLang("ko")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "ko" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    KO
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "en" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    EN
                  </button>
                </div>
                <Link
                  to="/login"
                  className="rounded-xl bg-emerald-500 text-slate-950 font-semibold px-4 py-2 hover:bg-emerald-400 transition"
                >
                  {text.login}
                </Link>
              </div>
            </div>
          </Container>
        </header>

        <main>
          <Container>
            <div className="py-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="text-xs text-emerald-400 font-semibold tracking-wider mb-2">{text.heroTag}</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  {text.heroTitlePrefix} <span className="text-emerald-400">{text.heroTitleHighlight}</span> {text.heroTitleMid}{" "}
                  <span className="text-sky-400">{text.heroTitleSuffix}</span> {text.heroTitleEnd}
                </h1>
                <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto whitespace-pre-line">
                  {text.heroDesc.split(/\*\*(.*?)\*\*/g).map((part: string, i: number) =>
                    i % 2 === 1 ? <strong key={i} className="text-emerald-400 font-bold">{part}</strong> : part
                  )}
                </p>

                <ProductSpecs lang={lang} />

                {/* How it Works Section */}
                <section id="how-it-works" className="mt-32 scroll-mt-24">
                  <div className="text-center mb-16">
                    <div className="text-xs text-emerald-400 font-bold tracking-widest uppercase mb-2">Technical Process</div>
                    <h2 className="text-3xl font-bold text-white mb-4">{text.howItWorksTitle}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {text.steps.map((step: any, i: number) => (
                      <div key={i} className="relative group">
                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 h-full hover:border-emerald-500/30 transition-all hover:bg-slate-800/40">
                          <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{step.icon}</div>
                          <div className="text-xs text-slate-500 font-bold mb-1">STEP 0{i + 1}</div>
                          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                        {i < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-slate-800 z-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="mt-20 relative">
                  {/* Subscription-to-Own Section */}
                  <div className="rounded-3xl bg-slate-900/50 border border-slate-800 px-6 py-16 text-center shadow-2xl md:px-12 relative overflow-hidden mt-8">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
                    <h2 className="text-3xl font-black text-white md:text-4xl">{text.subTitle}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                      {text.subDesc}
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 text-left">
                      {/* Plans */}
                      {[
                        {
                          ...text.plans[0],
                          price: 0,
                        },
                        {
                          ...text.plans[1],
                          price: 1900,
                        },
                        {
                          ...text.plans[2],
                          price: 4900,
                        }
                      ].map((p: any, i: number) => (
                        <div key={i} className="rounded-2xl bg-slate-950/50 p-6 border border-slate-800 backdrop-blur-sm hover:border-indigo-500/30 transition">
                          <div className="text-sm font-bold text-indigo-400">{p.name}</div>
                          <div className="mt-2 text-3xl font-bold text-white">
                            ${(p.price / 100).toFixed(0)}<span className="text-sm font-normal text-slate-500">/mo</span>
                          </div>
                          <div className="mt-1 text-sm text-emerald-400 font-medium">
                            +${(p.credits / 100).toFixed(0)} {text.unit}
                          </div>
                          <ul className="mt-6 space-y-3">
                            {p.perks.map((pk: string, j: number) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-0.5 text-indigo-400">✓</span>
                                {pk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 border-t border-slate-800 pt-6">
                      <div className="text-sm text-slate-500 max-w-2xl mx-auto mb-8">
                        {text.creditDisclaimer}
                      </div>
                      <Link
                        to="/login"
                        className="inline-block rounded-xl bg-indigo-500 text-white font-bold px-8 py-3 text-lg hover:bg-indigo-400 transition shadow-lg shadow-indigo-500/20 transform hover:-translate-y-0.5"
                      >
                        {text.btnSubscription}
                      </Link>
                    </div>
                  </div>

                  {/* Global Pricing Section */}
                  <div className="mt-20 text-center">
                    <div className="text-xs text-indigo-400 font-bold tracking-widest uppercase mb-2">{text.rewardsTitle}</div>
                    <h2 className="text-3xl font-bold text-slate-100 mb-4">{text.globalTitle}</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-10">
                      {text.globalDesc}
                    </p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      {[
                        { name: "Early Bird", price: 349, desc: text.earlyBird },
                        { name: "Standard", price: 399, desc: text.standard },
                        { name: "Set (3)", price: 899, desc: text.set3 },
                        { name: "List", price: 499, desc: text.listPrice },
                      ].map((p: any, i: number) => (
                        <div key={i} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-left hover:border-slate-700 transition">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-bold text-slate-100">{p.name}</h3>
                            <span className="text-sm font-extrabold text-white">${p.price}</span>
                          </div>
                          <div className="text-xs text-slate-500">{p.desc}</div>
                          <div className="mt-3 text-[10px] text-slate-600 uppercase tracking-wide">PM1.0/2.5/10 • CO₂ • TVOC</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center text-sm text-emerald-400 font-medium mb-8">
                      {text.globalDisclaimer}
                    </div>

                    <Link
                      to="/login"
                      className="inline-block rounded-xl bg-emerald-500 text-slate-950 font-bold px-8 py-3 text-lg hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
                    >
                      {text.btnNode}
                    </Link>
                  </div>

                  {/* Network News Section */}
                  <section id="network-news" className="mt-32 pt-20 border-t border-slate-800 scroll-mt-24">
                    <div className="text-center mb-16">
                      <div className="text-xs text-sky-400 font-bold tracking-widest uppercase mb-2">Announcements</div>
                      <h2 className="text-3xl font-bold text-white mb-4">{text.newsTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      {text.newsItems.map((news: any, i: number) => (
                        <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/40 transition-all group">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 px-2 py-1 rounded tracking-widest uppercase">
                              {news.tag}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold">{news.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed mb-8">
                            {news.desc}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 group-hover:text-white transition-colors cursor-pointer uppercase tracking-tighter">
                            Read Full Update →
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </main>

        <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-20">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="max-w-xs">
                <div className="text-lg font-bold text-white mb-2">Airvent-AI</div>
                <p className="text-sm text-slate-500">
                  Revolutionizing hyperlocal air quality data through DePIN and AI verification.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">{text.footer.docs}</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">{text.footer.github}</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">{text.footer.blog}</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">{text.footer.privacy}</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">{text.footer.terms}</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} Airvent-AI. All rights reserved.
              </div>
              <div className="flex gap-4">
                {/* Social icons could go here */}
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </div>

  );
}
