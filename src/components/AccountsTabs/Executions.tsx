import ExecutionsTable from "./ExecutionsTable";

const Executions = ({ executions }: { executions: any }) => {
    return (
        <div>
            {executions.executions?.length > 0 ? "Executions" : "No Executions"}
            {/* <pre className="mt-3">{JSON.stringify(executions, null, 2)}</pre> */}
            <div>
                <ExecutionsTable
                    executions={executions.executions}
                ></ExecutionsTable>
            </div>
        </div>
    );
};
export default Executions;
