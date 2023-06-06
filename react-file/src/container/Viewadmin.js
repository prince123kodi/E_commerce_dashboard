import { useEffect, useState } from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Viewadmin = () => {
    let [adminrecord, setAdminRecord] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/admins")
            .then(async (ress) => {
                let record = await ress.json();
                if (record) {
                    setAdminRecord(record);
                }
                else {
                    toast.error("record not found");
                }
            })
            .catch((err) => {
                toast.error("Something wrong");
            })
    }, setAdminRecord);
    return (


        <div className="page-wrapper" style={{ marginLeft: "90px" }}>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Tables</h4>
                        <div className="ms-auto text-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Library
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-0">Static Table</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table text-start align-middle table-bordered table-hover mb-0">
                                    <thead>
                                        <tr className="text-dark">
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">email</th>
                                            <th scope="col">gender</th>
                                            <th scope="col">hobby</th>
                                            <th scope="col">city</th>
                                            <th scope="col">image</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adminrecord && adminrecord.map((v, index) => {
                                            return (
                                                <tr>
                                                    <th>{v.id}</th>
                                                    <td>{v.name}</td>
                                                    <td>{v.email}</td>
                                                    <td>{v.gender}</td>
                                                    <td>{v.hobby}</td>
                                                    <td>{v.city}</td>
                                                    <td>{v.image}</td>
                                                    <td>Delete</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>


    )
}

export default Viewadmin;