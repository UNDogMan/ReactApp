import React from 'react';
import './App.css';
import Main from "./components/Main";
import Header from "./components/Header";
import {GlobalModal} from "./components/Modal/GlobalModal";

function App() {
  return (
      <div>
          <GlobalModal>
              <Header/>
              <Main/>
          </GlobalModal>
      </div>
  );
}

export default App;
