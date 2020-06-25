import React from 'react';
import './Day.css';
import { Popover, Alert } from 'antd';
import NewReminder from './NewReminder';

export default class Reminder extends React.Component {
  state = {
    visible: false,
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleDayClick = ev => {
    ev.stopPropagation();
  };

  onDelete = () => {

  };

  render() {
    return (
      <Popover
        content={<NewReminder reminder={this.props.reminder} />}
        title='Title'
        trigger='click'
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Alert
          message={this.props.reminder.text}
          type='success'
          onClick={this.handleDayClick}
          closable
          closeText='Delete ME'
          afterClose={this.onDelete}
        />
      </Popover>
    );
  }
}
