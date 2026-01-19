import { indianStates } from "./IndianStates";

export const employeeFormFields = [
  {
    name: "employeeId",
    label: "Employee ID",
    type: "text",
    required: true,
  },
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: ["Male", "Female", "Other"],
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "state",
    label: "State",
    type: "select",
    required: true,
    options: indianStates,
  },
  {
    name: "isActive",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    defaultValue: true,
  },
  {
    name: "profileImage",
    label: "Profile Image",
    type: "image",
    required: false,
  },
];
