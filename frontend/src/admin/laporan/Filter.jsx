import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Filter = ({ currDate }) => {
  const { reload, setReload } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const dueDate = searchParams.get("endDate") || currDate;
  const startDate = searchParams.get("startDate");

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (name === "startDate") {
      if (value > dueDate) {
        alert("Start date cannot be later than due date.");
        return;
      }
      newParams.set("startDate", value);
    } else if (name === "endDate") {
      if (value < startDate) {
        alert("Due date cannot be earlier than start date.");
        return;
      }
      newParams.set("endDate", value);
    }

    setSearchParams(newParams);
    setReload(!reload);
  };

  return (
    <div data-html2canvas-ignore>
      <form>
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="startDate" className="text-nowrap">
            Invoice Date:
          </label>
          <input
            value={startDate || ""}
            type="date"
            name="startDate"
            id="startDate"
            className="block bg-[#F5F5F5] w-[200px] rounded-lg px-4 py-2 text-sm"
            onChange={handleDateChange}
            max={dueDate}
          />
        </div>
        <div className="flex items-center gap-4 justify-end">
          <label htmlFor="endDate" className="text-nowrap">
            Due Date:
          </label>
          <input
            value={dueDate || ""}
            type="date"
            name="endDate"
            id="endDate"
            className="block bg-[#F5F5F5] w-[200px] rounded-lg px-4 py-2 text-sm"
            onChange={handleDateChange}
            min={startDate}
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
