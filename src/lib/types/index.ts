export interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'failed';
  origin: string;
  destination: string;
  createdAt: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status: 'active' | 'inactive' | 'on-leave';
  assignedVehicle?: string;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: 'van' | 'truck' | 'motorcycle';
  capacity: number;
  status: 'available' | 'in-use' | 'maintenance';
  assignedDriver?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Route {
  id: string;
  name: string;
  waypoints: string[];
  distance: number;
  estimatedDuration: number;
  assignedVehicle?: string;
}
