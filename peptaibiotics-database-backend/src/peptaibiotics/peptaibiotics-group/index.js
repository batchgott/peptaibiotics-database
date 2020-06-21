import makeDb from "../../db";
import makePeptaibioticGroupList from "./peptaibiotic-group-list";
import makePeptaibioticGroupsEndpointHandler from "./peptaibiotic-groups-endpoint";


const database=makeDb();
const peptaibioticGroupList=makePeptaibioticGroupList({database});
const peptaibioticGroupEndpointHandler=makePeptaibioticGroupsEndpointHandler({peptaibioticGroupList});

export default peptaibioticGroupEndpointHandler;