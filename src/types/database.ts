export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          full_name: string | null;
          avatar: string | null;
          phone: string | null;
          country: string | null;
          date_of_birth: string | null;
          is_verified: boolean;
          balance: number;
          total_spent: number;
          user_type: 'user' | 'model';
          status: 'active' | 'suspended' | 'banned';
          preferences: any;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          username: string;
          full_name?: string | null;
          avatar?: string | null;
          phone?: string | null;
          country?: string | null;
          date_of_birth?: string | null;
          is_verified?: boolean;
          balance?: number;
          total_spent?: number;
          user_type?: 'user' | 'model';
          status?: 'active' | 'suspended' | 'banned';
          preferences?: any;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          full_name?: string | null;
          avatar?: string | null;
          phone?: string | null;
          country?: string | null;
          date_of_birth?: string | null;
          is_verified?: boolean;
          balance?: number;
          total_spent?: number;
          user_type?: 'user' | 'model';
          status?: 'active' | 'suspended' | 'banned';
          preferences?: any;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };
      models: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          avatar: string;
          cover_image: string;
          country: string;
          ethnicity: string | null;
          languages: string[];
          age: number;
          height: string | null;
          body_type: string | null;
          description: string;
          tags: string[];
          price_per_minute: number;
          is_online: boolean;
          rating: number;
          review_count: number;
          total_minutes: number;
          total_earnings: number;
          status: 'pending' | 'approved' | 'rejected' | 'suspended';
          created_at: string;
          updated_at: string;
          last_online: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          avatar: string;
          cover_image: string;
          country: string;
          ethnicity?: string | null;
          languages: string[];
          age: number;
          height?: string | null;
          body_type?: string | null;
          description: string;
          tags: string[];
          price_per_minute: number;
          is_online?: boolean;
          rating?: number;
          review_count?: number;
          total_minutes?: number;
          total_earnings?: number;
          status?: 'pending' | 'approved' | 'rejected' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_online?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          avatar?: string;
          cover_image?: string;
          country?: string;
          ethnicity?: string | null;
          languages?: string[];
          age?: number;
          height?: string | null;
          body_type?: string | null;
          description?: string;
          tags?: string[];
          price_per_minute?: number;
          is_online?: boolean;
          rating?: number;
          review_count?: number;
          total_minutes?: number;
          total_earnings?: number;
          status?: 'pending' | 'approved' | 'rejected' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_online?: string | null;
        };
      };
      calls: {
        Row: {
          id: string;
          user_id: string;
          model_id: string;
          duration: number;
          cost: number;
          status: 'active' | 'ended' | 'cancelled';
          quality_rating: number | null;
          review: string | null;
          started_at: string;
          ended_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          model_id: string;
          duration?: number;
          cost?: number;
          status?: 'active' | 'ended' | 'cancelled';
          quality_rating?: number | null;
          review?: string | null;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          model_id?: string;
          duration?: number;
          cost?: number;
          status?: 'active' | 'ended' | 'cancelled';
          quality_rating?: number | null;
          review?: string | null;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'purchase' | 'call' | 'tip' | 'refund' | 'payout';
          amount: number;
          currency: string;
          status: 'pending' | 'completed' | 'failed' | 'cancelled';
          payment_method: string | null;
          payment_id: string | null;
          description: string | null;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'purchase' | 'call' | 'tip' | 'refund' | 'payout';
          amount: number;
          currency?: string;
          status?: 'pending' | 'completed' | 'failed' | 'cancelled';
          payment_method?: string | null;
          payment_id?: string | null;
          description?: string | null;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'purchase' | 'call' | 'tip' | 'refund' | 'payout';
          amount?: number;
          currency?: string;
          status?: 'pending' | 'completed' | 'failed' | 'cancelled';
          payment_method?: string | null;
          payment_id?: string | null;
          description?: string | null;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          message_type: 'text' | 'image' | 'gift' | 'system';
          is_read: boolean;
          metadata: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          message_type?: 'text' | 'image' | 'gift' | 'system';
          is_read?: boolean;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          message_type?: 'text' | 'image' | 'gift' | 'system';
          is_read?: boolean;
          metadata?: any;
          created_at?: string;
        };
      };
      model_profiles: {
        Row: {
          id: string;
          model_id: string;
          bio: string;
          interests: string[];
          schedule: any;
          payment_info: any;
          verification_status: 'pending' | 'verified' | 'rejected';
          verification_documents: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          model_id: string;
          bio: string;
          interests: string[];
          schedule: any;
          payment_info: any;
          verification_status?: 'pending' | 'verified' | 'rejected';
          verification_documents?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          model_id?: string;
          bio?: string;
          interests?: string[];
          schedule?: any;
          payment_info?: any;
          verification_status?: 'pending' | 'verified' | 'rejected';
          verification_documents?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      model_stats: {
        Row: {
          id: string;
          model_id: string;
          total_calls: number;
          total_minutes: number;
          total_earnings: number;
          average_rating: number;
          repeat_customers: number;
          today_earnings: number;
          week_earnings: number;
          month_earnings: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          model_id: string;
          total_calls?: number;
          total_minutes?: number;
          total_earnings?: number;
          average_rating?: number;
          repeat_customers?: number;
          today_earnings?: number;
          week_earnings?: number;
          month_earnings?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          model_id?: string;
          total_calls?: number;
          total_minutes?: number;
          total_earnings?: number;
          average_rating?: number;
          repeat_customers?: number;
          today_earnings?: number;
          week_earnings?: number;
          month_earnings?: number;
          updated_at?: string;
        };
      };
      model_reviews: {
        Row: {
          id: string;
          model_id: string;
          user_id: string;
          call_id: string;
          rating: number;
          comment: string | null;
          is_anonymous: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          model_id: string;
          user_id: string;
          call_id: string;
          rating: number;
          comment?: string | null;
          is_anonymous?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          model_id?: string;
          user_id?: string;
          call_id?: string;
          rating?: number;
          comment?: string | null;
          is_anonymous?: boolean;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          model_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          model_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          model_id?: string;
          created_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string;
          reported_id: string;
          report_type: 'harassment' | 'inappropriate_content' | 'spam' | 'scam' | 'other';
          description: string;
          evidence: any;
          status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reporter_id: string;
          reported_id: string;
          report_type: 'harassment' | 'inappropriate_content' | 'spam' | 'scam' | 'other';
          description: string;
          evidence?: any;
          status?: 'pending' | 'investigating' | 'resolved' | 'dismissed';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reporter_id?: string;
          reported_id?: string;
          report_type?: 'harassment' | 'inappropriate_content' | 'spam' | 'scam' | 'other';
          description?: string;
          evidence?: any;
          status?: 'pending' | 'investigating' | 'resolved' | 'dismissed';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}