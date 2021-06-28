export type userRoleType = 'ADMIN' | 'FILMMAKER';

export interface IUser {
  username: string;
  sub: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  role: userRoleType[];
}
