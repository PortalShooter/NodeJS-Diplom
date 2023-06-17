export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: Role;
}

export enum Role {
  'client',
  'admin',
  'manager',
}
