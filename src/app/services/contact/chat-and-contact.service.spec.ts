import { TestBed } from '@angular/core/testing';

import { ChatAndContactService } from './chat-and-contact.service';

describe('ContactService', () => {
  let service: ChatAndContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAndContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
