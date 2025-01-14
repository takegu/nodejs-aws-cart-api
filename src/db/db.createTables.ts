import PostgreClient from './db.connect';

async function cartssTableUp() {
  try {
    await PostgreClient.schema.createTable('carts', (table) => {
      table.uuid('id').primary();
      table.uuid('user_id').notNullable();
      table.date('created_at').notNullable();
      table.date('updated_at').notNullable();
      table.enum('status', ['OPEN', 'ORDERED']).notNullable();

      console.log('Table carts created successfully!');
    });
  } catch (error) {
    console.error('Error carts creating table:', error);
  }
}

async function cartItemsTableUp() {
  try {
    await PostgreClient.schema.createTable('cart_items', (table) => {
      table.uuid('cart_id').references('id').inTable('carts').onDelete('CASCADE');
      table.uuid('product_id');
      table.integer('count').notNullable();
      table.primary(['cart_id', 'product_id']);

      console.log('Table cart_items created successfully!');

    });
  } catch (error) {
    console.error('Error cart_items creating table:', error);
  }
}

cartssTableUp();
cartItemsTableUp();
