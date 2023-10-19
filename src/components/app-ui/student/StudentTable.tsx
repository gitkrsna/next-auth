"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { Database } from "types/supabase";

const StudentTable = () => {
  const [studentList, setStudentList] = useState<any[] | null>([]);
  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const supabase = createClientComponentClient<Database>();
    const response = await supabase.from("loginTable").select("*");
    setStudentList(response.data);
  };

  return (
    <table>
      {studentList?.map(({ id, username, email }) => (
        <tr key={id}>
          <td>{username}</td>
          <td>{email}</td>
        </tr>
      ))}
    </table>
  );
};

export default StudentTable;
