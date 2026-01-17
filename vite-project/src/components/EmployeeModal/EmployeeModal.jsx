import { Dialog, DialogContent, DialogTitle, IconButton, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { employeeFormFields } from './EmployeeFormFields';

function EmployeeModal({ open, onClose, selectedEmployee }) {
  console.log("modal");

  const initialForm = {
    employeeId: "",
    fullName: "",
    gender: "",
    dob: "",
    profileImage: "",
    state: "",
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };


  // image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //20MB
    const maxSize = 20 * 1024 * 1024; 
    if (file.size > maxSize) {
      alert("Image size must be less than 1MB");
      return;
    }
  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);

  setForm((prev) => ({ ...prev, profileImage: previewUrl }));
};

  const handleRemoveImage = () => {
    setImagePreview("");
    setForm((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleSubmit = () => {
    console.log("FORM DATA:", formData);
    // Later -> axios POST/PUT here
    onClose();
  };


  useEffect(() => {
  if (selectedEmployee) {
    setForm(selectedEmployee);
    setImagePreview(selectedEmployee.profileImage || "");
  } else {
    setForm(initialForm);
    setImagePreview("");
  }
}, [selectedEmployee, open]);




  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
      <DialogTitle>
        {selectedEmployee ? "Edit Employee" : "Add Employee"}

        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }} >
        {employeeFormFields
         .filter((field) => field.type !== "image")
         .map((field) => (
          <div key={field.name} >
            <p style={{ fontWeight: 500, marginBottom: "6px"  }}>{field.label}</p>

            <TextField sx={{ mt: 1, }}
              name={field.name}
              value={
                field.name === 'isActive'?String(form.isActive):form[field.name] || ""}
              onChange={handleChange}
              fullWidth
              size="small"
              type={field.type === "date" ? "date" : "text"}
              select={field.type === "select"}
            >
             {field.type === "select" &&
            field.options.map((opt) => (
              <MenuItem sx={{ color: "#3c3b3b" }}
                key={typeof opt === "object" ? opt.label : opt}
                value={typeof opt === "object" ? String(opt.value) : opt}
              >
                {typeof opt === "object" ? opt.label : opt}
              </MenuItem>
                ))}
        
            </TextField>

          </div>
        ))}
                      <div>
                  <p style={{ fontWeight: 500, marginBottom: "6px" }}>Profile Image</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />

        {imagePreview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={imagePreview}
              alt="preview"
              width="80"
              height="80"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />

            <Button
              onClick={handleRemoveImage}
              color="error"
              size="small"
              te
              sx={{ mt: 1, textTransform: "none"}}
            >
              Remove
            </Button>
            </div>
            )}
          </div>
      </DialogContent>

      <DialogActions sx={{ p: 2  }} >
        <Button variant="outlined" color='#3c3b3b' sx={{textTransform: "none"}}
         onClick={onClose}>
          Cancel
        </Button>

        <Button variant="outlined" color='#3c3b3b'sx={{textTransform: "none"}}   >
          {selectedEmployee ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeModal;