import React from "react";
import { Button } from '@/components/ui/button';
import { ReloadIcon } from "@radix-ui/react-icons";
interface FormSubmitBtnProps {
  isSubmitting: boolean;
}

const FormSubmitBtn = ({ isSubmitting }: FormSubmitBtnProps) => {
  return (
    <div className="flex justify-end">
      {" "}
      <Button disabled={isSubmitting} type="submit">
        Save
        {isSubmitting && (
          <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
        )}{" "}
      </Button>
    </div>
  );
};

export default FormSubmitBtn;
