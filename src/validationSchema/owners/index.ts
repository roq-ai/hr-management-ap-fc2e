import * as yup from 'yup';

export const ownerValidationSchema = yup.object().shape({
  company_name: yup.string().required(),
  establishment_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
