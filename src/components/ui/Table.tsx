type TableProps = {
  children: React.ReactNode;
};

export default function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto bg-secondary-0">
      <table>{children}</table>
    </div>
  );
}

function TableHeader({ children }: TableProps) {
  return (
    <thead>
      <tr className="title-row">{children}</tr>
    </thead>
  );
}

function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
