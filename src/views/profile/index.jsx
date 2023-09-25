import React from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuthUser } from "react-auth-kit";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { getUserData, putUserData } from "../../api/users";
import { useCookies } from "react-cookie";

const userSchema = yup.object().shape({
  name: yup.string().required("Esta campo no puede estar vacio."),
  lastName: yup.string().required("Esta campo no puede estar vacio."),
  email: yup
    .string()
    .email("No es una dirección válida de correo electrónico.")
    .required("Esta campo no puede estar vacio."),
  phoneNumber: yup.string().required("Esta campo no puede estar vacio."),
  dateOfBirth: yup.date().required("Esta campo no puede estar vacio."),
  newsletter: yup.boolean().required("Esta campo no puede estar vacio."),
  notifications: yup.boolean().required("Esta campo no puede estar vacio."),
});

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const auth = useAuthUser();
  const user = auth();
  const [cookies, setCookie] = useCookies(["_auth_state"]);

  const handleFormSubmit = async (values) => {
    try {
      //   await putUserData(user._id, values);
      //   const userData = await getUserData(user._id);
      //   user
      //   setCookie("_auth_state", userData.data);
      //   console.log("userData", userData);
      //   console.log("cookies", cookies);
      //   console.log("coockie._auth_state", cookies["_auth_state"]);
    } catch (error) {
      const { response } = error;
      console.log(response);
    }
  };
  return (
    <Box m="20px">
      {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}> */}
      <Header title="Mi perfil" subtitle="Revisa y modifica tus datos" />
      {/* </Box> */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          dateOfBirth: dayjs(user.dateOfBirth),
          newsletter: user.subscribed.newsletter,
          notifications: user.subscribed.notifications,
        }}
        validationSchema={userSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  margin="normal"
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  margin="normal"
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Apellidos"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  margin="normal"
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  type="email"
                  label="Correo electrónico"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  margin="normal"
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Número de teléfono"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {isNonMobile ? (
                    <DatePicker
                      margin="normal"
                      color="secondary"
                      label="Fecha de nacimiento"
                      fullWidth
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(value) => setFieldValue("dateOfBirth", value, true)}
                      name="dateOfBirth"
                      format="DD/MM/YYYY"
                      value={values.dateOfBirth}
                      error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
                      sx={{ gridColumn: "span 2" }}
                    />
                  ) : (
                    <MobileDatePicker
                      margin="normal"
                      color="secondary"
                      label="Fecha de nacimiento"
                      fullWidth
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(value) => setFieldValue("dateOfBirth", value, true)}
                      name="dateOfBirth"
                      format="DD/MM/YYYY"
                      value={values.dateOfBirth}
                      error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
                      sx={{ gridColumn: "span 2" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "red",
                              },
                              "&:hover fieldset": {
                                borderColor: "green",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "purple",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  )}
                </LocalizationProvider>
                <FormControl
                  component="fieldset"
                  variant="standard"
                  error={
                    (!!touched.newsletter && !!errors.newsletter) || (!!touched.notifications && !!errors.notifications)
                  }
                >
                  <FormLabel component="legend" color="secondary">
                    Subscripciones
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      margin="normal"
                      control={<Checkbox checked={values.newsletter} color="secondary" name="newsletter" />}
                      onChange={handleChange}
                      label="Newsletter"
                    />
                    <FormControlLabel
                      margin="normal"
                      color="secondary"
                      control={<Checkbox checked={values.notifications} color="secondary" name="notifications" />}
                      onChange={handleChange}
                      label="Notifications"
                    />
                  </FormGroup>
                  <FormHelperText>
                    {(touched.newsletter && errors.newsletter) || (touched.notifications && errors.notifications)}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!!errors.password || !!errors.email}
                >
                  Guardar
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Profile;
