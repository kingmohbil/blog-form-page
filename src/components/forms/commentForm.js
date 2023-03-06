const Comment = (props) => {
  return (
    <form data-postId={props.postId} onSubmit={props.on_submit}>
      <input type="text" name="comment" />
    </form>
  );
};

export default Comment;
