import type { InnerCompareTable } from "@/types/innerPages";

type Props = {
  table: InnerCompareTable;
};

function Cell({ value }: { value: string }) {
  if (value === "✓") {
    return <td className="check">✓</td>;
  }
  if (value === "—" || value === "-") {
    return <td className="dash">—</td>;
  }
  return <td>{value}</td>;
}

export function PricingCompareTable({ table }: Props) {
  const [h0, h1, h2, h3] = table.headers;

  return (
    <div className="compare-wrap reveal is-visible">
      <table className="compare-table">
        <thead>
          <tr>
            <th scope="col">{h0}</th>
            <th scope="col">{h1}</th>
            <th scope="col">{h2}</th>
            <th scope="col">{h3}</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              <th scope="row">{row[0]}</th>
              <Cell value={row[1]} />
              <Cell value={row[2]} />
              <Cell value={row[3]} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
