import Sidebar from "./Sidebar";
import Table from "./Table";

function Dashboard() {
  return (
    <div className="flex  bg-gray-900">
      <Sidebar />
      <div className="flex-1 ">
        {/* Project table  */}
        <Table />
      </div>
    </div>
  );
}
export default Dashboard;
