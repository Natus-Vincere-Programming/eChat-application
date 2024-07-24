import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateChatRequest} from "./request/create-chat.request";
import {ChatResponse} from "./response/chat.response";
import {CreateChatResponse} from "./response/create-chat.response";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url: string = "http://localhost:8080/api/v1/chats";

  constructor(
    private http: HttpClient,
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

  getByChatId(id: string): Promise<ChatResponse | null> {
    return new Promise<ChatResponse | null>((resolve) => {
      this.http.get<ChatResponse>(this.url + "/" + id).subscribe({
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
