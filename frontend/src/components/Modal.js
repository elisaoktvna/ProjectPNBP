import React from 'react'

const Modal = ({ children, title, show ,onClose}) => {
    const onClick = () => {
        onClose(false)
    }
   
  return (
      <div className={`fixed modal ${show && "active"}  top-0 left-0 bg-slate-900/50 flex justify-center items-center w-full h-full`}>
          <div className="bg-white min-w-[500px] min-h-[200px] rounded-lg p-4">
              <div className="mb-2 flex ">
                   <h1>{title}</h1>
              <button className='ms-auto' onClick={onClick}>X</button>
             </div>
              {children}
          </div>
      </div>
  )
}

export default Modal