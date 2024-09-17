import React from "react";

const Modal = ({ children, title, show, onClose }) => {
  const onClick = () => {
    onClose(false);
  };

  return (
    <div
      className={`fixed modal ${
        show && "active"
      }  top-0 left-0 bg-slate-900/50 flex justify-center items-center w-full h-full`}
    >
      <div className="bg-white min-w-[500px] min-h-[200px] max-w-[600px] rounded-lg p-4">
        <div className="mb-4 flex ">
          <h1 className="text-lg font-semibold ">{title}</h1>
          <button className="ms-auto" onClick={onClick}>
            <i className="fa fa-close text-[#F65454] text-2xl"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
