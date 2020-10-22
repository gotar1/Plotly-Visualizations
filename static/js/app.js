// working in this homework was a pain in...

// function barPlotUpdate(id) {

    d3.json("../data/samples.json").then((data) =>{
        let dataCopy = data;
        let dataSample = dataCopy.samples;
        console.log(dataSample);

        let mapedData = dataSample.map(object => object)[0];
        console.log(mapedData);
   
        let otuIds = mapedData.otu_ids;
        console.log(otuIds);
        let otuSliced =  otuIds.slice(0, 10);
        console.log(otuSliced);
        let funk = `"OTU" ${otuSliced}`
        console.log(funk)
        let otuLabels = mapedData.otu_labels;
        console.log(otuLabels);

        let sampleValues = mapedData.sample_values;
        console.log(sampleValues);
     
        let trace1 = {
            x: sampleValues.slice(0, 10).reverse(),
            y: `"OTU" ${otuSliced}`,
            orientation: 'h',
            type: 'bar',
            text: otuLabels.slice(0, 10).reverse()
        };
        // console.log(otuLabels.slice(0, 10))
        // console.log(text)
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
    })
// }

// let x = d3.json()
// console.log(x)

