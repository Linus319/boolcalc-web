export default function ValidExprExamples() {
    return (
        <>
            <div className="flex justify-center items-center my-6">
                <table className="border-xl border-gray-800 rounded shadow bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-black text-center">
                            <th className="px-4 py-2 border">Expression</th>
                            <th className="px-4 py-2 border">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-black text-center">
                            <td className="px-4 py-2 border font-mono text-lg">A+B</td>
                            <td className="px-4 py-2 border">A OR B</td>
                        </tr>
                        <tr className="text-black text-center">
                            <td className="px-4 py-2 border font-mono text-lg">A*B</td>
                            <td className="px-4 py-2 border">A AND B</td>
                        </tr>
                        <tr className="text-black text-center">
                            <td className="px-4 py-2 border font-mono text-lg">AB</td>
                            <td className="px-4 py-2 border">A AND B</td>
                        </tr>
                        <tr className="text-black text-center">
                            <td className="px-4 py-2 border font-mono text-lg">!A</td>
                            <td className="px-4 py-2 border">NOT A</td>
                        </tr>
                        <tr className="text-black text-center">
                            <td className="px-4 py-2 border font-mono text-lg">(A+B)*C</td>
                            <td className="px-4 py-2 border">(A OR B) AND C</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}