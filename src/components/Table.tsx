import type React from "react";
import { useState, type FC } from "react";
import { data } from "../utils/data";
import { BsThreeDots } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { MdSort } from "react-icons/md";

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
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    email: "",
    project: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const filteredProjects = projects.filter((project) => {
    return (
      (filters.name === "" || project.client.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.country === "" ||
        project.country.toLowerCase().includes(filters.country.toLowerCase())) &&
      (filters.email === "" || project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        project.project.toLowerCase().includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        project.status.toLowerCase().includes(filters.status.toLowerCase())) &&
      (searchQuery === "" ||
        Object.values(project).some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );
  });

  // Paginations
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="p-4 overflow-hidden">
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
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
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

        <div className="relative ml-4 w-full">
          <button
            onClick={() => setVisibleFilter(!visibleFilter)}
            className="border border-gray-700 flex items-center justify-center text-white p-2 rounded"
          >
            <MdSort className="mr-[.3rem]" /> Filters <AiOutlineDown className="ml-2" />
          </button>

          {visibleFilter && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-4 z-10">
              <div className="mb-2">
                <label className="block text-white mb-2">Filter by Name:</label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white mb-2">Filter by Country:</label>
                <input
                  type="text"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white mb-2">Filter by Email:</label>
                <input
                  type="text"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white mb-2">Filter by Project:</label>
                <input
                  type="text"
                  name="project"
                  value={filters.project}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-white mb-2">Filter by Status:</label>
                <input
                  type="text"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Table */}
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
            {currentProjects.map((project) => (
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
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-gray-700 disabled:opacity-50 cursor-pointer  disabled:cursor-not-allowed`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium bg-gray-700 text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </>
    </div>
  );
};
export default Table;
