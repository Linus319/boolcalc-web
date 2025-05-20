import SyntaxRules from "@/components/syntax-rules";
import ValidExprExamples from "@/components/valid_expr_examples";
import Navbar from "@/components/navbar";



export default function SyntaxPage() {
    return (
        <>
            <Navbar />
            
            <div>
                <SyntaxRules />
            </div> 

            <div>
                <h1 className="mx-4 mt-4 text-center text-xl">Valid Boolean Expressions</h1>
                <ValidExprExamples />
            </div>

            <br></br>
            <h1 className="mb-4 text-center">All boolean variables must be single alphabetic characters (case-insensitive).</h1>
            <h1 className="mb-4 text-center">All whitespace is ignored.</h1>

        </>
    )
}


