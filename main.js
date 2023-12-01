
class APIs
{
  #url
  arr=[]
    constructor(url){
      this.#url=url
    }
  get url(){
    return this.#url
  }
  set url(url){
    this.#url=url
  }
  post(payloadset,config){
  
   // alert(payloadset.data.name)
    const index= (payloadset.data.findIndex((obj)=>obj.age==22))
     this.age=payloadset.data[index].age
  }
  async get(){
        try {
           // alert(this.#url)
          let data=await fetch(this.#url)
          console.log(data)
         // data=data.json()
          return data.json()
      } catch (e) {
          alert(e.errorMessage)
      }
      
  }
}

const api=new APIs('https://jsonplaceholder.typicode.com/photos')
//console.log(api.url)
//api.url='yahoo.com'
//console.log(api.url)
api.post({
  transition:'INIT',
  data:[{
    name: 'Majid Ali',
    age: 24
  },{
    name:'Mehwish Majid',
    age:22
  }
  ] 
})
const loading= document.getElementById('loading')
loading.style.display='block'
api.get().then((data)=>{
       
  // console.log(data)
   loading.style.display='none'
   const list= document.getElementById('list')
   data.forEach((d)=>{
   const li  = document.createElement('li')
   //list.style.listStyle='numeric'
  // li.style.margin='10px'
 //  li.style.padding='5px 10px'
 //  li.style.background='cyan'
  // li.style.borderBottom='1px solid skyblue'
      li.innerText=d.title
    list.appendChild(li)
   })
}).catch((error)=>{
    loading.style.display='none'
    console.log(error)})
