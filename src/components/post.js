import '../css/post.css';
function Post(props) {
  return (
    <div className="card" id="post">
      <div className="card-body" id="post-body">
        <div>{props.title}</div>
        <button
          className="btn btn-warning"
          id="post-btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={handleShowDescription}
        >
          Show Description
        </button>
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">{props.description}</div>
      </div>
    </div>
  );
}

export default Post;

function handleShowDescription(e) {
  if (e.target.textContent === 'Hide Description')
    e.target.textContent = 'Show Description';
  else e.target.textContent = 'Hide Description';
}
