var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    this.setState({
      refreshes: this.state.refreshes + 1
    });

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      
      success: function(data) {
        this.setState({data: data});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function (comment) {
    console.log(comment);
    // var comments = this.state.data;
    // comments.push(comment);
    // this.setState({data: comments}, function() {
    //   // `setState` accepts a callback. To avoid (improbable) race condition,
    //   // `we'll send the ajax request right after we optimistically set the new
    //   // `state.
    //   $.ajax({
    //     url: this.props.url,
    //     dataType: 'json',
    //     type: 'POST',
    //     data: comment,
    //     success: function(data) {
    //       this.setState({data: data});
    //     }.bind(this),
    //     error: function(xhr, status, err) {
    //       console.error(this.props.url, status, err.toString());
    //     }.bind(this)
    //   });
    // });
  },

  // This happens only once, during setup.
  getInitialState: function() {
    return {
      data: [],
      refreshes: 0
    };
  },

  // Called automatically when a component is rendered.
  componentDidMount: function () {
    console.log('componentDidMount');
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    // use some state data
    // pass data to CommentList
    // bind CommentForm.onCommentSubmit to this.handlCommentSubmit
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <p>refreshes: {this.state.refreshes}</p>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({

  getFormVal: function (name) {
    // use refs to get DOM nodes, pull data from those
    var node = this.refs[name].getDOMNode();
    var val = node.value.trim();
    node.value = '';
    return val;
  },

  getAllFormVals: function () {
    var all = {};
    Object.keys(this.refs).forEach(function (refName) {
      all[refName] = this.getFormVal(refName);
      if (!all[refName]) {
        all = null;
        return false;
      }
    }, this);
    return all;
  },
  
  handleSubmit: function (e) {
    var allVals = this.getAllFormVals();

    if (allVals) {
      // onCommentSubmit is a handler passed down from the outer
      // component (CommentBox)
      this.props.onCommentSubmit(allVals);
    }

    e.preventDefault();
  },

  render: function() {
    // include refs in nodes
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);