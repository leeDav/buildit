import Vue from 'vue';
import WindArrow from '@/components/WindArrow';

describe('displaying a wind arrow', () => {
  it('should set the initial position to 0 degrees', () => {
    const VM = new Vue(WindArrow);
    expect(VM.$data.styles).to.be.an('object');
    expect(VM.$data.styles.transform).to.equal('rotate(0deg)');
  });

  it('should delay the arrow animation (setTimeout)', () => {
    const clock = sinon.useFakeTimers();

    const Ctor = Vue.extend(WindArrow);
    const degTest = 50;
    const VM = new Ctor({ propsData: { deg: degTest } }).$mount();

    clock.tick(0);
    // Adding 90 due to compensating for the browser offset
    expect(VM.$data.styles.transform).to.equal(`rotate(${degTest + 90}deg)`);
  });

  it('should return the wind direction as words', () => {
    const VM = new Vue(WindArrow);

    expect(VM.getWindDirection(354.38)).to.equal('North');
    expect(VM.getWindDirection(0.00)).to.equal('North');
    expect(VM.getWindDirection(11.25)).to.equal('North by east');
    expect(VM.getWindDirection(22.50)).to.equal('North by northeast');
    expect(VM.getWindDirection(33.75)).to.equal('Northeast by north');
    expect(VM.getWindDirection(45.00)).to.equal('Northeast');
    expect(VM.getWindDirection(56.25)).to.equal('Northeast by east');
    expect(VM.getWindDirection(67.50)).to.equal('East northeast');
    expect(VM.getWindDirection(78.75)).to.equal('East by north');
    expect(VM.getWindDirection(90)).to.equal('East');
    expect(VM.getWindDirection(101.25)).to.equal('East by south');
    expect(VM.getWindDirection(112.5)).to.equal('East southeast');
    expect(VM.getWindDirection(123.75)).to.equal('Southeast by east');
    expect(VM.getWindDirection(135)).to.equal('Southeast');
    expect(VM.getWindDirection(146.25)).to.equal('Southeast by south');
    expect(VM.getWindDirection(157.5)).to.equal('South southeast');
    expect(VM.getWindDirection(168.75)).to.equal('South by east');
    expect(VM.getWindDirection(180)).to.equal('South');
    expect(VM.getWindDirection(191.25)).to.equal('South by west');
    expect(VM.getWindDirection(202.5)).to.equal('South southwest');
    expect(VM.getWindDirection(213.75)).to.equal('Southwest by south');
    expect(VM.getWindDirection(225)).to.equal('Southwest');
    expect(VM.getWindDirection(236.25)).to.equal('Southwest by west');
    expect(VM.getWindDirection(247.5)).to.equal('West southwest');
    expect(VM.getWindDirection(258.75)).to.equal('West by south');
    expect(VM.getWindDirection(270)).to.equal('West');
    expect(VM.getWindDirection(281.25)).to.equal('West by north');
    expect(VM.getWindDirection(292.5)).to.equal('West northwest');
    expect(VM.getWindDirection(303.75)).to.equal('Northwest by west');
    expect(VM.getWindDirection(315)).to.equal('Northwest');
    expect(VM.getWindDirection(326.25)).to.equal('Northwest by north');
    expect(VM.getWindDirection(337.5)).to.equal('North northwest');
    expect(VM.getWindDirection(348.75)).to.equal('North by west');
    expect(VM.getWindDirection(1000)).to.equal('Error: No wind direction found');
  });
});
