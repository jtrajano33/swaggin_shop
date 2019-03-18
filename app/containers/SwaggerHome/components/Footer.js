import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ background: '#365e9d', padding: '20px 20px', width: '100%' }}
      >
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href="https://intimate.io"
            style={{ textDecoration: 'none', color: '#62b5e5' }}
          >
            &copy; intimate.io
          </a>
        </div>
      </nav>
    );
  }
}

export default Footer;
