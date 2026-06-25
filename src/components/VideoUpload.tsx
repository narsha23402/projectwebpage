import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Play, 
  Trash2, 
  FileVideo, 
  Calendar, 
  User, 
  Check, 
  Video, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { DemoVideo } from '../types';

export default function VideoUpload() {
  // Built-in high-quality sample videos for smooth showcase if user doesn't upload
  const [videos, setVideos] = useState<DemoVideo[]>([
    {
      id: 'sample-1',
      title: '마음화분 제품 시연 및 사용 안내 영상',
      description: '어르신들이 거실에서 실제 마음화분 디바이스와 대화하고 복약 지시를 따르는 모습, 자녀들이 스마트폰 앱으로 부모님의 마음 안부를 실시간으로 모니터링하는 시연 영상입니다.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      uploader: '홍길동 PM',
      uploadDate: '2026-06-20',
      duration: '0:15',
      isCustom: false
    },
    {
      id: 'sample-2',
      title: 'AI 돌봄 스피커 감정 분석 및 대화 반응 테스트',
      description: '어르신의 "쓸쓸하다"는 감정 섞인 혼잣말을 AI 반려화분이 정밀 분석하여 적절한 공감 메시지와 함께 따뜻한 노래를 불러주는 소리 반응형 인공지능 알고리즘 시연 자료입니다.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      uploader: '이지은 AI 엔지니어',
      uploadDate: '2026-06-22',
      duration: '0:14',
      isCustom: false
    },
    {
      id: 'sample-3',
      title: '마음화분 24시간 낙상 감지 및 긴급 응급 상황 테스트',
      description: '안전 관제 센터와 스마트 기기 연동을 통해 어르신이 미끄러지거나 위험 신호(도와줘!)를 내보냈을 때, 단 3초 만에 119 구조대와 보호자에게 자동 연락이 가고 긴급 통화로 전환되는 동작 테스트 영상입니다.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      uploader: '김민수 IoT 개발팀',
      uploadDate: '2026-06-24',
      duration: '0:15',
      isCustom: false
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState<DemoVideo>(videos[0]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Form states for new video
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newUploader, setNewUploader] = useState('');
  const [tempFileUrl, setTempFileUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  // Set the first video as default if none is selected
  useEffect(() => {
    if (!selectedVideo && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  }, [videos, selectedVideo]);

  // Handle Video Player reload on url change
  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.load();
    }
  }, [selectedVideo]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert("비디오 파일만 업로드할 수 있습니다! (mp4, webm, ogg 등)");
      return;
    }

    // Create safe Object URL for local client-side playback
    const localUrl = URL.createObjectURL(file);
    setTempFileUrl(localUrl);
    setNewTitle(file.name.replace(/\.[^/.]+$/, "")); // remove extension
    setNewUploader("발표자 (Local)");
    setNewDesc("업로드한 사용 예시 동영상입니다.");
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFileUrl) return;

    const newVideo: DemoVideo = {
      id: Date.now().toString(),
      title: newTitle || '새로운 사용 영상',
      description: newDesc || '설명이 등록되지 않았습니다.',
      url: tempFileUrl,
      uploader: newUploader || '익명 발표자',
      uploadDate: new Date().toISOString().split('T')[0],
      duration: '사용자 영상',
      isCustom: true
    };

    setVideos(prev => [newVideo, ...prev]);
    setSelectedVideo(newVideo);
    
    // Reset Form
    setTempFileUrl(null);
    setNewTitle('');
    setNewDesc('');
    setNewUploader('');
    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
    }, 4000);
  };

  const deleteVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isConfirm = window.confirm("업로드된 동영상을 리스트에서 삭제하시겠습니까?");
    if (!isConfirm) return;

    setVideos(prev => {
      const filtered = prev.filter(v => v.id !== id);
      if (selectedVideo.id === id) {
        setSelectedVideo(filtered[0] || null);
      }
      return filtered;
    });
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-10 border border-outline-variant/30 shadow-sm" id="video-upload-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 bg-secondary-container text-secondary rounded-full text-sm font-semibold tracking-wider uppercase mb-3 inline-block">Product Showcase</span>
          <h3 className="text-3xl md:text-4xl font-bold font-headline text-charcoal">사용 및 테스트 영상 보관소</h3>
          <p className="text-charcoal-light mt-3 max-w-2xl mx-auto">
            마음화분을 사용해 본 실감나는 현장 영상을 올리고 직접 재생해보세요. 깃허브 업로드 및 시연용으로 설계되어 비디오 파일만 올리면 클라이언트 브라우저에서 즉시 실시간 재생 및 가상 보관이 가능합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Player & Meta Information */}
          <div className="lg:col-span-7 space-y-6">
            {selectedVideo ? (
              <div className="space-y-4">
                {/* Main Video Screen */}
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-lg border border-outline-variant/40">
                  <video 
                    ref={videoPlayerRef}
                    className="w-full h-full object-contain"
                    controls
                    preload="auto"
                    referrerPolicy="no-referrer"
                  >
                    <source src={selectedVideo.url} type="video/mp4" />
                    브라우저가 비디오 태그를 지원하지 않습니다.
                  </video>
                  {selectedVideo.isCustom && (
                    <div className="absolute top-4 left-4 bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles size={12} /> 사용자 업로드 영상
                    </div>
                  )}
                </div>

                {/* Video Info Card */}
                <div className="p-6 bg-cream rounded-2xl border border-outline-variant/20">
                  <h4 className="text-xl md:text-2xl font-bold font-headline text-charcoal leading-snug">
                    {selectedVideo.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-4 items-center text-xs text-charcoal-light mt-4 border-b border-outline-variant/30 pb-4">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-primary" />
                      <span>작성자: <strong>{selectedVideo.uploader}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      <span>게시일: {selectedVideo.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" />
                      <span>분량: {selectedVideo.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-light leading-relaxed mt-4 whitespace-pre-line">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-cream-dark/30 rounded-2xl border-2 border-dashed border-outline-variant/60 aspect-video flex flex-col items-center justify-center text-charcoal-light p-6">
                <Video size={48} className="opacity-40 mb-3" />
                <p className="font-semibold text-sm">선택된 영상이 없습니다.</p>
                <p className="text-xs mt-1 text-center">오른쪽 리스트에서 재생할 데모 비디오를 고르거나 아래 업로더를 통해 영상을 추가해 주세요.</p>
              </div>
            )}

            {/* Video Upload Drop Area & Form (Client-Side only) */}
            <div className="border border-outline-variant/30 rounded-2xl p-6 bg-cream/10">
              <h5 className="font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
                <Upload size={20} className="text-secondary" /> 새로운 현장 사용 영상 업로드
              </h5>

              {!tempFileUrl ? (
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                    dragActive 
                      ? 'border-primary bg-primary/5 scale-[0.99]' 
                      : 'border-outline-variant/80 bg-white hover:border-primary hover:bg-cream/20'
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="video/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                  <div className="w-14 h-14 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center mb-3">
                    <FileVideo size={28} />
                  </div>
                  <p className="text-sm font-semibold text-charcoal">파일 드래그 앤 드롭 또는 클릭하여 선택</p>
                  <p className="text-xs text-charcoal-light mt-1.5">MP4, WEBM, OGG 형식 동영상 지원 (최대 100MB 권장)</p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4 bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm">
                  <div className="flex items-center gap-2 text-primary font-semibold text-xs bg-primary/5 p-2.5 rounded-lg border border-primary/20">
                    <Check size={14} />
                    <span>비디오 파일이 정상적으로 등록되었습니다. 상세 정보를 작성해 주세요!</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-light mb-1.5">영상 제목</label>
                      <input 
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="예: 시골 할머니댁 마음화분 설치 1일차 모습"
                        className="w-full text-sm px-3 py-2 border border-outline-variant/60 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal-light mb-1.5">등록자 / 발표팀원 이름</label>
                      <input 
                        type="text"
                        required
                        value={newUploader}
                        onChange={(e) => setNewUploader(e.target.value)}
                        placeholder="예: 김현정 서비스 기획자"
                        className="w-full text-sm px-3 py-2 border border-outline-variant/60 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-light mb-1.5">영상 부가 설명</label>
                    <textarea 
                      required
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="제품을 실제로 사용해본 후기나 영상 속에서 테스트하고 있는 주요 기능 시연 포인트를 기록해 보세요."
                      className="w-full text-sm px-3 py-2 border border-outline-variant/60 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors squishy-button flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Upload size={16} /> 비디오 보관소에 최종 등록
                    </button>
                    <button 
                      type="button"
                      onClick={() => setTempFileUrl(null)}
                      className="bg-cream-darkest text-charcoal-light font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-outline-variant/40 transition-colors squishy-button"
                    >
                      취소
                    </button>
                  </div>
                </form>
              )}

              {uploadSuccess && (
                <div className="mt-4 p-3 bg-primary-container text-primary font-semibold text-xs rounded-lg border border-primary/20 flex items-center gap-2 animate-bounce">
                  <Sparkles size={14} />
                  <span>동영상이 리스트 최상단에 성공적으로 업로드되었습니다! 목록에서 해당 영상을 클릭하여 재생해보세요.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Video Playlist Grid */}
          <div className="lg:col-span-5 space-y-4">
            <h5 className="font-bold text-lg text-charcoal flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <span className="flex items-center gap-2">
                <Video size={20} className="text-primary" /> 영상 목록 ({videos.length})
              </span>
              <span className="text-[11px] font-medium text-charcoal-light bg-cream px-2 py-1 rounded">발표 시연 대응</span>
            </h5>

            <div className="space-y-3.5 max-h-[620px] overflow-y-auto pr-1">
              {videos.map((vid) => {
                const isActive = selectedVideo?.id === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex items-start gap-4 relative group ${
                      isActive 
                        ? 'bg-primary/5 border-primary shadow-sm' 
                        : 'bg-white border-outline-variant/20 hover:border-primary hover:bg-cream/10'
                    }`}
                  >
                    {/* Fake Thumbnail Play Button Overlay */}
                    <div className="w-20 aspect-video rounded-lg bg-charcoal-light/20 border border-outline-variant/30 shrink-0 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-charcoal-light/10 group-hover:bg-charcoal-light/35 transition-colors"></div>
                      <Play size={18} className="text-primary fill-current relative z-10 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h6 className={`text-sm font-bold leading-snug truncate ${isActive ? 'text-primary' : 'text-charcoal'}`}>
                        {vid.title}
                      </h6>
                      <p className="text-xs text-charcoal-light line-clamp-2 mt-1.5 leading-relaxed">
                        {vid.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-[10px] text-charcoal-light">
                        <span className="font-semibold bg-cream px-2 py-0.5 rounded text-primary">{vid.uploader}</span>
                        <span>{vid.uploadDate}</span>
                      </div>
                    </div>

                    {/* Delete Custom uploaded Videos */}
                    {vid.isCustom && (
                      <button
                        onClick={(e) => deleteVideo(vid.id, e)}
                        className="absolute right-4 top-4 text-charcoal-light hover:text-secondary opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-secondary/10"
                        title="동영상 삭제"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}

              {videos.length === 0 && (
                <div className="text-center py-12 text-charcoal-light text-sm bg-cream/10 border-2 border-dashed border-outline-variant/40 rounded-xl">
                  <HelpCircle size={32} className="mx-auto opacity-40 mb-2" />
                  <p className="font-semibold">보관된 사용 동영상이 하나도 없습니다.</p>
                  <p className="text-xs mt-1 text-center">왼쪽 하단 업로더를 통해 시연할 비디오를 직접 추가해주세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
