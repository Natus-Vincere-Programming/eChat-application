import { Injectable } from '@angular/core';
import {ChatResponse} from "./response/chat.response";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../../../Desktop/user/user.entity";
import {AllContact} from "./response/all-chat.response";
import {ContactResponse} from "./response/contact.response";
import {ContactRequest} from "./request/contact.request";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class ChatAndContactService {
  contact : ChatResponse[] = [];
  url: string = "http://localhost:8080";
  constructor(
    private http: HttpClient
  ) { }

  getAllContacts() : Promise<ContactResponse[]>{
    return new Promise<ContactResponse[]>((resolve) => {
      this.http.get<ContactResponse[]>(this.url + '/contacts').subscribe({
        next: (response: ContactResponse[]) => {
          resolve(response)
        },
        error: (err) => {
          resolve(err);
        }
      })
    })
  }

  getAllChats() : Promise<ChatResponse[]>{
    return new Promise<ChatResponse[]>((resolve) => {
      this.http.get<ChatResponse[]>(this.url +'/chats' ).subscribe({
          next: (contact: ChatResponse[]) => {
            resolve(contact);
          },
          error: (err) => {
            resolve(err);
          }
        }
      )
    })
  }

  getChatInfo(chatId : string) : Promise<AllContact | null>{
    return new Promise<AllContact | null>((resolve) => {
      this.http.get<AllContact>(this.url + '/messages/' + chatId + '/last').subscribe({
        next: (contact: AllContact) => {
          resolve(contact);
        },
        error: (err) => {
          resolve(null);
        }
      })
    })
  }

  createNewContact(contactRequest : ContactRequest) : Promise<ContactResponse> {
    return new Promise<ContactResponse>((resolve) => {
      this.http.post<ContactResponse>(this.url + '/contacts', contactRequest).subscribe({
        next: (contact: ContactResponse) => {
          resolve(contact);
        },
        error: (err) => {
          resolve(err);
        }
      })
    })
  }

  createNewChat(senderId : string, receiverId : string) : Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      this.http.post<string>(this.url + '/chats/' + senderId + '/' + receiverId, null).subscribe({
        next: (id : string) => {
          resolve(id);
        },
        error: (err) => {
          resolve(null);
        }
      })
    })
  }
}
