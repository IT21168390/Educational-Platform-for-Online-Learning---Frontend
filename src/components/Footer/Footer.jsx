import React from 'react';

function Footer() {
  return (
    <div className="container my-5">

      <footer className="text-center text-white" style={{ backgroundColor: '#3f51b5' }}>

        <div className="container">
        
      

          <hr className="my-5" />


          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                  voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
                  sequi voluptate quas.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mb-5">
            <a href="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/* Section: Social */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright: <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
}

export default Footer;
