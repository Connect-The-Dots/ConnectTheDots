import React, { useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import './DiaryEntry.css';
// import Carousel from 'react-elastic-carousel';
// import Carousel from "react-bootstrap/Carousel";
// import {Carousel} from '3d-react-carousal';
import Slider from 'infinite-react-carousel';
// import "bootstrap/dist/css/bootstrap.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';
import DiaryInfoModal from '../search/DiaryInfoModal';
import {remove, favorite,fav,unfav} from '../../../actions';

function DiaryEntry(props){

 const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const favList = useSelector(state => state.favList);
  const [list, setList] = useState(favList);
  const [like, setLike] = useState(props.entry.like);
  const [favorites, setFavorites]=useState(localStorage.getItem("favorites"));
//   const favList = localStorage.getItem('favorites') || '0';
 
    return (
        
        <div className="card" key={props.entry._id}>
           
            {/* <Slider dots>
                    {props.entry.image.map(ig => (
                    
                    <img className= "card-image" src={ig} alt="diary-image"></img>
                    
                  ))}     
                </Slider>     */}
            <img className= "card-image" src={props.entry.pics[0]} alt="diary-image"></img>
            <div className="card-container">
                <h3 className="intro"> Date: {props.entry.date}</h3>
                <h3 className="intro"> Title: {props.entry.title}</h3>
                
                <button onClick={()=>setIsOpen(true)} className="card-button">show more</button>
                <div>
                {like && <IconButton onClick={() => { setLike(!like); dispatch(favorite(props.entry._id, false)); }}  aria-label="delete" color="primary">
                
                          <Favorite></Favorite>
                        </IconButton>}
                {!like && <IconButton onClick={() => { setLike(!like); dispatch(favorite(props.entry._id, true)); }} aria-label="delete" color="primary">
                          <FavoriteBorderIcon></FavoriteBorderIcon>
                       
                        </IconButton>}
                </div>
                
            </div>

        <div>
               
             {isOpen && (<DiaryInfoModal entry={props.entry} show={true} handleClose={()=>setIsOpen(false)}/>)} 
        </div>
            
        </div>
        
       
    );

}

export default DiaryEntry;