import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

import Calculadora from "./components/Calculadora";

const Dashboard = () => {
  return (

    <div>
      {/* Card widget */}
      <div className="grid  grid-cols-1 gap-4 mt-5 h-full w-4/6 mx-auto mb-10 md:grid-cols-1">
        <Calculadora
        />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="w-7 h-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="w-6 h-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="w-7 h-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="w-6 h-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="w-7 h-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="w-6 h-6" />}
          title={"Total Projects"}
          subtitle={"$2933"}
        />
      </div>
      
      {/* Charts */}
    {/*
      <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5 xl:grid-cols-2">
  
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>


        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 rounded-[20px]">
          <DailyTraffic />
          <PieChartCard />
        </div>

      

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 rounded-[20px]">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default Dashboard;
