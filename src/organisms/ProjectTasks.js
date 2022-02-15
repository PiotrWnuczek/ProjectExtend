import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ProjectTasks = () => {
  const [state, setState] = useState([
    [
      { id: 'item1', content: 'item1' },
      { id: 'item2', content: 'item2' },
    ],
    [
      { id: 'item3', content: 'item3' },
      { id: 'item4', content: 'item4' },
    ],
  ]);

  const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
  };

  const move = (src, dst, source, destination) => {
    const [removed] = src.splice(source.index, 1);
    dst.splice(destination.index, 0, removed);
    const result = {};
    result[source.droppableId] = src;
    result[destination.droppableId] = dst;
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
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setState(newState);
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.map((el, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided) => (
              <div
                style={{ width: '100px', height: '100px' }}
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
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>
                          {item.content}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default ProjectTasks;
