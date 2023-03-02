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

  //2.3 Return Statement
  return (
    <>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
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