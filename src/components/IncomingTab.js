import React, { useState, useEffect } from "react";
import { FaArrowCircleDown, FaTrash } from "react-icons/fa";

const IncomingTab = () => {
  const [incoming, setIncoming] = useState([]);

  useEffect(() => {
    const storedIncoming = localStorage.getItem("incoming");
    if (storedIncoming) {
      setIncoming(JSON.parse(storedIncoming));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedIncoming = [...incoming];
    updatedIncoming.splice(index, 1);
    setIncoming(updatedIncoming);
    localStorage.setItem("incoming", JSON.stringify(updatedIncoming));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {incoming.length === 0 ? (
        <p>No incoming items to display</p>
      ) : (
        incoming.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-row justify-between h-full">
              <div className="flex flex-row align-center">
                <FaArrowCircleDown className="text-xl my-auto mr-2" />
                <div>
                  <p className="text-xl font-bold">{item.source}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-xl font-bold">
                  <span className="text-xs">₹</span>
                  {item.amount}
                </p>
                <FaTrash
                  className="text-red-500 ml-2 cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default IncomingTab;
