


export default class DataRequest{
    constructor(data, url, id){
        this.data = data
        this.url = url
        this.id = id
    }

    getTask = async()=>{
        // const req = await fetch(`${this.url}${this.id}`)
        // const res = await req.json()
        // console.log(res);
        // return res
        console.log(this.data,this.url,this.id);
       
        return this.id
    }

}
