export interface AragonContractFunction {
    name: string;
    sig: string;
    notice: string | null;
    roles: {
        id: string;
        paramCount: number;
    }[];
}
//# sourceMappingURL=types.d.ts.map