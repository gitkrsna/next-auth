import React from 'react'
import { NavMenu, NavMenuItem } from '../../shared-ui/NavMenu'

const menuItems: NavMenuItem[] = [
  {
    "trigger": "Student Overview",
    "content": [
      {
        "title": "View Child's Information",
        "href": "/parent/child-info",
        "description": "Access your child's personal and academic details."
      },
      {
        "title": "View Child's Academic Performance",
        "href": "/parent/academic-performance",
        "description": "Review your child's academic progress and grades."
      },
      {
        "title": "View Child's Attendance",
        "href": "/parent/attendance",
        "description": "Check your child's attendance records and history."
      },
      {
        "title": "View Child's Exam Results",
        "href": "/parent/exam-results",
        "description": "Access your child's exam results and performance."
      }
    ]
  },
  {
    "trigger": "Communication and Engagement",
    "content": [
      {
        "title": "Receive School Announcements",
        "href": "/parent/school-announcements",
        "description": "Stay informed with important school announcements."
      },
      {
        "title": "View Parent-Teacher Meeting Details",
        "href": "/parent/ptm-details",
        "description": "Check details about upcoming parent-teacher meetings."
      },
      {
        "title": "Participate in School Surveys",
        "href": "/parent/school-surveys",
        "description": "Provide your valuable input through school surveys."
      },
      {
        "title": "Contact Teachers",
        "href": "/parent/contact-teachers",
        "description": "Initiate communication with your child's teachers."
      }
    ]
  },
  {
    "trigger": "Financial Information",
    "content": [
      {
        "title": "View Fee Details",
        "href": "/parent/fee-details",
        "description": "Access details about your child's tuition and fees."
      },
      {
        "title": "Make Fee Payments",
        "href": "/parent/make-payments",
        "description": "Submit payments for your child's school expenses."
      },
      {
        "title": "Financial Transactions History",
        "href": "/parent/financial-history",
        "description": "View the history of financial transactions and payments."
      }
    ]
  },
  {
    "trigger": "Profile and Settings",
    "content": [
      {
        "title": "Update Contact Information",
        "href": "/parent/update-contact",
        "description": "Update your contact details for communication."
      },
      {
        "title": "Change Password",
        "href": "/parent/change-password",
        "description": "Change your login password for security."
      }
    ]
  }
]


const ParentNav = () => {
  return (
    <div className='px-10 py-5'>
      <NavMenu navMenuItems={menuItems} />
    </div>
  )
}

export default ParentNav