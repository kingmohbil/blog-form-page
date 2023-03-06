const Comment = (props) => {
  return (
    <form
      className="row g-3"
      data-postid={props.postId}
      onSubmit={props.on_submit}
    >
      <div className="col-md-12">
        <input
          type="text"
          className="form-control"
          name="comment"
          autoComplete="off"
          placeholder="Write message here... press enter to add comment"
        />
      </div>
    </form>
  );
};

export default Comment;
