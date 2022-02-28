import React from 'react';
import { connect } from 'react-redux';
import { updateTeam } from 'store/projectsActions';
import { Card, CardContent } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Formik } from 'formik';
import IconInput from 'atoms/IconInput';

const JoinCard = ({ updateTeam, team, id, email }) => {
  const candidate = team && team.candidates.find(c => c.email === email);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      <CardContent>
        {candidate && candidate.messages.map((message, i) =>
          <p key={i}>{message}</p>
        )}
        <Formik
          initialValues={{ message: '' }}
          onSubmit={(values, { resetForm }) => {
            candidate && updateTeam({
              candidates: team.candidates.map(c =>
                c.email === email ? { ...c, messages: [...c.messages, values.message] } : c),
            }, id); resetForm();
            !candidate && updateTeam({
              candidates: [...team.candidates, { email, messages: [values.message] }]
            }, id); resetForm();
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <IconInput
                icon={<Send />}
                onChange={handleChange}
                value={values.message}
                label='Message'
                name='message'
                type='text'
                size='small'
                multiline
                rows={2}
              />
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTeam: (data, project) => dispatch(updateTeam(data, project)),
});

export default connect(null, mapDispatchToProps)
  (JoinCard);
