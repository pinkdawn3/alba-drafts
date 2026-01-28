import { Card } from "flowbite-react";

function KanbanCard() {
  return (
    <section>
      <Card href="#" className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Test task
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          This is a test card for Kanban
        </p>
      </Card>
    </section>
  );
}

/* function KanbanColumn() {
  return <section></section>;
} */

function Kanban() {
  return (
    <section>
      <KanbanCard />
    </section>
  );
}

export default Kanban;
