"use client"

import { useState } from "react";
import { generateTruthTable } from "../utils/bc_generate_truth_table";
import TruthTable from "./truth-table";
import { Result } from "@/utils/bc_syntax";

export default function ExprInput() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<Result | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = generateTruthTable(input);
        setResult(res);
    }

    return (
        <div className="flex justify-center items-center">   
            <form
                className="flex flex-col items-center gap-2 w-full max-w-xs"
                onSubmit={handleSubmit}
            >
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm w-full text-center"
                    type="text"
                    placeholder="Enter boolean expression"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />                
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow"
                >
                    Generate Truth Table
                </button>
            </form>
            {result && (
                <div className="mt-4 w-full max-w-xs bg-gray-900 rounded p-2 text-sm">
                    {result.type === "Invalid"
                        ? <span className="text-red-600">{result.msg}</span>
                        : <TruthTable table={result.type === "ValidTable" ? result : null} />
                    }
                </div>
            )}
        </div>
    );
}