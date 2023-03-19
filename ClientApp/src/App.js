import React, { useState, useEffect } from 'react';

export default function () {

    //for the data set
    const [employees, setEmployees] = useState([]);


    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    useEffect(() => {
        async function fetchEmployees() {
            const data = await getEmployees(); // using that function
            setEmployees(data);
        }
        fetchEmployees();
    }, []);


    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    //click submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createEmployee(name, value);
        setName('');
        setValue('');
    };

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
                            <td><button>Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>


            Update employee, Need to hit refresh to see updated data
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>
                        Value:
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    </label>
                    <button type="submit">Create Employee</button>
                </label>

            </form>
            
        </div>
        

        

    );
}
