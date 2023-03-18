import React, { useState, useEffect } from 'react';

export default function () {

    //for the data set

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchEmployees() {
            const data = await getEmployees();
            setEmployees(data);
        }
        fetchEmployees();
    }, []);

    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }


    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }
   

    return (
    
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            
                            <td>{employee.name}</td>
                            <td>{employee.value}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {JSON.stringify(employees, null, 2)}
        </div>
        

    );
}
