// React.createClass defines the React component.
var CommentBox = React.createClass({

    // return tree of React components
    render: function () {
        return (
            <div className="commentBox">
                Hello.
            </div>
        );
    }
});


// starts everything, renders root
React.render(
    <CommentBox />,
    document.getElementById('content')
);