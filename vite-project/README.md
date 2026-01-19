Employee Management Dashboard


Project Overview

This is a React-based Employee Management Dashboard application where users can log in and manage employee details in a table format. It gives functionalities of Add, Create, Delete and Print the Employees. Includes additional featired like search, Sort, updating satus  and Filter 

Tech Stack:

React JS

Material UI (MUI)

React Router DOM

Axios

json-server

LocalStorage (for basic login validation)

Steps to Run the Project Locally:

1. Install dependencies
npm install

2. Add json-server script in package.json

Open package.json and add this inside "scripts":

"server": "json-server --watch db.json --port 3001"


3. Start json-server
npm run server

Backend:

http://localhost:3001/employees

4. Start the React app
npm run dev


Frontend:

http://localhost:5173

Assumptions / Design Decisions:

Login is handled using LocalStorage for simple route protection.

json-server is used as a mock backend and to perform CRUD operations.

Employee data is displayed using MUI DataGrid with pagination and sorting.

Profile images are stored as Base64 in JSON.

Search is optimized using Debouncing.