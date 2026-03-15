-- ============================================================
--  DevCraft Studio — Supabase Schema
--  Paste this ENTIRE file into:
--  Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS contacts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  budget     TEXT,
  message    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS proposals (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name   TEXT        NOT NULL,
  company       TEXT,
  project_type  TEXT,
  description   TEXT,
  features      TEXT,
  budget        TEXT,
  timeline      TEXT,
  client_email  TEXT,
  proposal_html TEXT,
  payment_id    TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending','paid','cancelled')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS invoices (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id   UUID        REFERENCES proposals(id) ON DELETE SET NULL,
  payment_id    TEXT,
  amount        NUMERIC(12,2),
  invoice_html  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE contacts  ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices  ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (website visitors)
CREATE POLICY "insert_contacts"  ON contacts  FOR INSERT WITH CHECK (true);
CREATE POLICY "insert_proposals" ON proposals FOR INSERT WITH CHECK (true);
CREATE POLICY "insert_invoices"  ON invoices  FOR INSERT WITH CHECK (true);
CREATE POLICY "update_proposals" ON proposals FOR UPDATE USING (true) WITH CHECK (true);

-- Only logged-in users (you) can read
CREATE POLICY "read_contacts"  ON contacts  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "read_proposals" ON proposals FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "read_invoices"  ON invoices  FOR SELECT USING (auth.role() = 'authenticated');
