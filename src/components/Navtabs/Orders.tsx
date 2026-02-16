import OrdersTable from "./OrdersTable";

const Orders = ({ orders }: { orders: any }) => {
    // const positionsGroups = Object.keys(orders);
    console.log("orders in the Order element:", orders);
    return (
        <div>
            {orders.orders?.length > 0 ? "Orders" : "No Orders"}
            {/* <pre className="mt-3">{JSON.stringify(orders, null, 2)}</pre> */}
            <div>
                <OrdersTable orders={orders.orders}></OrdersTable>
            </div>
        </div>
    );
};
export default Orders;
