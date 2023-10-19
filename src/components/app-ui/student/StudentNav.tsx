import React from "react";
import { NavMenu, NavMenuItem } from "../../shared-ui/NavMenu";

const menuItems: NavMenuItem[] = [
  {
    trigger: "Academic Information",
    content: [
      {
        title: "View Enrolled Courses",
        href: "/student/courses",
        description: "View the courses you're currently enrolled in.",
      },
      {
        title: "Access Course Materials",
        href: "/student/course-materials",
        description: "Access study materials and resources for your courses.",
      },
      {
        title: "View Attendance Records",
        href: "/student/attendance",
        description: "Check your attendance records and history.",
      },
      {
        title: "Check Absence History",
        href: "/student/absence-history",
        description: "Review your history of absences.",
      },
      {
        title: "View Exam Schedules",
        href: "/student/exam-schedules",
        description: "Access your upcoming exam schedules.",
      },
      {
        title: "Access Exam Results",
        href: "/student/exam-results",
        description: "View your exam results and performance.",
      },
      {
        title: "Browse Library Catalog",
        href: "/student/library-catalog",
        description:
          "Explore the school's library catalog and available books.",
      },
      {
        title: "Borrow and Return Books",
        href: "/student/library-borrow-return",
        description: "Borrow and return books from the library.",
      },
      {
        title: "View Class Timetable",
        href: "/student/class-timetable",
        description: "Access your daily and weekly class schedules.",
      },
      {
        title: "View Academic Performance",
        href: "/student/academic-performance",
        description: "Review your academic performance and grades.",
      },
      {
        title: "Monitor Progress",
        href: "/student/progress-tracking",
        description: "Track your progress and performance over time.",
      },
      {
        title: "Access Online Resources",
        href: "/student/online-resources",
        description:
          "Access digital resources and online materials from the library.",
      },
      {
        title: "Explore Study Materials",
        href: "/student/study-materials",
        description: "Access additional study materials and references.",
      },
    ],
  },
  {
    trigger: "School Life",
    content: [
      {
        title: "View Upcoming Events",
        href: "/student/upcoming-events",
        description: "Stay updated with upcoming school events and activities.",
      },
      {
        title: "RSVP for Events",
        href: "/student/rsvp-events",
        description: "Confirm your attendance for upcoming events.",
      },
      {
        title: "View Fee Details",
        href: "/student/fee-details",
        description: "Access details about your tuition and other fees.",
      },
      {
        title: "Make Payments",
        href: "/student/make-payments",
        description: "Submit payments for tuition and other school expenses.",
      },
      {
        title: "View Transportation Routes",
        href: "/student/transportation-routes",
        description:
          "Check the available transportation routes for your location.",
      },
      {
        title: "Track Bus Location",
        href: "/student/track-bus",
        description: "Track the real-time location of your school bus.",
      },
      {
        title: "View Hostel Information",
        href: "/student/hostel-info",
        description:
          "Access details about the school's hostels and accommodations.",
      },
      {
        title: "Check Room Assignment",
        href: "/student/room-assignment",
        description: "View your assigned room and hostel details.",
      },
      {
        title: "Access Medical History",
        href: "/student/medical-history",
        description: "View your medical history and health records.",
      },
      {
        title: "Schedule Health Checkups",
        href: "/student/schedule-checkups",
        description:
          "Schedule health checkup appointments at the school clinic.",
      },
      {
        title: "Participate in Extracurricular Activities",
        href: "/student/extracurricular",
        description:
          "Join clubs, teams, and participate in school competitions.",
      },
      {
        title: "Provide Feedback and Participate in Surveys",
        href: "/student/feedback-surveys",
        description: "Share feedback and participate in school surveys.",
      },
      {
        title: "Access Parent-Teacher Meeting Details",
        href: "/student/ptm-details",
        description: "View details about upcoming parent-teacher meetings.",
      },
      {
        title: "Receive Updates from Parents",
        href: "/student/parent-updates",
        description: "Stay updated with messages and updates from parents.",
      },
    ],
  },
  {
    trigger: "Communication and Profile",
    content: [
      {
        title: "View Messages from Teachers",
        href: "/student/teacher-messages",
        description: "Access messages and announcements from your teachers.",
      },
      {
        title: "Participate in Class Discussions",
        href: "/student/class-discussions",
        description: "Engage in discussions with your classmates and teachers.",
      },
      {
        title: "Update Personal Information",
        href: "/student/update-profile",
        description: "Update your personal information and contact details.",
      },
      {
        title: "Change Password",
        href: "/student/change-password",
        description: "Change your login password for security.",
      },
    ],
  },
];

const StudentNav = () => {
  return (
    <div className="px-10 py-5">
      <NavMenu navMenuItems={menuItems} />
    </div>
  );
};

export default StudentNav;
