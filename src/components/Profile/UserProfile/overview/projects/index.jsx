import { CurrentColumns } from "./components/CurrentSessions/CurrentColumns";
import { CompeleteColumns } from "./components/CompeleteSessions/CompeleteColumns";
import { DataTable } from "./components/data-table";
import { data } from "./data";

export default function Projects({custom}) {
  return (
    <DataTable
      data={data}
      columns={custom ? CompeleteColumns : CurrentColumns}
      custom={custom}
    />
  );
}




