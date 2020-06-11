import makeDb from "../db";
import makeAbbreviationList from "./abbreviation-list";
import makeAbbreviationsEndpointHandler from "./abbreviations-endpoint";


const database=makeDb();
const abbreviationList = makeAbbreviationList({ database })
const abbreviationEndpointHandler = makeAbbreviationsEndpointHandler({ abbreviationList })

export default abbreviationEndpointHandler;