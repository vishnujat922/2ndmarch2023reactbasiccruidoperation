//1. Import Area
import { useEffect } from 'react';
import { useState } from 'react';

//2. Definition Area
function Student() {
  //2.1 Hooks Area

  // const[] = useState(initialValue,setVariable);
  const [Students, setStudents] = useState([
    {
      id: 1, Name: 'Vishnu', CreatedAt: '223311'
    },
    {
      id: 2, Name: 'Pushpendra', CreatedAt: '123123'
    }
  ])
  const [payload, setPayload] = useState({
    "data": {
      "name": ""
    }
  });
  const [studentName, setStudentName] = useState('');
  // useEffect is use For page load
  // I want to call the api after the page load 
  // useEffect(cbfn,arr);
  //cbfn = callback Function ()=>{}
  //arr = Array[] 
  useEffect(() => {
    //what you write here will be Executed after the page load/Component Rendered 
    fetch(`http://localhost:1337/api/students`)
      .then((res) => {
        // this make Resposibility JSON Readable
        return res.json()
      })
      .then((data) => {
        console.log(data.data);
        let newaoo = data.data.map((cv, idx, arr) => {
          return {
            id: cv.id,
            name: cv.attributes.name,
            createdAt: cv.attributes.createdAt
          }
        });
        setStudents(newaoo);
      })
      .catch();
  }, [])
  // Every Hook is a function
  //2.2 Function Definition Area
  let sendData = () => {
    //alert('WelCome Student In Our Institute');
    fetch(`http://localhost:1337/api/students`, {
      method: "Post",
      headers: {
        //Properties:Value
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(payload)
    }).then((res) => {
      // I want to Convert the responce into json Readable
      return res.json();
    }).then((data) => {
      console.log(data);
      if (data) {
        alert('Student Created Successfully');
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  let changeValue = (event) => {
    console.log(event.target.value)
    setStudentName(event.target.value);
    console.log('HookstudentName', studentName);
    setPayload({
      ...payload,
      data: {
        name: document.querySelector('input#studentname').value
      }
    })
  }
  let deleteStudent = (e) => {
    let trow = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    let delid = e.target.closest('tr').querySelector('td:first-child').innerHTML;
       let ans = window.confirm('Are You Sure do you want to Delete Student Data')
      console.log(typeof ans);
      if(ans===true){
        console.log('Okay');
        // Call the DELETE REST API
        fetch(`http://localhost:1337/api/students/${delid}`,{
          method:'DELETE',
        })
        .then((res)=>{
          // this json() function make the incomming data json readable
          return res.json();
        })
        .then((data)=>{
          console.log(data)
        })
        .catch((err)=>{

        });
      }else{
        console.log('Something is Wrong')
      }
  }
  //2.3 Return Statement
  return (
    <>
      <div className="container">
        <h1> Create Student</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="studentname" className="form-label">Student Name</label>
            <input type="text" className="form-control" id="studentname" name="name" onKeyUp={(e) => { changeValue(e) }} />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => { sendData() }}>Submit</button>
        </form>
        <br />
        <hr />
        <br />
        <hr />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Students.map((cv, idx, arr) => {
                return <tr>
                  <td>{cv.id}</td>
                  <td>{cv.name}</td>
                  <td>{cv.createdAt}</td>
                  <td>
                    <button className='btn btn-success btn-sm'>View</button>
                    <button className='btn btn-primary btn-sm'>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={(e) => {deleteStudent(e) }}>Delete</button>
                  </td>
                </tr>
              })
            }

          </tbody>
        </table>
      </div>
    </>
  );
}
//3. Export Area
export default Student;