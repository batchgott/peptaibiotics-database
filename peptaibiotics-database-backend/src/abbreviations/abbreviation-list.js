import makeAbbreviation from "./abbreviation";
import { UniqueConstraintError } from "../helpers/errors";


export default function makeAbbreviationList ({ database }) {
    return Object.freeze({
      add,
      findById,
      getItems,
      findByAbbreviation,
      remove,
      update
    })
  
    async function getItems({max=100,before,after}={}){
      const db= await database;
      const query={};
      if(before||after){
        query._id={};
        query._id=before ? {...query._id,$lt:db.makeId(before)}:query._id;
        query._id=after ? {...query._id,$gt:db.makeId(after)}:query._id;
      }
      return (await db
        .collection('abbreviations')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToAbbreviation);
    }

    async function findById(abbreviationId){
        const db=await database;
        const found=await db
        .collection('abbreviations')
        .findOne({_id:db.makeId(abbreviationId)});
      if(found)
        return documentToAbbreviation(found);
      return null;
    }

    async function findByAbbreviation(abbreviation){
      const db=await database;
      const found=await db
        .collection('abbreviations')
        .findOne({abbreviation:{$regex:new RegExp(`^${abbreviation}$`,'i')}});
      if(found)
        return documentToAbbreviation(found);
      return null;
    }
    
    async function remove(abbreviationId){
      const db=await database;
      const  {deletedCount}  = await db
      .collection('abbreviations')
      .deleteOne({_id:db.makeId(abbreviationId)})
      .catch(mongoError => {
        const [errorCode] = mongoError.message.split(' ');
        console.log(mongoError);
        throw mongoError;
      });
    return {success: deletedCount === 1}
    }

    async function update(abbreviation){
      const db=await database;
      abbreviation._id=db.makeId(abbreviation._id);
      const { modifiedCount, ops } = await db
        .collection('abbreviations')
        .replaceOne({_id:abbreviation._id},abbreviation);
        return {
          success: modifiedCount === 1,
          updated: documentToAbbreviation(ops[0])
        }
    }

    async function add ({ abbreviationId, ...abbreviation }) {
      
      const db = await database;
      
      if (abbreviationId)
        abbreviation._id = db.makeId(abbreviationId);
      const abbreviationFound=await findByAbbreviation(abbreviation.abbreviation);
      if(abbreviationFound){
        throw new UniqueConstraintError('abbreviations')
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

    function documentToAbbreviation ({...doc }) {
        return makeAbbreviation({...doc })
    }
  }