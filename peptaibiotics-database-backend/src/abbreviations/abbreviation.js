import isString from "../helpers/is-string";
import { InvalidPropertyError } from '../helpers/errors';


export default function makeAbbreviation (
    abbreviationInfo = requiredParam('abbreviationInfo')
  ) {
    const validAbbreviation = validate(abbreviationInfo)
    // const normalAbbreviation = normalize(validAbbreviation)
    // return Object.freeze(normalAbbreviation)
    return Object.freeze(validAbbreviation)
  
    function validate ({
      category = requiredParam('category'),
      abbreviation = requiredParam('abbreviation'),
      residueFree = requiredParam('residueFree'),
      c = requiredParam('c'),
      h = requiredParam('h'),
      n = requiredParam('n'),
      o = requiredParam('o'),
      s = requiredParam('s'),
      mw = requiredParam('mw'),
      mwMonoisotopic = requiredParam('mwMonoisotopic'),
      position = requiredParam('position'),
      ...otherInfo
    } = {}) {
      validateString('category', category);
      validateString('abbreviation', abbreviation);
      validateString('residueFree', residueFree);
      validateNumberGreaterEqualZero('C',c);
      validateNumberGreaterEqualZero('H',h);
      validateNumberGreaterEqualZero('N',n);
      validateNumberGreaterEqualZero('O',o);
      validateNumberGreaterEqualZero('S',s);
      validateNumberGreaterEqualZero('MW',mw);
      validateNumberGreaterEqualZero('MW_monoisotopic',mwMonoisotopic);
      validateString('position', position);
      return { category, abbreviation, residueFree,c,h,n,o,s,mw,mwMonoisotopic,position, ...otherInfo }
    }
  
    function validateString (label, string) {
      if (!isString(string)) {
        throw new InvalidPropertyError(
          `A abbreviations's ${label} must be a string.`
        )
      }
    }
    function validateNumberGreaterEqualZero (label, number) {
        if (!isNumberGreaterEqualZero(number)) {
          throw new InvalidPropertyError(
            `A abbreviations's ${label} must be a number greater or equal to zero.`
          )
        }
      }
  
    // function normalize ({ category, abbreviation, residueFree,c,h,n,o,s,mw,mwMonoisotopic,position, ...otherInfo }) {
    //   return {
    //     ...otherInfo,
    //     category:category,
    //     abbreviation:abbreviation,
    //     residueFree:residueFree,
    //     c:c,
    //     h:h,
    //     n:n,
    //     o:o,
    //     s:s,
    //     mw:mw,
    //     mwMonoisotopic:mwMonoisotopic,
    //     position:position
    //   }
    // }
  }