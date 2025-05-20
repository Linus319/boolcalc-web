export type TruthTableProps = {
    table: {
        type: 'ValidTable';
        header: string[];
        rows: boolean[][];
    } | null;
};

export default function TruthTable({ table }: TruthTableProps) {
    if (!table || table.type !== "ValidTable") return null;

    console.log(table)

    return (
        <table className="table-auto w-full text-center border-collapse">
            <thead>
                <tr>
                    {table.header.map((col, idx) => (
                        <th key={idx} className="border px-2 py-1">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {table.rows.map((row, rIdx) => (
                    <tr key={rIdx}> 
                        {row.map((cell, cIdx) => (
                            <td key={cIdx} className="border px-2 py-1">{+ cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}