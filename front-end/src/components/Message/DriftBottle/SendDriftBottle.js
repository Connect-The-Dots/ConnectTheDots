import PropTypes from 'prop-types';
import {useState} from 'react';
import './SendDriftBottle.css'
import TextField from '@material-ui/core/TextField';
import MediaUpload from '../MediaUpload';
function SendDriftBottle(props) {
    
const handleSend = (e) => {
    if (document.getElementById("sendBottleTextField").value || props.videos || props.audioData || props.pics) {
         props.addSentBottle(e);
    }
   
    props.closeModal();
}
            return (
                <div id="sendBottleForm" className="sendBottleForm"> 
                {/*<textarea placeholder="Type your message here..." id="sendBottleTextField" rows="15" />*/}
                 
                    <TextField
                            variant='filled'
                            id="sendBottleTextField" 
                            color='primary'
                            label='Type your message here...'
                            multiline
                            style={{
                                'height': '400px',
                            }}
                            />
                <br/><br/>
                    
                    <button className="throw-button" onClick={(e)=>{handleSend(e);}}>Throw into the sea</button>

                    <MediaUpload setAudioData={props.setAudioData} setPics ={props.setPics} setVideos={props.setVideos} />

                </div>
            );
 
 
}

SendDriftBottle.propTypes = {
    closeModal:PropTypes.func,
    addSentBottle: PropTypes.func,
    videos: PropTypes.string,
    setVideos: PropTypes.func,
    pics: PropTypes.string,
    setPics: PropTypes.func,
    audioData: PropTypes.object,
    setAudioData: PropTypes.func,
    
};

export default SendDriftBottle;
