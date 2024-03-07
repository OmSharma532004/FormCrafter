"use client"
import { useEffect } from "react";
import Head from 'next/head';
require('dotenv').config();
// pages/myPage.tsx
const MyPage = () => {
    // Redirect to "/Dashboard" on the client side
  
  
    // Your component JSX goes here
    return (
      <div>
         <Head>
        <style>{`.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}`}</style>
        <meta charSet="utf-8" />
        <title>Landing page</title>
        <link
          href="https://assets-global.website-files.com/65e472c38840a2ba61b0df94/css/oms-typeform-website.webflow.cb372eb3a.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Gothic+A1:300,regular,500,600,700,800"
          media="all"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              WebFont.load({
                google: {
                  families: ["Gothic A1:300,regular,500,600,700,800"]
                }
              });
            `,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              !function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);
            `,
          }}
        />
        <link href="https://assets-global.website-files.com/img/webclip.png" rel="apple-touch-icon" />
      </Head>
        

        <div className="body">
        {/* Header Section */}
        <div className="hero">
          {/* Navigation */}
          <nav className="nav w-nav">
            <div className="nav-inner">
              <img
                src="https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png.png"
                alt="Logo"
                className="image-5"
                loading="lazy"
                sizes="100px"
                srcSet="https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-500.png 500w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-800.png 800w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-1080.png 1080w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-1600.png 1600w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-2000.png 2000w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-2600.png 2600w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png-p-3200.png 3200w, https://assets-global.website-files.com/65e472c38840a2ba61b0df94/65e47ff167b227d8df63e2f3_logo-png.png 4000w"
              />
              <nav role="navigation" className="nav-menu-2 w-nav-menu">
                <a href="/auth/login" className="nav-link w-nav-link" style={{ maxWidth: '940px' }}>Login</a>
                <a href="/auth/signup" className="nav-link w-nav-link" style={{ maxWidth: '940px' }}>Signup</a>
              </nav>
            </div>
          </nav>
        </div>
  
        {/* Hero Section */}
        <div className="section center">
          <img
            src="https://assets-global.website-files.com/5af49de0dbb1e3637f2d8886/5b1437cbda3c5c3369fe4460_arrow.svg"
            alt="Arrow"
            className="arrow"
          />
          <div className="hero-content">
            <h1 className="heading-3">FormCrafter</h1>
            <h3 className="hero-subhead">In the world of questions, answers are formed.</h3>
            <a href="/auth/login" className="button w-button">Get the App</a>
          </div>
        </div>
  
        {/* About Section */}
        <div id="about" className="section wide img">
          <div className="wrap">
            <div className="title">FORM CRAFTER</div>
            <h2><strong>Welcome </strong></h2>
            <p>Welcome to FormCrafters Hub, where we believe in the transformative power of crafting connections through the simplicity of forms. Each form you create is a brushstroke on the canvas of communication, allowing individuals and organizations to shape meaningful interactions. At FormCrafters Hub, we understand that every question is a doorway to discovery and every response is a stepping stone towards understanding. We invite you to join us on this journey of inquiry and innovation, where we empower you to design forms that inspire and unleash the full potential of your ideas.</p>
          </div>
          <div className="wrapper"></div>
        </div>
  
        {/* Features Section */}
        <div className="section">
          <div className="feature-wrap icons">
            {/* Feature 1 */}
            <div className="feature-content icons">
              <img
                src="https://assets-global.website-files.com/5af49de0dbb1e3637f2d8886/5b11be7f11a9de6a863497c0_icon-burger-magenta.svg"
                width="80"
                alt="Feature Icon"
                className="feature-icon"
              />
              <h4 className="black-text"><strong>Powerful Analytics</strong></h4>
              <p>Gain insights into respondent behavior and form performance. Track and analyze data trends, visualize results, and make informed decisions.</p>
            </div>
            {/* Feature 2 */}
            <div className="feature-content icons">
              <img
                src="https://assets-global.website-files.com/5af49de0dbb1e3637f2d8886/5b11be87d0d5fe5d7ff154af_icon-silverware-magenta.svg"
                width="74"
                alt="Feature Icon"
                className="feature-icon"
              />
              <h4 className="black-text"><strong>Data Security</strong></h4>
              <p>Trust in our secure data handling. We prioritize the confidentiality of sensitive information with advanced encryption measures.</p>
            </div>
            {/* Feature 3 */}
            <div className="feature-content icons">
              <img
                src="https://assets-global.website-files.com/5af49de0dbb1e3637f2d8886/5b11be8e11a9dee3ed3497c6_icon-data-magenta.svg"
                alt="Feature Icon"
                className="feature-icon"
              />
              <h4 className="black-text"><strong>Automated Notifications</strong></h4>
              <p>Stay informed with instant notifications. Receive alerts as responses come in, enabling timely follow-ups and actions.</p>
            </div>
          </div>
          <div className="feature-wrap icons numbers">
            {/* Feature 4 */}
            <div className="feature-content icons numbers">
              <div className="number">+1k</div>
              <h4 className="black-text">Users</h4>
            </div>
            {/* Feature 5 */}
            <div className="feature-content icons numbers">
              <div className="number">84</div>
              <h4 className="black-text">Designs</h4>
            </div>
            <div className="feature-content icons numbers">
            <div className="number">24h</div>
            <h4 className="black-text">Support</h4>
          </div>
          </div>
        </div>
      </div>
      <div className="section wide">
  <div
    data-w-id="8cf47482-19f1-1f52-25ba-910a60bc91de"
    style={{
      transform:
        'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      opacity: 1,
      transformStyle: 'preserve-3d',
    }}
    className="wrap"
  >
    <h2>Get updates from Om</h2>
    <div className="form-block w-form">
      <form
        id="email-form"
        name="email-form"
        data-name="Email Form"
        method="get"
        className="form-2"
        data-wf-page-id="65e472c48840a2ba61b0dfc7"
        data-wf-element-id="538f9bd6-8ca5-4ea7-b7d3-6a7d798b371d"
        aria-label="Email Form"
      >
        <input
          className="input w-input"
          
          name="email-2"
          data-name="Email 2"
          placeholder="Enter your email"
          type="text"
          id="email-2"
          
        />
        <input
          type="submit"
          data-wait="Please wait..."
          className="button form-button w-button"
          value="Subscribe"
        />
      </form>
      <div
        className="w-form-done"
        
        role="region"
        aria-label="Email Form success"
      >
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div
        className="w-form-fail"
     
        role="region"
        aria-label="Email Form failure"
      >
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
  </div>
  <div className="footer">
    <div className="wrap">
      <div className="footer-list">
        <a href="#" className="footer-link">
          Email
        </a>
        <a href="#" className="footer-link">
          Instagram
        </a>
        <a href="#" className="footer-link">
          Facebook
        </a>
        <a href="#" className="footer-link">
          Twitter
        </a>
        <a href="/image-license-info" className="footer-link">
          Image License Info
        </a>
      </div>
    </div>
  </div>
</div>

      </div>
    );
  };
  
  export default MyPage;
  