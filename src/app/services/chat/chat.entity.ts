import {UUID} from "node:crypto";


export interface Chat {
  id: UUID;
  senderId: UUID,
  receiverId: UUID
}
