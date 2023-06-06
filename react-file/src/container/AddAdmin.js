import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddAdmin = () => {

    let [hobbyRecord, sethobbyRecord] = useState([]);
        let [city, setCity] = useState(["Surat", "Rajkot", "vadodara", "Navasari"]); 
        let [state, setState] = useState({
            name: "", email : "", password: "", gender: "", hobby: "", city: ""
        })
        const getInputData = (e) => {
            let name = e.target.name;
            var value = e.target.value;


            if (name == 'hobby') {
                if (e.target.checked == true) {
                    hobbyRecord.push(value)
                }
                else {
                    let pos = hobbyRecord.findIndex(v => v == value)
                    if (pos != -1) {
                        hobbyRecord.splice(pos, 1);
                    }
                }
                value = hobbyRecord.toString();
            }
            if (name == 'image') {
                value = e.target.files[0].name;
            }
            setState({
                ...state, [name]: value
            })
        }
    const submitData = (e) => {
        e.preventDefault();
        // console.log(state);
        fetch("http://localhost:3001/admins", {
            method: "post",
            headers : { "Content-type": "application/json" }, 
            body: JSON.stringify(state)
        })
        .then(async (ress) => {
                let record = await ress.json();
                if (record) {
                    toast.success("Record inserted successfully")
                }
                else {
                    console.log("something wrong");
                }
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="content">

            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">Admin Form</h6>
                            <form method='post' onSubmit={(e)=>submitData(e)}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Enter Username</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" name="name"  onChange={(e) => getInputData(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Enter Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"  onChange={(e) => getInputData(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Enter Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" name="password"  onChange={(e) => getInputData(e)}/>
                                </div>

                                <div className="mb-3">
                                    <input type='radio' name="gender" value="male" onChange={(e) => getInputData(e)} />Male
                                    <input type='radio' name="gender" value="female" onChange={(e) => getInputData(e)} />Female
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Select Hobby</label>
                                    <input type="checkbox" name="hobby" value="reading"  onChange={(e) => getInputData(e)}/>Reading
                                    <input type="checkbox" name="hobby" value="music"  onChange={(e) => getInputData(e)}/>Music
                                    <input type="checkbox" name="hobby" value="cycling"  onChange={(e) => getInputData(e)}/>Cycling
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Select City</label>
                                    <select name="city" onChange={(e) => getInputData(e)}>
                                        <option value="">--Select City</option>
                                        {city.map((v, i) => {
                                            return (
                                                <option value={v}>{v}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Choose image</label>
                                    <input type='file' name='image' className="form-control" onChange={(e) => getInputData(e)}/>
                                </div>

                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                        <ToastContainer></ToastContainer>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default AddAdmin;