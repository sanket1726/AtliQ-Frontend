import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  Container,
} from "reactstrap";
import { v4 } from "uuid";

const TodoForm = (props) => {
  const { addTodos } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle === "" || taskDescription === "") {
      return alert("Please check inputs");
    }
    const todo = {
      title: taskTitle,
      id: v4(),
      description: taskDescription,
      creationdate: Date().toLocaleString(),
      duedate: dueDate,
    };

    addTodos(todo);
    setTaskTitle("");
    setTaskDescription("");
    setDueDate("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <InputGroup>
          <Input
            type='text'
            name='title'
            id='title'
            placeholder='Enter a Title'
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          <Input
            type='text'
            name='description'
            id='description'
            placeholder='Enter description'
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
          <Input
            type='date'
            name='date'
            id='exampleDate'
            placeholder='date placeholder'
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
          <InputGroupAddon addonType='prepend'>
            <Button color='success'>Add Task</Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default TodoForm;
