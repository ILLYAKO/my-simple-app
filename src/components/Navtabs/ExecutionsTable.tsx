type Execution = {
    symbol: string;
    symbolId: number;
    quantity: number;
    side: string;
    price: number;
    id: number;
    orderId: number;
    orderChainId: number;
    exchangeExecId: string;
    timestam: string;
    notes: string;
    venue: string;
    totalCost: number;
    orderPlacementCommission: number;
    commission: number;
    executionFee: number;
    secFee: number;
    canadianExecutionFee: number;
    parentId: number;
};

type Props = {
    executions: Execution[];
};

const ExecutionsTable = ({ executions }: Props) => {
    const executionFields = [
        "symbol",
        "symbolId",
        "quantity",
        "side",
        "price",
        "id",
        "orderId",
        "orderChainId",
        "exchangeExecId",
        "timestam",
        "notes",
        "venue",
        "totalCost",
        "orderPlacementCommission",
        "commission",
        "executionFee",
        "secFee",
        "canadianExecutionFee",
        "parentId",
    ] as const;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {executionFields.map((executionField) => (
                        <th key={executionField}>{executionField}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {executions.map((execution, index) => (
                    <tr key={index}>
                        {executionFields.map((field) => (
                            <td>
                                {execution[field as keyof typeof execution] ??
                                    "-"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ExecutionsTable;
