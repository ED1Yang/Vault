const host="http://localhost";

class Url{
    
    static getClientPoints= host +'/api/client/2';
    static addNewPoint = host + '/api/client';
    static uploadImage = host + '/api/emp';
}
export default Url;