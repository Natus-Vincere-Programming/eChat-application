export interface ChatInformation {
  chatId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  lastMessage: string;
  statusLastMessage: 'SENT' | 'DELIVERED' | 'READ';
  createdAt: Date
  senderIdLastMessage: string;
  amountOfUnreadMessages: number;
}
