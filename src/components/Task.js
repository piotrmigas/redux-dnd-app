import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/taskSlice";

const Task = ({ listId, task, index, icon }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);
  const [content, setContent] = React.useState(task.content);

  const dispatch = useDispatch();

  const saveTask = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Tytuł wymagany!");
    } else {
      dispatch(updateTask({ id: task.id, title, content }));
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <form>
      <div className="card shadow">
        <div className="card-body">
          <input
            className="card-title"
            name="title"
            autoComplete="off"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wpisz tytuł..."
            onKeyPress={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
          <textarea
            className="card-subtitle"
            rows="3"
            cols="25"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tutaj wpisz opis..."
          />
        </div>
        <div className="icons">
          <i className="fas fa-check-circle" onClick={saveTask} />
          <i className="fas fa-times-circle" onClick={() => setIsEditing(false)} />
        </div>
      </div>
    </form>
  ) : (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="card-body">
            <h3 className="card-title">{task.title}</h3>
            <p className="card-subtitle">{task.content}</p>
          </div>
          <div className="icons">
            <i className={icon} />
            <i className="far fa-edit edit" onClick={() => setIsEditing(true)} />
            <i className="fas fa-trash" onClick={() => dispatch(deleteTask({ id: task.id, listId }))} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
