import Vue from 'vue';
import App from '@/App';

import moxios from 'moxios';

// This fixes a known bug with webpack 2.6 not polyfilling promises
// see: https://github.com/webpack/webpack/issues/4916
import 'core-js';

describe('try and load some data from somewhere', () => {
  let MOCK_RESPONSE = {};

  beforeEach(() => {
    moxios.install();

    MOCK_RESPONSE = {
      cod: '200',
      list: [
        {
          dt: 1497441600,
          main: { temp: 25.5 },
          weather: [{ main: 'clouds', icon: '02d' }],
          wind: { speed: 6.31, deg: 301 },
          dt_txt: '2017-06-14 18:00:00',
        },
        {
          dt: 1497452400,
          main: { temp: 26 },
          weather: [{ main: 'sun', icon: '01d' }],
          wind: { speed: 4, deg: 200 },
          dt_txt: '2017-06-14 21:00:00',
        },
        {
          dt: 1497452400,
          main: { temp: 15 },
          weather: [{ main: 'sun', icon: '01d' }],
          wind: { speed: 4, deg: 200 },
          dt_txt: '2017-06-15 00:00:00',
        },
      ],
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('has a created hook', () => {
    expect(typeof App.created).to.equal('function');
  });

  it('has data with default values', () => {
    expect(typeof App.data).to.equal('function');

    const WEATHER = App.data().weather;
    expect(WEATHER).to.have.length(0);
    expect(Array.isArray(WEATHER)).to.equal(true);
  });

  it('should populate the weather variable with data', (done) => {
    const VM = new Vue(App);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: MOCK_RESPONSE,
      }).then(() => {
        expect(VM.$data.weather).to.have.length(2);
        done();
      });
    });
  });

  it('should return an error if the status code is not 200', (done) => {
    const VM = new Vue(App);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: '',
      }).then(() => {
        expect(VM.$data.weather).to.be.an('error');
        done();
      });
    });
  });

  it('should return the number of quarterly segments to add', () => {
    const VM = new Vue(App);

    let result = VM.addHoursToArray('2017-06-14 00:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(0);

    result = VM.addHoursToArray('2017-06-14 03:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(1);

    result = VM.addHoursToArray('2017-06-14 06:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(2);

    result = VM.addHoursToArray('2017-06-14 09:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(3);

    result = VM.addHoursToArray('2017-06-14 12:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(4);

    result = VM.addHoursToArray('2017-06-14 15:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(5);

    result = VM.addHoursToArray('2017-06-14 18:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(6);

    result = VM.addHoursToArray('2017-06-14 21:00:00');
    expect(result).to.be.a('number');
    expect(result).to.equal(7);
  });

  it('should add the correct number of elements to the beginning of an array', () => {
    const VM = new Vue(App);

    VM.$data.weather = MOCK_RESPONSE;
    expect(VM.$data.weather.list).to.have.length(3);

    VM.prependToArray(VM.$data.weather.list, 2);
    expect(VM.$data.weather.list).to.have.length(5);

    VM.prependToArray(VM.$data.weather.list, 5);
    expect(VM.$data.weather.list).to.have.length(10);

    VM.prependToArray(VM.$data.weather.list, 0);
    expect(VM.$data.weather.list).to.have.length(10);
  });

  it('should take an array of dates and create a multidimensional array based on days', () => {
    const VM = new Vue(App);

    VM.$data.weather = MOCK_RESPONSE;
    expect(VM.$data.weather.list).to.have.length(3);

    const toAdd = VM.addHoursToArray(VM.$data.weather.list[0].dt_txt);
    expect(toAdd).to.be.a('number');
    expect(toAdd).to.equal(6);

    const results = VM.prependToArray(VM.$data.weather.list, toAdd);
    expect(results).to.have.length(9);

    const check = VM.splitArray(VM.$data.weather.list);
    expect(check.length).to.equal(2);
    expect(check[0].length).to.equal(8);
  });

  it('should convert a string in to a valid date format', () => {
    const VM = new Vue(App);
    const dateTest = '2017-06-14 18:00:00';
    expect(VM.dateFromString(dateTest)).to.be.a('String');
    expect(VM.dateFromString(dateTest)).to.equal('Wed Jun 14 2017');
  });
});
