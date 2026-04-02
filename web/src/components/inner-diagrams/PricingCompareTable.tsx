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
  return (
    <div className="compare-wrap reveal is-visible">
      <table className="compare-table">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              <th scope="row">{row[0]}</th>
              {row.slice(1).map((cell, j) => (
                <Cell key={j} value={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
