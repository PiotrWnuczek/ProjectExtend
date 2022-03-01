import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTeam, updateProject } from 'store/projectsActions';
import { Typography, IconButton, Button } from '@mui/material';
import { Box, Card, CardHeader, Collapse } from '@mui/material';
import { ExpandMore, Send } from '@mui/icons-material';
import { Formik } from 'formik';
import IconInput from 'atoms/IconInput';

const JoinCard = ({ updateTeam, updateProject, pro, team, id, email, candidate, member }) => {
  const [expand, setExpand] = useState(false);
  useEffect(() => { !member && setExpand(true) }, [member, setExpand]);

  return (
    <Card
      sx={{ bgcolor: 'secondary.light', mb: 2 }}
      variant='outlined'
    >
      {candidate && <CardHeader
        title={<Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            {candidate.email}
          </Typography>
          {member && <Button
            sx={{ ml: 1, mt: 0.5 }}
            onClick={() => {
              updateTeam({
                candidates: team.candidates.filter(c => c.email !== candidate.email),
                members: [...team.members, { email: candidate.email }],
              }, id);
              updateProject({ emails: [...pro.emails, candidate.email] }, id);
            }}
            size='small'
          >
            Accept
          </Button>}
          {member && <Button
            sx={{ ml: 1, mt: 0.5 }}
            onClick={() => updateTeam({
              candidates: team.candidates.filter(c => c.email !== candidate.email),
            }, id)}
            size='small'
          >
            Delete
          </Button>}
        </Box>}
        action={<>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandMore sx={{ transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </IconButton>
        </>}
      />}
      <Collapse in={expand} timeout='auto'>
        <Box sx={candidate ? { p: 2, pt: 0 } : { p: 2 }}>
          {candidate && candidate.content.map((item, i) =>
            <Typography key={i}>
              {item.email} : {item.message}
            </Typography>
          )}
          <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              candidate && updateTeam({
                candidates: team.candidates.map(c => c.email === candidate.email ?
                  { ...c, content: [...c.content, { email, ...values }] } : c)
              }, id);
              !candidate && updateTeam({
                candidates: [...team.candidates, { email, content: [{ email, ...values }] }],
              }, id);
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
        </Box>
      </Collapse>
    </Card>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTeam: (data, project) => dispatch(updateTeam(data, project)),
  updateProject: (data, id) => dispatch(updateProject(data, id)),
});

export default connect(null, mapDispatchToProps)
  (JoinCard);
