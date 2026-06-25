export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  uploader: string;
  uploadDate: string;
  duration: string;
  isCustom?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export interface Medication {
  id: string;
  name: string;
  time: string;
  taken: boolean;
}
