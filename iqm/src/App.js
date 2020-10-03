import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';


class App extends React.Component {
  state = {
    questions: [] 
  }
componentDidMount(){
  axios.get("https://api.stackexchange.com/2.2/questions?site=stackoverflow")
      .then(res => {
        //  const questions =[];
        console.log(res.data)
        this.setState({ questions: res.data.items  });
      })

}

  render(){
    // const data =[{"0": "auth1","1": "auth2"}]
    console.log("qns",this.state.questions)
const data = this.state.questions;
console.log("data",data);
  
  return (
    <div className="App">
      <div className="col-12" >
       <table className="table"> 
       <thead> 
       <tr>
         <th>Author</th>
         <th>Title</th>
         <th>Creation Date</th>
         </tr> 
         </thead>
         <tbody>
           {data.map(item => 
           <tr key={item.id}>
             <td>{item.owner.display_name}</td>
             <td>{item.title}</td>
             <td>{item.creation_date}</td>

           </tr>)}
         </tbody>
       </table>  
        </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}
}

export default App;
