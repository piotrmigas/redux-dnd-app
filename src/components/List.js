import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import AddTask from "./AddTask";

const List = ({ list, tasks }) => (
  <div>
    <AddTask list={list} listId={list.id} />
    <Droppable droppableId={list.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="dropzone">
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} listId={list.id} icon={list.icon} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default List;
