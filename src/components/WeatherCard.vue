<template>
  <article class="weather__card">
    <h4 class="weather__card-time">{{ info.dt_txt.split(' ')[1] }}</h4>
    <h3 class="weather__card-title">{{ info.weather[0].main }}</h3>
    <h4 class="weather__card-desc">{{ info.weather[0].description }}</h4>
    <template v-if="info.weather[0].main != '-'">
      <img :src="'http://openweathermap.org/img/w/' + info.weather[0].icon + '.png'" />
      <h2 class="weather__card-temp">{{ Math.round(info.main.temp) }}<sup>o</sup>C</h2>
      <img appear src="/static/wind-arrow.svg" class="wind__arrow"
            :style="styles"
            alt="Wind direction, north by north west" />
    </template>
    <template v-else>
      <h4>-</h4>
    </template>
  </article>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: ['info'],
  mounted() {
    // We're wrapping this in a setTimeout because we want there to be
    // a split second delay before the rotation animation starts
    setTimeout(() => {
      this.styles.transform = `rotate(${this.info.wind.deg}deg)`;
    }, 0);
  },
  data() {
    return {
      styles: {
        transform: 'rotate(90deg)',
      },
    };
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
