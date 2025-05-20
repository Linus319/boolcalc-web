export type VarB = { type: 'VarB'; name: string };
export type E4 = { type: 'BaseE'; expr: E } | { type: 'BoolB'; value: VarB };
export type E3 = { type: 'NotE'; expr: E3 } | { type: 'PlainE4'; expr: E4 };
export type E2 = 
  | { type: 'MulE'; left: E2; right: E3 }
  | { type: 'AndE'; left: E2; right: E3 }
  | { type: 'PlainE3'; expr: E3 };
export type E1 = 
  | { type: 'OrE'; left: E1; right: E2 }
  | { type: 'PlainE2'; expr: E2 };
export type E = 
  | { type: 'Paren'; expr: E }
  | { type: 'PlainE1'; expr: E1 };
export type Program = { type: 'Program'; expr: E };
export type Result = 
  | { type: 'ValidTable'; header: string[]; rows: boolean[][] }
  | { type: 'Invalid'; msg: string };
