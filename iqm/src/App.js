import React, { Component, useState } from 'react';
import './App.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'


class App extends React.Component {
  state = {
    questions: [] 
  }
componentDidMount(){
  axios.get("https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&filter=!L_(IB3Vfl8G6UMMFT7U7RX")
      .then(res => {
        this.setState({ questions: res.data.items  });
      })

}


  render(){
const data = this.state.questions;
  
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
           {data.map((item,i) => 
           <tr key={item.id}>
             <td value={item.owner.display_name}>{item.owner.display_name}</td>
             <td value={item.title}>{item.title}</td>
             <td value={item.creation_date}>{item.creation_date}</td>
           <td><Popup className="popup" id={i} align="top center"trigger={<button id={i} >Click for more details</button>}>
           <div className="modal">   
               <div><b>Title:</b>{item.title}</div>
               <div><b>Link:</b>{item.link}</div>
               <div><b>Body:</b>{item.body}</div>
               </div>
             </Popup>
             </td>
           </tr>)}
         </tbody>
       </table>  
        </div>
    </div>
  );
}
}

export default App;
