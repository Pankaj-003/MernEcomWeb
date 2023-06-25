// import React from 'react';
// import Layout from '../components/Layout/Layout'

// const ContactPage = () => {
//   return (
//     <Layout title={'ContactPage'}>
//     <div className="container contact-page">
//       <h1 className="page-title">Contact Us</h1>
//       <div className="contact-info">
//         <h2 className="section-title">Contact Information</h2>
//         <p>
//           <strong>Phone:</strong> <a href="tel:+1234567890" className="contact-link">+1234567890</a>
//         </p>
//         <p>
//           <strong>Email:</strong> <a href="mailto:example@example.com" className="contact-link">example@example.com</a>
//         </p>
//         <p>
//           <strong>Address:</strong> 123 Main Street, City, State, ZIP
//         </p>
//       </div>
   
//            <form className="contact-form" action="https://formspree.io/f/xgejwopk" method="POST">
//         <h2 className="section-title">Send us a message</h2>
//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Name:</label>
//           <input type="text" className="form-control" id="name" name="name" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email" className="form-label">Email:</label>
//           <input type="email" className="form-control" id="email" name="email" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message" className="form-label">Message:</label>
//           <textarea className="form-control" id="message" name="message" required></textarea>
//         </div>
//         <button type="submit" className="submit-btn all-btn-style">Send</button>
//       </form>
//     </div>
//     </Layout>
//   );
// }

// export default ContactPage;
import React from 'react';
import Layout from '../components/Layout/Layout'
const ContactPage = () => {
  return (
    <Layout title={'ContactPage'}>
    <div className="container contact-page contact-page-main ">
      <h1 className="page-title contact-page-main-heading">Contact Us</h1>
      <div className="contact-info contact-info-main">
        <h2 className="section-title contact-page-heading">Contact Information</h2>
        <p>
          <strong>Phone:</strong> <a href="tel:+1234567890" className="contact-link">+1234567890</a>
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:example@example.com" className="contact-link">example@example.com</a>
        </p>
        <p>
          <strong>Address:</strong> 123 Main Street, City, State, ZIP
        </p>
      </div>
      <form className="contact-form contact-form-main-from-box">
        <h2 className="section-title contact-form-title">Send us a message</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea className="form-control" id="message" name="message" required></textarea>
        </div>
        <button type="submit" className="submit-btn all-btn-style">Send</button>
      </form>
    </div>
    </Layout>
  );
}

export default ContactPage;
