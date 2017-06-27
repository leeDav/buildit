# buildit

> Tech test for BuildIt

[![CircleCI](https://img.shields.io/circleci/project/github/leeDav/buildit.svg)](https://circleci.com/gh/leeDav/buildit) [![codecov](https://codecov.io/gh/leeDav/buildit/branch/master/graph/badge.svg)](https://codecov.io/gh/leeDav/buildit)

Shows the weather for Copenhagen, Denmark.

## Brief set up instructions
1. `npm install` or `yarn` (if you have yarn installed)
2. `npm run dev` or `yarn dev` to run development server (or `npm build` to build dist)
3. `npm run test` or `yarn test` to run unit and e2e tests
3a. `npm run [unit/e2e]` or `yarn [unit/e2e]` to run individually
4. Enjoy!

## What could be done with more time
More accessibility. Tabbed navigation has been added, but I feel like more could be done, especially with ARIA.

Auto-scroll to the current time of the day, so the user doesn't have to scroll.

More user-friendly dates, e.g. "Wednesday, June 28th" instead of "Wed Jun 28"

### Known bug
Sometimes the forecast doesn't run up to midnight on the fifth day, leaving empty time sections. This could be fixed by checking the fifth days array has eight elements, and `arr.push()`'ing empty times if not, similar to how we prepend empty time objects on the first day when the forecast no longer applies.

## Build Setup
Below lists the default instructions written by VueCLI. If you have Yarn installed,
you can use that instead, such as `yarn` instead of `npm install`.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
