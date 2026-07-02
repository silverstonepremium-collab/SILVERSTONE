import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

// GET - List all shipments or get by tracking number
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('tracking_number');
    const status = searchParams.get('status');
    const driverId = searchParams.get('driver_id');

    let query = 'SELECT * FROM shipments WHERE 1=1';
    const params: any[] = [];

    if (trackingNumber) {
      query += ' AND tracking_number = $' + (params.length + 1);
      params.push(trackingNumber);
    }
    if (status) {
      query += ' AND status = $' + (params.length + 1);
      params.push(status);
    }
    if (driverId) {
      query += ' AND driver_id = $' + (params.length + 1);
      params.push(driverId);
    }

    query += ' ORDER BY created_at DESC LIMIT 100';

    const shipments = await sql(query, ...params);

    return NextResponse.json({
      success: true,
      data: shipments,
      count: shipments.length,
    });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipments' },
      { status: 500 }
    );
  }
}

// POST - Create a new shipment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tracking_number,
      sender_name,
      sender_phone,
      sender_address,
      sender_city,
      sender_postal_code,
      recipient_name,
      recipient_phone,
      recipient_address,
      recipient_city,
      recipient_postal_code,
      weight_kg,
      priority = 'standard',
      cost,
      customer_id,
      estimated_delivery,
    } = body;

    // Validate required fields
    if (
      !tracking_number ||
      !sender_name ||
      !sender_phone ||
      !sender_address ||
      !recipient_name ||
      !recipient_phone ||
      !recipient_address ||
      !cost
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const shipment = await sql`
      INSERT INTO shipments (
        tracking_number,
        sender_name,
        sender_phone,
        sender_address,
        sender_city,
        sender_postal_code,
        recipient_name,
        recipient_phone,
        recipient_address,
        recipient_city,
        recipient_postal_code,
        weight_kg,
        priority,
        cost,
        customer_id,
        estimated_delivery,
        status
      ) VALUES (
        ${tracking_number},
        ${sender_name},
        ${sender_phone},
        ${sender_address},
        ${sender_city},
        ${sender_postal_code},
        ${recipient_name},
        ${recipient_phone},
        ${recipient_address},
        ${recipient_city},
        ${recipient_postal_code},
        ${weight_kg},
        ${priority},
        ${cost},
        ${customer_id},
        ${estimated_delivery},
        'pending'
      )
      RETURNING *
    `;

    return NextResponse.json(
      { success: true, data: shipment[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}
