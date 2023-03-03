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
                                            "data":{
                                                "name":""
                                            }
                                        });
  const [studentName,setStudentName] = useState('');                                      
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
      .then((data)=>{
        console.log(data.data);
        let newaoo = data.data.map((cv,idx,arr)=>{
            return {
                        id:cv.id,
                        name:cv.attributes.name,
                        createdAt:cv.attributes.createdAt
                    }
        });
        setStudents(newaoo);
      })
      .catch();
  }, [])
  // Every Hook is a function
  //2.2 Function Definition Area
  let sendData = ()=>{
    //alert('WelCome Student In Our Institute');
    fetch(`http://localhost:1337/api/students`,{
      method:"Post",
      headers:{
        //Properties:Value
        "Content-Type":"application/json"
      },
      "body" : JSON.stringify(payload)
    }).then((res)=>{
    // I want to Convert the responce into json Readable
    return res.json();
    }).then((data)=>{
      console.log(data);
      if(data){
        alert('Student Created Successfully');
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  let changeValue = (event)=>{
    console.log(event.target.value)
    setStudentName(event.target.value);
    console.log('HookstudentName',studentName);
    setPayload({
      ...payload,
      data:{
        name:document.querySelector('input#studentname').value
      }
    })
  }

  //2.3 Return Statement
  return (
    <>
      <div className="container">
        <h1> Create Student</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="studentname" className="form-label">Student Name</label>
            <input type="text" className="form-control" id="studentname" name="name" onKeyUp={(e)=>{changeValue(e)}}/>
          </div>
          <button type="button" className="btn btn-primary" onClick={()=>{sendData()}}>Submit</button>
        </form>
        <br />
        <hr />
        <br />
        <hr />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {
              Students.map((cv, idx, arr) => {
                return <tr>
                  <td>{cv.id}</td>
                  <td>{cv.name}</td>
                  <td>{cv.createdAt}</td>
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