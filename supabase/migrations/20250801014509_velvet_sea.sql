/*
  # إنشاء قاعدة البيانات الأساسية لـ GlamCall

  1. الجداول الجديدة
    - `users` - بيانات المستخدمين والعارضات
    - `models` - ملفات العارضات
    - `model_profiles` - تفاصيل إضافية للعارضات
    - `model_stats` - إحصائيات العارضات
    - `calls` - سجل المكالمات
    - `transactions` - المعاملات المالية
    - `messages` - الرسائل
    - `model_reviews` - تقييمات العارضات
    - `favorites` - المفضلة
    - `reports` - البلاغات
    - `notifications` - الإشعارات

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات الأمان المناسبة
    - فهرسة للاستعلامات السريعة

  3. الوظائف
    - وظائف لحساب الإحصائيات
    - وظائف للبحث المتقدم
    - وظائف للإشعارات
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  full_name text,
  avatar text,
  phone text,
  country text,
  date_of_birth date,
  is_verified boolean DEFAULT false,
  balance decimal(10,2) DEFAULT 0.00,
  total_spent decimal(10,2) DEFAULT 0.00,
  user_type text DEFAULT 'user' CHECK (user_type IN ('user', 'model')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Models table
CREATE TABLE IF NOT EXISTS models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar text NOT NULL,
  cover_image text NOT NULL,
  country text NOT NULL,
  ethnicity text,
  languages text[] DEFAULT '{}',
  age integer NOT NULL CHECK (age >= 18),
  height text,
  body_type text,
  description text NOT NULL,
  tags text[] DEFAULT '{}',
  price_per_minute decimal(5,2) NOT NULL CHECK (price_per_minute > 0),
  is_online boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  total_minutes integer DEFAULT 0,
  total_earnings decimal(10,2) DEFAULT 0.00,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_online timestamptz
);

-- Model profiles table
CREATE TABLE IF NOT EXISTS model_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES models(id) ON DELETE CASCADE,
  bio text,
  interests text[] DEFAULT '{}',
  schedule jsonb DEFAULT '{}',
  payment_info jsonb DEFAULT '{}',
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Model stats table
CREATE TABLE IF NOT EXISTS model_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES models(id) ON DELETE CASCADE,
  total_calls integer DEFAULT 0,
  total_minutes integer DEFAULT 0,
  total_earnings decimal(10,2) DEFAULT 0.00,
  average_rating decimal(3,2) DEFAULT 0.00,
  repeat_customers integer DEFAULT 0,
  today_earnings decimal(10,2) DEFAULT 0.00,
  week_earnings decimal(10,2) DEFAULT 0.00,
  month_earnings decimal(10,2) DEFAULT 0.00,
  updated_at timestamptz DEFAULT now()
);

-- Calls table
CREATE TABLE IF NOT EXISTS calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  model_id uuid REFERENCES models(id) ON DELETE CASCADE,
  duration integer DEFAULT 0,
  cost decimal(10,2) DEFAULT 0.00,
  status text DEFAULT 'active' CHECK (status IN ('active', 'ended', 'cancelled')),
  quality_rating integer CHECK (quality_rating >= 1 AND quality_rating <= 5),
  review text,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('purchase', 'call', 'tip', 'refund', 'payout')),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method text,
  payment_id text,
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'gift', 'system')),
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Model reviews table
CREATE TABLE IF NOT EXISTS model_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES models(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  call_id uuid REFERENCES calls(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(call_id)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  model_id uuid REFERENCES models(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, model_id)
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reported_id uuid REFERENCES users(id) ON DELETE CASCADE,
  report_type text NOT NULL CHECK (report_type IN ('harassment', 'inappropriate_content', 'spam', 'scam', 'other')),
  description text NOT NULL,
  evidence jsonb DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('call', 'message', 'promotion', 'system', 'model_online')),
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for models
CREATE POLICY "Anyone can read approved models" ON models
  FOR SELECT TO authenticated
  USING (status = 'approved');

CREATE POLICY "Models can update own data" ON models
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for calls
CREATE POLICY "Users can read own calls" ON calls
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR model_id IN (
    SELECT id FROM models WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create calls" ON calls
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own calls" ON calls
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR model_id IN (
    SELECT id FROM models WHERE user_id = auth.uid()
  ));

-- RLS Policies for transactions
CREATE POLICY "Users can read own transactions" ON transactions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create transactions" ON transactions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for messages
CREATE POLICY "Users can read own messages" ON messages
  FOR SELECT TO authenticated
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- RLS Policies for favorites
CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_models_online ON models(is_online, status);
CREATE INDEX IF NOT EXISTS idx_models_country ON models(country);
CREATE INDEX IF NOT EXISTS idx_models_price ON models(price_per_minute);
CREATE INDEX IF NOT EXISTS idx_models_rating ON models(rating DESC);
CREATE INDEX IF NOT EXISTS idx_calls_user_id ON calls(user_id);
CREATE INDEX IF NOT EXISTS idx_calls_model_id ON calls(model_id);
CREATE INDEX IF NOT EXISTS idx_calls_created_at ON calls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, created_at DESC);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_model_profiles_updated_at BEFORE UPDATE ON model_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update model stats
CREATE OR REPLACE FUNCTION update_model_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO model_stats (model_id, total_calls, total_minutes, total_earnings)
    VALUES (NEW.model_id, 1, NEW.duration, NEW.cost)
    ON CONFLICT (model_id) DO UPDATE SET
      total_calls = model_stats.total_calls + 1,
      total_minutes = model_stats.total_minutes + NEW.duration,
      total_earnings = model_stats.total_earnings + NEW.cost,
      updated_at = now();
    
    -- Update model rating
    UPDATE models SET
      total_minutes = (SELECT total_minutes FROM model_stats WHERE model_id = NEW.model_id),
      total_earnings = (SELECT total_earnings FROM model_stats WHERE model_id = NEW.model_id),
      updated_at = now()
    WHERE id = NEW.model_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger for updating model stats when calls end
CREATE TRIGGER update_model_stats_trigger
  AFTER INSERT OR UPDATE ON calls
  FOR EACH ROW
  WHEN (NEW.status = 'ended')
  EXECUTE FUNCTION update_model_stats();

-- Function to update model rating
CREATE OR REPLACE FUNCTION update_model_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE models SET
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM model_reviews
      WHERE model_id = NEW.model_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM model_reviews
      WHERE model_id = NEW.model_id
    ),
    updated_at = now()
  WHERE id = NEW.model_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating model rating
CREATE TRIGGER update_model_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON model_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_model_rating();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text,
  p_metadata jsonb DEFAULT '{}'
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, title, message, type, metadata)
  VALUES (p_user_id, p_title, p_message, p_type, p_metadata)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ language 'plpgsql';

-- Function for advanced model search
CREATE OR REPLACE FUNCTION search_models(
  search_term text DEFAULT '',
  country_filter text DEFAULT '',
  min_rating decimal DEFAULT 0,
  max_price decimal DEFAULT 1000,
  online_only boolean DEFAULT false
)
RETURNS TABLE (
  id uuid,
  name text,
  avatar text,
  country text,
  rating decimal,
  price_per_minute decimal,
  is_online boolean,
  total_minutes integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.name,
    m.avatar,
    m.country,
    m.rating,
    m.price_per_minute,
    m.is_online,
    m.total_minutes
  FROM models m
  WHERE 
    m.status = 'approved'
    AND (search_term = '' OR m.name ILIKE '%' || search_term || '%' OR m.description ILIKE '%' || search_term || '%')
    AND (country_filter = '' OR m.country = country_filter)
    AND m.rating >= min_rating
    AND m.price_per_minute <= max_price
    AND (NOT online_only OR m.is_online = true)
  ORDER BY 
    m.is_online DESC,
    m.rating DESC,
    m.total_minutes DESC;
END;
$$ language 'plpgsql';