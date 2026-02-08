const Navtabs = ({ balances }: { balances: any }) => {
    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active"
                        id="nav-balances-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-balances"
                        type="button"
                        role="tab"
                        aria-controls="nav-balances"
                        aria-selected="true"
                    >
                        Balances
                    </button>
                    <button
                        className="nav-link"
                        id="nav-positions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-positions"
                        type="button"
                        role="tab"
                        aria-controls="nav-positions"
                        aria-selected="false"
                    >
                        Positions
                    </button>
                    <button
                        className="nav-link"
                        id="nav-orders-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-orders"
                        type="button"
                        role="tab"
                        aria-controls="nav-orders"
                        aria-selected="false"
                    >
                        Orders
                    </button>
                    <button
                        className="nav-link"
                        id="nav-executions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-executions"
                        type="button"
                        role="tab"
                        aria-controls="nav-executions"
                        aria-selected="false"
                    >
                        Executions
                    </button>
                    <button
                        className="nav-link"
                        id="nav-activities-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-activities"
                        type="button"
                        role="tab"
                        aria-controls="nav-activities"
                        aria-selected="false"
                    >
                        Activities
                    </button>
                    <button
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
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="nav-balances"
                    role="tabpanel"
                    aria-labelledby="nav-balances-tab"
                    tabIndex={0}
                >
                    {/* Balances */}
                    {!balances ? (
                        <p>No balances loaded yet...</p>
                    ) : (
                        <pre>{JSON.stringify(balances, null, 2)}</pre>
                    )}
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-positions"
                    role="tabpanel"
                    aria-labelledby="nav-positions-tab"
                    tabIndex={0}
                >
                    Positions
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-orders"
                    role="tabpanel"
                    aria-labelledby="nav-orders-tab"
                    tabIndex={0}
                >
                    Orders
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-executions"
                    role="tabpanel"
                    aria-labelledby="nav-executions-tab"
                    tabIndex={0}
                >
                    Executions
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-activities"
                    role="tabpanel"
                    aria-labelledby="nav-activities-tab"
                    tabIndex={0}
                >
                    Activities
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-disabled"
                    role="tabpanel"
                    aria-labelledby="nav-disabled-tab"
                    tabIndex={0}
                >
                    Disabled
                </div>
            </div>
        </>
    );
};

export default Navtabs;
