export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content_blocks: {
        Row: {
          config: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          blockchain: string
          created_at: string | null
          currency: string
          id: string
          plan_id: string
          status: string
          transaction_hash: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          blockchain: string
          created_at?: string | null
          currency?: string
          id?: string
          plan_id: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          blockchain?: string
          created_at?: string | null
          currency?: string
          id?: string
          plan_id?: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_plans: {
        Row: {
          created_at: string
          currency: string
          description: string
          features: Json
          id: string
          is_active: boolean
          is_popular: boolean
          max_websites: number
          name: string
          price_monthly: number
          price_yearly: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description: string
          features: Json
          id?: string
          is_active?: boolean
          is_popular?: boolean
          max_websites?: number
          name: string
          price_monthly: number
          price_yearly: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string
          features?: Json
          id?: string
          is_active?: boolean
          is_popular?: boolean
          max_websites?: number
          name?: string
          price_monthly?: number
          price_yearly?: number
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          commission_amount: number | null
          commission_currency: string | null
          created_at: string | null
          id: string
          referred_id: string
          referrer_id: string
          status: string
          transaction_hash: string | null
          updated_at: string | null
        }
        Insert: {
          commission_amount?: number | null
          commission_currency?: string | null
          created_at?: string | null
          id?: string
          referred_id: string
          referrer_id: string
          status: string
          transaction_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_amount?: number | null
          commission_currency?: string | null
          created_at?: string | null
          id?: string
          referred_id?: string
          referrer_id?: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          blockchain: string
          created_at: string | null
          currency: string
          duration_days: number | null
          features: Json | null
          id: string
          is_one_time: boolean | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          blockchain: string
          created_at?: string | null
          currency?: string
          duration_days?: number | null
          features?: Json | null
          id?: string
          is_one_time?: boolean | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          blockchain?: string
          created_at?: string | null
          currency?: string
          duration_days?: number | null
          features?: Json | null
          id?: string
          is_one_time?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      template_metrics: {
        Row: {
          created_at: string
          id: string
          last_viewed_at: string | null
          template_id: string
          trending_score: number | null
          updated_at: string
          uses: number
          views: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          template_id: string
          trending_score?: number | null
          updated_at?: string
          uses?: number
          views?: number
        }
        Update: {
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          template_id?: string
          trending_score?: number | null
          updated_at?: string
          uses?: number
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_metrics_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          category: string | null
          content: Json
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          popularity: number | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          popularity?: number | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          popularity?: number | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string
          plan_id: string | null
          status: string
          transaction_hash: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string
          plan_id?: string | null
          status?: string
          transaction_hash?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string
          plan_id?: string | null
          status?: string
          transaction_hash?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          plan_id: string
          start_date: string | null
          status: string
          transaction_hash: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_id: string
          start_date?: string | null
          status: string
          transaction_hash?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_id?: string
          start_date?: string | null
          status?: string
          transaction_hash?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          blockchain: string
          created_at: string | null
          id: string
          updated_at: string | null
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          blockchain: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          wallet_address: string
          wallet_type: string
        }
        Update: {
          blockchain?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          wallet_address?: string
          wallet_type?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          created_at: string | null
          date: string | null
          id: string
          unique_visitors: number | null
          updated_at: string | null
          views: number | null
          website_id: string | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          unique_visitors?: number | null
          updated_at?: string | null
          views?: number | null
          website_id?: string | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          unique_visitors?: number | null
          updated_at?: string | null
          views?: number | null
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_analytics_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      website_content: {
        Row: {
          content: Json
          content_type: string
          created_at: string | null
          id: string
          order_index: number
          updated_at: string | null
          website_id: string
        }
        Insert: {
          content: Json
          content_type: string
          created_at?: string | null
          id?: string
          order_index: number
          updated_at?: string | null
          website_id: string
        }
        Update: {
          content?: Json
          content_type?: string
          created_at?: string | null
          id?: string
          order_index?: number
          updated_at?: string | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_content_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      websites: {
        Row: {
          created_at: string | null
          custom_domain: string | null
          ens_domain: string | null
          id: string
          name: string
          published: boolean | null
          settings: Json | null
          sns_domain: string | null
          subdomain: string | null
          template_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          custom_domain?: string | null
          ens_domain?: string | null
          id?: string
          name: string
          published?: boolean | null
          settings?: Json | null
          sns_domain?: string | null
          subdomain?: string | null
          template_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          custom_domain?: string | null
          ens_domain?: string | null
          id?: string
          name?: string
          published?: boolean | null
          settings?: Json | null
          sns_domain?: string | null
          subdomain?: string | null
          template_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "websites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
