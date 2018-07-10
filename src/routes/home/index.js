import React, { Component } from 'react';
import { connect } from 'dva';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>hello dva</div>
    );
  }
}

export default connect()(Home);
