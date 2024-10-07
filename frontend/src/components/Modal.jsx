import React, { useRef } from "react";

const Modal = ({ children, title, show, onClose }) => {
  const modalContentRef = useRef(null);

  // Reset form when modal closes
  React.useEffect(() => {
    const formElement = modalContentRef.current?.querySelector("form");
    if (formElement && !show) {
      formElement.reset();
    }
  }, [show]);

  const onClick = () => {
    onClose(false);
  };

  return (
    <div
      className={`fixed ${
        show ? "flex" : "hidden"
      } top-0 left-0 w-full h-full bg-slate-900/50 justify-center items-start overflow-auto`}
    >
      <div
        ref={modalContentRef}
        className="bg-white w-full max-w-[600px] my-8 rounded-lg p-4"
      >
        {/* Modal Header */}
        <div className="mb-4 flex">
          <h1 className="text-lg font-semibold">{title}</h1>
          <button className="ms-auto" onClick={onClick}>
            <i className="fa fa-close text-[#F65454] text-2xl"></i>
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
