import React from 'react'
import emailjs from 'emailjs-com'

const ContactAgent = () => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_amhrew7",
      "template_09eeqba",
      e.target,
       "user_c8mV1rUc4mYumEPOOTSsP"
       ).then(res=>{
         console.log(res);
       }).catch(err=>console.log(err));
       e.target.reset();
  }

  return (
    <div className="container border mb-4"
      style={{
        marginTop: "40px",
        width: '50%',
        backgroundImage: `url('https://img.freepik.com/free-vector/white-minimal-background_1393-354.jpg?size=626&ext=jpg')`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
      }}>
      <h3 style={{ marginTop: " 25px", textAlign:"center"}}>Ready for a Quote? Message an agent here...</h3>
      <form className="row" style={{ margin: "25px 85px 75px 100px" }}
        onSubmit={sendEmail}
      >
        <label className="ps-0 mb-1">Full Name</label>
        <input type="text" name="name" className="form-control mb-2" />

        <label className="ps-0 mb-1">Email</label>
        <input type="email" name="user_email" className="form-control mb-2" />

        <label className="ps-0 mb-1">Subject</label>
        <input type='text' name='subject' className="form-control mb-2"/>

        <label className="ps-0 mb-1">Message to Agent</label>
        <textarea name="message" rows='4' className="form-control mb-2" />
        <input type="submit" value='Send'
          className='form-control btn btn-danger'
          style={{ marginTop: "30px" }}
        />

      </form>
    </div>
  )
}

export default ContactAgent;
