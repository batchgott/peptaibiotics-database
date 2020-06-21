import express from "express";
import bodyparser from "body-parser";
import abbreviationsController from "./abbreviations";
import peptaibioticGroupsController from "./peptaibiotics/peptaibiotics-group";


const app=express();
var router=express.Router();

app.use(bodyparser.json());

router.all('/peptiabiotics');
router.get('peptiabiotics/:id');

router.all('/abbreviations', abbreviationsController);
router.get('/abbreviations/:id', abbreviationsController);
router.delete('/abbreviations/:id', abbreviationsController);

router.all('/peptaibiotic-groups',peptaibioticGroupsController);
router.get('/peptaibiotic-groups/:id',peptaibioticGroupsController);
router.delete('/peptaibiotic-groups/:id',peptaibioticGroupsController);



app.use("/api",router);
app.listen(9090,()=>console.log("Listening on port 9090"));