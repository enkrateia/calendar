import React from 'react';
import './Day.css';
import { Popover } from 'antd';
import NewReminder from './NewReminder';
import Reminder from './Reminder';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteReminder, deleteRemindersDay } from '../redux/actions';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { getTimeFormatted } from '../helpers/time';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleOnSubmit = () => {
    this.setState({ visible: false });
  };

  handleDeleteAll = () => {
    const day = this.props.day.moment;
    this.props.deleteRemindersDay(day);
  };

  sortReminders = (a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  };

  render() {
    const dayFormatted = getTimeFormatted(this.props.day.moment);
    const reminders = this.props.reminders[dayFormatted] || [];
    const time = moment(this.props.day.moment);
    const sortedReminders = reminders.sort(this.sortReminders);

    return (
      <div className='day-container'>
        <div className='day-header'>
          {this.props.day.moment.date()}
          {reminders.length !== 0 && <CloseCircleTwoTone onClick={this.handleDeleteAll} />}
        </div>
        <Popover
          content={<NewReminder reminder={{ time }} onSubmit={this.handleOnSubmit} />}
          title='Title'
          trigger='click'
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          destroyTooltipOnHide={true}
        >
          <div className='day-inside-container'>
            {sortedReminders.map(reminder => (
              <Reminder onDelete={this.props.deleteReminder} reminder={reminder} />
            ))}
          </div>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reminders: state.reminders,
});

const mapDispatchToProps = dispatch => ({
  deleteReminder: (id, time) => dispatch(deleteReminder(id, time)),
  deleteRemindersDay: day => dispatch(deleteRemindersDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Day);
