import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Collapse,
  List,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { FaCheckDouble } from "react-icons/fa";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

const Todos = ({ todos, markComplete, deleteTask, editTask }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user !== null) {
      console.log("data is here");
      setUserData(user);
    } else {
      console.log("data is not here");
      setUserData(null);
    }
  }, []);

  return (
    <ListGroup className='mt-5 mb-2 items' style={{ paddingTop: "50px" }}>
      {todos.map((todo, index) => (
        <ListGroupItem
          key={`${todo._id}${todo.id}`}
          // style={{
          //   display: "flex",
          //   justifyContent: "space-between",
          //   flexFlow: "wrap",
          // }}
        >
          <Row>
            <Col xs='8'>
              <div>Title : {todo.title}</div>
              <div>Description : {todo.description}</div>
              <div>Due Date : {todo.duedate}</div>
              <div>Created On : {todo.creationdate}</div>
            </Col>
            <Col xs='4'>
              <span
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginRight: "15px",
                  marginTop: "10px",
                }}
              >
                {userData.role !== "admin" && (
                  <FaCheckDouble
                    className='action-buttons'
                    size={20}
                    style={{ marginRight: "10px" }}
                    // className='float-right'
                    color='green'
                    onClick={() => markComplete(todo.id)}
                  />
                )}
                <AiTwotoneDelete
                  className='action-buttons'
                  size={20}
                  color='red'
                  style={{ marginRight: "10px" }}
                  onClick={() => deleteTask(todo.id)}
                />
                {userData.role !== "admin" && (
                  <AiTwotoneEdit
                    className='action-buttons'
                    size={20}
                    color='blue'
                    style={{ marginRight: "10px" }}
                    onClick={() => editTask(todo)}
                  />
                )}
              </span>
            </Col>
          </Row>
        </ListGroupItem>

        // <ListGroupItem
        //   key={`${todo._id}${todo.id}`}
        //   style={{
        //     display: "flex",
        //     justifyContent: "space-between",
        //     flexFlow: "wrap",
        //   }}
        // >
        //   {todo.title}
        //   <span
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-evenly",
        //       marginRight: "5px",
        //     }}
        //   >
        //     {/* <FaCheckDouble
        //       className='float-right'
        //       onClick={() => markComplete(todo.id)}
        //     /> */}
        //     <AiTwotoneDelete onClick={() => deleteTask(todo.id)} />
        //     <AiTwotoneEdit onClick={() => editTask(todo)} />
        //   </span>
        // </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Todos;
