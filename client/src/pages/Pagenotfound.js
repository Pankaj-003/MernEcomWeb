import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import "../style/Pagenotfound.css"
const Pagenotfound = () => {
    return (
        <Layout title={"go back- page not found"}>
            <section id="error_banner" style={{ background: '#eee', padding: '150px 0 100px 0' }}>
                <div className="container text-center">
                    <div className="error_img">
                        <img className="img-fluid" src="images/404.png" alt={404} />
                    </div>
                    <div className="error_text">
                        <h1><span>Oops!!!</span> Something Went Wrong Here</h1>
                        <p>There may be a misspelling in the URL entered, or the page you are looking for may no longer exist</p><br /><br />
                        <Link className="bb">Go Back Home <i className="fas fa-long-arrow-alt-right" /></Link>
                    </div>
                </div>
            </section>

        </Layout>
    );
};

export default Pagenotfound;