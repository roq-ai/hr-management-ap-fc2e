import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  company_name: string;
  contact_name: string;
  contact_phone?: string;
  contact_email?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_name?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  user_id?: string;
}
