import { supabase } from '../lib/supabase';
import { mockModels, mockUsers } from '../data/mockData';

// Function to populate database with demo data
export const populateDemoData = async () => {
  try {
    console.log('Starting demo data population...');

    // Check if data already exists
    const { data: existingModels } = await supabase
      .from('models')
      .select('id')
      .limit(1);

    if (existingModels && existingModels.length > 0) {
      console.log('Demo data already exists, skipping population');
      return;
    }

    // Create demo users first
    const demoUsers = mockUsers.slice(0, 3); // Take first 3 users
    for (const user of demoUsers) {
      const { error } = await supabase
        .from('users')
        .insert({
          email: user.email,
          username: user.username,
          full_name: user.username,
          avatar: user.avatar,
          country: user.country,
          balance: user.balance,
          is_verified: user.isVerified,
          user_type: 'user',
          preferences: user.preferences,
          created_at: user.joinDate
        });

      if (error) {
        console.error('Error creating demo user:', error);
      }
    }

    // Create demo models
    const demoModels = mockModels.slice(0, 10); // Take first 10 models
    for (const model of demoModels) {
      // Create a user account for each model
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          email: `${model.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          username: model.name.replace(/\s+/g, '_').toLowerCase(),
          full_name: model.name,
          avatar: model.avatar,
          country: model.country,
          user_type: 'model',
          is_verified: true
        })
        .select('id')
        .single();

      if (userError) {
        console.error('Error creating model user:', userError);
        continue;
      }

      if (!userData) {
        console.error('No user data returned after insert');
        continue;
      }

      // Create model profile
      const { error: modelError } = await supabase
        .from('models')
        .insert({
          user_id: userData.id,
          name: model.name,
          avatar: model.avatar,
          cover_image: model.coverImage,
          country: model.country,
          languages: model.languages || [model.language || 'English'],
          age: model.age || 25,
          description: model.description,
          tags: model.tags,
          price_per_minute: model.pricePerMinute,
          is_online: model.isOnline,
          rating: model.rating,
          review_count: model.reviewCount,
          total_minutes: model.totalMinutes,
          status: 'approved'
        });

      if (modelError) {
        console.error('Error creating model:', modelError);
      }
    }

    console.log('Demo data population completed successfully');
  } catch (error) {
    console.error('Error populating demo data:', error);
  }
};

// Function to check and populate demo data if needed
export const ensureDemoData = async () => {
  try {
    // Check if Supabase is configured
    if (!import.meta.env.VITE_SUPABASE_URL || 
        import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
      console.log('Supabase not configured, skipping demo data population');
      return;
    }

    // Only populate in development mode
    if (import.meta.env.PROD) {
      console.log('Production mode, skipping demo data population');
      return;
    }

    // Check if demo data population is disabled
    if (localStorage.getItem('disable-demo-data') === 'true') {
      console.log('Demo data population disabled by user');
      return;
    }

    // Test connection first
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return;
    }

    // Populate demo data
    await populateDemoData();
  } catch (error) {
    console.error('Error ensuring demo data:', error);
    // Don't throw error in production, just log it
    if (import.meta.env.DEV) {
      throw error;
    }
  }
};

// Function to disable demo data population
export const disableDemoData = () => {
  localStorage.setItem('disable-demo-data', 'true');
};

// Function to enable demo data population
export const enableDemoData = () => {
  localStorage.removeItem('disable-demo-data');
};