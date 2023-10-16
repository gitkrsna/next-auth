
import { ProfileForm } from '@/components/app-ui/student/AddStudent'
import AuthForm from './login/LoginForm'
import { NavMenu, NavMenuItem } from '@/components/shared-ui/NavMenu'
import AdminNav from '@/components/app-ui/admin/AdminNav'
import StudentNav from '@/components/app-ui/student/StudentNav'
import ParentNav from '@/components/app-ui/parent/ParentNav'
import StaffNav from '@/components/app-ui/staff/StaffNav'
import StudentTable from '@/components/app-ui/student/StudentTable'
import { Database } from 'types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home() {

  const supabase = createClientComponentClient<Database>()
  return (
    // <div className="row">
    //   <div className="col-6">
    //     <h1 className="header">Supabase Auth + Storage</h1>
    //     <p className="">
    //       Experience our Auth and Storage through a simple profile management example. Create a user
    //       profile and upload an avatar image. Fast, simple, secure.
    //     </p>
    //   </div>
    //   <div className="col-6 auth-widget">
    //     <AuthForm />
    //     {/* <ProfileForm /> */}
    //   </div>
    // </div>

    <>
      {/* <AuthForm /> */}
      {/* <StaffNav /> */}
      {/* <ProfileForm />
      <StudentTable /> */}
      {/* <ParentNav /> */}
      <AdminNav />
      {/* <StudentNav /> */}
    </>
  )
}