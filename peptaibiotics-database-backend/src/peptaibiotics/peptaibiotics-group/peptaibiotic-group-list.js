import makePeptaibioticGroup from "./peptaibiotic-group";


export default function makePeptaibioticGroupList({database}){
    return Object.freeze({
        getItems,
        findByName,
        add,
        findById
    });

    async function findById(id){
        const db=await database;
        const found=await db
        .collection('peptaibiotic-groups')
        .findOne({_id:db.makeId(id)});
      if(found)
        return documentToPeptaibioticGroup(found);
      return null;
    }

    async function getItems({max=100,before,after}={}){
        const db=await database;
        const query={};
        if(before||after){
            query._id={};
            query._id=before?{...query._id,$lt:db.makeId(before)}:query._id;
            query._id=after?{...query._id,$gt:db.makeId(after)}:query._id;
        }
        return (await db 
            .collection('peptaibiotic-groups')
            .find(query)
            .limit(Number(max))
            .toArray()).map(documentToPeptaibioticGroup);
    }

    async function findByName(name){
        const db=await database;
        const found=await db
        .collection('peptaibiotic-groups')
        .findOne({name:{$regex:new RegExp(`^${name}$`,'i')}});
        if(found)
            return documentToPeptaibioticGroup(found);
        return null;
    }

    async function add({peptaibioticGroupId,...peptaibioticGroup}){
        const db=await database;
        if(peptaibioticGroupId)
            peptaibioticGroup._id=db.makeId(peptaibioticGroupId);
        const peptaibioticGroupFound=await findByName(peptaibioticGroup.name);
        if(peptaibioticGroupFound)
              throw new UniqueConstraintError('name')
        const {result,ops}=await db
            .collection("peptaibiotic-groups")
            .insertOne(peptaibioticGroup);
        return {
            success:result.ok===1,
            created:documentToPeptaibioticGroup(ops[0])
        }
    }

    function documentToPeptaibioticGroup({...doc}){
        return makePeptaibioticGroup({...doc});
    }
}