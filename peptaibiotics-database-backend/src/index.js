import express from "express";
import bodyparser from "body-parser";
import adaptRequest from "./helpers/adapt-request";
import handleAbbreviationRequest from "./abbreviations";


const app=express();
var router=express.Router();

app.use(bodyparser.json());

router.all('/peptiabiotics');
router.get('peptiabiotics/:id');

function peptiabioticsController(req,res){
    const httpRequest=adaptRequest(req);

}
router.all('/abbreviations', abbreviationsController);
router.get('/abbreviations/:id', abbreviationsController);
router.delete('/abbreviations/:id', abbreviationsController);



function abbreviationsController (req, res) {
  const httpRequest = adaptRequest(req);
  handleAbbreviationRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.use("/api",router);
app.listen(9090,()=>console.log("Listening on port 9090"));