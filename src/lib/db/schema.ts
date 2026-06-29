import { neon, neonConfig } from '@neondatabase/serverless';

// Configure Neon for serverless
neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);

/**
 * Initialize database schema for Silverstone Logistics
 * Tables:
 * - users (admin, drivers, customers)
 * - drivers (driver profiles)
 * - vehicles (fleet)
 * - shipments (orders)
 * - locations (tracking points)
 * - driver_assignments (shipment to driver mapping)
 */

export async function initializeDatabase() {
  try {
    // Create Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'driver', 'customer')),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `;

    // Create Drivers table
    await sql`
      CREATE TABLE IF NOT EXISTS drivers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        license_number VARCHAR(50) UNIQUE NOT NULL,
        license_expiry DATE NOT NULL,
        vehicle_id UUID,
        status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'on_duty', 'off_duty', 'inactive')),
        total_shipments INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 5.0,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create Vehicles table
    await sql`
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        license_plate VARCHAR(50) UNIQUE NOT NULL,
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        vehicle_type VARCHAR(50) NOT NULL CHECK (vehicle_type IN ('van', 'truck', 'bike', 'car')),
        capacity_kg INT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
        current_driver_id UUID REFERENCES drivers(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create Shipments table
    await sql`
      CREATE TABLE IF NOT EXISTS shipments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tracking_number VARCHAR(50) UNIQUE NOT NULL,
        sender_name VARCHAR(255) NOT NULL,
        sender_phone VARCHAR(20) NOT NULL,
        sender_address TEXT NOT NULL,
        sender_city VARCHAR(100) NOT NULL,
        sender_postal_code VARCHAR(20),
        recipient_name VARCHAR(255) NOT NULL,
        recipient_phone VARCHAR(20) NOT NULL,
        recipient_address TEXT NOT NULL,
        recipient_city VARCHAR(100) NOT NULL,
        recipient_postal_code VARCHAR(20),
        weight_kg DECIMAL(10,2),
        status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled')),
        priority VARCHAR(50) NOT NULL DEFAULT 'standard' CHECK (priority IN ('standard', 'express', 'overnight')),
        cost DECIMAL(10,2) NOT NULL,
        driver_id UUID REFERENCES drivers(id),
        vehicle_id UUID REFERENCES vehicles(id),
        estimated_delivery DATE,
        actual_delivery DATE,
        customer_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create Locations (Tracking Points) table
    await sql`
      CREATE TABLE IF NOT EXISTS locations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
        latitude DECIMAL(10,8) NOT NULL,
        longitude DECIMAL(11,8) NOT NULL,
        location_name VARCHAR(255),
        status VARCHAR(50) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create Driver Assignments table
    await sql`
      CREATE TABLE IF NOT EXISTS driver_assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
        shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP,
        status VARCHAR(50) NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'picked_up', 'in_progress', 'completed', 'cancelled')),
        UNIQUE(driver_id, shipment_id)
      )
    `;

    // Create indexes for better query performance
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_drivers_user_id ON drivers(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON vehicles(license_plate)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_shipments_driver_id ON shipments(driver_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_locations_shipment_id ON locations(shipment_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_driver_assignments_driver_id ON driver_assignments(driver_id)`;

    console.log('✅ Database schema initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

export { sql };
