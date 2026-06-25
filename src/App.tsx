import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Smile, 
  Play, 
  Users, 
  Video, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Smartphone, 
  Bell, 
  Activity,
  Award,
  BookOpen
} from 'lucide-react';
import Simulator from './components/Simulator';
import VideoUpload from './components/VideoUpload';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Scroll event tracking for header shrinking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const faqs = [
    {
      q: "마음화분 스마트폰 앱을 꼭 설치해야 하나요?",
      a: "기본적으로 어르신 댁에 설치되는 '마음화분 AI 스피커 기기'만으로도 음성 대화와 복약 알림 등 핵심 기능은 완벽히 작동합니다. 다만, 보호자님이 어르신의 정서 상태를 모니터링하고 안심 리포트를 받아보기 위해서는 보호자용 스마트폰 앱 연동이 꼭 필요합니다."
    },
    {
      q: "기계 조작에 서툰 부모님이 사용하실 수 있을까요?",
      a: "마음화분은 버튼 클릭이나 복잡한 환경 설정이 전혀 필요 없습니다. 기기를 켜둔 상태에서 평소 대화하듯 \"마음화분아, 오늘 날씨 어때?\"라고 편하게 말씀하시면 즉각 대화가 시작되며, 약 먹을 시간엔 화분이 먼저 친근한 목소리로 말을 건넵니다."
    },
    {
      q: "개인 음성 정보 유출의 위험은 없나요?",
      a: "부모님의 소중한 모든 음성 데이터는 업계 최고 수준인 군사급 AES-256 규격으로 강력히 암호화되어 서버로 전송 및 분석됩니다. 개인정보보호위원회 고시 기준을 완벽하게 만족하며, 국가 공인 개인정보보호 인증(ISMS)을 획득하여 안심하고 사용하실 수 있습니다."
    },
    {
      q: "응급상황 시 구체적으로 어떻게 긴급 연락이 가나요?",
      a: "스피커 기기가 어르신의 낙상(쿵 소리와 음성 반응)을 인지하거나, 어르신이 기기 주변에서 \"마음화분아 살려줘!\", \"도와줘!\" 같은 위급 신호를 외치면, 내장된 3G/LTE 통신망(별도 인터넷선 필요 없음)을 통해 보호자 및 관제 센터, 119로 즉시 긴급 상황 신호와 자동 통화가 다중 연결됩니다."
    }
  ];

  return (
    <div className="bg-cream text-charcoal min-h-screen selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* 1. Header (Dynamic Shrinking & Translucent Blur) */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-xl border-b border-outline-variant/30 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
        scrollY > 50 ? 'py-3.5 shadow-md' : 'py-5'
      }`}>
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            alt="Maum Flowerpot Logo" 
            className="h-10 w-auto" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXPLKDkm1zmLSoWl3nr7r2sosQZgc4idnzc_ISXJos7T6p1Mqu_emuFxxYE5ZeQSacrsnbjRXPyHwbdscJBfZQGx-Cn_4DebRIs2G0wzGBB3IOQKnH0pfu07RFcCBcBO2WefJTwsEFiIz8ebuO1NLEM6mBU0R7nKY1UNz_jyNbgFlPIKzREN9f2_eNSBLyuhRnVofCiy4CUhI-k6ZRlMXdogaFudHtqDxqlkGd4T6Ksc_1fWU7_WR3zf-GnFLB3Km4p2RUUfL4SCc"
          />
          <span className="font-headline text-2xl text-primary font-bold tracking-tight">마음화분</span>
        </div>
        
        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-charcoal-light">
          <button onClick={() => scrollToSection('primary-features')} className="hover:text-primary transition-colors cursor-pointer">주요 기능</button>
          <button onClick={() => scrollToSection('use-guide')} className="hover:text-primary transition-colors cursor-pointer">이용 안내</button>
          <button onClick={() => scrollToSection('neighbor-section')} className="hover:text-primary transition-colors cursor-pointer">랜선 이웃</button>
          <button onClick={() => scrollToSection('experience-simulator')} className="hover:text-primary transition-colors cursor-pointer">체험 시뮬레이터</button>
          <button onClick={() => scrollToSection('video-upload-section')} className="hover:text-secondary transition-colors cursor-pointer flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full text-xs">
            <Video size={12} /> 발표용 영상 보관소
          </button>
          <button onClick={() => scrollToSection('customer-faq')} className="hover:text-primary transition-colors cursor-pointer">고객 지원</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => scrollToSection('experience-simulator')} className="hidden sm:block text-xs font-bold text-charcoal-light hover:bg-cream-dark/50 px-4 py-2 rounded-full transition-colors squishy-button">
            데모 체험
          </button>
          <button onClick={() => alert("마음화분 체험단 신청이 완료되었습니다! (발표용 가상 동작)")} className="bg-primary hover:bg-primary-light text-on-primary text-xs font-bold px-5 py-2.5 rounded-full shadow-md squishy-button">
            무료 가입하기
          </button>
        </div>
      </header>

      {/* Floating Action Button (Quick scroll to simulator) */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => scrollToSection('experience-simulator')}
          className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex flex-col items-center justify-center squishy-button voice-active hover:scale-105 transition-transform group"
          title="체험 시뮬레이터 바로가기"
        >
          <Smartphone size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="text-[9px] font-bold mt-1">체험존</span>
        </button>
      </div>

      <main className="pt-24">
        
        {/* 2. Hero Section (High-Polished visual greeting) */}
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-cream-dark/30 px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wider">
                <Award size={14} /> 어르신을 위한 1등 스마트 AI 돌봄 기기
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-charcoal font-extrabold leading-[1.15] tracking-tight">
                부모님의 마음을 돌보는<br />
                <span className="text-primary-light bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">따뜻한 AI 반려 화분</span>
              </h1>
              <p className="text-base md:text-lg text-charcoal-light max-w-xl leading-relaxed font-medium">
                혼자 계셔도 기분 좋고 행복하게, 언제나 마음화분이 곁을 지킵니다.<br />
                대화뿐 아니라 스마트한 복약 케어와 24시간 안전 관제망까지 더해 부모님의 안전과 일상의 즐거움을 실현합니다.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('experience-simulator')}
                  className="bg-primary hover:bg-primary-light text-on-primary font-bold text-sm md:text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all squishy-button flex items-center gap-2"
                >
                  <Smartphone size={18} />
                  무료 체험 시작하기
                </button>
                <button 
                  onClick={() => scrollToSection('video-upload-section')}
                  className="border-2 border-outline-variant text-charcoal font-bold text-sm md:text-base px-8 py-4 rounded-xl bg-white hover:bg-cream-dark/20 transition-all squishy-button flex items-center gap-2"
                >
                  <Play size={16} fill="currentColor" />
                  서비스 소개 영상 보기
                </button>
              </div>
            </div>

            {/* Hero Phone Mockup with active styling */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-10 w-full max-w-[340px] md:max-w-[360px]">
                <div className="app-mockup shadow-2xl">
                  <img 
                    alt="마음화분 메인 화면" 
                    className="w-full h-auto" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHXtriuUJjJ2DhFSdgSStQb91b5n0OSqyV19kUsXKEEMkNrpy47m97F-CJ98mDKtGqzGvGrlrDew0wESiw4UndEM2SQU1YpKWYYvWsv4suVsRvW2CUMM8JpTx5Q_XI2ixBNGD98nr57OMLTVqOfjpUdIsS-yEMHGs80JMTjBZX1oBE34cUvhnKuEtld0zD9fPjfPhyvKkUKPPdbI861LAfL46MaiT59qbTvXGnav4t3W2uFQ32ujUlQPneLiDR845gOe8Cc8jfDNE"
                  />
                </div>
              </div>
              
              {/* Decorative Background Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[80px] -z-10"></div>
              <div className="absolute top-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-[40px] -z-10"></div>
            </div>

          </div>
        </section>

        {/* 3. Problem & Mission Statement (Centered layout) */}
        <section className="py-20 px-6 md:px-12 bg-white text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="material-symbols-outlined text-secondary text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <h2 className="font-headline text-3xl md:text-4xl text-charcoal font-bold leading-snug">
              말 못할 부모님의 외로움,<br className="sm:hidden" /> 이제 마음화분이 들어드릴게요
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="text-base md:text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto pt-2 font-medium">
              사회적 소외와 줄어드는 대화는 어르신들의 인지력 및 신체 정서 건강에 큰 부담을 줍니다. 
              마음화분은 단순 기계를 뛰어넘어, 일상 속 든든한 말벗이자 위급 대처 파트너로서 따뜻한 안심을 더합니다.
            </p>
          </div>
        </section>

        {/* 4. Primary Features (Z-pattern visual showcasing original screenshots) */}
        <section className="bg-cream-dark/20 py-24 space-y-24 px-6 md:px-12" id="primary-features">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3.5 py-1.5 rounded-full">Key Capabilities</span>
              <h2 className="font-headline text-3xl md:text-4xl text-charcoal font-extrabold mt-3">어르신 일상 밀착 케어 시스템</h2>
            </div>

            {/* Feature 1: AI 대화 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <MessageSquare size={28} />
                </div>
                <h3 className="font-headline text-2xl md:text-3xl text-charcoal font-bold">따뜻한 음성 대화로 열어가는 안부</h3>
                <p className="text-charcoal-light text-base leading-relaxed font-medium">
                  부모님의 목소리 톤과 감정을 이해하는 똑똑한 AI 화분이 어르신께 먼저 친숙하게 다가갑니다. 
                  고독감을 덜어주고 인지력을 향상시키기 위한 주제(계절, 옛 기억, 아침 식사 등)를 통해 대화를 부드럽게 이끌어 나갑니다.
                </p>
                <div className="border-l-4 border-primary pl-4 py-1 space-y-2 text-sm text-charcoal-light font-semibold">
                  <p className="flex items-center gap-2">✔ 24시간 시간 제약 없는 자연스러운 대화 환경</p>
                  <p className="flex items-center gap-2">✔ 어르신의 언어 수준과 템포에 맞춘 음성 출력 조절</p>
                </div>
              </div>
              <div className="flex justify-center order-1 lg:order-2">
                <div className="app-mockup max-w-[280px]">
                  <img 
                    alt="AI 안부 대화 스크린" 
                    className="w-full h-auto" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQdd3TyDGVIv9BZhTJ2NW64n0T9MuVQIx-_sj19ee94Y-Nug7JbMWBJcHJBlJFzRZz6f9u4CzTKPNbk_rUrFc1K9a8cyHvZgrDp0GW5TEad6YPLjkpcTYDHrxCC5VLbfZcrDOvUpKgQjjnCAU48IGYCbnpyfYVXLBICRLBjjHwvYDPjce0FBMhgyX2Fp81TwUeJ4MnBvMwCwKmv1SyntTOd6XxQpvkOeRomzOXkwVwLcs9EyDslHaHkwmab064WlQ9sGFuXMSQdRc"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2: 보호자 안심 연동 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center pt-16">
              <div className="flex justify-center">
                <div className="app-mockup max-w-[280px]">
                  <img 
                    alt="보호자 연동 보고서 스크린" 
                    className="w-full h-auto" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8f0MSSDrCxf5pxcH8RCt6wQU0u3ID5W_KgDF1WZ6HZEBB6VUS-_AU0xYBXDKnbpxAu3mAx7xCiqSm-9qMnVcK4kfqPXA9hPYfxdtSwY3sfMGDslJ3w2ZduMLjgJOWE6LTEJu39Q_LNBp5B8BOYDXz6iYLr_4wcDC00wHEhxRqsctUnbzgzAKIyNnsWL_fZnZHBQDrxdIKPJVkMBTRX2BgWT9S7dbBi5tsVYSYPZhpXTTe8J6F39RlLxvl-ERVsX5WJi5C_paF7vY"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="w-14 h-14 bg-accent/20 text-tertiary rounded-2xl flex items-center justify-center">
                  <Activity size={28} />
                </div>
                <h3 className="font-headline text-2xl md:text-3xl text-charcoal font-bold">보호자를 위한 똑똑한 안심 리포트</h3>
                <p className="text-charcoal-light text-base leading-relaxed font-medium">
                  멀리 떨어져 지내는 직장인 자녀들도 언제 어디서나 안심할 수 있습니다. 
                  부모님과 마음화분이 나눈 감정 분석 및 복약 여부 기록을 종합하여 보기 쉬운 주간 데이터 보고서 형태로 전용 보호자 연동 앱으로 전달해 드립니다.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-outline-variant/30 text-center">
                    <p className="text-primary font-extrabold text-lg">실시간 상태 확인</p>
                    <p className="text-[11px] text-charcoal-light mt-1">부모님의 하루 감정 흐름 확인</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-outline-variant/30 text-center">
                    <p className="text-primary font-extrabold text-lg">AI 맞춤 키워드</p>
                    <p className="text-[11px] text-charcoal-light mt-1">대화 속 자주 하시는 말씀 파악</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: 안전 관제 시스템 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center pt-16">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="w-14 h-14 bg-secondary-container text-secondary rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-headline text-2xl md:text-3xl text-charcoal font-bold">365일 실시간 긴급 응급 상황 케어</h3>
                <p className="text-charcoal-light text-base leading-relaxed font-medium">
                  부모님이 거실에서 넘어지시거나 갑작스러운 건강 악화로 소리를 지르시는 경우, 지능형 낙상 및 음성 파형 분석 장치가 위급함을 자동으로 인식합니다. 
                  즉각 119 다중 관제망 및 보호자 폰으로 연동되어 생명의 골든타임을 완벽하게 지켜 냅니다.
                </p>
                <div className="flex gap-3 items-start bg-secondary-container/20 p-4 rounded-xl border border-secondary-container">
                  <Bell className="text-secondary shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <h5 className="font-bold text-sm text-secondary">원터치 긴급 자동 전화 연결</h5>
                    <p className="text-xs text-charcoal-light mt-1">비명 소리나 강한 충격 신호 감지 즉시 양방향 안심 긴급 통화 개시</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group max-w-md w-full">
                  <img 
                    alt="통합 관제 센터 협업" 
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw4wFjgWBlCG1pcWPvTzfJcBFXOE4x3uegLyWKaxEjbf0R_f2Dl_L9l5dei3ZxVnRwlRdhS25cos6nUf0Hf4y7tPmkpadq1wwcMasEcic915LlxmxPgisiyUOCn7o6xGHzs5jNAP7Zk_4Bk98T9svHEdsEQnCkdIsQaML-oFzZG_gQTOmv9xI4x_xzcD8B3JpCdMCHhjcX645x6kkgZa7kk80nMrPret5-5m-W3prW_G8haQUvDc8zJ2FTfo0xnAdMKP3lckv1ZDM"
                  />
                  <div className="absolute bottom-4 left-4 bg-charcoal/95 text-white px-4.5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-xl border border-charcoal-light">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
                    <span>통합 보안 센터 24시간 실시간 동작 중</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. 랜선 이웃 (Multi-column community board) */}
        <section className="py-24 px-6 md:px-12 bg-white" id="neighbor-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-secondary tracking-widest uppercase bg-secondary-container px-3.5 py-1.5 rounded-full">Community Platform</span>
              <h2 className="font-headline text-3xl md:text-4xl text-charcoal font-extrabold">함께라서 한층 즐거운 '랜선 이웃'</h2>
              <p className="text-charcoal-light font-medium">
                동일 지역이나 유사한 취미를 가진 또래 어르신들을 가상 연동하여 대화나 퀴즈 대회를 유도하고 우울감을 적극 해소합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border border-outline-variant/40 bg-cream/20 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Users size={24} />
                  </div>
                  <h4 className="font-headline text-lg font-bold text-charcoal mb-3">완전 익명 친목 네트워크</h4>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    프라이버시는 완벽히 지키면서 동일 지역 또래 어르신들과 동화책 낭독, 라디오 감상 후기 등을 가볍게 나누며 목소리 친목을 다집니다.
                  </p>
                </div>
                <div className="pt-6 text-xs text-primary font-bold flex items-center gap-1 cursor-pointer">
                  상세히 알아보기 <ArrowRight size={14} />
                </div>
              </div>

              <div className="p-8 rounded-2xl border border-outline-variant/40 bg-cream/20 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent/20 text-tertiary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Bell size={24} />
                  </div>
                  <h4 className="font-headline text-lg font-bold text-charcoal mb-3">우리 동네 일상 소식 알림</h4>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    구청 복지 서비스, 행정지원 안내, 무료 배식 정보 및 마을 경로당 모임 등 어르신들이 꼭 챙기셔야 할 우리 동네 꿀정보를 상냥히 챙겨 드립니다.
                  </p>
                </div>
                <div className="pt-6 text-xs text-primary font-bold flex items-center gap-1 cursor-pointer">
                  상세히 알아보기 <ArrowRight size={14} />
                </div>
              </div>

              <div className="p-8 rounded-2xl border border-outline-variant/40 bg-cream/20 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Smile size={24} />
                  </div>
                  <h4 className="font-headline text-lg font-bold text-charcoal mb-3">화분 키우기 배틀 & 모임</h4>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    대화 횟수와 복약 점수에 따라 매일 물을 주고 비료를 주며 마음속 '온라인 식물'을 가꾸는 재미있는 게이미피케이션으로 우울 방지 시너지를 만들어냅니다.
                  </p>
                </div>
                <div className="pt-6 text-xs text-primary font-bold flex items-center gap-1 cursor-pointer">
                  상세히 알아보기 <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. How-To Step Section */}
        <section className="py-24 bg-cream/40 px-6 md:px-12 text-center" id="use-guide">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3.5 py-1.5 rounded-full">Easy Steps</span>
              <h2 className="font-headline text-3xl md:text-4xl text-charcoal font-extrabold">간편한 3단계 시작 가이드</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-outline-variant/40 hidden md:block -z-10"></div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-on-primary font-extrabold text-xl flex items-center justify-center shadow-md">1</div>
                <h4 className="font-headline text-lg font-bold text-charcoal">"말씀만 하세요"</h4>
                <p className="text-xs text-charcoal-light max-w-[240px] leading-relaxed">
                  키보드 입력이나 화면 스크린 조절 전혀 없이, 편안한 목소리 소통으로 마음화분의 전 기능을 구동합니다.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-on-primary font-extrabold text-xl flex items-center justify-center shadow-md">2</div>
                <h4 className="font-headline text-lg font-bold text-charcoal">"스마트 복약 알림"</h4>
                <p className="text-xs text-charcoal-light max-w-[240px] leading-relaxed">
                  처방 받으신 번거로운 약 종류와 스케줄을 기기에 등록해두면, 잊으시지 않게 맞춤 알림 메시지로 확실히 보조합니다.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-on-primary font-extrabold text-xl flex items-center justify-center shadow-md">3</div>
                <h4 className="font-headline text-lg font-bold text-charcoal">"스마트 자동 동기화"</h4>
                <p className="text-xs text-charcoal-light max-w-[240px] leading-relaxed">
                  보호자님의 전용 관제 앱으로 부모님의 감정 척도와 긴급 상태가 실시간으로 원격 전송되어 상시 안심하실 수 있습니다.
                </p>
              </div>
            </div>

            {/* Centralizing the how-to mockup */}
            <div className="max-w-[340px] mx-auto pt-8">
              <div className="app-mockup shadow-xl">
                <img 
                  alt="복약 관리 스크린" 
                  className="w-full h-auto" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCEaHIa2W_zLt1EhO_O40z2LjrzjuUWBwOFUogcqFiRUDyowa1qveCfwSrtgHutsbxtfOfckQWK1BOx9UZzfG0_qPrDjA14xiTlPn_8wpXweT0_QshnDq89JXthkdLxB144giCswX2oarE0p4I3xcO6zng2xLDjBlFfvttmK11gqWvgIQQiOCNB-iKvfrrskMQx9lAbRXfATno4eKeOZZ_CmgjDR_FbJVEKOWe7_hGigT9oTHPCGNJO78bGhLpHJEAaWYEaqQGkwE"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7. Interactive Experience Simulator Block */}
        <section className="py-24 px-6 md:px-12 bg-white border-t border-outline-variant/30">
          <div className="max-w-7xl mx-auto">
            <Simulator />
          </div>
        </section>

        {/* 8. Video Showcase & Upload Block */}
        <section className="py-24 px-6 md:px-12 bg-cream-dark/10 border-t border-outline-variant/30">
          <div className="max-w-7xl mx-auto">
            <VideoUpload />
          </div>
        </section>

        {/* 9. Security, Trust & Encrypted Messaging */}
        <section className="py-20 px-6 md:px-12 bg-charcoal text-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="shrink-0 text-primary-light">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                <ShieldCheck size={56} className="text-primary-light" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight">가장 사적인 일상 대화, 철저하고 단단하게 지킵니다</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">
                어르신과 화분이 나누는 모든 정감 어린 대화 데이터와 감정 척도는 제3자가 결코 들여다볼 수 없도록 군사급 암호화 기술(AES-256)을 통해 클라우드에 전송 및 폐기 처리됩니다. 사생활 및 존엄성 보호를 기술의 최우선 가치로 내겁니다.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 text-xs font-semibold">
                <Lock size={14} className="text-primary-container" />
                <span>개인정보 영향 평가 완료 및 보안 인증 획득 (ISMS)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Customer Care FAQ Accordions (Interactivity Added) */}
        <section className="py-24 px-6 md:px-12 bg-white border-t border-b border-outline-variant/30" id="customer-faq">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3.5 py-1.5 rounded-full">Support FAQ</span>
              <h3 className="font-headline text-3xl font-extrabold text-charcoal">자주 물어보시는 소중한 질문들</h3>
              <p className="text-sm text-charcoal-light">궁금하신 점을 클릭하시면 직관적인 답변을 바로 보실 수 있습니다.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className="border border-outline-variant/50 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-left p-5 bg-cream/30 hover:bg-cream/70 flex justify-between items-center gap-4 transition-colors font-semibold text-charcoal text-sm md:text-base cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle size={18} className="text-primary shrink-0" />
                        {faq.q}
                      </span>
                      {isOpen ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-charcoal-light" />}
                    </button>
                    
                    {isOpen && (
                      <div className="p-5 bg-white border-t border-outline-variant/30 text-xs md:text-sm text-charcoal-light leading-relaxed animate-fade-in font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* 11. Footer with clear structure */}
      <footer className="bg-cream-dark/60 py-16 px-6 md:px-12 border-t border-outline-variant/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-outline-variant/40 pb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                alt="Footer Logo" 
                className="h-9 w-auto" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXPLKDkm1zmLSoWl3nr7r2sosQZgc4idnzc_ISXJos7T6p1Mqu_emuFxxYE5ZeQSacrsnbjRXPyHwbdscJBfZQGx-Cn_4DebRIs2G0wzGBB3IOQKnH0pfu07RFcCBcBO2WefJTwsEFiIz8ebuO1NLEM6mBU0R7nKY1UNz_jyNbgFlPIKzREN9f2_eNSBLyuhRnVofCiy4CUhI-k6ZRlMXdogaFudHtqDxqlkGd4T6Ksc_1fWU7_WR3zf-GnFLB3Km4p2RUUfL4SCc"
              />
              <span className="font-headline text-lg font-bold text-primary">마음화분</span>
            </div>
            <p className="text-xs text-charcoal-light leading-relaxed font-semibold">
              어르신의 쓸쓸한 일상에 따스한 온기를 전하고, 멀리 계신 가족들의 걱정을 확실한 안심으로 바꿔나가는 1등 스마트 AI 돌봄 서비스입니다.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-sm text-charcoal tracking-wide uppercase flex items-center gap-1.5"><Smartphone size={14} className="text-primary" /> 주요 서비스</h5>
            <ul className="space-y-2 text-xs text-charcoal-light font-medium">
              <li><button onClick={() => scrollToSection('primary-features')} className="hover:text-primary transition-colors">AI 반려 안부대화</button></li>
              <li><button onClick={() => scrollToSection('experience-simulator')} className="hover:text-primary transition-colors">보호자 원격 모니터링</button></li>
              <li><button onClick={() => scrollToSection('use-guide')} className="hover:text-primary transition-colors">실시간 복약 알리미</button></li>
              <li><button onClick={() => scrollToSection('neighbor-section')} className="hover:text-primary transition-colors">동네 소식 사랑방</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-sm text-charcoal tracking-wide uppercase flex items-center gap-1.5"><BookOpen size={14} className="text-primary" /> 자료실 및 발표</h5>
            <ul className="space-y-2 text-xs text-charcoal-light font-medium">
              <li><button onClick={() => scrollToSection('video-upload-section')} className="hover:text-secondary transition-colors font-bold">▶ 현장 시연 비디오 보관소</button></li>
              <li><button onClick={() => scrollToSection('experience-simulator')} className="hover:text-primary transition-colors">실시간 가상 시뮬레이터</button></li>
              <li><button onClick={() => scrollToSection('customer-faq')} className="hover:text-primary transition-colors">자주 묻는 질문 (FAQ)</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-sm text-charcoal tracking-wide uppercase">주식회사 마음화분</h5>
            <p className="text-xs text-charcoal-light leading-relaxed font-medium">
              대표이사: 홍길동 | 서울시 강남구 테헤란로 123<br />
              사업자등록번호: 123-45-67890<br />
              전화번호: 1544-0000 | 이메일: support@maum.ai
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-charcoal-light font-semibold">
          <p>© 2026 Maum Flowerpot. All rights reserved. Designed for senior dignity and peace of mind.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary underline">개인정보 처리방침</a>
            <a href="#" className="hover:text-primary underline">서비스 이용약관</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
