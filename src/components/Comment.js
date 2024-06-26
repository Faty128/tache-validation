import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from 'uuid';

const Comment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, "Articles", id);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (data && Array.isArray(data.comments)) {
        setComments(data.comments);
      } else {
        setComments([]); // Reset to an empty array if comments are not available or not an array
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [id]);

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
    .then((e) => {
        console.log(e);
    })
    .catch((error) => {
        console.log(error);
    });
  };

  return (
    <div>
      Comment
      <div className="container">
        {comments.length > 0 && comments.map(({ commentId, user, comment, userName, createdAt }) => (
          <div key={commentId}>
            <div className="border p-2 mt-2 row">
              <div className="col-11">
                <span
                  className={`badge ${
                    user === currentlyLoggedinUser.uid
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                >
                  {userName}
                </span>
                {comment}
              </div>
              <div className="col-1">
                {user === currentlyLoggedinUser.uid && (
                  <i
                    className="fa fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
                  ></i>
                )}
              </div>
            </div>
          </div>
        ))}
        {currentlyLoggedinUser && (
          <input
            type="text"
            className="form-control mt-4 mb-4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            onKeyUp={handleChangeComment}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
