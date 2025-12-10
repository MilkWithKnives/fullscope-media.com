-- Full Scope Media Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    base_price DECIMAL(10,2),
    category VARCHAR(100) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert your services
INSERT INTO services (name, description, duration_minutes, base_price, category) VALUES
('Real Estate Photography', 'Professional interior and exterior photography', 120, 250.00, 'Photography'),
('Drone/Aerial Photography', 'Aerial shots and video footage', 90, 200.00, 'Photography'),
('Matterport 3D Tour', 'Interactive 3D virtual tour', 180, 350.00, '3D Tours'),
('Zillow 3D Tour', 'Zillow-compatible 3D tour', 150, 300.00, '3D Tours'),
('Cubicasa Floor Plans', 'Professional floor plan creation', 60, 150.00, 'Floor Plans'),
('Virtual Staging', 'AI-powered virtual furniture staging', 30, 100.00, 'Virtual Staging'),
('AI Video Tour', 'AI-generated property video tour', 90, 400.00, 'Video'),
('Cinematic Video', 'Professional cinematic property video', 240, 800.00, 'Video'),
('Full Package', 'Photography + 3D Tour + Video + Staging', 360, 1200.00, 'Package');

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Client information
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_company VARCHAR(255),
    
    -- Appointment details
    service_type VARCHAR(255) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 120,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    
    -- Property details
    property_address TEXT,
    property_type VARCHAR(100),
    special_requirements TEXT,
    budget_range VARCHAR(50),
    how_heard_about_us VARCHAR(100),
    notes TEXT,
    
    -- System fields
    ical_uid VARCHAR(255) UNIQUE,
    confirmation_sent BOOLEAN DEFAULT false,
    reminder_sent BOOLEAN DEFAULT false
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    service VARCHAR(255) NOT NULL,
    budget VARCHAR(100),
    message TEXT NOT NULL,
    timeline VARCHAR(100),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
    notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_email ON bookings(client_email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at);

-- Create updated_at trigger for bookings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Studio rental availability table
CREATE TABLE studio_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    hourly_rate DECIMAL(10,2) DEFAULT 50.00,
    daily_rate DECIMAL(10,2) DEFAULT 300.00,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, start_time, end_time)
);

-- Studio rental bookings table (15-minute increments)
CREATE TABLE studio_rentals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Client information
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_company VARCHAR(255),

    -- Rental details
    rental_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL, -- Changed to minutes for 15-minute blocks
    total_blocks INTEGER NOT NULL, -- Number of 15-minute blocks
    rental_type VARCHAR(30) DEFAULT 'studio_rental' CHECK (rental_type IN ('studio_rental', 'party_rental', 'photographer_rental', 'event_rental')),
    total_amount DECIMAL(10,2) NOT NULL,
    rate_per_block DECIMAL(10,2) NOT NULL, -- Rate per 15-minute block

    -- Booking details
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'completed', 'cancelled')),
    purpose TEXT, -- What they're using the studio for
    event_type VARCHAR(50), -- Party, photoshoot, etc.
    equipment_needed TEXT, -- Any special equipment requests
    guest_count INTEGER DEFAULT 1,
    special_requirements TEXT,
    setup_time_needed BOOLEAN DEFAULT false, -- Extra setup time required
    cleanup_time_needed BOOLEAN DEFAULT false, -- Extra cleanup time required

    -- Payment details
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    deposit_amount DECIMAL(10,2),
    deposit_required BOOLEAN DEFAULT true,

    -- System fields
    ical_uid VARCHAR(255) UNIQUE,
    confirmation_sent BOOLEAN DEFAULT false,
    reminder_sent BOOLEAN DEFAULT false,
    booking_source VARCHAR(20) DEFAULT 'website' CHECK (booking_source IN ('website', 'phone', 'email', 'referral'))
);

-- Studio pricing tiers table (15-minute block based)
CREATE TABLE studio_pricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    rate_per_15min DECIMAL(10,2) NOT NULL, -- Base rate per 15-minute block
    minimum_blocks INTEGER DEFAULT 4, -- Minimum booking (1 hour = 4 blocks)
    maximum_blocks INTEGER DEFAULT 192, -- Maximum booking (48 hours = 192 blocks)
    weekend_multiplier DECIMAL(3,2) DEFAULT 1.5, -- Weekend pricing
    holiday_multiplier DECIMAL(3,2) DEFAULT 2.0, -- Holiday pricing
    evening_multiplier DECIMAL(3,2) DEFAULT 1.25, -- After 6 PM pricing
    setup_fee DECIMAL(10,2) DEFAULT 0.00, -- One-time setup fee
    cleanup_fee DECIMAL(10,2) DEFAULT 0.00, -- One-time cleanup fee
    deposit_percentage DECIMAL(3,2) DEFAULT 0.50, -- 50% deposit required
    rental_type VARCHAR(30) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default studio pricing (15-minute blocks)
INSERT INTO studio_pricing (name, description, rate_per_15min, minimum_blocks, rental_type, setup_fee, cleanup_fee) VALUES
('Photographer Rental', 'Studio rental for professional photographers', 18.75, 8, 'photographer_rental', 25.00, 15.00), -- $75/hour
('Party/Event Rental', 'Studio rental for parties and events', 25.00, 12, 'party_rental', 50.00, 75.00), -- $100/hour + fees
('Super Bowl/Sports Events', 'Premium pricing for major sporting events', 37.50, 16, 'event_rental', 100.00, 100.00), -- $150/hour + fees
('Standard Studio Rental', 'Basic studio rental for general use', 15.00, 8, 'studio_rental', 0.00, 25.00); -- $60/hour

-- Unified booking conflicts table (prevents double-booking)
CREATE TABLE booking_conflicts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    booking_type VARCHAR(20) NOT NULL CHECK (booking_type IN ('studio_rental', 'photography_service')),
    booking_id UUID NOT NULL, -- References either studio_rentals.id or bookings.id
    client_name VARCHAR(255) NOT NULL,
    service_description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Prevent overlapping bookings
    CONSTRAINT no_time_overlap EXCLUDE USING gist (
        booking_date WITH =,
        tsrange(
            (booking_date + start_time)::timestamp,
            (booking_date + end_time)::timestamp
        ) WITH &&
    )
);

-- Create indexes for studio tables
CREATE INDEX idx_studio_availability_date ON studio_availability(date);
CREATE INDEX idx_studio_rentals_date ON studio_rentals(rental_date);
CREATE INDEX idx_studio_rentals_status ON studio_rentals(status);
CREATE INDEX idx_studio_rentals_email ON studio_rentals(client_email);
CREATE INDEX idx_booking_conflicts_date ON booking_conflicts(booking_date);
CREATE INDEX idx_booking_conflicts_time ON booking_conflicts(booking_date, start_time, end_time);

-- Create updated_at triggers for studio tables
CREATE TRIGGER update_studio_availability_updated_at
    BEFORE UPDATE ON studio_availability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_studio_rentals_updated_at
    BEFORE UPDATE ON studio_rentals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for studio tables
ALTER TABLE studio_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_pricing ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on services" ON services FOR ALL USING (true);
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all operations on contact_submissions" ON contact_submissions FOR ALL USING (true);
CREATE POLICY "Allow all operations on studio_availability" ON studio_availability FOR ALL USING (true);
CREATE POLICY "Allow all operations on studio_rentals" ON studio_rentals FOR ALL USING (true);
CREATE POLICY "Allow all operations on studio_pricing" ON studio_pricing FOR ALL USING (true);
