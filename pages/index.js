import Head from "next/head";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(true);
  const [totalIncoming, setTotalIncoming] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }

    const storedIncoming = localStorage.getItem("incoming");
    const storedExpenses = localStorage.getItem("expenses");

    if (storedIncoming) {
      const incoming = JSON.parse(storedIncoming);
      const total = incoming.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
      setTotalIncoming(total);
    }

    if (storedExpenses) {
      const expenses = JSON.parse(storedExpenses);
      const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );
      setTotalExpenses(total);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSaveName = () => {
    localStorage.setItem("name", name);
    setEditingName(false);
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const comparisonMessage = () => {
    const difference = totalIncoming - totalExpenses;
    if (difference < 0) {
      const overspentAmount = Math.abs(difference);
      return `You Overspent by ₹${overspentAmount} 🥲`;
    } else if (difference > 0) {
      return `Yay! You Saved ₹${difference} 🎉`;
    } else {
      return "Your Expenses and Income are Balanced";
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full sm:w-1/2 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {!editingName ? (
          <div className=" flex flex-row align-items-center mb-4">
            <p className="text-lg font-bold mb-1 mx-3">Name:</p>
            <p className="text-xl">{name}</p>
            <FaEdit onClick={handleEditName} className=" mx-3 my-auto" />
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-bold mb-1">
              Name
            </label>
            <div className="flex">
              <input
                type="text"
                id="name"
                className="border rounded-l-lg px-4 py-2 w-full"
                value={name}
                onChange={handleNameChange}
              />
              <button
                className="bg-blue-500 text-white rounded-r-lg px-4 py-2"
                onClick={handleSaveName}
              >
                Save
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xl font-bold">Total Incoming</p>
              <p className="text-3xl mt-2">₹ {totalIncoming}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xl font-bold">Total Expenses</p>
              <p className="text-3xl mt-2">₹ {totalExpenses}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-xl font-bold">Comparison</p>
            <p className="text-lg mt-2">{comparisonMessage()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
