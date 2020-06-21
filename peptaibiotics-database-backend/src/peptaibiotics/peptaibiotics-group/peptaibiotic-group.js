import requiredParam from "../../helpers/required-param";
import isString from "../../helpers/is-string";
import { InvalidPropertyError } from "../../helpers/errors";

export default function makePeptaibioticGroup(
    peptaibioticGroupInfo=requiredParam("peptaibioticGroupInfo")){
        
        const validPeptaibioticGroup=validate(peptaibioticGroupInfo);
        return Object.freeze(validPeptaibioticGroup);

    function validate({
        name=requiredParam('name'),
        ...otherInfo
    }={}){
        validateString('name', name);
        return {name,...otherInfo}
    }

    function validateString (label, string) {
        if (!isString(string)) {
          throw new InvalidPropertyError(
            `A Peptaibiotic Groups ${label} must be a string.`
          )
        }
      }
}