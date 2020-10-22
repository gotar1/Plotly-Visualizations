// working in this homework was a pain in...

// function barPlotUpdate(id) {

    d3.json("../data/samples.json").then(data => {
        let dataCopy = data;
        let dataSample = dataCopy.samples;
        console.log(dataSample);
        let otuIds = dataSample.map(object => object.otu_ids);
        console.log(otuIds);
        // let trace = otuIds.data
        // console.log(trace)
        // let sampleValues = dataSample.map(Object => Object.sample_values);
        // console.log(sampleValues);
        // let otuLabels = dataSample.map(Object => Object.otu_labels);
        // let otuIds = dataSample.filter(data => data.otu_ids);
        // console.log(otuIds);
        // console.log(otuLabels);
        // console.log(otuLabels.property('value')
        // let filteredData = dataSample.filter(data => data.id.toString()===id);
        // console.log(trace1)
        // let slicedData = otuIds.slice(0, 10);
        // console.log(slicedData);
    //     let trace1 = {
    //         x: slicedData.map(Object => Object.sample_values),
    //         y: slicedData.map(Object => Object.otu_ids),
    //         orientation: 'h',
    //         tybe: 'bar',
    //         text: slicedData.map(Object => Object.otu_labels)
    //     };
    
    //     let dataTrace = [trace1];
    
    //     let layout = {
    //         title: "bully button mess",
    //         margin: {
    //             l: 100,
    //             r: 100,
    //             t: 100,
    //             b: 100
    //         }
    //     }
    
    //    Plotly.newPlot('bar', dataTrace, layout); 
    })
// }

// let x = d3.json()
// console.log(x)

