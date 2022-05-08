import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTasks } from 'store/projectsActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Divider, Grid } from '@mui/material';
import TaskCard from 'molecules/TaskCard';
import SprintCard from 'molecules/SprintCard';

const ProjectTasks = (
  { updateTasks, project, sprint, id, newTask, previous, next, nr }
) => {
  const [data, setData] = useState(sprint && [sprint.todo, sprint.done]);
  useEffect(() => {
    setData(sprint && [sprint.todo, sprint.done]);
  }, [sprint]);

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
      updateTasks({ todo: newData[0], done: newData[1] }, sprint.id, id);
    } else {
      const result = move(data[sInd], data[dInd], source, destination);
      const newData = [...data];
      newData[sInd] = result[sInd];
      newData[dInd] = result[dInd];
      setData(newData);
      updateTasks({ todo: newData[0], done: newData[1] }, sprint.id, id);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <SprintCard
        sprint={sprint}
        id={id}
        previous={previous}
        next={next}
        nr={nr}
      />
      <Grid container spacing={2}>
        <DragDropContext onDragEnd={onDragEnd}>
          {data && data.map((el, ind) => (
            <Grid item xs={12} md={6} key={ind}>
              <Divider sx={{ my: 1 }} textAlign='left'>
                {ind === 0 ? 'TODO' : 'DONE'}
              </Divider>
              <Droppable droppableId={ind.toString()}>
                {(provided) => (
                  <Box
                    sx={{ minHeight: { xs: '10vh', md: '70vh' } }}
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
                            <TaskCard
                              task={item}
                              project={project}
                              sprintId={sprint.id}
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
  updateTasks: (data, sprint, project) => dispatch(updateTasks(data, sprint, project)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (ProjectTasks);
