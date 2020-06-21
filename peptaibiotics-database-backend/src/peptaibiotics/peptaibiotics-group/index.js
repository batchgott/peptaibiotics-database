import makeDb from "../../db";
import makePeptaibioticGroupList from "./peptaibiotic-group-list";
import makePeptaibioticGroupsEndpointHandler from "./peptaibiotic-groups-endpoint";
import adaptRequest from "../../helpers/adapt-request";


const database=makeDb();
const peptaibioticGroupList=makePeptaibioticGroupList({database});
const peptaibioticGroupEndpointHandler=makePeptaibioticGroupsEndpointHandler({peptaibioticGroupList});

export default function peptaibioticGroupsController(req,res){
    const httpRequest=adaptRequest(req);
    peptaibioticGroupEndpointHandler(httpRequest)
    .then(({ headers, statusCode, data }) => res
      .set(headers)
      .status(statusCode)
      .send(data)
  )
  .catch(e => res.status(500).end())
}