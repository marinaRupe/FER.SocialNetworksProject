import React, { Component } from 'react';

class ContactUs extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const email = 'fer.socialnetworksproject@gmail.com';

    return (
      <div className='contact-us page'>
        <div className='contact-us__title'>About us</div>
        <div className='contact-us__content'>
          <div>
            This application is built as a student project for the Social Networks course
            at the Faculty of Electrical Engineering and Computing, University of Zagreb.
          </div>
        </div>

        <div className='contact-us__title'>Contact us</div>
        <div className='contact-us__content'>
          <div>
            We are here to answer any questions you may have about using our application.
          </div>
          <div className='contact-us__subtitle'>
            <a href={`mailto:${email}`} className='link contact-us__email'>
              <i className='material-icons'>email</i>
              fer.socialnetworksproject@gmail.com
            </a>
          </div>
          <div></div>

        </div>
      </div>
    );
  }
}

export default ContactUs;
