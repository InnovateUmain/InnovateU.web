import React from "react";
const Menuitems = [
  {
    title: "Dashboard",
    icon: "home",
    href: "/admin",
  },
  {
    title: "All Members",
    icon: "users",
    href: "/admin/allmember",
  },
  {
    title: "Applied Members",
    icon: "check-circle",
    href: "/admin/appliedmember",
  },
  {
    title: "All Events",
    icon: "calendar",
    href: "/admin/AddEvent",
  },
  {
    title: "Teams",
    icon: "user-check",
    href: "/admin/Team",
  },
  {
    title: "Speakers",
    icon: "mic",
    href: "/admin/Speaker",
  },
  {
    title: "New Admin",
    icon: "user-plus",
    href: `/admin/AddAdmin`,
  },
  {
    title: "Tests",
    icon: "file-text",
    href: "/admin/AdminTest",
  },
  {
    title: "Test Results",
    icon: "code",
    href: "/admin/TestResult",
  },
  {
    title: "Reviews",
    icon: "message-square",
    href: "/admin",
  },
];

export default Menuitems;
