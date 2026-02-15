// type Balance = {
//     currency: string;
//     cash: number;
//     marketValue: number;
//     totalEquity: number;
//     buyingPower: number;
//     maintenanceExcess: number;
//     isRealTime: boolean;
// };

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
                    {/* <th>Field</th>
                    <th>CAD</th>
                    <th>USD</th> */}
                    {positionFields.map((positionField) => (
                        <th key={positionField}>{positionField}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {positions.map((position, index) => (
                    <tr key={index}>
                        {positionFields.map((field) => (
                            // <td key={field}>
                            //     {position[field as keyof typeof position]}
                            // </td>
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
                {/* {fields.map((field) => (
                    <tr key={field}>
                        <td>
                            <strong>{field}</strong>
                        </td>
                        <td>
                            {field === "isRealTime" 
                            ? cad?.[field] ? "✅" : "❌" 
                            : (cad?.[field] ?? "-")}
                        </td>
                        <td>
                            {field === "isRealTime"
                                ? usd?.[field]
                                    ? "✅"
                                    : "❌"
                                : (usd?.[field] ?? "-")}
                        </td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    );
};
export default PositionsTable;
