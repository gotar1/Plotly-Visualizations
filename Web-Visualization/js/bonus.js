//create function to biuld charts and then update them based on changed ID...
function createPlots(id) {

    d3.json("../data/samples.json").then((data) =>{
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

        // build pie chart
        let pieData = [{
            values: sampleValues.splice(0,10),
            labels: otuIdNamed,
            text: sampleValues.splice(0,10),
            type: 'pie'
        }];
        
        Plotly.newPlot('bar', pieData);
        
        // biuld bubble chart..
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
            yaxis: {title: "Sample Values"},
            height: 500,
            width: 900,
            title: "Bacteria Concentration"
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout); 

        // build gauge chart..
        let dataMeta = dataCopy.metadata;
        console.log(dataMeta);

        let filteredMeta = dataMeta.filter(item => item.id.toString() === id)[0];
        console.log(filteredMeta);

        let washingFreq = filteredMeta.wfreq;
        console.log(washingFreq);

        let traceGauge = {
            domain: { 
                x: [0, 1],
                y: [0, 1] 
                },
            type: 'indicator',
            mode: "gauge+number",
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            axis: { axis: { range: [null, 9]}},
            value: washingFreq,
            text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            
            gauge: {
                
                title: {text: "Scrub per Week"},
                
                steps: [
                  { range: [0, 1], color: "#E0FFFF" },
                  { range: [1, 2], color: "#B0E0E6" },
                  { range: [2, 3], color: "#90EE90" },
                  { range: [3, 4], color: "#98FB98" },
                  { range: [4, 5], color: "#00FA9A" },
                  { range: [5, 6], color: "#00FF7F" },
                  { range: [6, 7], color: "#3CB371" },
                  { range: [7, 8], color: "#2E8B57" },
                  { range: [8, 9], color: "#006400" },
                ],
            } 
        };

        // needle
        let degrees = 137, radius = 0.5;
        let radians = degrees * Math.PI / 180;
        let x = -1 * radius * Math.cos(radians)*washingFreq;
        let y = radius * Math.sin(radians)*washingFreq;
        console.log(x, y)
    
        let gaugeLayout = {
          shapes: [{
            type: 'line',
            x0: 0.5,
            y0: 0.5,
            x1: x,
            y1: y,
            line: {
              color: 'red',
              width: 5
            }
        }],

        width: 600, 
        height: 500, 
        margin: {
            t: 0, 
            b: 0 
        },
        
        title: 'Bully Button Washing Frequency'
        };
    
        let dataGauge = [traceGauge];
    
        Plotly.newPlot('gauge', dataGauge, gaugeLayout);          
    });
};

// function to display demographic information for selected ID..
function createDemographic(id) {
    d3.json("../data/samples.json").then(data => {
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

// update function ID selection button..
function optionChanged(id) {
    createPlots(id);
    createDemographic(id);
}

// intial function for updating charts based on ID selected..
function init() {
    let testIdButton = d3.select("#selDataset");
    console.log(testIdButton)
    d3.json("../data/samples.json").then(function(data) {
        let dataCopy2 = data;
        console.log(dataCopy2.names);

        dataCopy2.names.forEach(name => {
            testIdButton.append("option")         
                .text(name)        
                .property("value")
       
            });
       
        createPlots(dataCopy2.names[0]);
        createDemographic(dataCopy2.names[0]);
    });
};

init();


