import React, { useState, useEffect } from "react";
import { FaArrowCircleUp, FaTrash } from "react-icons/fa";

const ExpensesTab = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full sm:w-1/2 mx-auto px-2">
      {expenses.length === 0 ? (
        <p>No expenses to display</p>
      ) : (
        expenses.map((expense, index) => (
          <div
            key={index}
            className="flex flex-row justify-between bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex flex-row align-center">
              <FaArrowCircleUp className="text-xl my-auto mr-2" />
              <div>
                <p className="text-xl font-bold">{expense.description}</p>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
            <div>
              <p className="text-xl font-bold">
                <span className="text-xs">₹</span>
                {expense.amount}
              </p>
              <p className="text-xs text-gray-500">{expense.paymentMode}</p>
            </div>
            <FaTrash
              className="text-red-500 ml-2 cursor-pointer"
              onClick={() => handleDelete(index)}
            />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpensesTab;
