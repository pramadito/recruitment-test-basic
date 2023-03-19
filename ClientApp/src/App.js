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


    const [nameCreate, setNameCreate] = useState('');
    const [valueCreate, setValueCreate] = useState('');

    //click submit
    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        await createEmployee(nameCreate, valueCreate);
        setNameCreate('');
        setValueCreate('');
    };

    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

   

    const [nameUpdate, setNameUpdate] = useState('');
    const [valueUpdate, setValueUpdate] = useState('');
   

    //click submit
    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        await updateEmployee(nameUpdate, valueUpdate);
        setNameUpdate('');
        setValueUpdate('');
    };

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


            Create employee, Need to hit refresh to see updated data
            <form onSubmit={handleSubmitCreate}>
                <label>
                    Name:
                    <input type="text" value={nameCreate} onChange={(e) => setNameCreate(e.target.value)} />

                    <label>
                        Value:
                        <input type="text" value={valueCreate} onChange={(e) => setValueCreate(e.target.value)} />
                    </label>
                    <button type="submit">Create Employee</button>
                </label>

            </form>

            Update Employee, Make sure you put correct name so it doesn't crash
            <form onSubmit={handleSubmitUpdate}>
                <label>
                    Name:
                    <input type="text" value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value)} />

                    <label>
                        Value:
                        <input type="text" value={valueUpdate} onChange={(e) => setValueUpdate(e.target.value)} />
                    </label>
                    <button type="submit">Update Employee</button>
                </label>

            </form>



        </div>
        

        

    );
}
