import React from 'react';
import './Reminder.css';
import { Popover, Alert } from 'antd';
import NewReminder from './NewReminder';
import { reminderTimeFormat } from '../helpers/time';
import axios from 'axios';
import { CoordinatesURL, APIKEY, CityURL, WeatherIconURL } from '../env/weather';

export default class Reminder extends React.Component {
  state = {
    visible: false,
    weather: '',
    icon: '',
  };

  componentDidMount() {
    const URL = CoordinatesURL;
    const KEY = APIKEY;
    const CITY = this.props.reminder.city;
    let weatherDescription = '';
    let icon = '';
    axios
      .get(URL, {
        params: {
          q: CITY,
          appid: KEY,
        },
      })
      .then(({ data }) => {
        const URL = CityURL;
        const { lon, lat } = data.coord;
        const exclude = 'current,hourly,minutely';
        return axios.get(URL, {
          params: {
            lat,
            lon,
            exclude,
            appid: KEY,
          },
        });
      })
      .then(({ data }) => {
        const URL = WeatherIconURL;
        const ICN = data.daily[0].weather[0].icon;
        weatherDescription = data.daily[0].weather[0].description;
        icon = `${URL}${ICN}@2x.png`;
      })
      .catch(error => {
        console.error(error);
        weatherDescription = 'NOT AVAILABLE';
      })
      .finally(() => {
        this.setState({ weather: weatherDescription, icon });
      });
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleDayClick = ev => {
    ev.stopPropagation();
  };

  onDelete = () => {
    this.props.onDelete(this.props.reminder.id, this.props.reminder.time);
  };

  handleOnSubmit = () => {
    this.setState({ visible: false });
  };

  render() {
    const reminder = this.props.reminder;
    const { weather, icon } = this.state;
    return (
      <Popover
        content={<NewReminder reminder={reminder} onSubmit={this.handleOnSubmit} />}
        title='Title'
        trigger='click'
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        destroyTooltipOnHide={true}
      >
        <Alert
          message={
            <div>
              {reminder.text}Time:{reminderTimeFormat(reminder.time)}City:{reminder.city}Weather:{weather}
              <image className='weather-image' src={icon} />
            </div>
          }
          type='success'
          onClick={this.handleDayClick}
          closable
          afterClose={this.onDelete}
          style={{ backgroundColor: reminder.color }}
        />
      </Popover>
    );
  }
}
