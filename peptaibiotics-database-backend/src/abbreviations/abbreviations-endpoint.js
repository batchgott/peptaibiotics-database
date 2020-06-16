import makeHttpError from "../helpers/http-error"
import makeAbbreviation from "./abbreviation";
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

        default:
          return makeHttpError({
            statusCode: 405,
            errorMessage: `${httpRequest.method} method not allowed.`
          })
      }
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
        return {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:200,
            data:JSON.stringify(result)
        }
    }

    async function postAbbreviation (httpRequest) {
        let abbreviationInfo = httpRequest.body
        if (!abbreviationInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            abbreviationInfo = JSON.parse(abbreviationInfo);
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
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