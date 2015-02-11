var Padable = {
  pad: function (x, length) {
    x = x + '';
    while (x.length < length) {
      x = 0 + x;
    }
    return x;
  }
};

var Clock = React.createClass({
  intervalId: null,

  getInitialState: function () {
    return {
      time: new Date()
    };
  },

  render: function () {
    var hours = this.state.time.getHours();
    var minutes = this.state.time.getMinutes();
    var seconds = this.state.time.getSeconds();

    return (
      <div>
        <Hours value={hours} />:<Minutes value={minutes} />:<Seconds value={seconds} /> <Period date={this.state.time} />
      </div>
    );
  },

  componentDidMount: function () {
    this.intervalId = setInterval(function () {
      this.setState({
        time: new Date()
      });
    }.bind(this), 1000);
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalId);
  }
});

var Hours = React.createClass({
  mixins: [Padable],
  render: function () {
    var value = this.pad(this.props.value, 2);
    return (
      <span>{value}</span>
    );
  }
});

var Minutes = React.createClass({
  mixins: [Padable],
  render: function () {
    var value = this.pad(this.props.value, 2);
    return (
      <span>{value}</span>
    );
  }
});

var Seconds = React.createClass({
  mixins: [Padable],
  render: function () {
    var value = this.pad(this.props.value, 2);
    return (
      <span>{value}</span>
    );
  }
});

var Period = React.createClass({
  render: function () {
    return (
      <span>{this.props.date.getHours() < 12 ? 'AM' : 'PM'}</span>
    );
  }
});

React.render(
  <Clock />,
  document.body
);