import Activities from "./Activities";
import Balances from "./Balances";
import Executions from "./Executions";
import Orders from "./Orders";
import Positions from "./Positions";

type Props = {
    loading: boolean;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    balances: any;
    fetchBalances: () => void;
    positions: any;
    fetchPositions: () => void;
    orders: any;
    fetchOrders: () => void;
    executions: any;
    fetchExecutions: () => void;
    activities: any;
    fetchActivities: () => void;
};

const AccountsTabs = ({
    loading,
    activeTab,
    setActiveTab,
    balances,
    fetchBalances,
    positions,
    fetchPositions,
    orders,
    fetchOrders,
    executions,
    fetchExecutions,
    activities,
    fetchActivities,
}: Props) => {
    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className={`nav-link ${activeTab === "balances" ? "active" : ""}`}
                        id="nav-balances-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-balances"
                        type="button"
                        role="tab"
                        aria-controls="nav-balances"
                        aria-selected="true"
                        onClick={() => {
                            setActiveTab("balances");
                            fetchBalances();
                        }}
                    >
                        Balances
                    </button>
                    <button
                        className={`nav-link ${activeTab === "positions" ? "active" : ""}`}
                        id="nav-positions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-positions"
                        type="button"
                        role="tab"
                        aria-controls="nav-positions"
                        aria-selected="false"
                        onClick={() => {
                            setActiveTab("positions");
                            fetchPositions();
                        }}
                    >
                        Positions
                    </button>
                    <button
                        className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                        id="nav-orders-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-orders"
                        type="button"
                        role="tab"
                        aria-controls="nav-orders"
                        aria-selected="false"
                        onClick={() => {
                            setActiveTab("orders");
                            fetchOrders();
                        }}
                    >
                        Orders
                    </button>
                    <button
                        className={`nav-link ${activeTab === "executions" ? "active" : ""}`}
                        id="nav-executions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-executions"
                        type="button"
                        role="tab"
                        aria-controls="nav-executions"
                        aria-selected="false"
                        onClick={() => {
                            setActiveTab("executions");
                            fetchExecutions();
                        }}
                    >
                        Executions
                    </button>
                    <button
                        className={`nav-link ${activeTab === "activities" ? "active" : ""}`}
                        id="nav-activities-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-activities"
                        type="button"
                        role="tab"
                        aria-controls="nav-activities"
                        aria-selected="false"
                        onClick={() => {
                            setActiveTab("activities");
                            fetchActivities();
                        }}
                    >
                        Activities
                    </button>
                    {/* <button
                        className="nav-link"
                        id="nav-disabled-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-disabled"
                        type="button"
                        role="tab"
                        aria-controls="nav-disabled"
                        aria-selected="false"
                        disabled
                    >
                        Disabled
                    </button> */}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className={`tab-pane fade ${activeTab === "balances" ? "show active" : ""}`}
                    id="nav-balances"
                    role="tabpanel"
                    aria-labelledby="nav-balances-tab"
                    tabIndex={0}
                >
                    {loading ? (
                        <p>Loading...</p>
                    ) : !balances ? (
                        <p>No balances loaded yet...</p>
                    ) : (
                        <Balances balances={balances} />
                    )}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === "positions" ? "show active" : ""}`}
                    id="nav-positions"
                    role="tabpanel"
                    aria-labelledby="nav-positions-tab"
                    tabIndex={0}
                >
                    {loading ? (
                        <p>Loading...</p>
                    ) : !positions ? (
                        <p>No positions loaded yet...</p>
                    ) : (
                        <Positions positions={positions}></Positions>
                    )}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === "orders" ? "show active" : ""}`}
                    id="nav-orders"
                    role="tabpanel"
                    aria-labelledby="nav-orders-tab"
                    tabIndex={0}
                >
                    {loading ? (
                        <p>Loading...</p>
                    ) : !orders ? (
                        <p>No orders loaded yet...</p>
                    ) : (
                        <Orders orders={orders}></Orders>
                    )}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === "executions" ? "show active" : ""}`}
                    id="nav-executions"
                    role="tabpanel"
                    aria-labelledby="nav-executions-tab"
                    tabIndex={0}
                >
                    {loading ? (
                        <p>Loading...</p>
                    ) : !executions ? (
                        <p>No executions loaded yet...</p>
                    ) : (
                        <Executions executions={executions}></Executions>
                    )}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === "activities" ? "show active" : ""}`}
                    id="nav-activities"
                    role="tabpanel"
                    aria-labelledby="nav-activities-tab"
                    tabIndex={0}
                >
                    {loading ? (
                        <p>Loading...</p>
                    ) : !activities ? (
                        <p>No activities loaded yet...</p>
                    ) : (
                        <Activities activities={activities}></Activities>
                    )}
                </div>
                {/* <div
                    className="tab-pane fade"
                    id="nav-disabled"
                    role="tabpanel"
                    aria-labelledby="nav-disabled-tab"
                    tabIndex={0}
                >
                    Disabled
                </div> */}
            </div>
        </>
    );
};

export default AccountsTabs;
