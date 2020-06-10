import requiredParam from "../helpers/required-param";


export default function makePeptaibiotic(peptaibioticInfo=requiredParam('peptaibioticInfo')){
    const validPeptaibiotic=validate(peptaibioticInfo);
    const normalPeptaibiotic=normalize(validPeptaibiotic);
    return Object.freeze(normalPeptaibiotic);

    function validate({
        
    })
}