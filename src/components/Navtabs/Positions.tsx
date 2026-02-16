import PositionsTable from "./PositionsTable";

const Positions = ({ positions }: { positions: any }) => {
    // const positionsGroups = Object.keys(positions.positions);
    return (
        <div>
            {positions.positions?.length > 0 ? "Positions" : "No Positions"}
            {/* <pre className="mt-3">{JSON.stringify(positions, null, 2)}</pre> */}
            <div>
                <PositionsTable
                    positions={positions.positions}
                ></PositionsTable>
            </div>
        </div>
    );
};
export default Positions;
