-- Feedback Table
-- Run this SQL in your Supabase SQL Editor to create the feedback table

CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'bug', 'feature', 'ui', 'performance', 'other')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);

-- Enable Row Level Security (optional, adjust as needed)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON feedback
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Anyone can insert feedback (for anonymous feedback)
CREATE POLICY "Anyone can insert feedback" ON feedback
    FOR INSERT
    WITH CHECK (true);

-- Policy: Admins can view all feedback (adjust role check as needed)
-- CREATE POLICY "Admins can view all feedback" ON feedback
--     FOR SELECT
--     USING (
--         EXISTS (
--             SELECT 1 FROM users
--             WHERE users.id = auth.uid()
--             AND users.email = 'admin@cliptune.com'
--         )
--     );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_feedback_timestamp
    BEFORE UPDATE ON feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_feedback_updated_at();

-- Optional: Create a view for feedback analytics
CREATE OR REPLACE VIEW feedback_analytics AS
SELECT
    category,
    rating,
    COUNT(*) as count,
    AVG(rating) as avg_rating,
    DATE(created_at) as date
FROM feedback
GROUP BY category, rating, DATE(created_at)
ORDER BY date DESC, category, rating;


