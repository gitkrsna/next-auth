
import { ProfileForm } from '@/components/student/AddStudent'
import AuthForm from './auth-form'
import { NavMenu, NavMenuItem } from '@/components/shared-ui/NavMenu'
import AdminNav from '@/components/admin/AdminNav'

export default function Home() {

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

    <AdminNav />
  )
}