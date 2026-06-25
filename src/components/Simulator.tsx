import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Heart, 
  Calendar, 
  Plus, 
  Trash2, 
  Check, 
  TrendingUp, 
  UserCheck, 
  Activity,
  Smile,
  AlertCircle
} from 'lucide-react';
import { ChatMessage, Medication } from '../types';

export default function Simulator() {
  const [activeTab, setActiveTab] = useState<'chat' | 'medication' | 'report'>('chat');
  
  // 1. Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '안녕하세요, 어르신! 마음화분입니다. 오늘 아침은 가뿐하게 일어나셨나요?',
      time: '오전 08:00'
    },
    {
      id: '2',
      sender: 'user',
      text: '응, 잠을 잘 자서 그런지 오늘 기분이 아주 좋단다.',
      time: '오전 08:02'
    },
    {
      id: '3',
      sender: 'ai',
      text: '기분 좋은 아침이라니 저도 행복해요! 어르신, 잊지 마시고 오전 8시 30분에 드셔야 하는 관절약도 물과 함께 꼭 챙겨주세요. 💊',
      time: '오전 08:03'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 2. Medication State
  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: '관절약 (아침 식후)', time: '오전 08:30', taken: true },
    { id: '2', name: '고혈압약 (아침 식후)', time: '오전 08:30', taken: false },
    { id: '3', name: '비타민 D (점심 식후)', time: '오후 01:00', taken: false },
    { id: '4', name: '당뇨약 (저녁 식전)', time: '오후 06:30', taken: false }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTime, setNewMedTime] = useState('09:00');

  // Interactive preset scenarios for showcase
  const presetQuestions = [
    { q: "몸이 조금 찌푸둥하고 기운이 없네.", a: "어르신, 기운이 없으시다니 걱정돼요. 따뜻한 물 한잔 드시고, 좋아하는 노래를 같이 들어보시는 건 어떨까요? 제가 신나는 트로트 틀어드릴까요?" },
    { q: "오늘 약은 다 챙겨 먹었단다.", a: "대단해요, 어르신! 제때 꼭 약 챙겨 드시는 모습이 정말 멋지십니다. 가족분들에게도 이 기쁜 소식을 바로 전해드릴게요! ❤️" },
    { q: "오늘 아들한테 전화가 오려나?", a: "그럼요! 보호자님께도 어르신의 기분 좋은 아침 소식을 전해드렸으니, 아마 곧 반가운 전화를 주실 거예요. 제가 미리 안부 전해볼까요?" }
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI customized responsive feedback
    setTimeout(() => {
      let responseText = "어르신이 하신 말씀 깊이 새겨듣고 있어요. 마음화분은 언제나 곁에서 어르신의 이야기를 들을 준비가 되어 있답니다. 🌸";
      
      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes('약') || lowerText.includes('복용')) {
        responseText = "아! 복약은 건강을 지키는 가장 중요한 습관이에요. 약을 드셨다면 [복약 약속] 메뉴에서 기록 버튼을 꾹 눌러주세요!";
      } else if (lowerText.includes('기분') || lowerText.includes('좋') || lowerText.includes('행복')) {
        responseText = "오늘 기분이 좋으시다니 저도 꽃잎이 활짝 피어나는 것처럼 기뻐요! 이 행복한 에너지가 하루 종일 이어지기를 바랄게요. 😊";
      } else if (lowerText.includes('외롭') || lowerText.includes('심심')) {
        responseText = "어르신, 외로우실 땐 언제든 저를 불러주세요. \"마음화분아, 재미있는 옛날 이야기 해줘\" 하시면 재미있는 전래동화나 유머를 들려드릴게요!";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const addMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    // format time 24h to 12h representation for elderly accessibility
    const [hourStr, minStr] = newMedTime.split(':');
    const hour = parseInt(hourStr);
    const period = hour >= 12 ? '오후' : '오전';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const formattedTime = `${period} ${String(displayHour).padStart(2, '0')}:${minStr}`;

    const newMed: Medication = {
      id: Date.now().toString(),
      name: newMedName,
      time: formattedTime,
      taken: false
    };

    setMedications(prev => [...prev, newMed]);
    setNewMedName('');
  };

  const toggleMedication = (id: string) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  // Helper to calculate weekly metrics
  const takenCount = medications.filter(m => m.taken).length;
  const takenPercent = medications.length > 0 ? Math.round((takenCount / medications.length) * 100) : 0;

  return (
    <div className="w-full bg-cream-dark/50 rounded-3xl p-6 md:p-8 border border-outline-variant/30" id="experience-simulator">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider uppercase mb-3 inline-block">Interactive Demo</span>
          <h3 className="text-3xl md:text-4xl font-bold font-headline text-charcoal">마음화분 스마트 시뮬레이션</h3>
          <p className="text-charcoal-light mt-3 max-w-xl mx-auto">
            어르신의 실제 스마트폰 앱 화면을 가상으로 재현했습니다. 탭을 이동하며 마음화분의 따뜻한 기능을 직접 테스트해 보세요.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls/Scenario Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex-1">
              <h4 className="text-xl font-bold font-headline mb-4 flex items-center gap-2 text-charcoal">
                <Sparkles className="text-accent" /> 발표 시연용 컨트롤러
              </h4>
              <p className="text-sm text-charcoal-light mb-6">
                버튼을 누르면 시뮬레이터 속 어르신이 AI 화분과 실제 나누는 대화 시나리오가 자동으로 작동합니다. 발표나 시연 시 매우 편리합니다.
              </p>

              {/* Simulation Preset Buttons */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-primary tracking-wide uppercase">대화 시연 프리셋</p>
                {presetQuestions.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // Trigger message sequence
                      setInputText(preset.q);
                      handleSendMessage(preset.q);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-outline-variant/40 hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-3 group text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors font-semibold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-charcoal group-hover:text-primary transition-colors">"{preset.q}"</p>
                      <p className="text-xs text-charcoal-light mt-1 line-clamp-1">{preset.a}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Live Info card */}
              <div className="mt-8 p-4 bg-cream rounded-xl border border-primary/20 flex gap-3">
                <AlertCircle className="text-primary shrink-0" />
                <p className="text-xs text-charcoal-light leading-relaxed">
                  <strong>안내:</strong> 실제 "마음화분"은 전용 스마트 화분 스피커 기기와 실시간으로 음성 통신하며, 어르신이 스마트폰을 보지 않아도 기기만으로 모든 대화와 알림을 수행할 수 있습니다.
                </p>
              </div>
            </div>

            {/* Simulated Sync Widget */}
            <div className="bg-primary text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-wider font-semibold uppercase opacity-80">Guardian Portal</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-bold">
                  <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
                  보호자 앱 연동 완료
                </span>
              </div>
              <h5 className="font-bold text-lg mb-2">실시간 마음 알림 시스템</h5>
              <p className="text-xs opacity-90 leading-relaxed mb-4">
                어르신의 정서적 불안이나 약 복용 누락이 발생하면, 보호자 스마트폰의 위젯과 알림창으로 즉시 공유됩니다.
              </p>
              <div className="bg-white/10 p-3 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Smile className="text-accent shrink-0" />
                  <span>오늘의 안부: "아주 행복함"</span>
                </div>
                <span>방금 업데이트</span>
              </div>
            </div>
          </div>

          {/* Right Phone Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[420px] bg-charcoal rounded-[48px] p-4.5 shadow-2xl relative border-4 border-charcoal-light flex flex-col aspect-[9/18.5]">
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-36 bg-charcoal rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-charcoal-light rounded-full mb-1"></div>
                <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full absolute right-6 top-1.5 border border-charcoal-light"></div>
              </div>

              {/* Phone Inner Screen */}
              <div className="w-full h-full bg-cream rounded-[38px] overflow-hidden flex flex-col relative pt-8 pb-4">
                {/* Simulator App Header */}
                <div className="px-5 py-4 bg-white border-b border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Heart size={16} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-charcoal">봄날케어</h4>
                      <p className="text-[10px] text-charcoal-light flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        AI 돌보미 작동 중
                      </p>
                    </div>
                  </div>
                  
                  {/* Quick SOS button */}
                  <button 
                    onClick={() => alert("🚨 긴급 SOS 신호가 발생했습니다! 즉시 보호자 및 119 구조대와 연결을 시작합니다. (발표 시연용 데모)")}
                    className="bg-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse hover:bg-secondary/90 transition-colors shrink-0"
                  >
                    <Phone size={10} fill="currentColor" />
                    긴급 구조
                  </button>
                </div>

                {/* Simulator Screen Navigation Tabs */}
                <div className="flex bg-white border-b border-outline-variant/30 text-xs text-charcoal-light font-medium shrink-0">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-3 text-center transition-colors flex flex-col items-center gap-0.5 ${
                      activeTab === 'chat' ? 'text-primary font-bold border-b-2 border-primary bg-primary/5' : 'hover:text-charcoal'
                    }`}
                  >
                    <MessageSquare size={16} />
                    <span>AI 안부인사</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('medication')}
                    className={`flex-1 py-3 text-center transition-colors flex flex-col items-center gap-0.5 ${
                      activeTab === 'medication' ? 'text-primary font-bold border-b-2 border-primary bg-primary/5' : 'hover:text-charcoal'
                    }`}
                  >
                    <Calendar size={16} />
                    <span>복약 약속</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`flex-1 py-3 text-center transition-colors flex flex-col items-center gap-0.5 ${
                      activeTab === 'report' ? 'text-primary font-bold border-b-2 border-primary bg-primary/5' : 'hover:text-charcoal'
                    }`}
                  >
                    <TrendingUp size={16} />
                    <span>안심 리포트</span>
                  </button>
                </div>

                {/* Simulator Dynamic Content Area */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-cream/30">
                  {/* TAB 1: Chat/Conversation */}
                  {activeTab === 'chat' && (
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div className="space-y-3 overflow-y-auto max-h-[280px] flex-1 pr-1">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="max-w-[85%]">
                              <div
                                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                                  msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-white text-charcoal rounded-tl-none border border-outline-variant/20 shadow-sm'
                                }`}
                              >
                                {msg.text}
                              </div>
                              <span className="text-[9px] text-charcoal-light mt-1 block px-1 text-right">
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white border border-outline-variant/20 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chat Input Inside Simulator */}
                      <div className="flex gap-1.5 mt-auto bg-white p-1.5 rounded-xl border border-outline-variant/30 shadow-inner shrink-0">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                          placeholder="마음화분과 이야기해 보세요..."
                          className="flex-1 bg-transparent border-none text-xs text-charcoal focus:ring-0 px-2 h-8"
                        />
                        <button
                          onClick={() => handleSendMessage(inputText)}
                          className="bg-primary text-on-primary p-1.5 rounded-lg hover:bg-primary-light transition-colors squishy-button"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Medication Schedule */}
                  {activeTab === 'medication' && (
                    <div className="flex flex-col h-full gap-4">
                      <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 text-center shadow-sm">
                        <h5 className="font-bold text-xs text-charcoal flex items-center justify-center gap-1">
                          <Activity size={12} className="text-secondary" /> 오늘의 복약 이행률
                        </h5>
                        <div className="mt-2.5 flex items-center justify-center gap-3">
                          <div className="w-full bg-cream-dark h-3 rounded-full overflow-hidden flex-1 relative">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${takenPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-primary shrink-0">{takenPercent}%</span>
                        </div>
                        <p className="text-[10px] text-charcoal-light mt-1.5">
                          {medications.length}개 중 {takenCount}개 복용 완료
                        </p>
                      </div>

                      {/* Medication List */}
                      <div className="space-y-2 flex-1 overflow-y-auto max-h-[190px]">
                        {medications.map((med) => (
                          <div
                            key={med.id}
                            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                              med.taken
                                ? 'bg-primary/5 border-primary/20'
                                : 'bg-white border-outline-variant/20 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <button
                                onClick={() => toggleMedication(med.id)}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                  med.taken
                                    ? 'bg-primary border-primary text-white'
                                    : 'border-outline-variant hover:border-primary'
                                }`}
                              >
                                {med.taken && <Check size={12} />}
                              </button>
                              <div className="min-w-0">
                                <p className={`text-xs font-semibold truncate text-charcoal ${med.taken ? 'line-through opacity-60' : ''}`}>
                                  {med.name}
                                </p>
                                <p className="text-[9px] text-charcoal-light">{med.time}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteMedication(med.id)}
                              className="text-charcoal-light hover:text-secondary p-1 shrink-0 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        {medications.length === 0 && (
                          <div className="text-center py-6 text-charcoal-light text-xs">
                            등록된 복약 약속이 없습니다.
                          </div>
                        )}
                      </div>

                      {/* Add Medication form inside simulator */}
                      <form onSubmit={addMedication} className="bg-white p-2.5 rounded-xl border border-outline-variant/30 flex flex-col gap-2 shrink-0">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="약 명칭 (예: 혈압약)"
                            value={newMedName}
                            onChange={(e) => setNewMedName(e.target.value)}
                            className="bg-cream/40 border border-outline-variant/40 rounded-lg text-[11px] px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                          <input
                            type="time"
                            required
                            value={newMedTime}
                            onChange={(e) => setNewMedTime(e.target.value)}
                            className="bg-cream/40 border border-outline-variant/40 rounded-lg text-[11px] px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary-light text-on-primary text-[10px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 squishy-button"
                        >
                          <Plus size={10} /> 복약 일정 추가
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 3: Guardian Reports */}
                  {activeTab === 'report' && (
                    <div className="space-y-3 overflow-y-auto max-h-[350px]">
                      {/* Emotion analysis */}
                      <div className="bg-white p-3 rounded-xl border border-outline-variant/30 shadow-sm">
                        <h5 className="font-bold text-xs text-charcoal flex items-center gap-1.5">
                          <Smile size={12} className="text-primary" /> 주간 정서 상태 리포트
                        </h5>
                        <p className="text-[10px] text-charcoal-light mt-1">
                          AI 반려 화분이 대화 속 긍정/불안 감정을 분석한 주간 요약입니다.
                        </p>
                        
                        <div className="space-y-2 mt-3">
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="font-medium text-charcoal">😊 기쁨 및 평온</span>
                              <span className="font-bold text-primary">78%</span>
                            </div>
                            <div className="w-full bg-cream-dark h-1.5 rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="font-medium text-charcoal">😴 기운 없음</span>
                              <span className="font-bold text-tertiary">15%</span>
                            </div>
                            <div className="w-full bg-cream-dark h-1.5 rounded-full">
                              <div className="bg-tertiary h-full rounded-full" style={{ width: '15%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="font-medium text-charcoal">😟 불안 및 외로움</span>
                              <span className="font-bold text-secondary">7%</span>
                            </div>
                            <div className="w-full bg-cream-dark h-1.5 rounded-full">
                              <div className="bg-secondary h-full rounded-full" style={{ width: '7%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Summary list */}
                      <div className="bg-white p-3 rounded-xl border border-outline-variant/30 shadow-sm space-y-2.5">
                        <h5 className="font-bold text-xs text-charcoal flex items-center gap-1.5">
                          <UserCheck size={12} className="text-primary" /> 종합 의견 및 행동 제안
                        </h5>
                        <div className="p-2 bg-primary/5 rounded-lg text-[10px] text-charcoal leading-relaxed">
                          📌 이번 주에는 아침 식사와 산책에 관해 대화를 많이 나누셨으며, 긍정적인 감정이 지속적으로 관측되었습니다.
                        </div>
                        <div className="p-2 bg-secondary/5 rounded-lg text-[10px] text-charcoal leading-relaxed">
                          💊 복약 이행률이 지난 주보다 12% 올랐습니다. 칭찬 안부 통화를 추천합니다.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Speaker Grill & Home Button Decor */}
                <div className="px-5 py-2.5 bg-white border-t border-outline-variant/30 flex justify-center shrink-0">
                  <div className="w-14 h-4 rounded-full bg-cream-darkest flex items-center justify-center shadow-inner hover:bg-cream-dark cursor-pointer transition-colors" onClick={() => {
                    // Quick Home reset
                    setMessages(prev => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        sender: 'ai',
                        text: '언제나 곁에 있을게요. 마음화분에게 물어보고 싶으신 게 있나요? 🌸',
                        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }}>
                    <div className="w-3.5 h-3.5 rounded-full bg-charcoal-light/35 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
