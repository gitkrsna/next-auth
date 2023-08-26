import React from 'react'
import { NavMenu, NavMenuItem } from '../shared-ui/NavMenu'

const menuItems: NavMenuItem[] = [
  {
    trigger: "Admin",
    content: [
      {
        title: "User Management",
        href: "/admin/user-management",
        description:
          "Manage users, roles, and permissions within the system.",
      },
      {
        title: "Class Management",
        href: "/admin/class-management",
        description:
          "Manage classes, subjects, and class-related operations.",
      },
      {
        title: "Course Management",
        href: "/admin/course-management",
        description:
          "Manage courses, curriculum, and course-related tasks.",
      },
      {
        title: "Attendance Tracking",
        href: "/admin/attendance-tracking",
        description:
          "Track and manage student attendance and absence records.",
      },
      {
        title: "Exam Administration",
        href: "/admin/exam-administration",
        description:
          "Administer exams, create exam schedules, and manage results.",
      },
      {
        title: "Library Management",
        href: "/admin/library-management",
        description:
          "Manage the library, books, loans, and library-related activities.",
      },
      {
        title: "Event Management",
        href: "/admin/event-management",
        description:
          "Manage school events, announcements, and event-related tasks.",
      },
      {
        title: "Financial Management",
        href: "/admin/financial-management",
        description:
          "Manage fees, payments, and financial transactions.",
      },
      {
        title: "Staff Management",
        href: "/admin/staff-management",
        description:
          "Manage school staff, roles, and staff-related operations.",
      },
      {
        title: "Transportation Management",
        href: "/admin/transportation-management",
        description:
          "Manage transportation routes, assignments, and tracking.",
      },
      {
        title: "Hostel Management",
        href: "/admin/hostel-management",
        description:
          "Manage hostel facilities, room assignments, and resident details.",
      },
      {
        title: "Health Records",
        href: "/admin/health-records",
        description:
          "Manage student health records, medical history, and health-related information.",
      },
      {
        title: "Canteen Orders",
        href: "/admin/canteen-orders",
        description:
          "Manage canteen orders, menu items, and food-related operations.",
      }
    ]
  },
  {
    trigger: "Staff",
    content: [
      {
        title: "Add Staff Member",
        href: "/admin/staff/add",
        description:
          "Add new staff members, such as teachers, to the system.",
      },
      {
        title: "Update Staff Details",
        href: "/admin/staff/update",
        description:
          "Update information for existing staff members.",
      },
      {
        title: "View Staff List",
        href: "/admin/staff/list",
        description:
          "View a list of all staff members in the organization.",
      },
      {
        title: "Assign Roles",
        href: "/admin/staff/assign-roles",
        description:
          "Assign roles and permissions to staff members.",
      },
      {
        title: "Attendance Management",
        href: "/admin/staff/attendance-management",
        description:
          "Manage staff attendance records and leave requests.",
      },
      {
        title: "Exam Management",
        href: "/admin/staff/exam-management",
        description:
          "Manage exams, schedules, and grading.",
      },
      {
        title: "Library Access",
        href: "/admin/staff/library-access",
        description:
          "Manage library access and book borrowing for staff.",
      },
      {
        title: "Financial Transactions",
        href: "/admin/staff/financial-transactions",
        description:
          "Manage financial transactions, expenses, and reimbursements.",
      },
      {
        title: "Communication",
        href: "/admin/staff/communication",
        description:
          "Facilitate communication between staff members and other stakeholders.",
      }
    ]
  },
  {
    trigger: "Student",
    content: [
      {
        title: "Add Student",
        href: "/admin/students/add",
        description:
          "Add new students to the school database.",
      },
      {
        title: "Update Student",
        href: "/admin/students/update",
        description:
          "Update information for existing students.",
      },
      {
        title: "View Student List",
        href: "/admin/students/list",
        description:
          "View a list of all students enrolled in the school.",
      },
      {
        title: "Manage Courses",
        href: "/admin/students/manage-courses",
        description:
          "Manage the courses and subjects that students are enrolled in.",
      },
      {
        title: "Record Attendance",
        href: "/admin/students/record-attendance",
        description:
          "Record and manage student attendance.",
      },
      {
        title: "View Exam Results",
        href: "/admin/students/exam-results",
        description:
          "View exam results and performance for students.",
      },
      {
        title: "Library Access",
        href: "/admin/students/library-access",
        description:
          "Manage library access and book borrowing for students.",
      },
      {
        title: "Student Fees",
        href: "/admin/students/fees",
        description:
          "Manage student fees, payments, and financial records.",
      }
    ]
  },
  {
    trigger: "Parent",
    content: [
      {
        title: "View Parent List",
        href: "/admin/parents/list",
        description:
          "View a list of all parents associated with students.",
      },
      {
        title: "Manage Parent-Student Relationships",
        href: "/admin/parents/manage-relationships",
        description:
          "Manage the relationships between parents and their children.",
      },
      {
        title: "Parent Communication",
        href: "/admin/parents/communication",
        description:
          "Facilitate communication between parents and teachers.",
      },
      {
        title: "View Parental Involvement",
        href: "/admin/parents/involvement",
        description:
          "View and manage parental involvement in school activities.",
      },
      {
        title: "Parent Feedback",
        href: "/admin/parents/feedback",
        description:
          "Gather and manage feedback from parents about school activities.",
      }
    ]
  },
  {
    trigger: "Courses",
    content: [
      {
        title: "Add Course",
        href: "/admin/courses/add",
        description:
          "Add new courses to the school curriculum.",
      },
      {
        title: "Update Course Details",
        href: "/admin/courses/update",
        description:
          "Update information for existing courses.",
      },
      {
        title: "View Course List",
        href: "/admin/courses/list",
        description:
          "View a list of all courses offered by the school.",
      },
      {
        title: "Manage Subjects",
        href: "/admin/courses/manage-subjects",
        description:
          "Manage subjects and topics within each course.",
      },
      {
        title: "Enrollment Management",
        href: "/admin/courses/enrollment",
        description:
          "Manage student enrollment in courses.",
      },
      {
        title: "Timetable Management",
        href: "/admin/courses/timetable",
        description:
          "Create and manage course timetables and schedules.",
      },
      {
        title: "Resource Materials",
        href: "/admin/courses/resources",
        description:
          "Upload and manage course-related resource materials.",
      },
      {
        title: "Assessment Management",
        href: "/admin/courses/assessment",
        description:
          "Manage course assessments, quizzes, and assignments.",
      },
      {
        title: "Course Performance",
        href: "/admin/courses/performance",
        description:
          "Analyze and track the performance of students in each course.",
      }
    ]
  },
  {
    trigger: "Reports",
    content: [
      {
        title: "Generate Attendance Report",
        href: "/admin/reports/attendance",
        description:
          "Generate and view attendance reports for students and staff.",
      },
      {
        title: "Exam Results Report",
        href: "/admin/reports/exam-results",
        description:
          "Generate and analyze exam results reports for students.",
      },
      {
        title: "Financial Transactions Report",
        href: "/admin/reports/financial-transactions",
        description:
          "Generate financial transactions and expenses reports.",
      },
      {
        title: "Library Usage Report",
        href: "/admin/reports/library-usage",
        description:
          "Generate and view reports on library book borrowing and usage.",
      },
      {
        title: "Student Performance Report",
        href: "/admin/reports/student-performance",
        description:
          "Generate comprehensive performance reports for individual students.",
      },
      {
        title: "Staff Attendance Report",
        href: "/admin/reports/staff-attendance",
        description:
          "Generate and view attendance reports for staff members.",
      },
      {
        title: "Course Enrollment Report",
        href: "/admin/reports/course-enrollment",
        description:
          "Generate reports on student enrollment in different courses.",
      },
      {
        title: "Health Records Report",
        href: "/admin/reports/health-records",
        description:
          "Generate and view health records reports for students.",
      },
      {
        title: "Transportation Usage Report",
        href: "/admin/reports/transportation-usage",
        description:
          "Generate reports on student transportation route usage.",
      }
    ]
  },
  {
    trigger: "Communication",
    content: [
      {
        title: "Messages",
        href: "/admin/communication/messages",
        description:
          "View and manage messages sent and received by administrators.",
      },
      {
        title: "Inbox",
        href: "/admin/communication/inbox",
        description:
          "Check the inbox for communication from various stakeholders.",
      },
      {
        title: "Sent Messages",
        href: "/admin/communication/sent",
        description:
          "View messages sent by administrators to different recipients.",
      },
      {
        title: "Broadcasts",
        href: "/admin/communication/broadcasts",
        description:
          "Send broadcast messages to specific groups or the entire school community.",
      }
    ]
  },
  {
    trigger: "Events and Announcements",
    content: [
      {
        title: "Create Event",
        href: "/admin/events/create",
        description:
          "Create new events and announcements for the school community.",
      },
      {
        title: "View Events",
        href: "/admin/events/view",
        description:
          "View a calendar of upcoming events and announcements.",
      },
      {
        title: "Event RSVPs",
        href: "/admin/events/rsvps",
        description:
          "Manage RSVPs and attendee lists for upcoming events.",
      },
      {
        title: "Announcements",
        href: "/admin/announcements",
        description:
          "Create and manage important announcements for students, staff, and parents.",
      }
    ]
  }


]
const AdminNav = () => {
  return (
    <div className='px-10 py-5'>
      <NavMenu navMenuItems={menuItems} />
    </div>
  )
}

export default AdminNav