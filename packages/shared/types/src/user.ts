export enum UserRole {
  Client = 'Client',
  Admin = 'Admin',
  Realtor = 'Realtor'
};

export interface User {
  _id:    string;
  name:   string;
  email:  string;
  role:   UserRole;
  created:  Date;
}
