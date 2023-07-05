import React, { useState, useEffect } from "react";
import { FaArrowCircleUp, FaTrash } from "react-icons/fa";
import { parseISO, format } from "date-fns";

const ExpensesTab = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [expenses, selectedMonth, selectedCategory]);

  const filterExpenses = () => {
    let filtered = expenses;
    if (selectedMonth !== "All") {
      filtered = filtered.filter((expense) => expense.month === selectedMonth);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (expense) => expense.category === selectedCategory
      );
    }
    setFilteredExpenses(filtered);
  };

  const handleDelete = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const getTotalAmount = () => {
    return filteredExpenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
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

            {/* Add more options for each month */}
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="medical">Medical</option>
            <option value="random">Random</option>
            {/* Add more options for each category */}
          </select>
        </div>
      </div>

      <div className=" flex flex-row bg-white justify-between rounded-lg shadow-md p-4">
        <p className="font-bold">Total Amount Spent:</p>
        <p className="text-md font-bold">
          <span className="text-md font-bold">₹</span>
          {getTotalAmount()}
        </p>
      </div>

      {filteredExpenses.length === 0 ? (
        <p>No expenses to display</p>
      ) : (
        filteredExpenses.map((expense, index) => {
          const dateString = expense.date;
          const formattedDate = format(parseISO(dateString), "d MMMM yyyy");
          return (
            <div
              key={index}
              className="flex flex-row justify-between bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex flex-row align-center">
                <FaArrowCircleUp className="text-xl my-auto mr-2" />
                <div>
                  <p className="font-bold">{expense.description}</p>
                  <p className="text-xs text-gray-500 italic">{expense.category}</p>
                  <p className="text-xs text-gray-500 ">{formattedDate}</p>
                </div>
              </div>
              <div className="flex flex-row text-center">
                <div>
                  <p className="font-bold">
                    <span className="text-xs">₹</span>
                    {expense.amount}
                  </p>
                  <p className="text-xs text-gray-500">{expense.paymentMode}</p>
                </div>
                <FaTrash
                  className="text-red-500 ml-3 my-auto cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExpensesTab;
