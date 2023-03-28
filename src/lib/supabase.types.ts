export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      member: {
        Row: {
          id: string
          teamid: string | null
          userid: string | null
        }
        Insert: {
          id?: string
          teamid?: string | null
          userid?: string | null
        }
        Update: {
          id?: string
          teamid?: string | null
          userid?: string | null
        }
      }
      permission: {
        Row: {
          action: string | null
          id: string
          section: string | null
          userid: string | null
        }
        Insert: {
          action?: string | null
          id?: string
          section?: string | null
          userid?: string | null
        }
        Update: {
          action?: string | null
          id?: string
          section?: string | null
          userid?: string | null
        }
      }
      Signups: {
        Row: {
          created_at: string | null
          email: string
          id: number
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
        }
      }
      team: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      user: {
        Row: {
          created_at: string | null
          firstname: string | null
          frequency: string | null
          id: string
          lastname: string | null
          position: string[] | null
          rate: number | null
          team: string | null
        }
        Insert: {
          created_at?: string | null
          firstname?: string | null
          frequency?: string | null
          id: string
          lastname?: string | null
          position?: string[] | null
          rate?: number | null
          team?: string | null
        }
        Update: {
          created_at?: string | null
          firstname?: string | null
          frequency?: string | null
          id?: string
          lastname?: string | null
          position?: string[] | null
          rate?: number | null
          team?: string | null
        }
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
