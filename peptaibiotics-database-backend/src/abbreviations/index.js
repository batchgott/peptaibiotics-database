import makeDb from "../db";
import makeAbbreviationList from "./abbreviation-list";
import makeAbbreviationsEndpointHandler from "./abbreviations-endpoint";
import seedAbbreviations from "./abbreviations-seeder";


const database=makeDb();
const abbreviationList = makeAbbreviationList({ database })
const abbreviationEndpointHandler = makeAbbreviationsEndpointHandler({ abbreviationList })
seedAbbreviations(database,abbreviationList);



export default abbreviationEndpointHandler;