


const DataRequest = async(Url) =>{
    const req = await fetch(Url)
    const res = await req.json()
    return res
}

export default DataRequest


