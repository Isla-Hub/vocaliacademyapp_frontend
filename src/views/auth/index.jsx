import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { tokens } from "../../config/theme";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InputAdornment from "@mui/material/InputAdornment";
import { useSignIn } from "react-auth-kit";
import login from "../../api/auth";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/users";
import IconButton from "@mui/material/IconButton";
import axios from "../../config/axiosConfig";
import useKeyLock from "../../hooks/useKeyLock";
import MuiAlert from "@mui/material/Alert";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import logoBlack from "../../assets/logos/logo_black.svg";
import logoWhite from "../../assets/logos/logo_white.svg";

const initialValues = {
  email: "",
  password: "",
};

const authSchema = yup.object().shape({
  email: yup
    .string()
    .email("No es una dirección válida de correo electrónico.")
    .required("Esta campo no puede estar vacio."),
  password: yup.string().required("Esta campo no puede estar vacio."),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.vocaliacademy.com">
        Vocali Academy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isCapsLocked = useKeyLock("CapsLock");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
    message: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      const userData = await getUserData(response.data.userId);

      if (userData.data.isActive) {
        signIn({
          token: response.data.token,
          expiresIn: 1,
          tokenType: "Bearer",
          authState: {
            ...userData.data,
          },
        });

        navigate("/");
      }
    } catch (error) {
      const { response } = error;
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: response.data.message,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "50%",
            width: "50%",
            marginBottom: "2.5rem",
          }}
          alt="Vocali Academy Logo"
          src={theme.palette.mode === "dark" ? logoWhite : logoBlack}
        />
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={authSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
            <Box sx={{ mt: 1 }} onSubmit={handleSubmit} component="form">
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoFocus
                autoComplete="email"
                color="secondary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                color="secondary"
                autoComplete="current-password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={!!touched.password && !!errors.password}
                helperText={
                  isCapsLocked && !errors.password
                    ? "El bloqueo de mayúsculas está activado."
                    : touched.password && errors.password
                }
                InputProps={{
                  endAdornment: isCapsLocked ? (
                    <InputAdornment position="end">
                      <LockIcon color="secondary" />
                    </InputAdornment>
                  ) : (
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                disabled={!!errors.password || !!errors.email || isSubmitting}
              >
                Iniciar sesión
              </Button>
              <Box mt={"2rem"} textAlign={"center"}>
                <Link href="/login" color={colors.grey[100]} underline="hover">
                  ¿Te has olvidado de la contraseña?
                </Link>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar
        anchorOrigin={{
          vertical: snackbarState.vertical,
          horizontal: snackbarState.horizontal,
        }}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignIn;
