import React from 'react';
// import './NewReminder.css'
import { Input, DatePicker, Button } from 'antd';
import { GithubPicker } from 'react-color';
import { connect } from 'react-redux';
import { createReminder } from '../redux/actions';

class NewReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: {
        text: props.reminder.text,
        color: props.reminder.color,
        city: props.reminder.city,
        time: props.reminder.time,
      },
    };
  }

  handleSubmission = e => {
    e.preventDefault();
    this.props.dispatch(createReminder(this.state.reminder));
    this.setState({
      reminder: {
        text: '',
        color: '',
        city: '',
        time: '',
      },
    }); // TODO: THIS IS WRONG
  };

  onColorChange = color => {
    this.setState(state => ({ reminder: { ...state.reminder, color: color.hex } }));
  };

  onChange = (e, date) => {
    if (date) {
      this.setState(state => ({ reminder: { ...state.reminder, time: e } }));
    } else {
      e.preventDefault();
      const value = e.target.value;
      if (e.target.id === 'text') {
        this.setState(state => ({ reminder: { ...state.reminder, text: value } }));
      } else if (e.target.id === 'city') {
        this.setState(state => ({ reminder: { ...state.reminder, city: value } }));
      }
    }
  };

  render() {
    const { text, color, city, time } = this.state.reminder;
    return (
      <>
        <form>
          <Input placeholder='Basic usage' value={text} id='text' onChange={this.onChange} />
          <Input placeholder='City' value={city} id='city' onChange={this.onChange} />
          <DatePicker showTime value={time} onChange={this.onChange} />
          <GithubPicker color={color} id='color' onChangeComplete={this.onColorChange}></GithubPicker>
          <Button type='primary' onClick={this.handleSubmission}>
            Create Reminder
          </Button>
        </form>
      </>
    );
  }
}

NewReminder.defaultProps = {
  reminder: {
    text: '',
    color: '',
    city: '',
    time: '',
  },
};

export default connect()(NewReminder);
