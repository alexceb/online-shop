import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

import { CheckoutProps } from '../../src/components/Checkout/Checkout';
import CheckoutContainer from '../../src/containers/Checkout';
import { CartItem, Product } from '../../src/typings/model';

const mockStore = configureMockStore();

describe('Checkout page component', () => {

  beforeEach(() => {
    const store = mockStore({
      cart: [],
      total: 0,
    });
  })

  describe('render()', () => {
    test('Renders <Checkout /> correctly', () => {
      const products: Product[] = [];
      const cart: CartItem[] = [];
      const total: number = 0;
      const wrapper = shallow(<CheckoutContainer cart={cart} products={products} total={total} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});