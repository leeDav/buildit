<template>
  <article class="weather__card" tabindex="0">
    <h2 class="weather__card-time">
      <time>
        {{ info.dt_txt.split(' ')[1].slice(0, -3) }}
      </time>
    </h2>
    <h4 class="weather__card-desc">{{ info.weather[0].description }}</h4>
    <h3 class="weather__card-title">{{ info.weather[0].main }}</h3>
    <template v-if="info.weather[0].main != '-'">
      <img
        :src="'http://openweathermap.org/img/w/' + info.weather[0].icon + '.png'"
        class="weather__icon"
        aria-hidden="true"
        alt="Icon representing the weather" />
      <h2 class="weather__card-temp">{{ Math.round(info.main.temp) }}&deg;<abbr title="celcius">C</abbr></h2>
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
<style lang="scss" scoped>
  @import '../assets/scss/colours';
  @import '../assets/scss/font-sizes';

  .weather__card {
    float: left;
    width: 200px;

    &::after {
      clear: left;
    }
  }

  .wind__arrow {
    height: 20px;
    margin: 0 10px;
    transform: rotate(0deg);
    transition: 750ms transform cubic-bezier(.5,1.9,.44,1.2);
    width: 20px;
  }

  .weather__card-time {
    @extend %font-m;

    background-color: $secondary;
  }

  .weather__card-temp {
    @extend %font-l;

    display: inline-block;
    font-weight: 300;
  }

  .weather__card-title {
    @extend %font-l;

    margin: 0;
  }

  .weather__card-desc {
    @extend %font-m;

    font-weight: 300;
    margin-top: 0;
  }

  .weather__icon {
    vertical-align: middle;
  }
</style>
