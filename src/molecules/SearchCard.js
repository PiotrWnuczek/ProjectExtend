import React from 'react';
import { Card, CardContent } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Formik } from 'formik';
import IconInput from 'atoms/IconInput';

const SearchCard = () => (
  <Card
    sx={{ bgcolor: 'secondary.light', mb: 2 }}
    variant='outlined'
  >
    <CardContent>
      SearchCard
      <Formik
        initialValues={{ search: '' }}
        onSubmit={(values) => { console.log(values) }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <IconInput
              icon={<Search />}
              sx={{ my: 1.5, mr: 2 }}
              onChange={handleChange}
              value={values.search}
              label='Search'
              name='search'
              type='text'
              size='small'
            />
          </form>
        )}
      </Formik>
    </CardContent>
  </Card>
);

export default SearchCard;
