const xlsx = require('xlsx');

const {nanoid} = require('nanoid');

const spreadsheetPath = "./test_data/iw-tech-test-retailer-data.xlsx";

const workbook = xlsx.readFile(spreadsheetPath);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

function processRetailer(retailer) {
  // console.log("Retailer: ", retailer);

  const data = {
    id: nanoid(10), //Generating unique id for each retailer for later use
    content_post_id: retailer['H'],
    content_post_title: retailer['W'],
    content_children_count: retailer['B'],
    directory_contact__email: retailer['C'],
    directory_contact__fax: retailer['D'],
    directory_contact__mobile: retailer['E'],
    directory_contact__website: retailer['G'],
    content_post_slug: retailer['I'],
    directory_category: retailer['A'],
    directory_contact__phone: retailer['F'],
    directory_location__street: retailer['K'],
    directory_location__city: retailer['L'],
    directory_location__country: retailer['M'],
    directory_location__address: retailer['N'],
    directory_location__lat: retailer['O'],
    directory_location__lng: retailer['P'],
    directory_location__zip: retailer['Q'],
    directory_location__state: retailer['R'],
    content_post_status: retailer['V']
  };

  //Note: Kept the initial version of grouping logic here
  // const grouped_data = {
  //   id: nanoid(10), //Generating unique id for each retailer for later use
  //   content_post_id: retailer['H'],
  //   directory_category: retailer['A'],
  //   content_post_title: retailer['W'],
  //   content_children_count: retailer['B'],
  //   contact_details:{
  //     directory_contact__email: retailer['C'],
  //     directory_contact__phone: retailer['F'],
  //     directory_contact__fax: retailer['D'],
  //     directory_contact__mobile: retailer['E'],
  //     directory_contact__website: retailer['G'],
  //   },
  //   content_post_slug: retailer['I'],
  //   location_details:{
  //     directory_location__street: retailer['K'],
  //     directory_location__city: retailer['L'],
  //     directory_location__country: retailer['M'],
  //     directory_location__address: retailer['N'],
  //     directory_location__lat: retailer['O'],
  //     directory_location__lng: retailer['P'],
  //     directory_location__zip: retailer['Q'],
  //     directory_location__state: retailer['R'],
  //   },
  //   content_post_status: retailer['V']
  // };

  const refined_data = {};

  for(key in data){ //Note: for using the grouped data, after un-commenting the grouped_data object above, replace data with grouped_data object wherever used in the loop.
    // console.log("KEY=", data[key])
    let val = data[key];
    if(typeof(data[key]) == 'string'){
      val = val.trim()
    }
    refined_data[key] = val;
  }

  return refined_data;
}

function main(){
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 'A' });
  for (let i = 1; i < rows.length; i++) {
    const customer = rows[i];
    const data = processRetailer(customer);
    const dataStr = JSON.stringify(data);
    process.stdout.write(JSON.stringify(dataStr) + '\n');
  }
}

main();

