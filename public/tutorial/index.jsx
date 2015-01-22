var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var converter = new Showdown.converter();

// React.createClass defines the React component.
var CommentBox = React.createClass({

    // return tree of React components
    render: function () {

        // regular tags go through React.createElement(tagName)
        // Can you add comments?
        // assigning data in CommentList
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={ this.props.data } />
                <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
  render: function() {

    console.log(this.props);
    debugger;

    // Data passed as attributes or nested nodes shows up
    // in the child-component as `this.props`.
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment
            <ol>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </ol>
        </Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});

var Comment = React.createClass({
    render: function () {
        var rawMarkup = converter.makeHtml(this.props.children.toString());

        // use data injected by parent node
        return (
            <div className="comment">
                <h2 className="commentAuthor">{ this.props.author }</h2>
                <span dangerouslySetInnerHTML={{ __html: rawMarkup }} />
            </div>
        );
    }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});


// starts everything, renders root
React.render(
    <CommentBox data={ data } />,
    document.getElementById('content')
);