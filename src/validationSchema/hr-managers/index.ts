import * as yup from 'yup';

export const hrManagerValidationSchema = yup.object().shape({
  specialization: yup.string().required(),
  experience_years: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
