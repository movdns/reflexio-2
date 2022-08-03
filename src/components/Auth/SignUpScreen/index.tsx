import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";

import { Form, Formik } from "formik";
import { useAuth } from "reactfire";
// import { UIContext } from '../../Unknown/UIContext';
import signUpSchema from "./schema";
import PasswordField from "./PasswordField";

type SignUpScreenFormValues = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen: React.FC = () => {
  const auth = useAuth();

  // const { setAlert } = useContext(UIContext);

  const initialFormValues: SignUpScreenFormValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const handleSignUp = async ({
    email,
    name,
    password,
  }: SignUpScreenFormValues) => {
    try {
      // const response = await auth.createUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      //
      // if (response.user) {
      //   await response.user.updateProfile({ displayName: name });
      //   // setAlert({
      //   //   show: true,
      //   //   severity: 'success',
      //   //   message: 'Welcome on board 🚀',
      //   // });
      // }
    } catch (e) {
      // setAlert({
      //   show: true,
      //   severity: 'error',
      //   message: e?.message || 'Error occurred',
      // });
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        Register
      </Typography>

      <Box mt={10} width="100%" flex="1 1 auto">
        <Formik
          initialValues={initialFormValues}
          validationSchema={signUpSchema}
          onSubmit={(values) => handleSignUp(values)}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            errors,
            touched,
            handleBlur,
          }) => (
            <Form>
              <Grid container direction="column" gap={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur}
                  autoComplete="email"
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ focused: false }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                />
                <TextField
                  label="Full name"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur}
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ focused: false }}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  fullWidth
                />

                <PasswordField
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <PasswordField
                  label="Repeat Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        mt={5}
        mb={5}
        gap={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="subtitle2" component="h6">
          Already have account?
        </Typography>
        <Button component={Link} to="/login">
          Login
        </Button>
      </Box>
    </>
  );
};

export default SignUpScreen;
