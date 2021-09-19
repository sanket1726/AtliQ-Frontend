import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./App.css";
import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";
import axios from "./axios/axios";
import EditModal from "./components/Modals/EditModal";
import LoginForm from "./components/LoginForm";

const BASE_URL = "http://localhost:9000/api/v1/";
const BASE_TASK_URL = "tasks";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState("");
  const [modal, setModal] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchTodos = async (user) => {
    setUserData(user);
    await axios
      .post("http://localhost:9000/api/v1/tasks/getTasks", {
        userid: user.userId,
        role: user.role,
      })
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [privateRoutes, setPrivateRoutes] = useState(function () {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user !== null) {
      console.log("data is here");
      fetchTodos(user);
      return true;
    } else {
      console.log("data is not here");
      setUserData(null);
      return false;
    }
  });

  useEffect(() => {
    // localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodos = async (todo) => {
    setTodos([...todos, todo]);
    console.log(todo);
    await axios
      .post(`${BASE_URL}${BASE_TASK_URL}/new`, {
        title: todo.title,
        description: todo.description,
        userid: userData.userId,
        duedate: todo.duedate,
        creationdate: todo.creationdate,
        id: todo.id,
      })
      .then((res) => {
        console.log("resssssssss");
        console.log(res);
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr");
        console.log(err);
      });
  };

  const markComplete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteTask = async (id) => {
    console.log(id);
    await axios
      .delete(`${BASE_URL}${BASE_TASK_URL}/deleteTask`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openModal = (todo) => {
    console.log(`Edit task id => ${todo.id}`);
    console.log(todo);
    setTodoId(todo.id);
    setTaskContent(todo.title);
    setModal(true);
  };

  const closeModal = () => {
    setTodoId("");
    setTaskContent("");
    setModal(!modal);
  };

  const editTaskApi = async () => {
    console.log(todoId);
    console.log(taskContent);
    await axios
      .put(`${BASE_URL}${BASE_TASK_URL}/edit`, {
        id: todoId,
        newTaskContent: taskContent,
      })
      .then((response) => {
        console.log(response);
        const newTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            todo.title = taskContent;
            console.log(todo);
          }
          return todo;
        });
        // setTodos(newTodos);
        setTodoId("");
        setTaskContent("");
        setModal(false);
        console.log(newTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authorizeUser = (data) => {
    console.log(data);
    fetchTodos(data);
    setPrivateRoutes(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUserData(null);
    setTodos([]);
    setTodoId("");
    setTaskContent("");
    setPrivateRoutes(false);
  };

  return (
    <Container fluid>
      <Row
        style={{
          alignItems: "center",
          backgroundColor: "lightgray",
          padding: "5px",
          marginBottom: "50px",
        }}
      >
        <Col xs='6' sm='4'>
          {userData !== null && (
            <Button color='success'>
              {userData.name} (
              <small style={{ color: "orange" }}>{userData.role}</small>)
            </Button>
          )}
        </Col>
        <Col xs='6' sm='4'>
          <h1 style={{ fontWeight: "500" }}>Tasks Management Application</h1>
        </Col>
        <Col sm='4'>
          {userData !== null && (
            <Button
              color='danger'
              onClick={logoutUser}
              style={{ float: "right" }}
            >
              Log-Out
            </Button>
          )}
        </Col>
      </Row>
      {privateRoutes === false ? (
        <LoginForm
          authorizeUser={(data) => {
            authorizeUser(data);
          }}
        />
      ) : (
        <>
          {userData && userData.role !== "admin" && (
            <TodoForm addTodos={addTodos} />
          )}
          <Todos
            todos={todos}
            markComplete={markComplete}
            deleteTask={deleteTask}
            editTask={(todo) => {
              openModal(todo);
            }}
          />
          <EditModal
            modal={modal}
            buttonLabel='Edit Modal'
            id={todoId}
            closeModal={() => {
              closeModal();
            }}
            taskContent={taskContent}
            setTaskContent={(value) => {
              setTaskContent(value);
            }}
            editTask={() => {
              editTaskApi();
            }}
          />
        </>
      )}
    </Container>
  );
};

export default App;
