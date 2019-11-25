const dotenv = require('dotenv').config();
const protoP = require('./protoParser');

/*
Proto.js
Utilizes the ProtoParser Class to read a binary file and parses it for useful information

*/
const main = async () => {
    try{
        const protoparser = new protoP(process.env.DATAFILE);
        let header;
        let data;
        let load = await protoparser.loadFile();
        if (load){
            header = await protoparser.parseHeader();
            if (header){
                data = await protoparser.parseData();
                if (data){
                    protoparser.displayTotals();
                }
            }
        }
    } catch(error){
        console.log(`MAIN ERROR: ${error}`);
    }
}

main();