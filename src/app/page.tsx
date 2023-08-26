
import { ProfileForm } from '@/components/student/AddStudent'
import AuthForm from './auth-form'
import { NavMenu, NavMenuItem } from '@/components/shared-ui/NavMenu'

const menuItems: NavMenuItem[] = [
  {
    trigger: "Getting started",
    content: [
      {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      }]
  },
  {
    trigger: "Documentation",
    content: "/docs"
  }

]

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

    <NavMenu navMenuItems={menuItems} />
  )
}