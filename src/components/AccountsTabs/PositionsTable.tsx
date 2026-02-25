type Position = {
    symbol: string;
    symbolId: number;
    openQuantity: number;
    closedQuantity: number;
    currentMarketValue: number;
    currentPrice: number;
    averageEntryPrice: number;
    dayPnl: number;
    closedPnl: number;
    openPnl: number;
    totalCost: number;
    isRealTime: boolean;
    isUnderReorg: boolean;
};

type Props = {
    positions: Position[];
};

const PositionsTable = ({ positions }: Props) => {
    const positionFields = [
        "symbol",
        "symbolId",
        "openQuantity",
        "closedQuantity",
        "currentMarketValue",
        "currentPrice",
        "averageEntryPrice",
        "dayPnl",
        "closedPnl",
        "openPnl",
        "totalCost",
        "isRealTime",
        "isUnderReorg",
    ] as const;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {positionFields.map((positionField) => (
                        <th key={positionField}>{positionField}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {positions.map((position, index) => (
                    <tr key={index}>
                        {positionFields.map((field) => (
                            <td>
                                {field === "isRealTime" ||
                                field === "isUnderReorg"
                                    ? position[field as keyof typeof position]
                                        ? "✅"
                                        : "❌"
                                    : (position[
                                          field as keyof typeof position
                                      ] ?? "-")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default PositionsTable;
