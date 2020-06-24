import React from 'react';
// import './NewReminder.css'
import { Input, DatePicker } from 'antd';
import { GithubPicker } from 'react-color'


export default class NewReminder extends React.Component {

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

  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk(value) {
    console.log('onOk: ', value);
  }

  render() {
    return (
      <>
        <Input placeholder="Basic usage" />
        <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
        <GithubPicker></GithubPicker>
      </>
    )
  }
}





