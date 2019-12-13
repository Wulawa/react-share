import React from 'react';
import { shallow, mount } from 'enzyme';
import Share from '../libs/index.js';

describe('share component', function() {
  let sharer;
  beforeEach(() => {
    sharer = mount(<Share />);
  });
  it('should render without throwing an error', function() {
    expect(shallow(<Share />).contains(<div className="social-share"></div>)).toBe(true);
  });

  it('should be selectable by class "foo"', function() {
    expect(shallow(<Share />).is('.social-share')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(sharer.find('.social-share').length).toBe(1);
  });
});
