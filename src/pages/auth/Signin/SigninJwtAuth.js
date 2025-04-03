import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {useAuthMethod} from '@crema/utility/AuthHooks';
import {Fonts} from 'shared/constants/AppEnums';
import jwtAxios from '@crema/services/auth/jwt-auth';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { FETCH_START, FETCH_SUCCESS } from 'shared/constants/ActionTypes';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const validationSchema = yup.object({
  email: yup
    .string()
     .required("Please enter user name!"),
  password: yup
    .string()
    .required("Please enter password"),
});

const SigninJwtAuth = () => {
  const [open, setOpen] = useState(false); 
  const [email, setEmail] = useState("") 
  const [password, setpassword] = useState("") 
  const {signInUser} = useAuthMethod();
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const LogOutUser = async () => {
    dispatch({ type: FETCH_START });
        const { data } = await jwtAxios.post(`userauth/authenticate/alreadyLogout`, { clientId: email, secretKey: password });
        if (data && data.statusCode == "200") {
          dispatch({ type: FETCH_SUCCESS });
          setOpen(false)
        }
}


  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            signInUser({
              email: data.email,
              password: data.password,
              open:open,
              setOpen:setOpen
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder="User Name"
                  name='email'
                  label="User Name"
                  variant='outlined'
                  inputProps={{
                    value: email,
                    onChange: (event) => {
                        setEmail(event.target.value);
                    },
                }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4 }, position: 'relative'}}>
                <AppTextField
                  type={passShow ? "text" : "password"}
                  placeholder="Password"
                  label="Password"
                  name='password'
                  variant='outlined'
                  inputProps={{
                    value: password,
                    onChange: (event) => {
                        setpassword(event.target.value);
                    },
                }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
                {passShow ? <VisibilityIcon style={{ position: "absolute", right: "15px", top: "16%", fontSize: "27px", color: "#c0c4cc" }} onClick={() => setPassShow(!passShow)} /> : <VisibilityOffIcon style={{ position: "absolute", right: "15px", top: "16%", fontSize: "27px", color: "#c0c4cc" }} onClick={() => setPassShow(!passShow)} />}
              </Box>

              

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  sx={{
                     width:"100%",
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                    marginTop:"15px"
                  }}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sxStyle={{
          '& .MuiDialog-paperWidthSm': {
            maxWidth: 500,
            width: '100%',
          },
          '& .MuiTypography-h6': {
            fontWeight: 'bold',
          },
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText sx={{
                  fontWeight: Fonts.REGULAR,
                  fontSize: 16,
                  textTransform: 'capitalize',
                  padding: '2px 10px 6px',
                }}
           id='alert-dialog-description'>
            User Already Logged in
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  variant='contained'
                color='primary'
                sx={{
                  minWidth: 100,
                  fontWeight: Fonts.REGULAR,
                  fontSize: 14,
                  textTransform: 'capitalize',
                  padding: '2px 10px 6px',
                }}
           onClick={()=> LogOutUser()} 
           autoFocus>LogOut</Button>
          <Button  variant='contained'
                color='secondary'
                sx={{
                  minWidth: 100,
                  fontWeight: Fonts.REGULAR,
                  fontSize: 14,
                  textTransform: 'capitalize',
                  padding: '2px 10px 6px',
                }} 
          onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <AppInfoView />
    </Box>
  );
};

export default SigninJwtAuth;
