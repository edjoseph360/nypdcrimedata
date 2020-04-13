function buildChart (sample) {   
  d3.json('https://data.cityofnewyork.us/resource/uip8-fykc.json').then((data)=> {
      console.log(data)   

  var sex = data.perp_sex;
  var resultArray= sample.filter(sampleObject => sampleObject.perp_sex==sex);
  console.log(resultArray)

  

});
}
function init () {
  var selector = d3.select('#selDataset');
  d3.json('https://data.cityofnewyork.us/resource/uip8-fykc.json').then((data)=> {
      
 var male = [];
 var female= [];
  
     data.forEach(function(sample) {
       if  (sample.perp_sex == 'M')
          male.push('male')
      else 
      female.push("female")
      console.log(male, female)

     })

 
  var data_sex = [
      {
      x: ['Male', 'Female'],
      y: [male.length, female.length],
      type: 'bar'
      
      }
    ];
  Plotly.newPlot('bar', data_sex);
      
      
  var age_group_under_18 = [];
  var age_group_18_24 = [];
  var age_group_25_44 = [];
  var age_group_45_64 = [];
  var age_group_65_plus = [];
   
      data.forEach(function(sample) {

          if  (sample.age_group == '<18')
          age_group_under_18.push('Under 18')

          if  (sample.age_group == '18-24')
          age_group_18_24.push('Age 18-24')

          if  (sample.age_group == '25-44')
          age_group_25_44.push('Age 25-44')

          if  (sample.age_group == '45-64')
          age_group_45_64.push('Age 45-64')
          if  (sample.age_group == '65+')
          age_group_65_plus.push('65 and Over')

       
      

      })    
  var data_age = [{
      values: [age_group_under_18.length, age_group_18_24.length, age_group_25_44.length, age_group_65_plus.length ],
      labels: ['Under 18', 'Age 18-24', 'Age 25-44','Age 45-64', '65 and Over' ],
      type: 'pie'
    }];
    var layout = {
      height: 400,
      width: 400
    };
    Plotly.newPlot('pie', data_age, layout);
  

  //   Data Labels Hover
  var queens = [];
  var brooklyn = [];
  var manhattan = [];
  var staten_island = [];
  var bronx = [];
   
      data.forEach(function(sample) {

          if  (sample.arrest_boro == 'Q')
          queens.push('Queens')

          if  (sample.arrest_boro == 'K')
          brooklyn.push('Brooklyn')

          if  (sample.arrest_boro == 'M')
          manhattan.push('Manhattan')

          if  (sample.arrest_boro == 'S')
          staten_island.push('Staten Island')


          if  (sample.arrest_boro == 'B')
          bronx.push('Bronx')
      }) 

      var data_boro = [
        {
        x: ['Queens', 'Brooklyn', 'Manhattan', 'Staten Island', 'Bronx'],
        y: [queens.length, brooklyn.length, manhattan.length, staten_island.length, bronx.length],
        type: 'bar'
        
        }
      ];
    Plotly.newPlot('bar2', data_boro);






  //   var trace1 = {
  //     x: ['Queens', 'Brooklyn', 'Manhattan', 'Staten Island', 'Bronx'],
  //     y: [queens, brooklyn, manhattan, staten_island, bronx],
  //     mode: 'markers',
  //     type: 'scatter',
  //     name: 'Boro',
  //     text: ['Queens', 'Brooklyn', 'Manhattan', 'Staten Island', 'Bronx'],
  //     marker: { size: 12 }
  //   };
    
  // //   var trace2 = {
  // //     x: ['Brooklyn'],
  // //     y: [brooklyn.length],
  // //     mode: 'markers',
  // //     type: 'scatter',
  // //     name: 'Team B',
  // //     text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
  // //     marker: { size: 12 }
  // //   };
    
  //   var data = [trace1];
    
  //   var layout = {
  //     xaxis: {
  //       range: [ 0.75, 5.25 ]
  //     },
  //     yaxis: {
  //       range: [0, 8]
  //     },
  //     title:'Data Labels Hover'
  //   };
    
  //   Plotly.newPlot('bar2', data, layout);
  
  
  

      // console.log (data[0].perp_sex)
      

});
  }

init()