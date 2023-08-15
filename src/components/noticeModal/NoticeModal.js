import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setNoticeModal } from '../../pages/system-state/systemSlice';

export const NoticeModal = () => {
    const dispatch = useDispatch();
      const { noticeModal } = useSelector((state) => state.system);
  return (
    <Modal
      show={noticeModal}
      onHide={() => dispatch(setNoticeModal())}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Notice!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Due to the unfortunate circumstance of deliberate and consistent data
        interference, I have taken the precaution of unauthorising all private
        routes! Your understanding and support are greatly appreciated.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(setNoticeModal())}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
