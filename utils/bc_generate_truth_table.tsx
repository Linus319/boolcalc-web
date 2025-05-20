import { parser } from './bc_parser'; // adjust import path as needed
import type { Result } from './bc_syntax';
import { evalProgram } from './bc_evaluator';

export function generateTruthTable(input: string): Result {
  try {
    const parsed = parser.Program.tryParse(input);
    return evalProgram(parsed);
  } catch (error) {
    return {
      type: 'Invalid',
      msg: error instanceof Error ? error.message : 'Parse error'
    };
  }
}