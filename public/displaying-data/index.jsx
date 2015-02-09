// This is a component class.
// Component classes can be used as elements for rendering.
var Foo = React.createClass({
  render: function () {
    return (
      <div id={ this.props.id }>I am the foo.
        <p>{ this.props.message }</p>
        <p>{ this.props.time }</p>
      </div>
    );
  }
});

var LikeButton = React.createClass({
  render: function () {
    return (
      <span onClick={ this.onClick }>liked? { this.state.liked ? 'yes' : 'no'}</span>
    );
  },

  getInitialState: function () {
    return {
      liked: false
    };
  },

  onClick: function () {
    this.setState({ liked: !this.state.liked });
  }
});

React.render(
  <Foo message="hello!" time={ Date.now() } />,
  // <LikeButton />,
  document.getElementById('main')
);