import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components//header";
import Footer from "./components//footer";

import Signin from "./page/signin";

const App = () => {
   return (
      <div className="App">
         <div className="App">
            <Header />
            <main>
               <Container
                  style={{ maxWidth: "100%", paddingLeft: 0, paddingRight: 0, minHeight : "100vh" }}
               >
                  <Routes>
                     <Route path="/" element={<Signin />} />
                  </Routes>
               </Container>
            </main>
            <Footer />
         </div>
      </div>
   );
};

export default App;
