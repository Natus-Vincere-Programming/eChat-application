import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateChatRequest} from "./request/create-chat.request";
import {ChatResponse} from "./response/chat.response";
import {CreateChatResponse} from "./response/create-chat.response";
import {ChatInformation} from "./chat.information";
import {MessageService} from "../message/message.service";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url: string = "http://localhost:8080/api/v1/chats";

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService
  ) {
  }

  createChat(request: CreateChatRequest): Promise<CreateChatResponse | null> {
    return new Promise<CreateChatResponse | null>((resolve) => {
      this.http.post<CreateChatResponse>(this.url, request).subscribe({
        next: (chat: CreateChatResponse) => {
          console.trace(chat);
          resolve(chat);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      });
    });
  }

  getInformation(chatId: string): Promise<ChatInformation> {
    return new Promise<ChatInformation>((resolve) => {
      let information: ChatInformation = {
        chatId: "",
        senderId: "",
        receiverId: "",
        senderName: "",
        receiverName: "",
        lastMessage: "",
        statusLastMessage: 'SENT',
        createdAt: new Date(),
        senderIdLastMessage: "",
        amountOfUnreadMessages: 0
      }
      this.getByChatId(chatId).then(chat => {
        information.chatId = chat?.chatId || "";
        information.senderId = chat?.senderId || "";
        information.receiverId = chat?.receiverId || "";
        this.messageService.getLastMessage(chatId).then(message => {
          information.lastMessage = message?.message || "";
          information.senderIdLastMessage = message?.senderId || "";
          if (message !== null){
            information.createdAt = new Date(message.createdAt)|| new Date();
          }
          information.statusLastMessage = message?.status || "SENT";
          this.messageService.getAmountOfUnreadMessages(chatId).then(amount => {
            information.amountOfUnreadMessages = amount;
            this.userService.getById(information.senderId).then(sender => {
              if (sender !== null){
                information.senderName = sender.firstname + " " + sender.lastname;
              }
              this.userService.getById(information.receiverId).then(receiver => {
                if (receiver !== null){
                  information.receiverName = receiver.firstname + " " + receiver.lastname;
                }
                resolve(information);
              });
            })
          });
        })
      });
    });
  }

  getByChatId(chatId: string): Promise<ChatResponse | null> {
    return new Promise<ChatResponse | null>((resolve) => {
      this.http.get<ChatResponse>(this.url + "/" + chatId).subscribe({
        next: (chat: ChatResponse) => {
          console.trace(chat);
          resolve(chat);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      });
    });
  }

  getAllChats(): Promise<ChatResponse[] | null> {
    return new Promise<ChatResponse[] | null>((resolve) => {
      this.http.get<ChatResponse[]>(this.url).subscribe({
        next: (chats: ChatResponse[]) => {
          console.trace(chats);
          resolve(chats);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      });
    });
  }

  deleteChat(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.delete(this.url + "/" + id).subscribe({
        next: () => {
          console.debug('Chat deleted');
          resolve(true);
        },
        error: (err) => {
          console.trace(err);
          resolve(false);
        }
      });
    });
  }
}
