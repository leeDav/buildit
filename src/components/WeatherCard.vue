<template>
  <article class="weather__card">
    <h4 class="weather__card-time">{{ info.dt_txt.split(' ')[1] }}</h4>
    <h3 class="weather__card-title">{{ info.weather[0].main }}</h3>
    <h4 class="weather__card-desc">{{ info.weather[0].description }}</h4>
    <template v-if="info.weather[0].main != '-'">
      <img :src="'http://openweathermap.org/img/w/' + info.weather[0].icon + '.png'" />
      <h2 class="weather__card-temp">{{ Math.round(info.main.temp) }}<sup>o</sup>C</h2>
      <WindArrow :deg="info.wind.deg"></WindArrow>
    </template>
    <template v-else>
      <h4>-</h4>
    </template>
  </article>
</template>

<script>
  import WindArrow from './WindArrow';

  export default {
    name: 'WeatherCard',
    props: ['info'],
    components: {
      WindArrow,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weather__card {
    background-color: white;
    /*border: 1px solid black;*/
    line-height: 1.5;
    width: 200px;
    float: left;
  }

  img {
    vertical-align: middle;
  }

  h2,
  h3,
  h4 {
    margin: 0;
  }

  .wind__arrow {
    height: 20px;
    width: 20px;
    margin: 0 10px;
    transition: 750ms transform cubic-bezier(.5,1.9,.44,1.2);
    transform: rotate(0deg);
  }

  .weather__card-time {
    background-color: #ccc;
  }

  .weather__card-temp {
    display: inline-block;
    font-weight: 300;
  }

  .weather__card-title {
    margin: 0;
  }

  .weather__card-desc {
    font-weight: 300;
    margin-top: 0;
  }
</style>
