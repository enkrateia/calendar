import React from 'react';
import './Day.css'
import { Popover, Button } from 'antd';

export default class Day {

  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleDayClick = () => {

  }

  render() {
    return (<div className="day-container" onclick={this.handleDayClick}>
      <Popover
        content={<a onClick={this.hide}>Close</a>}
        title="Title"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        {/* <Button type="primary">Click me</Button> */}
        <div className="header">)
      {this.props.day.numberDay}
        </div >
      </Popover>
    </div >
    )
  }
}
