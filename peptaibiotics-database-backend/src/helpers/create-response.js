export default function createResponse ({contentType='application/json',statusCode=200,result={},...headers}){
        return {
            headers:{
                'Content-Type':contentType,
                ...headers
            },
            statusCode:statusCode,
            data:JSON.stringify(result)
        }
}