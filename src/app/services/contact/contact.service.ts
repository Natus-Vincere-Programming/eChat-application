import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactRequest} from "./request/contact.request";
import {ContactResponse} from "./response/contact.response";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string = "http://localhost:8080/api/v1/contacts";

  constructor(private http: HttpClient) {
  }

  addContact(request: ContactRequest): Promise<ContactResponse | null> {
    return new Promise<ContactResponse | null>((resolve) => {
      this.http.post<ContactResponse>(this.url, request).subscribe({
        next: (contact: ContactResponse) => {
          console.trace(contact);
          resolve(contact);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      })
    });
  }

  getContacts(): Promise<ContactResponse[] | null> {
    return new Promise<ContactResponse[] | null>((resolve) => {
      this.http.get<ContactResponse[] | null>(this.url).subscribe({
        next: (contacts: ContactResponse[] | null) => {
          console.trace(contacts);
          resolve(contacts);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      })
    });
  }

  deleteContact(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.delete(this.url + "/" + id).subscribe({
        next: () => {
          console.debug('Contact deleted');
          resolve(true);
        },
        error: (err) => {
          console.trace(err);
          resolve(false);
        }
      })
    });
  }
}
