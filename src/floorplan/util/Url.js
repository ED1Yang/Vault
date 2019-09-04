const host="http://localhost";

class Url{
    
    static getClientPoints= host +'/api/client/2';
    static addNewPoint = host + '/api/client';
    static uploadImage = host + '/api/emp';
    static getHotspots = host + '/api/emp/img/';
    static getProjects = host + 'api/temp/client/proj/2';
}
export default Url;