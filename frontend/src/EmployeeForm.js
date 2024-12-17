import React, { useState } from 'react';
import axios from 'axios';
import"./App.css";

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        employee_id: '',
        name: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData);
            setSuccess(response.data);
        } catch (err) {
            console.log(err )
            setError(err.response ? err.response.data : 'Error submitting the form');
        }
    };

    return (
        <div>
            <h2>Employee SignIn</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="employee_id"
                    placeholder="Employee ID"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <input
                    type="date"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setFormData({
                    employee_id: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    department: '',
                    date_of_joining: '',
                    role: '',
                })}>Reset</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
