var Fooable = {
  foo: function () {
    console.log('I do the foo.');
  }
};

var A = React.createClass({
  render: function () {
    return (
      <h2>A</h2>
    );
  }
});

var B = React.createClass({
  render: function () {
    return (
      <h2>B</h2>
    );
  }
});

var Container = React.createClass({
  render: function () {
    return (
      <div>
        <A />
        <B />
      </div>
    );
  }
});

React.render(
  <Container />,
  document.getElementById('example')
);

