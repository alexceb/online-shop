import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CartItem, Product } from '../../src/typings/model';
import { NavigationProps, Nav } from '../../src/components/Nav/Nav';

const mockedCart: CartItem[] = [];
const mockedProps: NavigationProps = {
  cart: mockedCart,
}
const mockedProduct: Product = {
  id: 8,
  name: "Samsung 40 UHD Smart TV",
  brand: "SAMSUNG",
  price: "3200",
  available: true,
  weight: 8.2,
  options: [
    {
      color: "black",
      quantity: 19,
    }
  ],
};

const mockedCartItem: CartItem = {
  product: mockedProduct,
  quantity: 2,
  color: 'black',
  subOption: {
    optionType: null,
    optionValue: null,
  }
};

const mockedCartWithItems: CartItem[] = [mockedCartItem];

describe('Navigation component', () => {
  describe('render()', () => {
    const wrapper = shallow(<Nav {...mockedProps} />);
    test('Renders <Nav /> correctly', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Navigation is definde and has 2 nav links', () => {
      expect(wrapper.find('.navList')).toBeDefined();
      expect(wrapper.find('.navListItem')).toHaveLength(2);
    });

    test('Should display number of cart items next to Cart NavLink', () => {
      const wrapper = shallow(<Nav cart={mockedCartWithItems} />);

      expect(wrapper.find('NavLink').find('span')).toHaveLength(1);
    });
  });
});
