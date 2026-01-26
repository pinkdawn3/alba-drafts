import type { FunctionComponent } from "react";
import { Table } from "./Table";

export const TaskManager: FunctionComponent = () => {
  return (
    <div className="mx-auto flex justify-center max-w-2xl px-4 py-5 sm:px-6 sm:py- lg:max-w-7xl lg:px-8">
      <Table />
    </div>
  );
};
