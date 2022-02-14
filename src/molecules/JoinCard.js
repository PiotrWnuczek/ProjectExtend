import React from 'react';
import { Card, CardContent } from '@mui/material';
import { Email } from '@mui/icons-material';
import { Formik } from 'formik';
import IconInput from 'atoms/IconInput';

const JoinCard = () => (
  <Card
    sx={{ bgcolor: 'secondary.light', mb: 2 }}
    variant='outlined'
  >
    <CardContent>
      JoinCard
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => { console.log(values) }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <IconInput
              icon={<Email />}
              sx={{ my: 1.5, mr: 2 }}
              onChange={handleChange}
              value={values.email}
              label='Email'
              name='email'
              type='email'
              size='small'
            />
          </form>
        )}
      </Formik>
    </CardContent>
  </Card>
);

export default JoinCard;
