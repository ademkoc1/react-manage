import {useContext,useEffect,useState} from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import { Button, Modal } from 'react-bootstrap';
import EditForm from './EditForm';
import { type } from '@testing-library/user-event/dist/type';

const Employee =({employee})=>{
    const {dispatch} = useContext(EmployeeContext);

    const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  useEffect(() => {
    handleClose();
   
  }, [employee])

    return(
      <>
        
           <td>{employee.name}</td>
           <td>{employee.email}</td>
           <td>{employee.address}</td>
           <td>{employee.phone}</td>
           <td>
              <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
               <button onClick={() => dispatch({type:'remove_employee',id:employee.id})} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
               
           </td>

           <Modal show={show} onHide={handleClose} >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>
            Update Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theEmployee={employee} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
        
         </>
      
    )
}

export default Employee