import BalanceTable from "./BalanceTable";

const Balances = ({ balances }: { balances: any }) => {
    const balanceGroups = Object.keys(balances);
    return (
        <div>
            {balanceGroups.map((balanceGroup: any) => (
                <div>
                    <h2>{balanceGroup}</h2>
                    <BalanceTable
                        unitBalances={balances[balanceGroup]}
                    ></BalanceTable>
                </div>
            ))}
        </div>
    );
};
export default Balances;
