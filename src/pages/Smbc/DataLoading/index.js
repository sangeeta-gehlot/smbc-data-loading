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
import AppGridContainer from '@crema/core/AppGridContainer';
import AppInfoView from '@crema/core/AppInfoView';
import { onKeyDown } from '@crema/utility/Utils';
import moment from 'moment';
import jwtAxios from '@crema/services/auth/jwt-auth';

const DataLoading = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState()
  const [message, setMessage] = useState()

  const validationSchema = yup.object({
    date: yup
      .string()
      .required('Enter the Date'),
  });

  const DataLoading = async () => {

    const currentTime = moment().format('HH:mm:ss');
    const dateTimeString = `${moment(date).format('YYYY/MM/DD')} ${currentTime}`;
    const { data } = await jwtAxios.post(`DataloadingController/runDataloading/smbc?appRunningDate=${dateTimeString}`);
    if (data && data.statusCode == "200") {
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
      dispatch({
        type: FETCH_ERROR,
        payload: data.errorMsg ? data.errorMsg : 'Something went wrong',
      });
    }
  }

  
  return (

    <div>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Card sx={{ width: '100%', height:"80vh" }}>
            <Box sx={{ display: 'flex', pt: '20px', pl: '30px', fontSize: '17px' }}>Data Loading</Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: "2%" }}>
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
                    <AppGridContainer>
                      <Grid item xs={4}>
                        <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                          <InputLabel shrink htmlFor="select-multiple-native">
                            Date 
                          </InputLabel>
                          <AppTextField
                            name='date'
                            type='date'
                            variant='outlined'
                            inputProps={{
                              value: date,
                              // min: new Date().toISOString().split('T')[0] ? (
                              //   moment(new Date().toISOString().split('T')[0], 'YYYY-MM-DD').date() === 1 ?
                              //     moment(new Date().toISOString().split('T')[0], 'YYYY-MM-DD').subtract(1, 'month').endOf('month').format('YYYY-MM-DD') :
                              //     moment(new Date().toISOString().split('T')[0], 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD')
                              // ) : undefined,
                              // max: new Date().toISOString().split('T')[0],
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
                          <div style={{color:"green", marginTop:"20px"}}>{message}</div>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Button
                          variant='contained'
                          color='primary'
                          disabled={isSubmitting}
                          sx={{
                            minWidth: 160,
                            fontWeight: Fonts.REGULAR,
                            fontSize: 16,
                            textTransform: 'capitalize',
                            padding: '4px 16px 8px',
                            marginTop: "20px",
                            height: "48px",
                            backgroundColor: '#BFD730'
                          }}
                          type='submit'
                        >
                          Run
                        </Button>
                      </Grid>
                    </AppGridContainer>
                  </Form>
                )}
              </Formik>
            </Box>
          </Card>

          <AppInfoView />


        </Box>
    
    </div>
  );
};

export default DataLoading;