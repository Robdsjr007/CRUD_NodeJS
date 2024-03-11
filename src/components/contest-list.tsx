import { useEffect, useState } from "react";

import { fetchContestList } from "../server/api-client";

import ContestPreview from "./contest-preview";
import Header from "./header";

const ConstestList = ({ initialContests , onContestClick}) => {
    const [contests, setContests] = useState(initialContests);
    
    useEffect(() => {
        // fetch or axios
        /// fetchContestList().then((contests) => {
        // state
        /// setContests(contests);
        /// });
    }, []);

    return (
    <>
    <Header message="Naming Contests"/>

    <div className="contest-list">
            {contests.map((contest) => {
                return <ContestPreview key={contest.id} contest={contest} onClick={onContestClick}/>
        })}
    </div>
    </>
    );
};

export default ConstestList;