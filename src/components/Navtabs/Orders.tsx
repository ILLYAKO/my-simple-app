import BalanceTable from "./BalanceTable";

const Orders = ({ orders }: { orders: any }) => {
    const positionsGroups = Object.keys(orders);
    console.log("orders in the Order element:", orders);
    return (
        <div>
            {orders.orders?.length > 0 ? "Orders" : "No Orders"}
            <pre className="mt-3">{JSON.stringify(orders, null, 2)}</pre>
            <pre>{JSON.stringify(orders.orders, null, 2)}</pre>
            {/* {balanceGroups.map((balanceGroup: any) => (
                <div>
                    <h2>{balanceGroup}</h2>
                    <BalanceTable
                        unitBalances={balances[balanceGroup]}
                    ></BalanceTable>
                </div>
            ))} */}
        </div>
    );
};
export default Orders;
