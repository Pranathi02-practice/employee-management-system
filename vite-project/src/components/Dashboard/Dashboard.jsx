import React, { useEffect, useState } from 'react'
import { Avatar, Box, Container, Grid, IconButton, Paper, Switch, Tooltip, Typography, } from '@mui/material'
import { DataGrid, GridDeleteIcon} from '@mui/x-data-grid';
import { employeeColumns } from './employeeColumn';
import AddIcon from '@mui/icons-material/Add';        // for Create
import PrintIcon from "@mui/icons-material/Print";

import axios from "axios"
import handlePrintEmployees from './Print_Functionality/Print_Button';
import EmployeeModal from '../EmployeeModal/EmployeeModal';
function Dashboard() {
// const axios = yesyeye
  const [employeeData,setEmployeeData] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
 
useEffect(()=>{
  const fetchedData = async ()=>{
    try{
const result = await axios.get(  "http://localhost:3001/employees")

 console.log("API data:", result.data); 
      setEmployeeData(result.data);    
  
    }
    
    catch(error){
    console.log(error);

    }
  }
  fetchedData();
    
},[])
console.log(employeeData);

const totalEmployees = employeeData.length;
const activeCount = employeeData.filter((emp) => emp.isActive === true).length;
const inactiveCount = employeeData.filter((emp) => emp.isActive === false).length;


console.log(totalEmployees);

//Grid data


 const handleEdit =  (row) => {
    console.log("edit");
   setSelectedEmployee(row);  // store clicked row
  setOpenModal(true);   
    
    
  };

  const handleCreate = () => {
  setSelectedEmployee(null); // empty form
  setOpenModal(true);
};

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
  if (!confirmDelete) return;

  await axios.delete(`http://localhost:3001/employees/${id}`);
  setEmployeeData((prev) => prev.filter((emp) => emp.id !== id));
};


  const handlePrint = (row) => {
    console.log("Print clicked:", row);
    handlePrintEmployees(employeeData)
    // window.print();
  };

const handleSubmit = async (formData) => {
  try {
    //Edit
    if (selectedEmployee) {
      const res = await axios.put(
        `http://localhost:3001/employees/${selectedEmployee.id}`,
        formData
      );

      setEmployeeData((prev) =>
        prev.map((emp) => (emp.id === selectedEmployee.id ? res.data : emp))
      );
    } 
    //Create
     else {
      const res = await axios.post("http://localhost:3001/employees", formData);

      // add in UI
      setEmployeeData((prev) => [...prev, res.data]);
    }

    setOpenModal(false);
    setSelectedEmployee(null);
  } catch (error) {
    console.log("Save error:", error);
  }
};


  
const rows = employeeData
const columns = employeeColumns({
  handleEdit,
  handleDelete,
  handlePrint,
});


const paginationModel = { page: 0, pageSize: 10 };


  return (
    
    <Container
  sx={{
    minHeight: "100vh",
    display: "flex",
    flexDirection:"column"
  }}
>
  <Box
    sx={{
      flex: 1,
      backgroundColor: "#d12020",
       borderRadius: "5px",
      p: 2,
      // gap:1
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 400, mb: 1, mt:1 }}>
    Employee Details
  </Typography>

  <Box sx={{display: "flex",  justifyContent:"left", gap:1}}>
    <div>
    <p >Total</p>
    <p style={{  fontWeight: "bold" }}>{totalEmployees}</p>
  </div>

  <div >
    <p >Active</p>
    <p style={{  fontWeight: "bold" }}>{activeCount}</p>
  </div>
  <div >
    <p >Inactive</p>
    <p style={{ fontWeight: "bold" }}>{inactiveCount}</p>
  </div>
  </Box>
  </Box>

  <Box
    sx={{
      flex: 6, // 
      backgroundColor: "#b420d1",
      p:2,
    }}
  >
    {/* <IconButton onClick={handleCreate}>
  <AddIcon />
</IconButton> */}

<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
  <Tooltip title="Print Employees" >
  <IconButton onClick={handlePrint}>
    <PrintIcon />
  </IconButton>
</Tooltip>

<Tooltip title="Add Employee">
  <IconButton onClick={handleCreate}>
    <AddIcon />
  </IconButton>
</Tooltip>
</Box>




     <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        // sx={{ border: 0 }}
      />
    </Paper>
    {openModal && <EmployeeModal open = {openModal}  onClose={() => setOpenModal(false)}
  selectedEmployee={selectedEmployee} onSave={handleSubmit}/>}
  </Box>
  
</Container>

  )
}

export default Dashboard