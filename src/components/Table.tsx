import type React from "react";
import { useState, type FC } from "react";
import { data } from "../utils/data";
import { BsThreeDots } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";

// type TableData = {
//   client: string;
//   country: string;
//   email: string;
//   project: string;
//   progress: string;
//   status: string;
//   date: string;
//   image: string;
// };

// interface TableDataProps {
//   data: TableData[];
// }

// const Table: React.FC<TableData> = ({ data }) => {
const Table = () => {
  const [projects, setProjects] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortProjects = (key: string) => {
    let sortedProjects = [...projects];
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }

    setProjects(sortedProjects);
  };

  function handleSortOption(key: string) {
    sortProjects(key);
    setDropdownVisible(false);
  }

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex items-center mb-5">
        <div className="relative">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="border border-gray-700 flex items-center justify-center text-white p-2 rounded"
          >
            <BiSort className="mr-[0.3rem]" />
            Sort
            <AiOutlineDown className="ml-2" />
          </button>

          {dropdownVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow lg">
              <button
                onClick={() => handleSortOption("client")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Name
              </button>
              <button
                onClick={() => handleSortOption("country")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Country
              </button>
              <button
                onClick={() => handleSortOption("date")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Date
              </button>
            </div>
          )}
        </div>
      </div>

      <>
        <table className="min-w-full table-auto border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-300 text-sm uppercase">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Projects</th>
              <th className="px-4 py-2 text-left">Progress</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.email}
                className="border-b border-gray-700 hover:bg-gray-800 text-sm text-gray-200"
              >
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={project.image}
                    alt={project.client}
                  />
                </td>
                <td className="py-2 px-4">{project.client}</td>
                <td className="py-2 px-4">{project.country}</td>
                <td className="py-2 px-4">{project.email}</td>
                <td className="py-2 px-4">{project.project}</td>
                <td className="py-2 px-4">
                  <span
                    className="inline-block bg-gray-600 rounded-full px-2 py-s
                    text-xs text-white"
                  >
                    {project.progress}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Completed"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-2 px-4">{project.date}</td>
                <td className="py-2 px-4">
                  <button className="relative">
                    <BsThreeDots className="cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end items-center mt-6 px-4 gap-3">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 "
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Previous
          </button>
          <span>Page 1 of 4</span>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 "
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </>
    </div>
  );
};
export default Table;
