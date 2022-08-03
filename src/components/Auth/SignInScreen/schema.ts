import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  email: Yup.string().required("email is required").email("invalid email"),
  password: Yup.string().required("password is required").min(6),
});

export default signInSchema;
