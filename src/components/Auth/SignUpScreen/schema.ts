import * as Yup from 'yup';

const signUnSchema = Yup.object().shape({
  email: Yup.string().required('email is required').email('invalid email'),
  name: Yup.string()
    .required('name is required')
    .matches(/([A-Z|А-Я][a-z|а-я]+\s[A-Z|А-Я][a-z|а-я]+)/, {
      message: 'must have at least two capitalized words',
      excludeEmptyString: false,
    }),
  password: Yup.string().required('password is required').min(12),
  confirmPassword: Yup.string()
    .required('confirm password is required')
    .oneOf([Yup.ref('password'), null], 'passwords must match'),
});

export default signUnSchema;
