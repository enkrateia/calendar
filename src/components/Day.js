import React from 'react';
import './Day.css'
import { Popover } from 'antd';
import NewReminder from './NewReminder';

export default class Day extends React.Component {

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
    return (
      <Popover
        content={<NewReminder/>}
        title="Title"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className="day-container" onClick={this.handleDayClick}>
          {/* <Button type="primary">Click me</Button> */}
          <div className="header">
            {this.props.day.numberDay}
          </div >
        </div >
      </Popover>
    )
  }
}
