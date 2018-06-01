const FOOD2FORK = 'https://food2fork.com/api/search?key='

const APIKey = "15a372b846b971348dc85396f31c7b40";
const axios = require('axios');
const query = "onions"
url=`${FOOD2FORK}${APIKey}&q=${query}`

const RECIPEPUPPY = 'http://www.recipepuppy.com/api/?q='
const url2 = `${RECIPEPUPPY}${query}`
axios.get(url)
.then(res =>{

}).catch(err =>{
  axios.get(url2)
  .then(res => {
    console.log(res.data)
  }).catch(err =>{
    console.log(err)
  })
})
