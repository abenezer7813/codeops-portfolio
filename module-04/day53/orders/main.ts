import { InMemoryOrderRepository, OrderService, OrderNotFoundError } from ".";

const service = new OrderService(new InMemoryOrderRepository(/* your seed orders */));
const names: string[] = service.summarise("customer");   // string[], not any[]
try {
  service.find(999);
} catch (err) {333 
  if (err instanceof OrderNotFoundError) console.error(`404 -> ${err.orderId}`);
  else console.error(String(err));

  
} 