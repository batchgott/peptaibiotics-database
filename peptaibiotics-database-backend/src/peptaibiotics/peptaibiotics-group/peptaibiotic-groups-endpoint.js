import makeHttpError from "../../helpers/http-error";
import makePeptaibioticGroup from "./peptaibiotic-group";
import createResponse from "../../helpers/create-response";

export default function makePeptaibioticGroupsEndpointHandler({peptaibioticGroupList}){
    return async function handle(httpRequest){
        switch (httpRequest.method){
            case 'POST':
                return postPeptaibioticGroup(httpRequest);

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                  });
        }
    }

    async function postPeptaibioticGroup(httpRequest){
        let peptaibioticGroupInfo=httpRequest.body;
        if(!peptaibioticGroupInfo)
            return makeHttpError({errorMessage:"Bad request. POST body must be valid JSON"});
        
        if(typeof httpRequest.body==='string'){
            try {
                peptaibioticGroupInfo=JSON.parse(peptaibioticGroupInfo);
            } catch (error) {
                return makeHttpError({errorMessage:"Bad request. POST body must be valid JSON"})
            }}
        
        try {
            const peptaibioticGroup=makePeptaibioticGroup(peptaibioticGroupInfo);
            const result=await peptaibioticGroupList.add(peptaibioticGroup);
            return createResponse({statusCode:201,result:result});
        } catch (e) {
            return makeHttpError({
                errorMessage: e.message,
                statusCode:
                 (e instanceof InvalidPropertyError ||
                 e instanceof RequiredParameterError)
                      ? 400
                      : 500
              })
        }
    }
}