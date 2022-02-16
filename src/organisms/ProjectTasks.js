import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTasks } from 'store/projectsActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Grid, Typography } from '@mui/material';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = ({ updateTasks, tasks, id }) => {
  const [state, setState] = useState([tasks.todo, tasks.done]);

  useEffect(() => {
    setState([tasks.todo, tasks.done]);
  }, [tasks]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (src, dst, source, destination) => {
    const srcClone = Array.from(src);
    const dstClone = Array.from(dst);
    const [removed] = srcClone.splice(source.index, 1);
    dstClone.splice(destination.index, 0, removed);
    const result = {};
    result[source.droppableId] = srcClone;
    result[destination.droppableId] = dstClone;
    return result;
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
      updateTasks({ todo: newState[0], done: newState[1] }, id);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setState(newState);
      updateTasks({ todo: newState[0], done: newState[1] }, id);
    }
  };

  return (
    <Box sx={{ p: 2, height: '100%' }}>
      <Grid container>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Grid
              sx={ind === 0 ? { pr: 2, borderRight: '1px solid lightgray' } : { pl: 2 }}
              key={ind} item xs
            >
              <Typography variant='h6'>
                {ind === 0 ? 'Todo' : 'Done'}
              </Typography>
              <Droppable droppableId={ind.toString()}>
                {(provided) => (
                  <Box
                    sx={{ height: '100%' }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            sx={{ py: 1 }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={item} />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </DragDropContext>
      </Grid>
    </Box>
  )
};

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (data, project) => dispatch(updateTasks(data, project)),
});

export default connect(null, mapDispatchToProps)
  (ProjectTasks);
