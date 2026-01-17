const handlePrintEmployees = (employeeData) => {
  const printWindow = window.open("", "_blank");

  const rows = employeeData
    .map(
      (emp) => `
        <tr>
          <td>${emp.employeeId}</td>
          <td>${emp.fullName}</td>
          <td>${emp.gender}</td>
          <td>${emp.dob}</td>
          <td>${emp.state}</td>
          <td>${emp.isActive ? "Active" : "Inactive"}</td>
        </tr>
      `
    )
    .join("");

  printWindow.document.write(`
    <h2>Employees List</h2>
    <table border="1" cellspacing="0" cellpadding="8">
      <tr>
        <th>Employee ID</th>
        <th>Full Name</th>
        <th>Gender</th>
        <th>DOB</th>
        <th>State</th>
        <th>Status</th>
      </tr>
      ${rows}
    </table>
  `);

  printWindow.document.close();
  printWindow.print();
};

export default handlePrintEmployees;
