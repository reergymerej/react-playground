var Fooable = {
  foo: function () {
    console.log('I do the foo.');
  },
  componentDidMount: function () {
    this.foo();
  }
};

var Barable = {
  componentDidMount: function () {
    console.log('I am Barable.');
  }
};

var A = React.createClass({
  mixins: [Fooable, Barable],
  render: function () {
    return (
      <h2>A</h2>
    );
  }
});

var B = React.createClass({
  mixins: [Barable, Fooable],
  render: function () {
    return (
      <h2>B</h2>
    );
  }
});

React.render(
  React.createElement('div', null, [<A />, <B />]),
  document.getElementById('example')
);

