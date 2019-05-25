import { _getProducts, _getProductById } from './_DATA';
import { Product } from '../typings/model';

function getProducts(): Promise<Array<Product>> {
  return _getProducts();
}

function getProductById(id: number): Promise<Product> {
  return _getProductById(id);
}

export const api = {
  getProducts,
  getProductById,
};
