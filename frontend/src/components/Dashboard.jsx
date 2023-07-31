import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

function Dashboard() {
  return (
    <Container>
      <main>
        <section className="hero">
          <h2>Your Catchy Headline</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac est
            nec neque luctus dapibus.
          </p>
          <button>Learn More</button>
        </section>
        <section className="features">
          <div className="feature">
            <i className="fa fa-code"></i>
            <h3>Feature 1</h3>
            <p>Describe Feature 1 here.</p>
          </div>
          <div className="feature">
            <i className="fa fa-users"></i>
            <h3>Feature 2</h3>
            <p>Describe Feature 2 here.</p>
          </div>
          <div className="feature">
            <i className="fa fa-laptop"></i>
            <h3>Feature 3</h3>
            <p>Describe Feature 3 here.</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Company</p>
      </footer>
    </Container>
  );
}

export default Dashboard;
