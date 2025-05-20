export default function SyntaxRules() {
    return (
        <>
            <h1 className="mx-4 mt-4 text-center text-xl">Boolean Algebra Syntax</h1>
            <div className="flex justify-center items-center my-6">
                <table className="border-xl border-gray-800 rounded shadow bg-white">
                <thead>
                    <tr className="bg-gray-200 text-black text-center">
                    <th className="px-4 py-2 border">And</th>
                    <th className="px-4 py-2 border">Or</th>
                    <th className="px-4 py-2 border">Not</th>
                    <th className="px-4 py-2 border">( )</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-black text-center">
                    <td className="px-4 py-2 border font-mono text-lg">*</td>
                    <td className="px-4 py-2 border font-mono text-lg">+</td>
                    <td className="px-4 py-2 border font-mono text-lg">!</td>
                    <td className="px-4 py-2 border font-mono text-lg">( )</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <h1 className="mb-4 text-center
            ">All boolean variables must be single alphabetic characters (case-insensitive)</h1>
        </>
    )
}


