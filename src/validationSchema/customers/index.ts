import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  company_name: yup.string().required(),
  contact_name: yup.string().required(),
  contact_phone: yup.string().nullable(),
  contact_email: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
