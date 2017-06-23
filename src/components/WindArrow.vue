<template>
  <img appear src="/static/wind-arrow.svg" class="wind__arrow"
        :style="styles"
        :alt="getWindDirection(this.deg)"
        :title="getWindDirection(this.deg)" />
</template>

<script>
  export default {
    name: 'WindArrow',
    props: ['deg'],
    mounted() {
      // We're wrapping this in a setTimeout because we want there to be
      // a slight delay before the rotation animation starts
      window.setTimeout(() => {
        // We're offsetting by 90 due to browser rotation
        this.styles.transform = `rotate(${this.deg + 90}deg)`;
      }, 0);
    },
    data() {
      return {
        styles: {
          transform: 'rotate(0deg)',
        },
      };
    },
    methods: {
      /*  This takes the degrees of the wind and outputs a direction
       *  e.g. 0deg -> "North", 200deg -> "South by south west"
       *  See: https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
       */
      getWindDirection(deg) {
        let direction = '';

        if ((deg >= 354.38 && deg < 360) || deg <= 5.62) direction = 'North';
        else if (deg >= 5.63 && deg <= 16.87) direction = 'North by east';
        else if (deg >= 16.88 && deg <= 28.12) direction = 'North by northeast';
        else if (deg >= 28.13 && deg <= 39.37) direction = 'Northeast by north';
        else if (deg >= 39.38 && deg <= 50.62) direction = 'Northeast';
        else if (deg >= 50.63 && deg <= 61.87) direction = 'Northeast by east';
        else if (deg >= 61.88 && deg <= 73.12) direction = 'East northeast';
        else if (deg >= 73.13 && deg <= 84.37) direction = 'East by north';
        else if (deg >= 84.38 && deg <= 95.62) direction = 'East';
        else if (deg >= 95.63 && deg <= 106.87) direction = 'East by south';
        else if (deg >= 106.88 && deg <= 118.12) direction = 'East southeast';
        else if (deg >= 118.13 && deg <= 129.37) direction = 'Southeast by east';
        else if (deg >= 129.38 && deg <= 140.62) direction = 'Southeast';
        else if (deg >= 140.63 && deg <= 151.87) direction = 'Southeast by south';
        else if (deg >= 151.88 && deg <= 163.12) direction = 'South southeast';
        else if (deg >= 163.13 && deg <= 174.37) direction = 'South by east';
        else if (deg >= 174.38 && deg <= 185.62) direction = 'South';
        else if (deg >= 185.63 && deg <= 196.87) direction = 'South by west';
        else if (deg >= 196.88 && deg <= 208.12) direction = 'South southwest';
        else if (deg >= 208.13 && deg <= 219.37) direction = 'Southwest by south';
        else if (deg >= 219.38 && deg <= 230.62) direction = 'Southwest';
        else if (deg >= 230.63 && deg <= 241.87) direction = 'Southwest by west';
        else if (deg >= 241.88 && deg <= 253.12) direction = 'West southwest';
        else if (deg >= 253.13 && deg <= 264.37) direction = 'West by south';
        else if (deg >= 264.38 && deg <= 275.62) direction = 'West';
        else if (deg >= 275.63 && deg <= 286.87) direction = 'West by north';
        else if (deg >= 286.88 && deg <= 298.12) direction = 'West northwest';
        else if (deg >= 298.13 && deg <= 309.37) direction = 'Northwest by west';
        else if (deg >= 309.38 && deg <= 320.62) direction = 'Northwest';
        else if (deg >= 320.63 && deg <= 331.87) direction = 'Northwest by north';
        else if (deg >= 331.88 && deg <= 343.12) direction = 'North northwest';
        else if (deg >= 343.13 && deg <= 354.37) direction = 'North by west';
        else direction = 'Error: No wind direction found';

        return direction;
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
