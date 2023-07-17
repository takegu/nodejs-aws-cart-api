import PostgreClient from './db.connect';
import { v4 as uuidv4 } from 'uuid';

async function insertMockCartItemsData() {
  const cartItems = [
    {
      cart_id: uuidv4(),
      product_id: uuidv4(),
      count: 2,
    },
    {
      cart_id: uuidv4(),
      product_id: uuidv4(),
      count: 1,
    },
    {
      cart_id: uuidv4(),
      product_id: uuidv4(),
      count: 3,
    },
  ];

  try {
    await PostgreClient('cart_items').insert(cartItems);
    console.log('Mock data inserted successfully');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  } finally {
    PostgreClient.destroy();
  }
}

const generateMockData = (count: number) => {
  const mockData = [];

  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const user_id = uuidv4();
    const created_at = new Date();
    const updated_at = new Date();
    const status = Math.random() < 0.5 ? 'OPEN' : 'ORDERED';

    mockData.push({
      id,
      user_id,
      created_at,
      updated_at,
      status,
    });
  }

  return mockData;
};

async function insertMockOrdersData(): Promise<void> {
  const mockData = generateMockData(10); // Generate 10 mock data entries

  try {
    await PostgreClient('carts').insert(mockData); // Insert mock data
    console.log('Mock data inserted successfully');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  } finally {
    PostgreClient.destroy();
  }
}

insertMockCartItemsData();
insertMockOrdersData();
