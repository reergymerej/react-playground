// This is a component class.  We'll use this when rendering later.
// var Avatar = React.createClass({
//   render: function () {
//     return (
//       <div onClick={ this.onClick }>
//         { /* This is a comment. */ }
//         <ProfilePic username={ this.props.username } />
//         <ProfileLink username={ this.props.username } />
//       </div>
//     );
//   },

//   onClick: function () {
//     console.log(this.props.children);
//   }
// });

// var ProfilePic = React.createClass({
//   render: function () {
//     return (
//       <img  src={'http://graph.facebook.com/' + this.props.username + '/picture'} />
//     );
//   }
// });

// var ProfileLink = React.createClass({
//   render: function () {
//     return (
//       <a href={ 'http://www.facebook.com/' + this.props.username }>
//         { this.props.username }
//       </a>
//     );
//   }
// });

// ================================================
var Foo = React.createClass({
  getInitialState: function () {
    return {
      info: 'hello',
      ticks: 0
    };
  },

  componentDidMount: function () {
    setInterval(function () {
      this.setState({
        ticks: this.state.ticks + 1
      });
    }.bind(this), 1000);    
  },

  getDefaultProps: function () {
    return {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    };
  },

  render: function () {
    return ( 
      <div>
        <p>Foo ticks: { this.state.ticks } </p>
        <p>Foo props: { JSON.stringify(this.props) } </p>
        <div {...this.props}>I have all the props.</div>
        <Bar {...this.props} info={ this.state.info } />
      </div>
    );
  },
});

var Bar = React.createClass({
  render: function () {
    return (
      <div>
        <h3>Bar</h3>
        <p>Bar props: { JSON.stringify(this.props) } </p>
        <div>{ this.props.info }</div>
        <Baz info={ this.props.info }/>
      </div>
    );
  }
});

var Baz = React.createClass({
  render: function () {
    return (
      <div>
        <h3>Baz</h3>
        <div>{ this.props.info }</div>
      </div>
    );
  }
});

React.render(
  // This is a comment.
  <Foo a="hello" b="world" c={ true } d={ [1,2,3] } />,
  document.getElementById('example')
);

