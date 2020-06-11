import makeAbbreviation from "./abbreviation";


export default function makeAbbreviationList ({ database }) {
    return Object.freeze({
      add
    })
  
    async function findById({abbreviationId}){
      const db=await database;
      const found=await db
      .collection('abbreviations')
      .findOne({_id:db.makeId(abbreviationId)});
      if(found)
        return documentToAbbreviation(found);
      return null;
    }

    async function add ({ abbreviationId, ...abbreviation }) {
      
      const db = await database;
      
      if (abbreviationId) {
        abbreviation._id = db.makeId(abbreviationId)
      }
      const { result, ops } = await db
        .collection('abbreviations')
        .insertOne(abbreviation)
        .catch(mongoError => {
          const [errorCode] = mongoError.message.split(' ');
          console.log(mongoError);
          throw mongoError;
        })
      return {
        success: result.ok === 1,
        created: documentToAbbreviation(ops[0])
      }
    }

    function documentToAbbreviation ({ _id: abbreviationId, ...doc }) {
      return makeAbbreviation({ abbreviationId, ...doc })
    }
  }