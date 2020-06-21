import makeDb from "../db";
import makeAbbreviationList from "./abbreviation-list";
import makeAbbreviationsEndpointHandler from "./abbreviations-endpoint";
import seedAbbreviations from "./abbreviations-seeder";
import adaptRequest from "../helpers/adapt-request";


const database=makeDb();
const abbreviationList = makeAbbreviationList({ database })
const abbreviationEndpointHandler = makeAbbreviationsEndpointHandler({ abbreviationList })
seedAbbreviations(database,abbreviationList);



export default function abbreviationsController (req, res) {
    const httpRequest = adaptRequest(req);
    abbreviationEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res
          .set(headers)
          .status(statusCode)
          .send(data)
      )
      .catch(e => res.status(500).end())
  }