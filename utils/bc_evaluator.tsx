// Example in bc_evaluator.tsx
import type { E, E1, E2, E3, E4, Program, Result } from './bc_syntax';

// Helper to generate all boolean combinations
function allBooleanCombinations(length: number): boolean[][] {
  const total = 2 ** length;
  return Array.from({ length: total }, (_, i) =>
    Array.from({ length }, (_, j) => Boolean((i >> (length - 1 - j)) & 1))
  );
}

// Variable collector
function getVars(expr: E): string[] {
  const vars = new Set<string>();
  
  function collect(e: E | E1 | E2 | E3 | E4): void {
  switch (e.type) {
    case 'Paren': collect(e.expr); break;
    case 'PlainE1': collect(e.expr); break;
    case 'OrE': collect(e.left); collect(e.right); break;
    case 'PlainE2': collect(e.expr); break;
    case 'MulE': collect(e.left); collect(e.right); break;
    case 'PlainE3': collect(e.expr); break;
    case 'NotE': collect(e.expr); break;
    case 'PlainE4': collect(e.expr); break;
    case 'BaseE': collect(e.expr); break;
    case 'BoolB': vars.add(e.value.name); break;
    // Optionally, add a default: to catch errors
    default: throw new Error(`Unknown node type: ${(e as any).type}`);
  }
}

  collect(expr);
  return Array.from(vars);
}

// Main evaluator
export function evalProgram(program: Program): Result {
  try {
    const vars = [...new Set(getVars(program.expr))];
    const combinations = allBooleanCombinations(vars.length);
    
    const rows = combinations.map(combo => {
      const env = Object.fromEntries(
        vars.map((name, i) => [name, combo[i]])
      );
      const result = evaluateE(program.expr, env);
      
      if (result.type !== 'ValidTable' || result.rows[0].length !== 1) {
        throw new Error('Invalid evaluation result structure');
      }
      
      return [...combo, result.rows[0][0]];
    });

    return {
      type: 'ValidTable',
      header: [...vars, 'Result'],
      rows
    };
  } catch (error) {
    return { 
      type: 'Invalid', 
      msg: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Recursive evaluation functions
function evaluateE(expr: E, env: Record<string, boolean>): Result {
  switch (expr.type) {
    case 'Paren': return evaluateE(expr.expr, env);
    case 'PlainE1': return evaluateE1(expr.expr, env);
    default: throw new Error(`Unknown E node type ${(expr as any).type}`)
  }
}

function evaluateE1(e1: E1, env: Record<string, boolean>): Result {
  switch (e1.type) {
    case 'OrE': {
      const left = evaluateE1(e1.left, env);
      const right = evaluateE2(e1.right, env);
      return combineResults(left, right, (a, b) => a || b);
    }
    case 'PlainE2': return evaluateE2(e1.expr, env);
    default:
      throw new Error(`Unknown E1 node type: ${(e1 as any).type}`);
  }
}

function evaluateE2(e2: E2, env: Record<string, boolean>): Result {
  switch (e2.type) {
    case 'MulE': {
      const left = evaluateE2(e2.left, env);
      const right = evaluateE3(e2.right, env);
      return combineResults(left, right, (a, b) => a && b);
    }
    case 'PlainE3': return evaluateE3(e2.expr, env);
    default: throw new Error(`Unknown E2 node type: ${(e2 as any).type}`)
  }
}

function evaluateE3(e3: E3, env: Record<string, boolean>): Result {
  switch (e3.type) {
    case 'NotE': {
      const inner = evaluateE3(e3.expr, env);
      return mapResult(inner, a => !a);
    }
    case 'PlainE4': return evaluateE4(e3.expr, env);
    default: throw new Error(`Unknown E3 node type: ${(e3 as any).type}`)
  }
}

function evaluateE4(e4: E4, env: Record<string, boolean>): Result {
  switch (e4.type) {
    case 'BaseE':
      return evaluateE(e4.expr, env);
    case 'BoolB':
      return {
        type: 'ValidTable',
        header: [],
        rows: [[env[e4.value.name] ?? false]]
      };
  }
}

// Helper to combine two results with a binary operator
function combineResults(
  left: Result,
  right: Result,
  op: (a: boolean, b: boolean) => boolean
): Result {
  if (left.type !== 'ValidTable' || right.type !== 'ValidTable') {
    return { type: 'Invalid', msg: 'Invalid subexpression' };
  }
  return {
    type: 'ValidTable',
    header: [],
    rows: left.rows.map((row, i) => [op(row[0], right.rows[i][0])])
  };
}

// Helper to map a result with a unary operator
function mapResult(
  res: Result,
  op: (a: boolean) => boolean
): Result {
  if (res.type !== 'ValidTable') {
    return { type: 'Invalid', msg: 'Invalid subexpression' };
  }
  return {
    type: 'ValidTable',
    header: [],
    rows: res.rows.map(row => [op(row[0])])
  };
}
