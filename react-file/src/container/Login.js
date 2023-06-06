import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



const Login  = () =>{

    let navigate = useNavigate();

    let [adminData, setAdminData] = useState({
        email : "",password : ""
    })

    const submitData = (e) =>{
        e.preventDefault();
        console.log(adminData.email)
        fetch("http://localhost:3001/admins?email="+adminData.email)
        .then(async (ress)=>{
            let record = await ress.json();
        
            if(record.length != 0){
                if(record[0].password == adminData.password){
                    sessionStorage.setItem('username',record[0].name);
                    navigate('/dashboard');
                }
                else{
                    toast.error("Invalid password");
                }
            }
            else{
                toast.error("Invalid email");

            }
        })
        .catch(err=>{
            toast.error('Invalid email');
        })
    }


    const getInputData = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setAdminData({
            ...adminData, [name]:value
        })
    }   


    return(
        <div className="main-wrapper">


            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="text-center mb-3">
                                
                                <h3>Log In</h3>
                            </div>
                            <form method="post" onSubmit={(e) => submitData(e)}>

                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com" onChange={(e) => getInputData(e)}/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-4">
                                    <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" onChange={(e) => getInputData(e)}/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    </div>
                                    <a href>Forgot Password</a>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Log In</button>
                                </div>
                            </form>
                            {/* <p className="text-center mb-0">Don't have an Account? <a href>Sign Up</a></p> */}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer></ToastContainer>
        </div>

    )
}

export default Login;