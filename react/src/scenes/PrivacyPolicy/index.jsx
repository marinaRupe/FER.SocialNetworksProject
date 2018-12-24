import React, { Component } from 'react';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div className='privacy-policy'>
        <div className='privacy-policy__title'>FER.SocialNetworksProject Privacy Policy</div>
        <div className='privacy-policy__content'>
          <p>
            FER.SocialNetworksProject is a web platform for searching and reviewing movies.
            The FER.SocialNetworksProject platform includes the FER.SocialNetworksProject websites, apps
            and related online services, together the <strong>"Service"</strong>.
          </p>
          <p>
            This Privacy Policy describes how your information is collected, used and shared when you use the Service.
          </p>

          <div className='privacy-policy__subtitle'>
            I. What kinds of information is collected?
          </div>

          <p>
            The Service will collect the following kinds of information when you or other users access the Service:
          </p>
          <ul>
            <li>your contact information, such as full name and email address;</li>
            <li>your Facebook public profile information, such as name and profile picture;</li>
            <li>other information from your Facebook profile, such as birthday, location and liked pages</li>
            <li>
              the content, communications and other information you provide when you use the Service,
              including when you sign up for an account, create or share content.
              This can include information in or about the content you provide,
              such as movie ratings;
            </li>
          </ul>

          <div className='privacy-policy__subtitle'>
            II. How does the Service use this information?
          </div>

          <p>
            The Service uses this information to provide you a better user experience. Examples of such use include:
          </p>
          <ul>
            <li>
              enhancing the security and safety of the Service for you and other users,
              such as by investigating suspicious activity or violations of applicable terms or policies;
            </li>
            <li>personalizing your experience;</li>
            <li>
              associating activity on the Service across different devices
              operated by the same individual to improve the overall operation of the Service;
            </li>
            <li>to identify and fix bugs that may be present; and</li>
            <li>conducting data and system analytics, including research to improve the Service.</li>
          </ul>

          <div className='privacy-policy__subtitle'>
            III. Disclosure of information
          </div>

          <p>
            The Service discloses the information collected in the following ways:
          </p>
          <li>
            to third-party apps, websites or other services that you can connect to through the Service,
            such as Facebook;
          </li>
          <li>to protect the safety of any person; to address fraud, security or technical issues; and</li>
          <li>
            in connection with a subpoena, warrant, discovery order
            or other request or order from a law enforcement agency.
          </li>

          <div className='privacy-policy__subtitle'>
            IV. Accessing and modifying your information
          </div>
          <p>
            You may access, correct or delete information that you have uploaded to
            the Service using the tools within the Service (for example, editing your movie ratings or history).
          </p>
          <p>
            Furthermore, you may request to review, modify and/or delete any additional personal information collected
            by the Service by contacting fer.socialnetworksproject@gmail.com.
          </p>
          <p>
            It typically takes about 30 days to collect all of the data connected to a user's account.
          </p>

          <div className='privacy-policy__subtitle'>
            V. Third-party links and content
          </div>
          <p>
            The Service may contain links to content maintained by third parties.
            You should review the privacy policies of each website that you visit.
          </p>

          <div className='privacy-policy__subtitle'>
            VI. Account Closure
          </div>
          <p>
            If you would like to stop using the Service, you may request to delete your Account
            and related personal information by contacting fer.socialnetworksproject@gmail.com.
          </p>
          <p>
            It typically takes about 60 days to delete an account after a request has been received and processed,
            but some information may remain in backup copies for a reasonable period of time.
          </p>

          <div className='privacy-policy__subtitle'>
            VII. Changes to the Privacy Policy
          </div>
          <p>
            This Privacy Policy may be updated from time to time.
            When updated the "Effective date" below will be amended and the new Privacy Policy will be posted online.
          </p>

          <div className='privacy-policy__subtitle'>   
            VIII. Contact
          </div>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>

          <br />
          <p>
            Effective Date: 24 Dec 2018
          </p>
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;
