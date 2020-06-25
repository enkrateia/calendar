import React from 'react';
import './Day.css';
import { Popover } from 'antd';
import NewReminder from './NewReminder';
import Reminder from './Reminder';

export default class Day extends React.Component {
  state = {
    visible: false,
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    return (
      <Popover
        content={<NewReminder />}
        title='Title'
        trigger='click'
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className='day-container'>
          <div className='header'>
            {this.props.day.numberDay}
            {this.props.reminders &&
              this.props.reminders.map(reminder => <Reminder onDelete={this.props.onDelete} reminder={reminder} />)}
          </div>
        </div>
      </Popover>
    );
  }
}
