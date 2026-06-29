export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  IN_TRANSIT: 'in-transit',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;

export const DRIVER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'on-leave',
} as const;

export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in-use',
  MAINTENANCE: 'maintenance',
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
