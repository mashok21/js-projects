import {useState} from "react"
import EmployeeList from "./EmployeeList"
import EmployeeTable from "./EmployeeTable"

export default function EmployeeContainer () {

    const [selectedStatus, setSelectedStatus] = useState("List");
    const statusTypes = ["List", "Tables"];
    
    return (<>
        <form>
        {statusTypes.map(status => {
        return (
          <>
            <input
              id={status}
              value={selectedStatus}
              type="radio"
              name="status"
              checked={selectedStatus === status}
              onChange={() => setSelectedStatus(status)}
            />
            <label htmlFor={status}>
              {status[0].toUpperCase() + status.slice(1).toLowerCase()}
            </label>
          </>
        );
        })}
        </form>
        <p>{selectedStatus === "List" ? (<EmployeeList />) : (<EmployeeTable />)}</p>
    </>)
}