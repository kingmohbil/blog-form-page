import '../css/post.css';
import CommentForm from './forms/commentForm';
import { useNavigate } from 'react-router-dom';
function Post(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="col">
        <div className="card h-100 text-dark bg-light mb-3">
          <div className="card-header">
            <div>
              <h6 className="card-title">{props.username}</h6>
              <h5 className="card-title">{props.title}</h5>
            </div>
            <small className="text-muted" id="footer-text">
              {props.created_at}
            </small>
          </div>
          <div className="card-body">
            <p className="card-text">{props.message}</p>
          </div>
          <div className="card-footer">
            <p id="buttons-container">
              <button
                className="btn btn-danger text-light"
                type="button"
                data-postid={props.postId}
                onClick={handleDeletePost}
              >
                Delete Post
              </button>
              <button
                className="btn btn-warning text-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${props.postId}`}
                aria-expanded="false"
                aria-controls={props.postId}
                onClick={handleShowComments}
                id="comments-btn"
              >
                Add Comment
              </button>
            </p>
            <div className="collapse" id={props.postId}>
              <div
                className="card card-body bg-secondary"
                id="comments-container"
              >
                <CommentForm
                  postId={props.postId}
                  on_submit={props.on_submit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  async function handleDeletePost(e) {
    e.preventDefault();
    const postId = e.target.getAttribute('data-postid');
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await fetch(
        `https://blog-api-production-23bb.up.railway.app/posts/${postId}`,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      console.log(response);
      if (response.ok) navigate(0);
      else {
        const data = await response.json();
        data.errors.map((err) => console.error(err.msg));
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Post;

function handleShowComments(e) {
  if (e.target.textContent === 'Close') e.target.textContent = 'Add Comments';
  else e.target.textContent = 'Close';
}
