//1. Import Area
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

//2. Definition Area
function EditStudent() {
    //2.1 Hooks Area
    const [payload,setPayload] = useState({
        "data": {
          "name": "Bhanu"
        }
      });
    const [studentName, setStudentName] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    //After Page Loder /Component Render 
    // I want to Receive the data After the Page/Component load  
    useEffect(()=>{
        //How to access the queryString params in ReactJs
        console.log(searchParams.get("id"))
        console.log(searchParams.get("name"))
        setPayload({
            ...payload,
            data:{
              name:searchParams.get("name")
            }
          });
        setSearchParams("")    
    },[])
    //2.2 Function Definition Area
    let updateData = () => {
        //alert('Update Student Data');
        fetch(`http://localhost:1337/api/students/${searchParams.get("id")}`, {
            "method": "PUT",
            "headers": {
                //P:V
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload)
        }).then((res) => {
            //I want to convert the responece into json readable
            return res.json();
        }).then((data) => {
            console.log(data);
            if (data) {
                alert("student Data Updated Successfully");
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    let changeValue = (event)=>{
        console.log(event.target.value);
        setStudentName(event.target.value);
        console.log('HOOK studentName',studentName);
        
        setPayload({
          ...payload,
          data:{
            name:event.target.value
          }
        });
      }

    //2.3 Return Statement
    return (
        <>
            <div className="container">
                <h1> Edit Student</h1>
                <form>
                    <input type="hidden" name="id" value={searchParams.get("id")}/>
                    <div className="mb-3">
                        <label htmlFor="studentname" className="form-label">Student Name</label>
                        <input type="text" className="form-control" id="studentname" name="name" value={payload.data.name}  onChange={(e) => { changeValue(e) }} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => { updateData() }}>Submit</button>
                </form>
                <br />
                <hr />
                <br />
                <Link to="/" className="btn  btn-primary">Home</Link>
            </div>
        </>

    )
}

//3. Export Area
export default EditStudent;