import { Avatar, Box, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridFilterAltIcon, } from "@mui/x-data-grid";

export const employeeColumns = ({ handleEdit, handleDelete, handleToggleStatus, openFilterPopup }) => [
  {
    field: "employeeId",
    headerName: "Employee ID",
    width: 130,

  },
  {
    field: "profileImage",
    headerName: "Profile",
    width: 100,
    filterable: false,
    sortable: false,
    renderCell: (params) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={params.value}
          alt="Profile"
          sx={{ width: 40, height: 40 }}
        />
      </div>
    ),
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 140,
    renderHeader: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span>{params.colDef.headerName}</span>

        <IconButton
          size="small" sx={{
            ml: "auto",
            p: 0.5,
            borderRadius: 1,
          }}
          onClick={(e) => openFilterPopup(e, "gender")}
        >
          <GridFilterAltIcon fontSize="small" />
        </IconButton>
      </div>
    ),
  },

  {
    field: "dob",
    headerName: "DOB",
    width: 130,
    renderCell: (params) => {
      const dob = params.row.dob;
      if (!dob) return "";
      const [yyyy, mm, dd] = dob.split("-");
      return `${dd}-${mm}-${yyyy}`;
    },
  },
  {
    field: "state",
    headerName: "State",
    filterable: true,
    width: 160,
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 160,
    renderHeader: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>

        {params.colDef.headerName}
        <IconButton
          size="small"
          sx={{ ml: "auto", p: 0.5 }}
          onClick={(e) => openFilterPopup(e, "status")}
        >
          <GridFilterAltIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch
          checked={params.value === true}
          onChange={() => handleToggleStatus(params.row.id, params.value)}
        />
        {params.value ? "Active" : "Inactive"}
      </div>
    ),
  },


  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    filterable: true,
    renderCell: (params) => {
      const row = params.row;

      return (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(row)} color="black">
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(row.id)} color="black">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      );
    },
  },
];