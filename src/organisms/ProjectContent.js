import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProject } from 'store/projectsActions';
import { Formik } from 'formik';
import { Typography, Button, Accordion } from '@mui/material';
import { AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Edit } from '@mui/icons-material';
import TextInput from 'atoms/TextInput';

const ProjectContent = ({ updateProject, project, id }) => {
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState(false);

  return (
    <Accordion
      sx={{ bgcolor: 'inherit', mb: 2, '&:before': { display: 'none' } }}
      expanded={open}
      variant='outlined'
    >
      <AccordionSummary
        sx={{ pointerEvents: 'none' }}
        expandIcon={
          <ExpandMore
            sx={{ pointerEvents: 'auto' }}
            onClick={() => setOpen(!open)}
          />
        }
      >
        <Typography
          sx={{ pointerEvents: 'auto' }}
          onClick={() => setOpen(!open)}
          variant='h6'
        >
          Content
        </Typography>
        {!edit && <Button
          sx={{ pointerEvents: 'auto', mx: 2 }}
          endIcon={<Edit />}
          onClick={() => setEdit(true)}
          variant='outlined'
          size='small'
        >
          Edit
        </Button>}
        {edit && <Button
          sx={{ pointerEvents: 'auto', mx: 2 }}
          endIcon={<Edit />}
          type='submit'
          form='form'
          variant='outlined'
          size='small'
        >
          Save
        </Button>}
      </AccordionSummary>
      <AccordionDetails>
        {!edit && <div>
          <Typography>
            {project.name}
          </Typography>
          <Typography>
            {project.description}
          </Typography>
        </div>}
        {edit && <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          onSubmit={(values) => {
            updateProject(values, id);
            setEdit(false);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id='form'>
              <TextInput
                onChange={handleChange}
                value={values.name}
                label='Name'
                name='name'
                type='text'
              />
              <TextInput
                onChange={handleChange}
                value={values.description}
                label='Description'
                name='description'
                type='text'
                multiline
                rows={7}
              />
            </form>
          )}
        </Formik>}
      </AccordionDetails>
    </Accordion>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateProject: (data, id) => dispatch(updateProject(data, id)),
});

export default connect(null, mapDispatchToProps)
  (ProjectContent);
