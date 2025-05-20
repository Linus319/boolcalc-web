import * as P from 'parsimmon';

// AST Types (mirroring Haskell structure)
type VarB = { type: 'VarB'; name: string };
type E4 = { type: 'BaseE'; expr: E } | { type: 'BoolB'; value: VarB };
type E3 = { type: 'NotE'; expr: E3 } | { type: 'PlainE4'; expr: E4 };
type E2 = 
  | { type: 'MulE'; left: E2; right: E3 }
  | { type: 'PlainE3'; expr: E3 };
type E1 = 
  | { type: 'OrE'; left: E1; right: E2 }
  | { type: 'PlainE2'; expr: E2 };
type E = 
  | { type: 'Paren'; expr: E }
  | { type: 'PlainE1'; expr: E1 };
type Program = { type: 'Program'; expr: E };

// Parser implementation
export const parser = P.createLanguage({
  VarB: () => P.regex(/[a-zA-Z]/).map(name => ({ type: 'VarB', name })),

  BaseE: r => P.lazy(() => r.ParenExpr).map(expr => ({ type: 'BaseE', expr })),
  BoolB: r => r.VarB.map(v => ({ type: 'BoolB', value: v })),

  NotE: r => P.string('!')
    .trim(P.optWhitespace)
    .then(r.E3)
    .map(expr => ({ type: 'NotE', expr })),

  E4: r => P.alt(r.BoolB, r.BaseE),
  
  E3: r => P.alt(
    r.NotE,
    r.E4.map(expr => ({ type: 'PlainE4', expr }))
  ),

  MulE: r => P.seqMap(
    r.E3.trim(P.optWhitespace),
    P.string('*').trim(P.optWhitespace).then(r.E3).many(),
    (first, rest) => rest.reduce(
      (left, right) => ({ type: 'MulE', left, right }),
      { type: 'PlainE3', expr: first }
    )
  ),

  E2: r => P.alt(
    r.MulE,
    r.E3.map(expr => ({ type: 'PlainE3', expr }))
  ),

  OrE: r => P.seqMap(
    r.E2.trim(P.optWhitespace),
    P.string('+').trim(P.optWhitespace).then(r.E2).many(),
    (first, rest) => rest.reduce(
      (left, right) => ({ type: 'OrE', left, right }),
      { type: 'PlainE2', expr: first }
    )
  ),

  E1: r => P.alt(r.OrE, r.E2.map(expr => ({ type: 'PlainE2', expr }))),

  ParenExpr: r => P.string('(')
    .then(r.E1)
    .skip(P.string(')'))
    .map(expr => ({ type: 'Paren', expr: { type: 'PlainE1', expr } })),

  Program: r => r.E1.map(expr => ({
    type: 'Program',
    expr: { type: 'PlainE1', expr }
  }))
});

// Public interface
export function parseProgram(input: string): Program {
  return parser.Program.tryParse(input);
}