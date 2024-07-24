export interface MessageResponse {
  id: string;
  chatId: string;
  senderId: string;
  message: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  createdAt: number;
}
