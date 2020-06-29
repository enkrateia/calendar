import React from 'react';
// import './NewReminder.css'
import { Input, DatePicker, Button, TimePicker } from 'antd';
import { GithubPicker } from 'react-color';
import { connect } from 'react-redux';
import { createReminder, editReminder } from '../redux/actions';
import { timerFormatWithoutSeconds } from '../helpers/time';
import moment from 'moment';

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
    const id = this.props.reminder.id;
    if (id === undefined) this.props.dispatch(createReminder(this.state.reminder));
    else this.props.dispatch(editReminder({ id, ...this.state.reminder }));
    this.props.onSubmit();
  };

  onColorChange = color => {
    this.setState(state => ({ reminder: { ...state.reminder, color: color.hex } }));
  };

  onChange = (e, date) => {
    if (date) {
      this.setState(state => ({ reminder: { ...state.reminder, time: e } }));
    } else {
      const value = e.target.value;
      if (e.target.id === 'text') {
        this.setState(state => ({ reminder: { ...state.reminder, text: value } }));
      } else if (e.target.id === 'city') {
        this.setState(state => ({ reminder: { ...state.reminder, city: value } }));
      }
    }
  };

  onChangeTime = e => {
    const reminderTime = this.state.reminder.time;
    const date = moment(reminderTime).hour(e.hour()).minute(e.minute());
    this.setState(state => ({ reminder: { ...state.reminder, time: date } }));
  };

  render() {
    const { text, color, city, time } = this.state.reminder;
    const { id } = this.props.reminder;
    return (
      <>
        <form>
          <Input placeholder='Basic usage' value={text} id='text' onChange={this.onChange} />
          <Input placeholder='City' value={city} id='city' onChange={this.onChange} />
          <div>
            <DatePicker onChange={this.onChange} value={time} disabled allowClear={false} />
            <TimePicker
              onChange={this.onChangeTime}
              value={time}
              format={timerFormatWithoutSeconds}
              allowClear={false}
            />
          </div>
          <GithubPicker color={color} id='color' onChangeComplete={this.onColorChange}></GithubPicker>
          <Button type='primary' onClick={this.handleSubmission}>
            {id !== undefined ? 'Edit Reminder' : 'Create Reminder'}
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
