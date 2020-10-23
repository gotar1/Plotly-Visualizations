// working in this homework was a pain in...

function createPlots(id) {

    d3.json("data/samples.json").then((data) =>{
        let dataCopy = data;
        let dataSample = dataCopy.samples;
        console.log(dataSample);

        let filteredData = dataSample.filter(item => item.id.toString() === id)[0];
        console.log(filteredData);
   
        let otuIds = filteredData.otu_ids;
        console.log(otuIds);
        let otuSliced =  otuIds.slice(0, 10);
        console.log(otuSliced);
        let otuIdNamed = otuSliced.map(id => "OTU " + id);
        console.log(otuIdNamed);

        let otuLabels = filteredData.otu_labels;
        console.log(otuLabels);

        let sampleValues = filteredData.sample_values;
        console.log(sampleValues);
     
        let trace1 = {
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIdNamed.reverse(),
            orientation: 'h',
            type: 'bar',
            text: otuLabels.slice(0, 10).reverse()
        };

        let dataTrace = [trace1];
    
        let layout = {
            title: "bully button mess",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
    
       Plotly.newPlot('bar', dataTrace, layout); 

       let bubbleTrace = {
           x: otuIds,
           y: sampleValues,
           mode: "markers",
           marker: {
               size: sampleValues,
               color: otuIds
           },
           text: otuLabels
       };

       let bubbleData = [bubbleTrace];

       let bubbleLayout = {
           xaxis: {title: "OTU ID"},
           height: 500,
           width: 900,
           title: "Bacteria Concentration"

       };

       Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
};


function createDemographic(id) {
    d3.json("data/samples.json").then(data => {
        let dataCopy1 = data;
        let metaData = dataCopy1.metadata;
        console.log(metaData);

        let filteredMetaData = metaData.filter(item => item.id.toString() === id)[0]
        console.log(filteredMetaData);
        
        let demographicInfo = d3.select("#sample-metadata");
        console.log(demographicInfo);
        demographicInfo.html("");
        Object.entries(filteredMetaData).forEach(key => {
            demographicInfo
                .append("h5")
                .text(key[0] + ": " + key[1])
            
        });

    });


};

function optionChanged(id) {
    createPlots(id);
    createDemographic(id);
}

function init() {
    let testIdButton = d3.select("#selDataset");
    console.log(testIdButton)
    d3.json("data/samples.json").then(function(data) {
        let dataCopy2 = data;
        console.log(dataCopy2.names);
        // let dataCopy2 = JSON.parse(dataCopy1);
        // data = JSON.parse(data)
        dataCopy2.names.forEach(name => {
            testIdButton.append("option")         
                .text(name)        
                .property("value")
       
            });

        
        createPlots(dataCopy2.names[0]);
        createDemographic(dataCopy2.names[0])
    });

};

init();

// let x = d3.json()
// console.log(x)

