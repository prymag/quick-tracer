import React, { useCallback, useEffect, useState } from "react";
import { 
    Route,
    Switch,
    useRouteMatch
} from "react-router-dom";
import Table from "./PeopleTable";
import ShowPerson from "./ShowPerson";
import CreatePerson from "./CreatePerson";


const index = () => {
    const match = useRouteMatch();

    return (<Switch>
        <Route path={`${match.path}/create`}>
          <CreatePerson />
        </Route>
        <Route path={`${match.path}/:id`}>
          <ShowPerson />
        </Route>
        <Route path={`${match.path}/`}>
          <Table />
        </Route>
    </Switch>)
}

export default index;