<template>
  <div id="app">
    <article class="day" v-for="day in weather">
        <h1 class="day__header">
          <time :datetime="day[day.length - 1].dt_txt.split(' ')[0]" tabindex="0">
            {{ dateFromString(day[day.length - 1].dt_txt) }}
          </time>
        </h1>
        <div class="day__row">
          <div class="day__row-days">
            <WeatherCard v-for="hour in day" :key="hour.dt" :info="hour"></WeatherCard>
          </div>
        </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

export default {
  name: 'app',
  data() {
    return {
      API: 'http://api.openweathermap.org/data/2.5/forecast',
      API_APP_KEY: 'aeaaec3638e18d0b509126c2c7410f01',
      API_CITY_ID: 2618425, // Geo-coded from response, 2618425 = Copenhagen, Denmark
      weather: [],
      EMPTY_SET: { // Empty response object
        main: {
          temp: '-',
        },
        weather: [{
          main: '-',
          description: '-',
        }],
        wind: {
          deg: '-',
        },
        dt_txt: '',
      },
    };
  },
  created() {
    this.getData();
  },
  components: {
    WeatherCard,
  },
  methods: {
    dateFromString(stringDate) {
      const dateTimeFragment = stringDate.split(' ');
      const [year, month, day] = dateTimeFragment[0].split('-');
      const [hour, min, sec] = dateTimeFragment[1].split(':');
      // We substract one month because JavaScripts months are 0-indexed...
      return new Date(year, month - 1, day, hour, min, sec).toDateString();
    },
    getData() {
      return axios.get(this.API, {
        params: {
          id: this.API_CITY_ID,
          appid: this.API_APP_KEY,
          units: 'metric',
        } })
        .then((response) => {
          this.weather = this.formatResults(response);
        })
        .catch((error) => {
          this.weather = new Error(error);
        });
    },

    formatResults(response) {
      const result = response;
      // First we pad the first day with hours the forecast skips
      // e.g. time is now 13:30 and the forecast will not report on
      // 12pm, 9am, 6am, and 3am so we pad with empty elements
      const toAdd = this.addHoursToArray(response.data.list[0].dt_txt);
      // Then let's split the array in to 8 chunks to represent
      // the eight "quarters" of the day (midnight-3am, 3am-6am, etc.)
      const results = this.splitArray(this.prependToArray(response.data.list, toAdd));
      // Reassign the new results array to the response
      result.data.list = results;
      return result.data.list;
    },

    /*
     * The API returns forecasts without the previous hours in the data, e.g.
     * if the time is now 9am, it won't show the forecast for 3am or 6am.
     * This function takes the date string, grabs the hour, and calculates
     * how many "quarterly" time frames we've missed, so we can add them to the
     * array and show "empty" time slots.
     *
     * So if the first array element is:
     * "2017-06-14 12:00:00" -> add 3 elements for 03:00, 06:00, and 09:00
     * "2017-06-14 00:00:00" -> add 0 elements because midnight is the first forecast time
    */
    addHoursToArray(dateAsString) {
      let toAdd = 0;
      const ELE = dateAsString.split(' ')[1].substr(0, 2);

      if (ELE === '03') toAdd = 1;
      else if (ELE === '06') toAdd = 2;
      else if (ELE === '09') toAdd = 3;
      else if (ELE === '12') toAdd = 4;
      else if (ELE === '15') toAdd = 5;
      else if (ELE === '18') toAdd = 6;
      else if (ELE === '21') toAdd = 7;

      return toAdd;
    },

    prependToArray(results, num) {
      const arr = results;
      for (let i = 0; i < num; i += 1) {
        // Object.create because we want to duplicate it, not reference it
        const newSet = Object.create(this.EMPTY_SET);
        let time = (num * 3) - (i * 3) - 3;
        // Pad the time with a leading zero; 3:00 -> 03:00
        time = `0${time}`.slice(-2);
        time = `00-00-00 ${time}:00:00`;
        newSet.dt_txt = time;
        arr.unshift(newSet);
      }
      return arr;
    },

    /*  As I want to display the forecast grouped by days, this function
     *  splits the array up in to chunks. Eight chunks/quarters per day.
     *  (midnight-3am, 3am-6am, 6am-9am, 9am-noon, noon-3pm, etc.)
     *  TODO: Check array is a multiple of @chunkSize before proceeding?
     *      (I admit this is a quick way, rather than checking each day)
    */
    splitArray(results, chunkSize = 8) {
      const tmpArray = [];
      for (let i = 0; i < results.length; i += chunkSize) {
        tmpArray.push(results.slice(i, i + chunkSize));
      }
      return tmpArray;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/variables';
@import './assets/scss/font-sizes';
@import './assets/scss/colours';
@import './assets/scss/resets';

body {
  background-color: $page;
  line-height: 1.5;
  margin: $base;
}

.day__header {
  @extend %font-xl;

  background-color: $primary;
  margin: 0;
}

.day {
  overflow: hidden;
  margin-bottom: 1rem;
}

// Yes "overflow-scrolling: touch" is hacky and not fully
// supported in most browsers. Obviously in production I
// would implement this properly with a JS library or
// proper touch/drag events, but to save time for this test,
// I've implemented it this way
.day__row {
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  width: 100%;
}

.day__row-days {
  background-color: $white;
  float: left;
  width: calc(200px * 8);
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
