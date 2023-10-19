import React from "react";
import { NavMenu, NavMenuItem } from "../../shared-ui/NavMenu";

const menuItems: NavMenuItem[] = [
  {
    trigger: "Personal Information",
    content: [
      {
        title: "View Profile Information",
        href: "/staff/profile",
        description: "Access your personal and professional details.",
      },
      {
        title: "Update Contact Information",
        href: "/staff/update-contact",
        description: "Update your contact details for communication.",
      },
      {
        title: "Change Password",
        href: "/staff/change-password",
        description: "Change your login password for security.",
      },
    ],
  },
  {
    trigger: "Teaching and Courses",
    content: [
      {
        title: "Manage Courses and Subjects",
        href: "/staff/manage-courses",
        description:
          "Administer the courses and subjects you're responsible for.",
      },
      {
        title: "Record Student Attendance",
        href: "/staff/record-attendance",
        description: "Take attendance and manage student presence in classes.",
      },
      {
        title: "Grade Assignments and Exams",
        href: "/staff/grade-assignments",
        description:
          "Evaluate and provide grades for student assignments and exams.",
      },
    ],
  },
  {
    trigger: "Communication and Engagement",
    content: [
      {
        title: "Receive School Announcements",
        href: "/staff/school-announcements",
        description: "Stay informed with important school announcements.",
      },
      {
        title: "Participate in Staff Meetings",
        href: "/staff/staff-meetings",
        description: "Engage in staff meetings and discussions.",
      },
      {
        title: "Contact Colleagues",
        href: "/staff/contact-colleagues",
        description: "Communicate with fellow staff members and colleagues.",
      },
    ],
  },
  {
    trigger: "Reports and Analytics",
    content: [
      {
        title: "View Class Performance Reports",
        href: "/staff/class-reports",
        description: "Access performance reports for the classes you teach.",
      },
      {
        title: "Monitor Student Progress",
        href: "/staff/student-progress",
        description:
          "Track and analyze the academic progress of your students.",
      },
      {
        title: "Access Teaching Resources",
        href: "/staff/teaching-resources",
        description: "Access resources and materials for effective teaching.",
      },
    ],
  },
];

const StaffNav = () => {
  return (
    <div className="px-10 py-5">
      <NavMenu navMenuItems={menuItems} />
    </div>
  );
};

export default StaffNav;
