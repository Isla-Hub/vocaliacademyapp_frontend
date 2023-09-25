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
import PasswordIcon from "@mui/icons-material/Password";
import IconButton from "@mui/material/IconButton";
import axios from "../../config/axiosConfig";
import useKeyLock from "../../hooks/useKeyLock";
import MuiAlert from "@mui/material/Alert";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import logoBlack from "../../assets/logos/logo_black.svg";
import logoWhite from "../../assets/logos/logo_white.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, loginUser } from "../../features/user/userSlice";

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
  const error = useSelector((state) => state.user.error);
  const signIn = useSignIn();
  const dispatch = useDispatch();
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
      const credentials = {
        email: values.email,
        password: values.password,
      };

      const { userId, token } = await dispatch(loginUser(credentials)).unwrap();

      if (userId && token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await dispatch(fetchUserData(userId)).unwrap();
        signIn({
          token: token,
          expiresIn: 1,
          tokenType: "Bearer",
        });
      }
    } catch (error) {
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: error,
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
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignIn;
