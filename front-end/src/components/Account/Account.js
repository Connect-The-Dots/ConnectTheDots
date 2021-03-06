import {useState, useEffect} from 'react';
import './Account.css';
import TextField from '@material-ui/core/TextField'
import useStorage from '../../hook/useStorage';
import axios from 'axios'


function Account({curUser}) {

    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(curUser.username)
    const [photoURL, setPhotoURL] = useState(curUser.photo)
    const [sex, setSex] = useState(curUser.sex)
    const [date, setDate] = useState(curUser.birthday)
    const [pswd, setPswd] = useState(curUser.password)
    const [rePswd, setRePswd] = useState(curUser.password)

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg','image/jpg','image/gif'];
    const { url } = useStorage(file);


    useEffect(() => {
        if (url) {
            setPhotoURL(url)
           
          }
        }, [url]);
    
    
      const handleChange = async (e) => {
        let selected = e.target.files[0];

    
        if (selected) {
          setFile(selected);
          setError('');
          setPhotoURL(url)
        } else {
          setFile(null);
          setError('Please select an image file (png or jpg)');
        }
      };



    let localURL = process.env.NODE_ENV === 'production' ? 'https://connect-the-dots-backend.herokuapp.com/userApi' : 'http://localhost:3001/userApi';


    // require implement of database
    // save user information to db after
    const saveToDB = () => {


        axios.get(localURL + `/checkUserName/${name}`)
            .then((response) => {
                if (name === curUser.username || response.data === "") {
                    axios.patch(localURL +`/users/${curUser.unique_id}`, 
                                {
                                    username: name,
                                    sex: sex,
                                    password: pswd,
                                    photo: photoURL,
                                    birthday: curUser.birthday,
                                })
                        .then((response) => {
                            curUser.username = name
                            curUser.photo = photoURL
                            curUser.sex = sex
                            curUser.password = pswd
                            setEditMode(false)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                } 
                
                else {
                    alert("user name has been registered, please try another one")
                }
            })
            .catch((err) => {
                console.log("error when check if username is used")
            })

    }
    

    const onSave = (e) => {
        e.preventDefault()
        if (!name ||!photoURL) {
            alert("please enter your nickname and/or photo URL")
            return
        }

        if(pswd !== rePswd) {
            alert("password does not match")
            return
        }

        saveToDB()
    }


    const onDelete = () => {
        setEditMode(false)
        setName(curUser.username)
        setPswd(curUser.password)
        setRePswd(curUser.password)
        setPhotoURL(curUser.photo)
        setSex(curUser.sex)
    }
    

    

    if (!editMode) {
        return (
            <div className="account-body">
                <div className="info-display">
                    <h3 className="display-info">Name: {curUser.username}</h3>
                    <h3 className="display-info">Sex: {curUser.sex}</h3>
                    <h3 className="display-info">Photo:</h3>
                    <img className="display-img"  src={curUser.photo} alt={curUser.name}/>
                    <h3 className="display-info">Birthday:  {curUser.birthday}</h3>
                    <button className="edit-button" onClick={() => {setEditMode(true)}}>Edit</button>
                </div>
            </div>
        )
    } else {
        return(
            <div className="account-body">
                <div className="info-container">
                    <div className="info-input">
                        <label className="edit-info">Name: </label>
                        <input type="text" value={name} placeholder="please enter nickname" onChange={(e) => {setName(e.target.value)}}></input> <br/>
                    </div>
                    
                    <div className="info-input">
                        <label className="edit-info">Password: </label>
                        <input type="password" value={pswd} placeholder="please enter password" onChange={(e) => {setPswd(e.target.value)}}></input> <br/>
                    </div>

                    <div className="info-input">
                        <label className="edit-info">Re-enter Password: </label>
                        <input type="password" value={rePswd} placeholder="please re-enter password" onChange={(e) => {setRePswd(e.target.value)}}></input> <br/>
                    </div>


                    <div className="info-input">
                        <label className="edit-info">Sex:</label>
                        <select value={sex} onChange={(e) => {setSex(e.target.value)}}>
                            <option value="Male" > Male </option>
                            <option value="Female"> Female </option>
                        </select> <br/>
                    </div>

                    <div className="info-input">
                        <label className="edit-info">Photo: </label> <br/>
                        <div className="edit-pic">
                          <input type="file" accept="image/*" multiple ={true} onChange={handleChange}/><br/>
                        </div>
                    </div>

                    <div className="info-input">
                        <label className="edit-info">Birthday:</label>
                        <TextField
                        variant='outlined'
                        value={date}
                        type='date'
                        onChange={(e) => {setDate(e.target.value)}}
                        style={{'width': '40%'}}
                        />

                    </div>

                <button className="save-button" onClick={onSave}> Save </button>
                <button className="save-button" onClick={onDelete}>Cancel</button>
                </div>
            </div>
        )
    }

 
}

export default Account;
