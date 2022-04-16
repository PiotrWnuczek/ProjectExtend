import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTasks } from 'store/projectsActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import TaskCard from 'molecules/TaskCard';

const ProjectTasks = ({ updateTasks, tasks, project, id, newTask }) => {
  const [data, setData] = useState([tasks.todo, tasks.done]);

  useEffect(() => {
    setData([tasks.todo, tasks.done]);
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
      const items = reorder(data[sInd], source.index, destination.index);
      const newData = [...data];
      newData[sInd] = items;
      setData(newData);
      updateTasks({ todo: newData[0], done: newData[1] }, id);
    } else {
      const result = move(data[sInd], data[dInd], source, destination);
      const newData = [...data];
      newData[sInd] = result[sInd];
      newData[dInd] = result[dInd];
      setData(newData);
      updateTasks({ todo: newData[0], done: newData[1] }, id);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{ bgcolor: 'secondary.light', borderRadius: 2, mb: 2 }}
        variant='outlined'
      >
        <Box sx={{
          p: 2, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <IconButton size='small'>
            <NavigateBefore />
          </IconButton>
          <Typography variant='button'>
            Todo
          </Typography>
          <Typography variant='button'>
            Sprint Canva
          </Typography>
          <Typography variant='button'>
            Done
          </Typography>
          <IconButton size='small'>
            <NavigateNext />
          </IconButton>
        </Box>
      </Card>
      <Grid container>
        <DragDropContext onDragEnd={onDragEnd}>
          {data.map((el, ind) => (
            <Grid
              sx={ind === 0 ? { pr: 2, borderRight: '1px solid lightgray' } : { pl: 2 }}
              key={ind} item xs={6}
            >
              <Droppable droppableId={ind.toString()}>
                {(provided) => (
                  <Box
                    sx={{ minHeight: `calc(100vh - 11.3rem)` }}
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
                            sx={{ pb: 2 }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={item}
                              project={project}
                              id={id}
                              open={item.id === newTask}
                            />
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

const mapStateToProps = (state) => ({
  newTask: state.projects.newTask,
});

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (data, project) => dispatch(updateTasks(data, project)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (ProjectTasks);
