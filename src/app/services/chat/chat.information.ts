export interface ChatInformation {
  chatId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  receiverStatus: 'OFFLINE' | 'ONLINE',
  lastMessage: string;
  statusLastMessage: 'SENT' | 'DELIVERED' | 'READ';
  createdAt: Date
  senderIdLastMessage: string;
  amountOfUnreadMessages: number;
}
