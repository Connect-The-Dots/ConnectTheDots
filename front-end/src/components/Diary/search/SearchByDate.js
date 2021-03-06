import React, { useState, useEffect} from 'react';
import './SearchByDate.css';
import DiaryEntry from './DiaryEntry';
import 'react-day-picker/lib/style.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { getAllDiaries, searchByDate, searchByKeyword} from '../../../services/diaryApi';
import 'antd/dist/antd.css';
import { Input} from 'antd';

function SearchByDate(props) {
   
    const [diary, setDiary] = useState([]);
    const [date, setDate] = useState('');
    const [keyword, setKeyword] = useState('');
    const month = date.month < 10 ? "0"+ date.month : date.month;
    const day = date.day < 10 ? "0" + date.day : date.day;
    const selectDate = (date.year + "-" + month + "-" + day).toString();
    const { Search } = Input;
  
    useEffect(() => {
      searchByDate(selectDate, props.curUser.unique_id)
        .then(function(res) {
          setDiary(res);
            })
      },[selectDate]);  
    
    useEffect(() => {
        searchByKeyword(keyword, props.curUser.unique_id)
            .then(function(res) {
              setDiary(res);
                })
      },[keyword]);

    const handleClick=(e)=> {
      setKeyword('');   
      getAllDiaries(props.curUser.unique_id)
        .then(function(res) {
          setDiary(res);
            })
    };

    return (
      <div className="main-body">
          <Search placeholder="Search Diary By Keyword" onSearch={(value)=>{setKeyword(value);}} style={{ width: 500, 'font-family': "Optima" }} enterButton />
   
          <div className="calendar">
            <Calendar value={date} onChange={setDate} colorPrimary="#819eb6" calendarClassName="custom-calendar" calendarTodayClassName="custom-today-day"/>
          </div>
          <div>
            <button className="search-button" onClick={handleClick}>View All Entry</button>
          </div>
         <div className="cardbox">
         
          {diary.map(entry => (
                     
                <DiaryEntry entry={entry} setDiary={setDiary} curUser={props.curUser}>
  
                 </DiaryEntry>  
                  ))
              }
        </div>
  
      </div>
  
      );
  }  
  export default SearchByDate;