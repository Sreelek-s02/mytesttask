import React, { Component, useState } from 'react';
import './App.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import {createMarkup} from "./flterHTML.js"


class App extends React.Component {
  state = {
    questions: [] 
  }
componentDidMount(){
  let question = [];
  let allQuestions = () => {
  axios.get("https://api.stackexchange.com/2.2/questions?order=desc&all=true&sort=activity&site=stackoverflow&filter=!L_(IB3Vfl8G6UMMFT7U7RX")
      .then(res => {
        let qn = res.data.items;
        if(!res.data.has_more){
          question.push.apply(question,qn);
        this.setState({ questions: question });
      }else{
        question.push.apply(question,qn);
        allQuestions(qn[qn.length-1])
      }
      this.setState({ questions: question  });
      })
   
    }
    allQuestions();
}


  render(){
const data = this.state.questions;
  
  return (
    <div className="App">
      <div className="col-12" >
       <table className="table"> 
       <thead> 
       <tr className="rowBorder">
         <th>Author</th>
         <th>Title</th>
         <th>Creation Date</th>
         </tr> 
         </thead>
         <tbody>
           {data.map((item,i) => 
           <tr key={item.id}>
             <td value={item.owner.display_name}>{item.owner.display_name}</td>
             <Popup className="popup" id={i} align="top center"trigger={<td value={item.title}>{item.title}</td>}>
             <div className="modal">   
               <div><h2>{item.title}</h2></div>
               <div><a style={{"outline": "none"}} href={item.link}>{item.link}</a></div>
               <div><span dangerouslySetInnerHTML={createMarkup(item.body)}/></div>
               </div>
             </Popup>
             <td value={item.creation_date}>{item.creation_date}</td>
           </tr>)}
         </tbody>
       </table>  
        </div>
    </div>
  );
}
}

export default App;
