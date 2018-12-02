const getData = (request, dispatchMethod) => {
  const dataResult = {
    name: request,
    data: []
  };  
  const temporyObj = {
    forks : 0,
    open_issues : 0,
    score : 0
  };  
  const reqUrl = `https://api.github.com/search/repositories?q=${request}`;
  fetch(reqUrl)
  .then(data=>data.json())
  .then(dataReq=>{   
     
    dataReq.items.forEach(item => {
      temporyObj.forks += item.forks;
      temporyObj.open_issues += item.open_issues;
      temporyObj.score += item.score;
    })
    for(let key in temporyObj){
      dataResult.data.push(parseInt(temporyObj[key] / dataReq.items.length));
    }      
    dispatchMethod(dataResult);      
  })
  .catch(err=>console.error(err));    
}

export default getData;