export interface UserResponse {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  status: "ONLINE" | "OFFLINE";
}
