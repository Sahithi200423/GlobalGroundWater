export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Reviewed' | 'Replied';
  reply?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  feedback: string;
  rating: number;
  avatar: string;
  approved: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Investigation' | 'Survey' | 'Borewell' | 'Industrial' | 'Agricultural';
  imageUrl: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  benefits: string[];
}

export interface ChatMessage {
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
  isRecommendation?: boolean;
}
