import React from "react";
import "./App.css";
import List from "./components/List";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { dragHappened } from "./redux/listSlice";

function App() {
  const dispatch = useDispatch();

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    dispatch(
      dragHappened({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
      })
    );
  };

  const lists = useSelector((state) => state.list);
  const listOrder = Object.keys(lists);
  const tasks = useSelector((state) => state.task);

  return (
    <div className="wrapper">
      <div className="sidebar" />
      <div className="main-wrapper">
        <Header />
        <div className="app">
          <DragDropContext onDragEnd={onDragEnd}>
            {listOrder.map((listId) => {
              const list = lists[listId];
              const listTasks = list.tasks.map((taskId) => tasks[taskId]);
              return <List key={list.id} list={list} tasks={listTasks} />;
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
