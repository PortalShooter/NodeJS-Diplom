import { Message } from './Message';

export interface SupportRequest {
  id: string;
  user: string;
  createdAt: string;
  messages: Message[];
  isActive: boolean;
}
