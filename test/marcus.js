const vin = "JTDKN3DU1E1743051";

let queryUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/";
queryUrl += vin;
queryUrl += "?format=json";

$.get(queryUrl, function(data){
    const carInfo = data.Results;

    const year = carInfo.find(function(ele) {
        return ele.Variable === "Model Year";
    }).Value;
    const make = carInfo.find(function(ele) {
        return ele.Variable === "Make";
    }).Value;
    const model = carInfo.find(function(ele) {
        return ele.Variable === "Model";
    }).Value;

    console.log(year, make, model);
});

