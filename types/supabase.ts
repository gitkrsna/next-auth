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
      announcements: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          target_audience: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          target_audience?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          target_audience?: string | null
          title?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      assignmentsubmissions: {
        Row: {
          assignment_id: string | null
          created_at: string | null
          id: string
          remarks: string | null
          student_id: string | null
          submission_date: string | null
        }
        Insert: {
          assignment_id?: string | null
          created_at?: string | null
          id?: string
          remarks?: string | null
          student_id?: string | null
          submission_date?: string | null
        }
        Update: {
          assignment_id?: string | null
          created_at?: string | null
          id?: string
          remarks?: string | null
          student_id?: string | null
          submission_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignmentsubmissions_assignment_id_fkey"
            columns: ["assignment_id"]
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignmentsubmissions_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      attendance: {
        Row: {
          attendance_date: string | null
          class_id: string | null
          created_at: string | null
          id: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          attendance_date?: string | null
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          attendance_date?: string | null
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      canteenorders: {
        Row: {
          created_at: string | null
          id: string
          order_date: string | null
          order_details: string | null
          status: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_date?: string | null
          order_details?: string | null
          status?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_date?: string | null
          order_details?: string | null
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canteenorders_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      classes: {
        Row: {
          course_id: string | null
          created_at: string | null
          day_of_week: string | null
          end_time: string | null
          id: string
          room: string | null
          start_time: string | null
          teacher_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          day_of_week?: string | null
          end_time?: string | null
          id?: string
          room?: string | null
          start_time?: string | null
          teacher_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          day_of_week?: string | null
          end_time?: string | null
          id?: string
          room?: string | null
          start_time?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      complaints: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "complaints_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      examresults: {
        Row: {
          created_at: string | null
          exam_id: string | null
          id: string
          marks_obtained: number | null
          student_id: string | null
          total_marks: number | null
        }
        Insert: {
          created_at?: string | null
          exam_id?: string | null
          id?: string
          marks_obtained?: number | null
          student_id?: string | null
          total_marks?: number | null
        }
        Update: {
          created_at?: string | null
          exam_id?: string | null
          id?: string
          marks_obtained?: number | null
          student_id?: string | null
          total_marks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "examresults_exam_id_fkey"
            columns: ["exam_id"]
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "examresults_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      exams: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      feepayments: {
        Row: {
          amount: number | null
          created_at: string | null
          fee_id: string | null
          id: string
          payment_date: string | null
          student_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          fee_id?: string | null
          id?: string
          payment_date?: string | null
          student_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          fee_id?: string | null
          id?: string
          payment_date?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feepayments_fee_id_fkey"
            columns: ["fee_id"]
            referencedRelation: "fees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feepayments_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      fees: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      financialtransactions: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          id: string
          transaction_date: string | null
          transaction_type: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_date?: string | null
          transaction_type?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_date?: string | null
          transaction_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financialtransactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      healthrecords: {
        Row: {
          allergies: string | null
          created_at: string | null
          id: string
          medical_history: string | null
          medications: string | null
          student_id: string | null
        }
        Insert: {
          allergies?: string | null
          created_at?: string | null
          id?: string
          medical_history?: string | null
          medications?: string | null
          student_id?: string | null
        }
        Update: {
          allergies?: string | null
          created_at?: string | null
          id?: string
          medical_history?: string | null
          medications?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "healthrecords_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      hostelresidents: {
        Row: {
          check_in_date: string | null
          check_out_date: string | null
          created_at: string | null
          id: string
          room_id: string | null
          student_id: string | null
        }
        Insert: {
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string | null
          id?: string
          room_id?: string | null
          student_id?: string | null
        }
        Update: {
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string | null
          id?: string
          room_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hostelresidents_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "hostelrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hostelresidents_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      hostelrooms: {
        Row: {
          capacity: number | null
          created_at: string | null
          id: string
          room_number: string
          type: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          room_number: string
          type?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          room_number?: string
          type?: string | null
        }
        Relationships: []
      }
      leaveapplications: {
        Row: {
          created_at: string | null
          dates: string[] | null
          id: string
          reason: string | null
          staff_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          dates?: string[] | null
          id?: string
          reason?: string | null
          staff_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          dates?: string[] | null
          id?: string
          reason?: string | null
          staff_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaveapplications_staff_id_fkey"
            columns: ["staff_id"]
            referencedRelation: "staff"
            referencedColumns: ["id"]
          }
        ]
      }
      librarybooks: {
        Row: {
          author: string | null
          created_at: string | null
          id: string
          isbn: string | null
          quantity: number | null
          title: string
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: string
          isbn?: string | null
          quantity?: number | null
          title: string
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: string
          isbn?: string | null
          quantity?: number | null
          title?: string
        }
        Relationships: []
      }
      libraryloans: {
        Row: {
          book_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          loan_date: string | null
          returned_date: string | null
          student_id: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          loan_date?: string | null
          returned_date?: string | null
          student_id?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          loan_date?: string | null
          returned_date?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "libraryloans_book_id_fkey"
            columns: ["book_id"]
            referencedRelation: "librarybooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "libraryloans_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          message: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          message?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          message?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      parents: {
        Row: {
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parents_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      staff: {
        Row: {
          contact_details: string | null
          created_at: string | null
          id: string
          name: string
          role: string | null
        }
        Insert: {
          contact_details?: string | null
          created_at?: string | null
          id?: string
          name: string
          role?: string | null
        }
        Update: {
          contact_details?: string | null
          created_at?: string | null
          id?: string
          name?: string
          role?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          admission_date: string | null
          class_id: string | null
          created_at: string | null
          id: string
          parent_id: string | null
          roll_number: string | null
          user_id: string | null
        }
        Insert: {
          admission_date?: string | null
          class_id?: string | null
          created_at?: string | null
          id?: string
          parent_id?: string | null
          roll_number?: string | null
          user_id?: string | null
        }
        Update: {
          admission_date?: string | null
          class_id?: string | null
          created_at?: string | null
          id?: string
          parent_id?: string | null
          roll_number?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string | null
          employee_id: string | null
          id: string
          joined_date: string | null
          qualification: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          joined_date?: string | null
          qualification?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          joined_date?: string | null
          qualification?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      timetable: {
        Row: {
          class_id: string | null
          created_at: string | null
          day_of_week: string | null
          end_time: string | null
          id: string
          start_time: string | null
          subject_id: string | null
          teacher_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          day_of_week?: string | null
          end_time?: string | null
          id?: string
          start_time?: string | null
          subject_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          day_of_week?: string | null
          end_time?: string | null
          id?: string
          start_time?: string | null
          subject_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timetable_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          }
        ]
      }
      timetablechanges: {
        Row: {
          class_id: string | null
          created_at: string | null
          date: string | null
          id: string
          period: string | null
          reason: string | null
          subject_id: string | null
          teacher_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          period?: string | null
          reason?: string | null
          subject_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          period?: string | null
          reason?: string | null
          subject_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timetablechanges_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetablechanges_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetablechanges_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          }
        ]
      }
      transportassignments: {
        Row: {
          created_at: string | null
          drop_off_time: string | null
          id: string
          pick_up_time: string | null
          route_id: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string | null
          drop_off_time?: string | null
          id?: string
          pick_up_time?: string | null
          route_id?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string | null
          drop_off_time?: string | null
          id?: string
          pick_up_time?: string | null
          route_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transportassignments_route_id_fkey"
            columns: ["route_id"]
            referencedRelation: "transportroutes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportassignments_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      transportroutes: {
        Row: {
          created_at: string | null
          driver_id: string | null
          id: string
          route_name: string
          stops: string[] | null
          vehicle: string | null
        }
        Insert: {
          created_at?: string | null
          driver_id?: string | null
          id?: string
          route_name: string
          stops?: string[] | null
          vehicle?: string | null
        }
        Update: {
          created_at?: string | null
          driver_id?: string | null
          id?: string
          route_name?: string
          stops?: string[] | null
          vehicle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transportroutes_driver_id_fkey"
            columns: ["driver_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          password: string
          phone_number: string | null
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password: string
          phone_number?: string | null
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "admin" | "staff" | "student" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
