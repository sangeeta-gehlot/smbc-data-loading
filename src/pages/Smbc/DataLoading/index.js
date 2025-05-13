import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Fonts } from 'shared/constants/AppEnums';
import { Card, Grid, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  FETCH_ERROR, SHOW_MESSAGE,
} from 'shared/constants/ActionTypes';
import AppInfoView from '@crema/core/AppInfoView';
import { onKeyDown } from '@crema/utility/Utils';
import moment from 'moment';
import jwtAxios from '@crema/services/auth/jwt-auth';
import AppLoader from '@crema/core/AppLoader';

const DataLoading = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [errormsg, setErrorMsg] = useState()

  const validationSchema = yup.object({
    date: yup
      .string()
      .required('Enter the Date'),
  });

  const DataLoading = async () => {
    setLoading(true)

    // const currentTime = moment().format('HH:mm:ss');
    const dateTimeString = `${moment(date).format('YYYY/MM/DD')}`;
    const { data } = await jwtAxios.post(`DataloadingController/runDataloading/smbc?appRunningDate=${dateTimeString}`);
    if (data && data.status_code == "200") {
      setLoading(false)
      setDate("")
      dispatch({
        type: SHOW_MESSAGE,
        payload: `Scheduler Run Successfully for ${moment(date).format('DD/MM/YYYY').toString()}`,
      });
      setMessage(`Scheduler Run Successfully for ${moment(date).format('DD/MM/YYYY').toString()}`)
      setTimeout(() => {
        setMessage("");
      }, 10000);
    }
    else {
      setLoading(false)
      dispatch({
        type: FETCH_ERROR,
        payload: data.errorMsg ? data.errorMsg : 'Something went wrong',
      });
      setErrorMsg(data.errorMsg ? data.errorMsg : 'Something went wrong')
    }
  }


  return (

    <div>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Card
          sx={{
            width: '100%',
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
            // background: 'background: hsla(75, 100%, 40%, 1)',
            background: 'linear-gradient(90deg, hsl(75deg 100% 40% / 30%) 0%, hsl(94deg 100% 40% / 30%) 100%)',
            // background: '-moz-linear-gradient(90deg, hsl(75deg 100% 40% / 30%) 0%, hsl(94deg 100% 40% / 30%) 100%)',
            // background: '-webkit-linear-gradient(90deg, hsl(75deg 100% 40% / 30%) 0%, hsl(94deg 100% 40% / 30%) 100%)',
            filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#99CC00", endColorstr="#58CC00", GradientType=1 );'
          }}>
          <Grid
            maxWidth="md"
            container
            direction="column"
            style={{
              padding: '60px 45px',
              borderRadius: '10px',
              boxShadow: 'rgb(0 0 0 / 16%) 0px 6px 17px 5px',
              background: '#fff'
            }}
          >
            {/* <Box style={{ textAlign: 'left', marginBottom: '25px' }}>
              <img src='/assets/images/logo.png' alt='' />
            </Box> */}
            <Box sx={{ pt: '20px', fontSize: '19px', textAlign: "left", mb: '30px' }}>Data Loading</Box>
            <Formik
              validateOnChange={true}
              initialValues={{
                date: '',
              }}

              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                DataLoading();
                setSubmitting(false);
              }}

            >
              {({ isSubmitting }) => (
                <Form onKeyDown={onKeyDown} style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                  <Grid
                    container
                    direction="row"
                  >
                    <Grid item xs={12} sm={9}>
                      <Box style={{ position: 'relative' }}>
                        <InputLabel shrink htmlFor="select-multiple-native" style={{ position: 'absolute', top: '-6px', left: '10px', background: '#fff', padding: '0px 10px', zIndex: '1' }}>
                          Date  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                        </InputLabel>
                        <AppTextField
                          name='date'
                          type='date'
                          variant='outlined'
                          onKeyDown={(e) => e.preventDefault()}
                          inputProps={{
                            value: date,
                            min : new Date().toISOString().split('T')[0] ? (
                              moment().subtract(30, 'days').format('YYYY-MM-DD')
                            ) : undefined,
                            max: new Date().toISOString().split('T')[0],
                            onChange: (event) => {
                              setDate(event.target.value);
                            },
                          }}
                          sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                              fontSize: 14,
                            },
                          }}
                        />
                        <div style={{ color: "green", marginTop: "20px" }}>{message}</div>
                        <div style={{ color: "red", marginTop: "20px" }}>{errormsg}</div>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={3} sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'start'
                    }}>
                      <Button
                        variant='contained'
                        disabled={isSubmitting}
                        sx={{
                          minWidth: 160,
                          fontWeight: Fonts.REGULAR,
                          fontSize: 16,
                          textTransform: 'capitalize',
                          padding: '12px 16px',
                          marginLeft: "15px",
                          backgroundColor: '#99cc00',
                        }}
                        type='submit'
                      >
                        Run
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid
            maxWidth="35%"
            container
            direction="column"
            justifyContent="flex-end"
            style={{
              padding: '35px 30px',
              borderRadius: '10px',
              boxShadow: 'rgb(0 0 0 / 16%) 0px 6px 17px 5px',
              background: '#fff',
              color: "red",
              fontSize: "17px",
              marginTop: "40px",
            }}
          >
            <p style = {{color:"rgb(38 137 169)"}}>
            <span style={{color:"red"}}>Note-</span> Please select the date for which you want to run Data Loading.<br/>
            This will only Pull the data from LTRDB.<br/>
            For GSTR Data creation go to GST Middleware- Data Loading Run Option.</p>
          </Grid>
        </Card>

        <AppInfoView />


      </Box>
      {loading && <AppLoader />}

    </div>
  );
};

export default DataLoading;