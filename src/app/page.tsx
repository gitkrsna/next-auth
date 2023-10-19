"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { Database } from "types/supabase";

export default function Home() {
  useEffect(() => {
    window.location.href = "/admin/course-management";
  }, []);

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
      {/* <AdminNav /> */}
      {/* <StudentNav /> */}
    </>
  );
}
