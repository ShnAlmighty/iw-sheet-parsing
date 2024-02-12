const xlsx = require('xlsx');
const JSONStream = require('json-stream');

const {nanoid} = require('nanoid');

const spreadsheetPath = "./test_data/iw-tech-test-retailer-data.xlsx";

const workbook = xlsx.readFile(spreadsheetPath);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];


// const schema = {
//   id: String,
//   content_post_id: String,
//   content_post_title: String,
//   directory_category: String,
//   directory_contact__phone: String,
//   directory_location__street: String,
//   directory_location__city: String,
//   directory_location__country: String,
//   directory_location__address: String,
//   directory_location__lat: String,
//   directory_location__lng: String,
//   directory_location__zip: String,
//   directory_location__state: String
// };

function processRetailer(retailer) {
  // console.log("Retailer: ", retailer);

  const data = {
    id: nanoid(10), //Generating unique id for each retailer for later use
    content_post_id: retailer['H'],
    content_post_title: retailer['W'],
    directory_category: retailer['A'],
    directory_contact__phone: retailer['F'],
    directory_location__street: retailer['K'],
    directory_location__city: retailer['L'],
    directory_location__country: retailer['M'],
    directory_location__address: retailer['N'],
    directory_location__lat: retailer['O'],
    directory_location__lng: retailer['P'],
    directory_location__zip: retailer['Q'],
    directory_location__state: retailer['R']
  };

  return data;
}

function main(){
  const jsonStream = new JSONStream();

  // Pipe the JSON stream to stdout
  jsonStream.pipe(process.stdout);

  const rows = xlsx.utils.sheet_to_json(sheet, { header: 'A' });

  for (let i = 1; i < rows.length; i++) {
    const customer = rows[i];
    const data = processRetailer(customer);
    const dataStr = JSON.stringify(data);
    jsonStream.write(JSON.stringify(dataStr) + '\n');
    jsonStream.write('\n\n');
  }
  jsonStream.end();

}

main();

