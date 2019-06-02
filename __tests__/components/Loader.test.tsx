import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Loader } from '../../src/components/Loader/Loader';

describe('Loader component', () => {
  describe('render()', () => {
    test('Renders <Loader /> correctly', () => {
      const wrapper = shallow(<Loader />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Contains certain elements', () => {
      const wrapper = shallow(<Loader />);

      expect(wrapper.find('.loaderContainer')).toHaveLength(1);
    })
  });
});
