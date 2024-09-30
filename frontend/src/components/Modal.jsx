import React, { useRef } from "react";

const Modal = ({ children, title, show, onClose }) => {
  const modalContentRef = useRef(null);
  React.useEffect(() => {
    const formElement = modalContentRef.current?.querySelector("form");
    if (formElement && !show) {
      formElement.reset();
    }
  }, [show]);

  const onClick = () => {
    // Look for a form element inside the modal and reset it

    onClose(false);
  };

  return (
    <div
      className={`fixed modal ${
        show && "active"
      } top-0 left-0 bg-slate-900/50 flex justify-center items-center w-full h-full`}
    >
      <div
        ref={modalContentRef}
        className="bg-white min-w-[500px] min-h-[200px] max-w-[600px] rounded-lg p-4"
      >
        <div className="mb-4 flex">
          <h1 className="text-lg font-semibold">{title}</h1>
          <button className="ms-auto" onClick={onClick}>
            <i className="fa fa-close text-[#F65454] text-2xl"></i>
          </button>
        </div>
        {/* Children can have nested form elements */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
