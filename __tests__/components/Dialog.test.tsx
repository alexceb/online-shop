import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Dialog, DialogProps } from '../../src/components/Dialog/Dialog';

describe('Dialog notification component', () => {
  describe('render()', () => {
    test('Renders <Dialog /> correctly', () => {
      const props: DialogProps = {
        visible: true,
        onGoShopping: jest.fn(),
        onGoCart: jest.fn(),
      };
      const wrapper = shallow(<Dialog {...props} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('It renders message to the user', () => {
      const props: DialogProps = {
        visible: true,
        onGoShopping: jest.fn(),
        onGoCart: jest.fn(),
      };
      const wrapper = shallow(<Dialog {...props} />);
      const expectedMessage = 'You successfully added product to cart';

      expect(wrapper.find('.dialogMessage').text()).toBe(expectedMessage);
    });
  });

  describe('It should call a function on button click', () => {
    test('It should invoke onGoShopping function on button click', () => {
      const props: DialogProps = {
        visible: true,
        onGoShopping: jest.fn(),
        onGoCart: jest.fn(),
      };
      const wrapper = shallow(<Dialog {...props} />);

      wrapper.find('button.continueShopping').simulate('click');

      expect(props.onGoShopping).toHaveBeenCalled();
    });

    test('It should invoke onGoToCart function on button click', () => {
      const props: DialogProps = {
        visible: true,
        onGoShopping: jest.fn(),
        onGoCart: jest.fn(),
      };
      const wrapper = shallow(<Dialog {...props} />);

      wrapper.find('button.cartButton').simulate('click');

      expect(props.onGoCart).toHaveBeenCalled();
    })
  });

  describe('Render with visible set to false', () => {
    test('It should not render dialog content if visible set to false', () => {
      const props: DialogProps = {
        visible: false,
        onGoShopping: jest.fn(),
        onGoCart: jest.fn(),
      };
      const wrapper = shallow(<Dialog {...props} />);

      expect(wrapper.find('.dialogContainer')).toHaveLength(0);
    });
  });
});