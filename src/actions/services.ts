import { api } from '../utils/api';

export function getInitialData() {
  return api.getProducts();
}