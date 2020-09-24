import React,{useState,useEffect} from 'react'
import './Post.css'
import {db} from '../firebase'
import firebase from 'firebase'
import {Avatar} from '@material-ui/core'


const Post=({postId,user,imageUrl,username,caption})=>{
    const [comments,setComments]=useState([])
    const[comment,setComment]=useState('')
    useEffect(()=>{
        let unsubscribe
        if(postId){
            unsubscribe=db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>{
            setComments(snapshot.docs.map(doc=>({
                id:doc.id,
               comment: doc.data()
             })))
            })
        }
        return ()=>{
            unsubscribe()
        }
            },[postId])
            const postComment=(event)=>{
            event.preventDefault()
            db.collection("posts").doc(postId).collection("comments").add({
                text:comment,
                username:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            })
            setComment('')
            }
        
   const onDelete=(postId)=>{
    db.collection("posts").doc(postId).delete()
   }
  
   const commentDelete=(commentId)=>{
       console.log('delete')
       db.collection("posts").doc(postId).collection("comments").doc(commentId).delete();
   }
    return(
    <div className="post">
        <div className="post_header">
            <Avatar alt="Henry"></Avatar>
            <h3 className="username">{username}</h3>

            {
        !user?null:username===user.displayName?<div className="deletebutton"><button className="delete"
        onClick={()=>onDelete(postId)}>Delete Post</button></div>:null
    }
            </div>
            <img className="post_image" src={imageUrl} alt="cards"/>
        <h4 className="caption"><strong className="username">{username}:</strong>{caption}
        </h4>
        <div className="post_comments">
        {comments.map(({id,comment})=>{
            return(
                <div className="comment_align" key={id}>
                   <p className="caption"><strong className="username">{comment.username}</strong>:{comment.text}</p>
                  {
                      !user?null:comment.username===user.displayName?<button class="comment_button" onClick={()=>commentDelete(id)}>Delete Comment</button>:null
                  }  
                </div>
            )}
 )} 
        </div>
        {user&& <form>
           <div className="post_commentBox">
            <input 
            type="text"
            className="post_input"
            placeholder="Add a comment"
            value={comment}
            onChange={(event)=>setComment(event.target.value)}/>
            <button
            disabled={!comment}
            type="submit"
            className="post_button"
            onClick={postComment}
            >Post</button> 
            </div>
        </form>
        }
   
    </div>
)
}

export default Post