import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Users = () => {
    return (
        <Layout title={"Dashboard - All Users"}>
            <div className="Admin_main_box">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;