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
        },
        {
            "trigger": "Teacher",
            "content": "/admin/teacher-management",
        }]

    return (
        <div>
            <div className='px-10 py-5 flex justify-between'>
                <NavMenu defaultValue='/admin/course-management' navMenuItems={menuItems} />
                <div>
                    <form action="/auth/signout" method="post">
                        <button className="button block hover:font-bold" type="submit">
                            Sign out
                        </button>
                    </form>
                </div>
            </div>
            {children}
        </div>

    )
}

export default layout