export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Admin: {
        Row: {
          createdAt: string
          email: string
          hasNotifi: boolean | null
          id: string
          image: string | null
          name: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          email: string
          hasNotifi?: boolean | null
          id?: string
          image?: string | null
          name?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          email?: string
          hasNotifi?: boolean | null
          id?: string
          image?: string | null
          name?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      Blog: {
        Row: {
          adminId: string | null
          content: string | null
          id: string
          image: string
          title: string
        }
        Insert: {
          adminId?: string | null
          content?: string | null
          id?: string
          image: string
          title: string
        }
        Update: {
          adminId?: string | null
          content?: string | null
          id?: string
          image?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_adminId_Blog"
            columns: ["adminId"]
            referencedRelation: "Admin"
            referencedColumns: ["id"]
          }
        ]
      }
      Guest: {
        Row: {
          adminId: string | null
          email: string | null
          id: string
          message: string | null
          subject: string | null
        }
        Insert: {
          adminId?: string | null
          email?: string | null
          id?: string
          message?: string | null
          subject?: string | null
        }
        Update: {
          adminId?: string | null
          email?: string | null
          id?: string
          message?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Guest_adminId_fkey"
            columns: ["adminId"]
            referencedRelation: "Admin"
            referencedColumns: ["id"]
          }
        ]
      }
      Project: {
        Row: {
          adminId: string | null
          description: string | null
          id: string
          image: string
          title: string | null
        }
        Insert: {
          adminId?: string | null
          description?: string | null
          id?: string
          image: string
          title?: string | null
        }
        Update: {
          adminId?: string | null
          description?: string | null
          id?: string
          image?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_adminId_Project"
            columns: ["adminId"]
            referencedRelation: "Admin"
            referencedColumns: ["id"]
          }
        ]
      }
      Tag: {
        Row: {
          id: string
          name: string
          projectId: string | null
        }
        Insert: {
          id?: string
          name: string
          projectId?: string | null
        }
        Update: {
          id?: string
          name?: string
          projectId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_projectId_Tag"
            columns: ["projectId"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
