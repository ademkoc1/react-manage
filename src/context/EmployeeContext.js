import { createContext,useEffect,useReducer,useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext=createContext();

const EmployeeContextProvider=(props)=>{ 
    
    const reducer = (employees, action) => {
        switch(action.type) {
            case 'add_employee':
                return [...employees, {
                    id: uuidv4(),
                    name: action.employee.name, 
                    email: action.employee.email,
                    address: action.employee.address,
                    phone: action.employee.phone,
                }]

            case 'remove_employee':
                return employees.filter(employee => employee.id !== action.id)

            case 'update_employee':
                return employees.map((employee) => (employee.id === action.id ? action.updatedEmployee : employee))

            default:
                return employees;
        }
    }

    const[employees, dispatch] = useReducer(reducer, [],

        () => {
            const employees = localStorage.getItem('employees')
            return employees ? JSON.parse(employees) : [];
        }
    )
    
        useEffect(() => {
            localStorage.setItem('employees', JSON.stringify(employees))
        })

    // useEffect(()=>{
    //     const employees = localStorage.getItem('employees')

    //     setEmployees(JSON.parse(employees))
    // },[])

    // useEffect(()=>{
    //     localStorage.setItem('employees',JSON.stringify(employees))
    // })

    // const addEmployee=(name,email,address,phone)=>{
    //     setEmployees([...employees,{id:uuidv4(),name,email,address,phone}])
    // }

    // const deleteEmployee = (id) => {
    //     setEmployees(employees.filter(employee => employee.id !==id))
    // }

    // const updateEmployee = (id, updatedEmployee) => {
    //     setEmployees(employees.map((employee) => (employee.id === id ? updatedEmployee : employee)))
    // }

    

    return(
        <EmployeeContext.Provider value={{employees,dispatch}}>
            {props.children}
        </EmployeeContext.Provider>

    )
}

export default EmployeeContextProvider

