CREATE TABLE mechanics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  license_plate TEXT NOT NULL,
  mechanic_id UUID REFERENCES mechanics(id) ON DELETE CASCADE,
  services_performed TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'Pending',
  storage_point TEXT,
  caps_number TEXT,
  visit_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enums
CREATE TYPE tire_season AS ENUM ('summer', 'winter', 'all_season');
CREATE TYPE tire_location AS ENUM ('car', 'storage');
CREATE TYPE tire_rim AS ENUM ('plate', 'alloy');
CREATE TYPE tire_wear AS ENUM ('good', 'ok', 'warning', 'danger');
CREATE TYPE tire_type AS ENUM ('regular', 'runflat');

CREATE TABLE tires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  width TEXT NOT NULL,
  height TEXT NOT NULL,
  diameter_type TEXT NOT NULL,
  tire_type tire_type NOT NULL,
  season tire_season NOT NULL,
  rim_type tire_rim NOT NULL,
  wear_indicator tire_wear NOT NULL,
  location tire_location NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
