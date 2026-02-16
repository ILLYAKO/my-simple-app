import ActivitiesTable from "./ActivitiesTable";

const Activities = ({ activities }: { activities: any }) => {
    // const positionsGroups = Object.keys(activities);
    return (
        <div>
            {activities.activities?.length > 0 ? "Activities" : "No Activities"}
            {/* <pre className="mt-3">{JSON.stringify(activities, null, 2)}</pre> */}

            <div>
                <ActivitiesTable
                    activities={activities.activities}
                ></ActivitiesTable>
            </div>
        </div>
    );
};
export default Activities;
