type Balance = {
    currency: string;
    cash: number;
    marketValue: number;
    totalEquity: number;
    buyingPower: number;
    maintenanceExcess: number;
    isRealTime: boolean;
};

type Props = {
    unitBalances: Balance[];
};

const BalanceTable = ({ unitBalances }: Props) => {
    const cad = unitBalances.find((b) => b.currency === "CAD");
    const usd = unitBalances.find((b) => b.currency === "USD");

    const fields = [
        "cash",
        "marketValue",
        "totalEquity",
        "buyingPower",
        "maintenanceExcess",
        "isRealTime",
    ] as const;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Field</th>
                    <th>CAD</th>
                    <th>USD</th>
                </tr>
            </thead>

            <tbody>
                {fields.map((field) => (
                    <tr key={field}>
                        <td>
                            <strong>{field}</strong>
                        </td>
                        <td>
                            {field === "isRealTime"
                                ? cad?.[field]
                                    ? "✅"
                                    : "❌"
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
                ))}
            </tbody>
        </table>
    );
};
export default BalanceTable;
