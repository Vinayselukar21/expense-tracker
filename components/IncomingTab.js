import React, { useState, useEffect } from "react";
import { FaArrowCircleDown, FaTrash } from "react-icons/fa";
import { parseISO, format } from "date-fns";

const IncomingTab = () => {
  const [incoming, setIncoming] = useState([]);
  const [filteredIncoming, setFilteredIncoming] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");

  useEffect(() => {
    const storedIncoming = localStorage.getItem("incoming");
    if (storedIncoming) {
      setIncoming(JSON.parse(storedIncoming));
    }
  }, []);

  useEffect(() => {
    filterIncoming();
  }, [incoming, selectedMonth]);

  const filterIncoming = () => {
    let filtered = incoming;
    if (selectedMonth !== "All") {
      filtered = filtered.filter((item) => item.month === selectedMonth);
    }
    setFilteredIncoming(filtered);
  };

  const handleDelete = (index) => {
    const updatedIncoming = [...incoming];
    updatedIncoming.splice(index, 1);
    setIncoming(updatedIncoming);
    localStorage.setItem("incoming", JSON.stringify(updatedIncoming));
  };

  const getTotalAmount = () => {
    return filteredIncoming.reduce(
      (total, item) => total + parseFloat(item.amount),
      0
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full sm:w-1/2 mx-auto px-2">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label className="mr-2">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
             <option value="All">All</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>

      <div className=" flex flex-row bg-white justify-between rounded-lg shadow-md p-4">
        <p className="font-bold">Total Amount Received:</p>
        <p className="text-md font-bold">
          <span className="text-md font-bold">₹</span>
          {getTotalAmount()}
        </p>
      </div>

      {filteredIncoming.length === 0 ? (
        <p>No incoming items to display</p>
      ) : (
        filteredIncoming.map((item, index) => {
          const dateString = item.date;
          const formattedDate = format(parseISO(dateString), "d MMMM yyyy");
          return (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-row justify-between h-full">
              <div className="flex flex-row align-center">
                <FaArrowCircleDown className="text-xl my-auto mr-2" />
                <div>
                  <p className="text-xl font-bold">{item.source}</p>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
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
        )})
      )}

    </div>
  );
};

export default IncomingTab;
