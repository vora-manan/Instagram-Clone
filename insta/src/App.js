import {useState,useEffect} from 'react';
import React from 'react'
import './App.css';
import Post from './Post/Post'
import {db} from './firebase'
import {auth} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core';
import {Input} from '@material-ui/core'
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed'
import {FaGithub,FaFacebook,FaInstagram,FaSnapchatGhost,FaYoutube,FaHeart} from 'react-icons/fa'


function getModalStyle() {
  const top = 50
  const left = 50 
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

 
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes=useStyles()
  const [modalStyle]=useState(getModalStyle)
  const [posts,setPosts]=useState([])
  const [open,setOpen]=useState(false)
  const [username,setUserName]=useState('')
  const[password,setPassword]=useState('')
const [email,setEmail]=useState('')
const [user,setUser]=useState(null)
const[login,setLogin]=useState(false)

useEffect(()=>{
 const unsubscribe= auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      setUser(authUser) 
    }
    else{
      setUser(null)
    }
  })
  return ()=>{
    unsubscribe()
  }
},[user,username])



  useEffect(()=>{
    db.collection('posts').orderBy("timestamp","desc").onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })))
    })
  },[])
const signup=(event)=>{
event.preventDefault();
auth.createUserWithEmailAndPassword(email,password).then(authUser=>{
 return authUser.user.updateProfile({displayName:username})
})
.catch(error=>alert(error.message))
setOpen(false)
}
const signin=(event)=>{
  event.preventDefault()
  auth.signInWithEmailAndPassword(email,password)
  .catch(error=>alert(error.message))
  setLogin(false)
}


return(

  <div className="app">
    
     <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
        <center>
      <div className="app_header">
      <img className="logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
    </div>
    </center>
        <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}>
        </Input>
        <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}>
        </Input>
        <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e)=>setUserName(e.target.value)}>
        </Input>
        <Button type="submit" onClick={signup}>Sign Up</Button>
        </form>
        </div>
      </Modal>
      <Modal
        open={login}
        onClose={()=>setLogin(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
        <center>
      <div className="app_header">
      <img className="logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
    </div>
    </center>
        <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}>
        </Input>
        <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}>
        </Input>
        <Button type="submit" onClick={signin}>Sign In</Button>
        </form>
        </div>
      </Modal>
    <div className="app_header">
      <img className="logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
      <p className="textbetween">Share Your Memories</p>
      {user?  <Button className="app_singin" style={{border:"1px solid black",marginRight:"20px"}} onClick={()=>auth.signOut()}>Logout</Button>:
    <div className="app_signin"><Button onClick={()=>setLogin(true)}>Sign In</Button>
    <Button onClick={()=>setOpen(true)}>Sign Up</Button></div>}
    </div>
    <div style={{border:"1px dotted lightgray"}}>
    {user?.displayName? (<ImageUpload username={user.displayName}/>):
    (<h3 style={{textAlign:"center"}}> To Upload,You Need To Login First</h3>)}
    </div>
    <div className="app_posts">
      <div className="app_postsleft">
      {
      posts.map((p,index)=>
        <Post key={p.id} postId={p.id} user={user} imageUrl={p.post.imageUrl} caption={p.post.caption} username={p.post.username}
        />)
    }
      </div>
      <div className="app_postsright">
      <InstagramEmbed
  url='https://www.instagram.com/p/CB6Y_JAleZx/?utm_source=ig_web_copy_link'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
<InstagramEmbed
  url='https://www.instagram.com/p/CBgJalrlsGe/?utm_source=ig_web_copy_link'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
      </div>
    </div>
    <footer className="foot">
    <p >Created by Manan with Love   <FaHeart/></p>
      <p style={{textDecoration:"underline"}}>About Us</p>
    <ul style={{listStyleType:"none",paddingBottom:"40px",margin:"0 auto",paddingRight:"30px"}}>
      <li className="link">Copyright2020 Manan
      </li>
      <li className="link">Email:vora.manan10@gmail.com</li>
    </ul>
    <div>
    < a href="https://www.facebook.com/manan.vora.18"><FaFacebook style={{padding:"5px",width:"20px",color:"white",height:"auto"}}/></a>
     <a href="https://github.com/vora-manan"><FaGithub style={{padding:"5px",width:"20px",color:"white",height:"auto"}}/></a> 
     <a href="https://www.snapchat.com/l/en-gb/"><FaSnapchatGhost style={{padding:"5px",width:"20px",color:"white",height:"auto"}}/></a> 
     <a href="https://www.youtube.com/channel/UCM5EMaivaQ6_70cYuQAIjpw"><FaYoutube style={{padding:"5px",width:"20px",color:"white",height:"auto"}}/></a> 
     <a href="https://www.instagram.com/vora.manan/?hl=en"> <FaInstagram style={{padding:"5px",width:"20px",color:"white",height:"auto"}}/></a>

    </div>
    </footer>
  </div>
)
}

export default App;
