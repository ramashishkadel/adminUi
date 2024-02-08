import "./Modal.css";

const Modal = ({ msg, ok, cancel }) => {
  const okHandler = () => {
    ok();
  };

  const cancelHandler = () => {
    cancel();
  };
  return (
    <div className="modal_main">
      <div className="modal_cont">
        <p>{msg}</p>
        <div className="modal_button_cont">
          <button onClick={okHandler}>ok</button>
          <button onClick={cancelHandler}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
