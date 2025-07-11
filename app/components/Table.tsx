interface TableProps {
    columns: string[];
    data: Array<Record<string, any>>;
}

export default function Table({ columns, data }: TableProps) {
    return (
        <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead className="bg-gray-100">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                {row[column]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
