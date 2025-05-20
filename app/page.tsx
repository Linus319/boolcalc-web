import Navbar from "@/components/navbar";
import ExprInput from "@/components/expr-input";
import SyntaxRules from "@/components/syntax-rules";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="m-8">
        <ExprInput />
      </div>
    </>
  );
}
