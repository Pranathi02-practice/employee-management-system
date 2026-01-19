import { Dialog, DialogContent, DialogTitle, IconButton, DialogActions, Button, TextField, MenuItem, Autocomplete } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState,useRef } from 'react'
import { employeeFormFields } from './EmployeeFormFields';
function EmployeeModal({ open, onClose, selectedEmployee, onSave }) {

  const fileRef = useRef(null);


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

  const isFormValid =
    form.employeeId.trim() !== "" &&
    form.fullName.trim() !== "" &&
    form.gender.trim() !== "" &&
    form.dob.trim() !== "" &&
    form.state.trim() !== "" &&
    form.profileImage.trim() !== "";



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
      alert("Image size must be less than 20MB");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result; 

      setImagePreview(base64Image);
      setForm((prev) => ({ ...prev, profileImage: base64Image }));
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
  setImagePreview("");
  setForm((prev) => ({ ...prev, profileImage: "" }));
  if (fileRef.current) {
    fileRef.current.value = "";
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
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
      <form onSubmit={handleSubmit}>
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
                <p style={{ fontWeight: 500, marginBottom: "6px" }}>{field.label}</p>

                {field.name === "state" ? (
                  <Autocomplete
                    options={field.options}
                    value={form.state || ""}
                    onChange={(e, newValue) =>
                      setForm((prev) => ({ ...prev, state: newValue || "" }))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ mt: 1 }}
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                ) : (

                  <TextField sx={{ mt: 1, }}
                    name={field.name}
                    value={
                      field.name === 'isActive' ? String(form.isActive) : form[field.name] || ""}
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
                )}

              </div>
            ))}
          <div>
            <p style={{ fontWeight: 500, marginBottom: "6px" }}>Profile Image</p>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleImageUpload} />

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

                  sx={{ mt: 1, textTransform: "none" }}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </DialogContent>

        <DialogActions sx={{ p: 2 }} >
          <Button variant="outlined" color='#3c3b3b' sx={{ textTransform: "none" }}
            onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="outlined"
            sx={{ textTransform: "none" }}
            disabled={!isFormValid}
          >
            {selectedEmployee ? "Update" : "Create"}
          </Button>

        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EmployeeModal;