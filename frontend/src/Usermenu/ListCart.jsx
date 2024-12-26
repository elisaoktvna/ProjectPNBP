import React from "react";

const ListCart = ({
  orderList,
  backendURL,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex-grow overflow-auto">
      {orderList.length === 0 ? (
        <div className="text-center text-gray-500">
          Belum ada item yang dipesan.
        </div>
      ) : (
        orderList.map((item) => (
          <div key={item.id} className="flex  items-center mb-4">
            <div
              tabIndex="-1"
              className="flex-1 outline-none bg-white cart-item  shadow-md h-28 rounded-2xl pr-4 pl-4 flex justify-between items-center"
            >
              <div className="flex-1 rounded-2xl mr-8">
                <img
                  src={
                    item.image
                      ? `${backendURL}/images/${item.image}`
                      : `${backendURL}/images/default-image.jpg`
                  }
                  alt={item.name}
                  className="size-20 rounded-2xl ml-5 mr-2"
                />
              </div>

              <div className="flex-1 flex flex-col items-start mr-8">
                <span className="font-medium text-lg">{item.name}</span>
                <span className="font-bold text-2xl text-orange">
                  Rp {item.price * item.qty}
                </span>
              </div>

              <span className="font-bold text-lg">{item.qty}</span>
            </div>

            <div className="flex flex-col justify-between ml-4">
              <button
                className="bg-orange text-white increase rounded-full w-10 h-10 focus:bg-yellow-500 mb-2 font-bold text-lg"
                onClick={() => increaseQuantity(item)}
              >
                +
              </button>
              <button
                className="bg-orange text-white decrease rounded-full w-10 h-10 focus:bg-yellow-500 font-bold text-lg"
                onClick={() => decreaseQuantity(item)}
              >
                -
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListCart;
