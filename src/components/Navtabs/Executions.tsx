import BalanceTable from "./BalanceTable";

const Executions = ({ executions }: { executions: any }) => {
    const positionsGroups = Object.keys(executions);
    return (
        <div>
            Executions
            {executions?.length > 0 ? "Executions" : "No Executions"}
            <pre className="mt-3">{JSON.stringify(executions, null, 2)}</pre>
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
export default Executions;
