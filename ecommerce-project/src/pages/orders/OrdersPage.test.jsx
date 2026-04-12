import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { OrdersPage } from './OrdersPage';

vi.mock('axios');

describe('OrdersPage component', () => {
  let loadCart;

  const mockOrders = [
    {
      id: 'order-123',
      orderTime: '2023-10-01T10:00:00Z',
      totalCostCents: 3500,
      products: [
        {
          product: {
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
            image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
          },
          estimatedDeliveryTimeMs: 1700000000000,
          quantity: 1,
        },
      ],
    },
    {
      id: 'order-456',
      orderTime: '2023-10-02T12:00:00Z',
      totalCostCents: 2095,
      products: [
        {
          product: {
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            name: 'Intermediate Size Basketball',
            image: 'images/products/intermediate-composite-basketball.jpg',
          },
          estimatedDeliveryTimeMs: 1700100000000,
          quantity: 2,
        },
      ],
    },
  ];

  beforeEach(() => {
    loadCart = vi.fn();
    vi.clearAllMocks();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/orders?expand=products') {
        return { data: mockOrders };
      }
    });
  });

  it('renders the page title and header', async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Your Orders')).toBeInTheDocument();
  });

  it('fetches and displays the correct number of orders', async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainers = await screen.findAllByTestId('order-container');
    expect(orderContainers.length).toBe(2);
  });

  it('displays the orders and product names correctly', async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainers = await screen.findAllByTestId('order-container');
    expect(orderContainers.length).toBe(2);

    expect(
      within(orderContainers[0]).getByText(/order-123/i),
    ).toBeInTheDocument();
    expect(
      within(orderContainers[0]).getByText(
        /Black and Gray Athletic Cotton Socks/i,
      ),
    ).toBeInTheDocument();

    expect(
      within(orderContainers[1]).getByText(/order-456/i),
    ).toBeInTheDocument();
    expect(
      within(orderContainers[1]).getByText(/Intermediate Size Basketball/i),
    ).toBeInTheDocument();
  });

  it('handles empty orders gracefully', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <OrdersPage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Your Orders')).toBeInTheDocument();

    const orderContainers = screen.queryAllByTestId('order-container');
    expect(orderContainers.length).toBe(0);
  });
});
