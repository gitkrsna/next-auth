import React from 'react'
import { NavMenu, NavMenuItem } from '../../shared-ui/NavMenu'

const menuItems: NavMenuItem[] = [
  {
    "trigger": "Administration",
    "content": [

      {
        "title": "Class Management",
        "href": "/admin/class-management",
        "description": "Manage classes, subjects, and class-related operations."
      },
      {
        "title": "Course Management",
        "href": "/admin/course-management",
        "description": "Manage courses, curriculum, and course-related tasks."
      },
      {
        "title": "Attendance Tracking",
        "href": "/admin/attendance-tracking",
        "description": "Track and manage student attendance and absence records."
      },
      {
        "title": "Exam Administration",
        "href": "/admin/exam-administration",
        "description": "Administer exams, create exam schedules, and manage results."
      }
    ]
  },
  {
    "trigger": "Staff Operations",
    "content": [
      {
        "title": "Staff Management",
        "href": "/admin/staff-management",
        "description": "Manage school staff, roles, and staff-related operations."
      },
      {
        "title": "Attendance Management",
        "href": "/admin/staff/attendance-management",
        "description": "Manage staff attendance records and leave requests."
      },
      {
        "title": "Exam Management",
        "href": "/admin/staff/exam-management",
        "description": "Manage exams, schedules, and grading."
      }
    ]
  },
  {
    "trigger": "Student Management",
    "content": [
      {
        "title": "Student Management",
        "href": "/admin/students/manage",
        "description": "Manage student information, enrollment, and records."
      },
      {
        "title": "Course Management",
        "href": "/admin/students/course-management",
        "description": "Manage student courses, subjects, and curriculum."
      },
      {
        "title": "Exam Results",
        "href": "/admin/students/exam-results",
        "description": "View and manage exam results and performance."
      },
      {
        "title": "Library Access",
        "href": "/admin/students/library-access",
        "description": "Manage library access and book borrowing for students."
      }
    ]
  }
]

const AdminNav = () => {
  return (
    <div className='px-10 py-5 flex justify-between'>
      <NavMenu navMenuItems={menuItems} />
      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminNav