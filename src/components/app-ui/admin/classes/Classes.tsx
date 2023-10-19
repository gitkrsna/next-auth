"use client";

import * as React from "react";
import GenTable from "@/components/shared-ui/GenTable";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";
import { Class } from "types/tableTypes";
import AddClass from "./AddClass";
import useClassColumns from "./useClassColumns";

export function Classes() {
  const { toast } = useToast();

  const [classes, setClasses] = React.useState<Class[]>([]);

  const fetchClasses = async () => {
    const supabase = createClientComponentClient<Database>();

    const { data, error } = await supabase
      .from("classes")
      .select(
        "id, name, start_time, end_time, day_of_week, room, created_at, user(id, first_name, last_name), courses(id, name)",
      );

    !error && setClasses(data as Class[]);
  };

  const deleteClass = async (record: Class) => {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", record.id);
    if (!error) {
      toast({
        description: "Class deleted successfully",
      });
      fetchClasses();
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again later",
      });
    }
  };

  const columns = useClassColumns({
    refreshClasses: fetchClasses,
    deleteClass,
  });

  React.useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <GenTable
      columns={columns}
      data={classes}
      searchId="Class name"
      rightComponent={<AddClass refreshClasses={fetchClasses} />}
    />
  );
}
