import BalanceTable from "./BalanceTable";

const Activities = ({ activities }: { activities: any }) => {
    const positionsGroups = Object.keys(activities);
    return (
        <div>
            {activities?.length > 0 ? "Activities" : "No Activities"}
            <pre className="mt-3">{JSON.stringify(activities, null, 2)}</pre>
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
export default Activities;
