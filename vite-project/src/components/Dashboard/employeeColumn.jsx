import { Avatar, IconButton, Switch, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const employeeColumns=({ handleEdit, handleDelete }) => [
  {
    field: "id",
    headerName: "Employee ID",
    width: 130,
  },
  {
    field: "profileImage",
    headerName: "Profile",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Avatar src={params.value} alt="Profile" sx={{ width: 40, height: 40 }} />
    ),
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 200,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "dob",
    headerName: "DOB",
    width: 130,
  },
  {
    field: "state",
    headerName: "State",
    width: 160,
  },
  {
    field: "active",
    headerName: "Status",
    width: 160,
    sortable: false,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch
          checked={params.value}
          onChange={() => params.row.onToggle(params.row.id)}
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
    filterable: false,
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