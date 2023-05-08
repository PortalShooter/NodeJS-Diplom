export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: Role;
}

enum Role {
  'client',
  'admin',
  'manager',
}
