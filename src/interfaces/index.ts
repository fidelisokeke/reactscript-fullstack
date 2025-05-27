export interface IUser {
  id: string;
  name: string;
  email: string;
  profile_pic: string;
  createdAt: string;
  updatedAt: string;
  last_sign_in_at: string;
}
export interface ITransaction {
  id: string;
  user_id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  created_at: string;
  updatetd_at: string;
}