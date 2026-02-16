type Activity = {
    tradeDate: string;
    transactionDate: string;
    settlementDate: string;
    action: string;
    symbol: string;
    symbolId: number;
    description: string;
    currency: string;
    quantity: number;
    price: number;
    grossAmount: number;
    commission: number;
    netAmount: number;
    type: string;
};

type Props = {
    activities: Activity[];
};

const ActivitiesTable = ({ activities }: Props) => {
    const activityFields = [
        "tradeDate",
        "transactionDate",
        "settlementDate",
        "action",
        "symbol",
        "symbolId",
        "description",
        "currency",
        "quantity",
        "price",
        "grossAmount",
        "commission",
        "netAmount",
        "type",
    ] as const;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {activityFields.map((activityField) => (
                        <th key={activityField}>{activityField}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {activities.map((position, index) => (
                    <tr key={index}>
                        {activityFields.map((field) => (
                            <td>
                                {position[field as keyof typeof position] ??
                                    "-"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ActivitiesTable;
