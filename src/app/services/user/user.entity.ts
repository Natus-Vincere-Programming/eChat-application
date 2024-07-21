import {UUID} from "node:crypto";

export interface User {
  id: UUID,
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  status: "ONLINE" | "OFFLINE"
}
