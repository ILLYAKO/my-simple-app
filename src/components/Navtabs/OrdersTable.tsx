type Orders = {
    id: number;
    symbol: string;
    symbolId: number;
    totalQuantity: number;
    openQuantity: number;
    filledQuantity: number;
    canceledQuantity: number;
    side: string;
    orderType: string;
    limitPrice: number;
    stopPrice: number;
    isAllOrNone: boolean;
    isAnonymous: boolean;
    icebergQuantity: number;
    minQuantity: number;
    avgExecPrice: number;
    lastExecPrice: string;
    source: string;
    timeInForce: string;
    gtdDate: string;
    state: string;
    rejectionReason: string;
    chainId: number;
    creationTime: string;
    updateTime: string;
    notes: string;
    primaryRoute: string;
    secondaryRoute: string;
    orderRoute: string;
    venueHoldingOrder: string;
    comissionCharged: number;
    exchangeOrderId: string;
    isSignificantShareHolder: boolean;
    isInsider: boolean;
    isLimitOffsetInDollar: boolean;
    userId: number;
    placementCommission: number;
    legs: string[];
    strategyType: string;
    triggerStopPrice: number;
    orderGroupId: number;
    orderClass: number;
    isCrossZero: boolean;
};

type Props = {
    orders: Orders[];
};

const OrdersTable = ({ orders }: Props) => {
    const orderFields = [
        "symbol",
        "state",
        "side",
        "totalQuantity",
        "openQuantity",
        "limitPrice",
        "stopPrice",
        "avgExecPrice",
        "lastExecPrice",
        "triggerStopPrice",
        "timeInForce",
        "orderType",
        "creationTime",
        "updateTime",
        "isAnonymous",
        "isAllOrNone",
    ] as const;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {orderFields.map((orderField) => (
                        <th key={orderField}>{orderField}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        {orderFields.map((field) => (
                            <td>
                                {field === "isAnonymous" ||
                                field === "isAllOrNone"
                                    ? order[field as keyof typeof order]
                                        ? "✅"
                                        : "❌"
                                    : (order[field as keyof typeof order] ??
                                      "-")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default OrdersTable;
