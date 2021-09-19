import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const EditModal = (props) => {
  const {
    className,
    modal,
    closeModal,
    taskContent,
    setTaskContent,
    editTask,
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={closeModal} className={className}>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalBody>
          Title :{" "}
          <Input
            type='text'
            name='todo'
            id='todo'
            placeholder=''
            defaultValue={taskContent}
            // value={todoString}
            onChange={(e) => {
              setTaskContent(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={editTask}>
            Edit Task
          </Button>{" "}
          <Button color='secondary' onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditModal;
