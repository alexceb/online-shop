import { _getProducts } from './_DATA';

function getProducts(): Promise<Array<any>> {
  return _getProducts();
}

export const api = {
  getProducts,
};
