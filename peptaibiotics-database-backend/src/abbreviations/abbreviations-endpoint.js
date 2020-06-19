import makeHttpError from "../helpers/http-error"
import makeAbbreviation from "./abbreviation";
import createResponse from "../helpers/create-response"
import {
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors'

export default function makeAbbreviationsEndpointHandler ({ abbreviationList }) {
    return async function handle (httpRequest) {
      switch (httpRequest.method) {
        case 'POST':
          return postAbbreviation(httpRequest);

        case 'GET':
            return getAbbreviations(httpRequest);  

        case 'DELETE':
            return deleteAbbreviation(httpRequest);

        case 'PUT':
            return putAbbreviation(httpRequest);            

        default:
          return makeHttpError({
            statusCode: 405,
            errorMessage: `${httpRequest.method} method not allowed.`
          })
      }
    }

    async function deleteAbbreviation(httpRequest){
        const {id}=httpRequest.pathParams;
        if (!id)
            return makeHttpError({errorMessage: 'Bad request. No id given.'})
        const result=await abbreviationList.remove(id);
        return createResponse({result:result});
    }

    async function putAbbreviation(httpRequest){
        const {_id}=httpRequest.body;
        if (!_id)
            return makeHttpError({errorMessage: 'Bad request. Abbreviation does not exist.'})
        const result=await abbreviationList.update(httpRequest.body);
        return createResponse({result:result});
    }

    async function getAbbreviations(httpRequest){
        const {id}=httpRequest.pathParams || {};
        const {abbreviation}=httpRequest.queryParams || {};
        const {max,before,after}=httpRequest.queryParams || {}
        const result= id 
        ? await abbreviationList.findById({abbreviationId:id})
        : abbreviation
        ? await abbreviationList.findByAbbreviation({abbreviation:abbreviation})
        : await abbreviationList.getItems({max,before,after});
        return createResponse({result:result});
    }

    async function postAbbreviation (httpRequest) {
        let abbreviationInfo = httpRequest.body
        if (!abbreviationInfo) {
          return makeHttpError({errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            abbreviationInfo = JSON.parse(abbreviationInfo);
          } catch {
            return makeHttpError({errorMessage: 'Bad request. POST body must be valid JSON.'})
          }
        }
    
        try {
          const abbreviation = makeAbbreviation(abbreviationInfo);
          const result = await abbreviationList.add(abbreviation);
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 201,
            data: JSON.stringify(result)
          }
        } catch (e) {
          return makeHttpError({
            errorMessage: e.message,
            statusCode:
             (e instanceof InvalidPropertyError ||
             e instanceof RequiredParameterError)
                  ? 400
                  : 500
          });
        }
      }
}