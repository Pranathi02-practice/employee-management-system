import React, { useEffect, useState } from 'react'
import { Box, Container, IconButton, Paper, Switch, TextField, Tooltip, Typography, } from '@mui/material'
import { DataGrid, } from '@mui/x-data-grid';
import { employeeColumns } from './employeeColumn';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from "@mui/icons-material/Print";
import { Popover } from '@mui/material';
import ColumnFilterPopup from './ColumnFilterPopup';
import axios from "axios"
import handlePrintEmployees from './Print_Functionality/Print_Button';
import EmployeeModal from '../EmployeeModal/EmployeeModal';


function Dashboard() {
  const [employeeData, setEmployeeData] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterPopupTarget, setFilterPopupTarget] = useState(null);
  const [activeFilterField, setActiveFilterField] = useState("");
  const [columnFilters, setColumnFilters] = useState({ gender: [], status: [], });


  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:3001/employees")
        setEmployeeData(result.data);

      }

      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchedData();

  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const openFilterPopup = (e, field) => {
    e.stopPropagation();
    setFilterPopupTarget(e.currentTarget);
    setActiveFilterField(field);
  };

  const closeFilterPopup = () => {
    setFilterPopupTarget(null);
    setActiveFilterField("");
    setPopupSearch("");
  };

  const isFilterOpen = Boolean(filterPopupTarget);

  const totalEmployees = loading ? "" : employeeData.length;
  const activeCount = loading ? "" : employeeData.filter((emp) => emp.isActive).length;
  const inactiveCount = loading ? "" : employeeData.filter((emp) => !emp.isActive).length;

  const getUniqueValues = (field) => {
    return [...new Set(employeeData.map((emp) => emp[field]).filter(Boolean))];
  };


  //Grid data
  const handleEdit = (row) => {
    setSelectedEmployee(row);
    setOpenModal(true);

  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    await axios.delete(`http://localhost:3001/employees/${id}`);
    setEmployeeData((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleToggleStatus = async (id, currentValue) => {
    try {
      const res = await axios.patch(`http://localhost:3001/employees/${id}`, {
        isActive: !currentValue,
      });

      // update UI without refresh
      setEmployeeData((prev) =>
        prev.map((emp) => (emp.id === id ? res.data : emp))
      );
    } catch (error) {
      console.log("Toggle error:", error);
    }
  };



  const handlePrint = () => {
    handlePrintEmployees(rows)
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

  //Data for Filter,search and Print
  const search = debouncedSearch.trim().toLowerCase();

  const rows = employeeData.filter((emp) => {

    const matchesSearch =
      search === "" ||
      emp.fullName?.toLowerCase().includes(search) ||
      emp.employeeId?.toLowerCase().includes(search) ||
      emp.gender?.toLowerCase().includes(search) ||
      emp.state?.toLowerCase().includes(search);


    const selectedGenders = columnFilters.gender || [];
    const matchesGender =
      selectedGenders.length === 0 || selectedGenders.includes(emp.gender);

    const selectedStatus = columnFilters.status || [];
    const empStatusText = emp.isActive ? "Active" : "Inactive";

    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(empStatusText);

    return matchesSearch && matchesGender && matchesStatus;
  });

  const columns = employeeColumns({
    handleEdit,
    handleDelete,
    handlePrint,
    handleToggleStatus, openFilterPopup
  });


  const paginationModel = { page: 0, pageSize: 10 };
  const genderOptions = getUniqueValues("gender");
  const statusOptions = ["Active", "Inactive"];


  const toggleFilterValue = (field, value) => {
    setColumnFilters((prev) => {
      const current = prev[field] || [];

      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [field]: updated };
    });
  };

  const clearFilter = (field) => {
    setColumnFilters((prev) => ({ ...prev, [field]: [] }));
  };

  return (

    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 2,
        border: 2
      }}
    >
      <Box
        sx=
        {{
          mb: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, mt: 1 }}>
          Employee Details
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "left", gap: 5, fontSize: 24, border: 1 }}>
          <div>
            <p style={{ paddingBottom: 8, paddingLeft: 10 }}>Total</p>
            <p style={{ fontWeight: "bold" }}>{totalEmployees}</p>
          </div>

          <div >
            <p style={{ paddingBottom: 8 }}>Active</p>
            <p style={{ fontWeight: "bold" }}>{activeCount}</p>
          </div>
          <div >
            <p style={{ paddingBottom: 8 }}>Inactive</p>
            <p style={{ fontWeight: "bold" }}>{inactiveCount}</p>
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1, }}>

          <TextField
            size="small"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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


        <Popover
          open={isFilterOpen}
          anchorEl={filterPopupTarget}
          onClose={closeFilterPopup}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {activeFilterField === "gender" && (
            <ColumnFilterPopup
              options={genderOptions}
              selectedValues={columnFilters.gender}
              onToggleValue={(value) => toggleFilterValue("gender", value)}
              onClear={() => clearFilter("gender")}
            />
          )}

          {activeFilterField === "isActive" && (
            <ColumnFilterPopup
              options={statusOptions}
              selectedValues={columnFilters.status}
              onToggleValue={(value) => toggleFilterValue("status", value)}
              onClear={() => clearFilter("status")}
            />
          )}
        </Popover>

        <Paper sx={{ height: 400, flexGrow: 1, width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            disableDensitySelector
            sx={{ border: 1, height: "100%" }}
          />
        </Paper>

        {openModal && <EmployeeModal open={openModal} onClose={() => setOpenModal(false)}
          selectedEmployee={selectedEmployee} onSave={handleSubmit} />}
      </Box>
    </Container>

  )
}

export default Dashboard