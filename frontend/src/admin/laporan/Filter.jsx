import React from "react";

const Filter = () => {
  return (
    <div>
      <form>
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="startDate" className="text-nowrap">
            Invoice Date:
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="block bg-[#F5F5F5] w-[200px] rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-4 justify-end">
          <label htmlFor="endDate" className="text-nowrap">
            Due Date:
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="block bg-[#F5F5F5] w-[200px] rounded-lg px-4 py-2 text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
