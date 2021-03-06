import React, { useState} from 'react';
import './Search.css';
import SearchByDate from './SearchByDate';
import SearchByTag from './SearchByTag';
import 'react-day-picker/lib/style.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import 'antd/dist/antd.css';
import { Switch } from 'antd';

function Search(props) {

  const [option, setOption] = useState(true);

  const onChange=(checked)=> {
  setOption(checked);
  }
  
  return (
  
  <div className="main-body">

    <h2 className="search-title">SEARCH DIARY BY: </h2>
    <h3 className="opt-one">TAG </h3>
    <div className="switch">
      {/* Use switch to switch between two compoentes, conditional rendering */}
      <Switch checkedChildren="Date" unCheckedChildren="Tag" style={{ width:70, height: 30, fontFamily:"Optima", fontSize: "3vw"}} onChange={onChange}  defaultChecked />
    </div>
    <h3 className="opt-two">DATE </h3>
    <div>
        {option && (<SearchByDate curUser={props.curUser}/>)}  
    </div>

    <div>
        {!option && (<SearchByTag curUser={props.curUser}/>)}
        
    </div>
  </div>

    );
}

export default Search;