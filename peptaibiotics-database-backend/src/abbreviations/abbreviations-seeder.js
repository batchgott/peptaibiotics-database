import fs from "fs";
import csv from "csv-parser";

export default async function seedAbbreviations(database,abbreviationList){
    const db= await database;
    const abbreviations=await db.collection("abbreviations").find({}).toArray();
    const csvAbbreviations=[];
    if(abbreviations.length==0){
        fs.createReadStream('src/abbreviations/abbreviations.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
          //create number with decimal places
          //in the csv file decimal numbers have "," instead of "."
        const mwMonoisotopicSplit=(row.mwMonoisotopic).split(',');
        const mwMonoisotopic=Number(parseFloat(mwMonoisotopicSplit[0]+'.'+mwMonoisotopicSplit[1]));
        const abbreviation={
            category:row.category,
            abbreviation:row.abbreviation,
            residueFree:row.residueFree,
            c:Number(row.c),
            h:Number(row.h),
            n:Number(row.n),
            o:Number(row.o),
            s:Number(row.s),
            mw:Number(row.mw),
            mwMonoisotopic:mwMonoisotopic,
            position:row.position
        }
        csvAbbreviations.push(abbreviation);
      })
      .on('end', () => {
        csvAbbreviations.forEach(async abb=>{
            try {
                await abbreviationList.add(abb)
            } catch (error) {
                console.log(abb);
                console.log(error.message);
            }
        });
      });
    }
    }