export class RestaurantNotFoundError extends Error {
  constructor(id: number) {
    super(`Restaurant ${id} not found`);
    this.name = 'RestaurantNotFoundError';
  }
}