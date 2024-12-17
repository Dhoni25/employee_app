const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dhoni@2522radhi', 
    database: 'employee_management',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/api/employees', (req, res) => {
    console.log(req.body);
    const { employee_id, name, email, phone_number, department, date_of_joining, role } = req.body;

    const query = `INSERT INTO employees (employee_id, name, email, phone_number, department, date_of_joining, role)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [employee_id, name, email, phone_number, department, date_of_joining, role], (err, result) => {
        console.log(err);
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Employee ID or Email already exists.');
            }
            return res.status(500).send('Server error');
        }
        res.status(200).send('Employee added successfully');
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
