import { NavMenu, NavMenuItem } from '@/components/shared-ui/NavMenu'
import React from 'react'

const layout = ({ children }: {
    children: React.ReactNode
}) => {
    const menuItems: NavMenuItem[] = [
        {
            "trigger": "Course",
            "content": "/admin/course-management",
        },
        {
            "trigger": "Subject",
            "content": "/admin/subject-management",
        },
        {
            "trigger": "Class",
            "content": "/admin/class-management",
        },
        {
            "trigger": "Time Table",
            "content": "/admin/timetable-management",
        }]

    return (
        <div>
            <NavMenu defaultValue='/admin/course-management' navMenuItems={menuItems} />
            {children}
        </div>
    )
}

export default layout