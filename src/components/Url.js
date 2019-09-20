const host="http://localhost";

class Url{
    
    static getClientPoints= host +'/api/client/';
    static getAdminPoints= host +'/api/proj/job/admin/';
    static getEmpPoints= host +'/api/emp/';
    static addNewPoint = host + '/api/job/admin';
    static addNewPointEmp = host + '/api/job/emp';
    static addNewPointClient = host + '/api/client';
    static uploadImage = host + '/api/emp';
    static getHotspots = host + '/api/img/emp/';
    static addNewHotSpot = host + '/api/img/emp';
    static login = host + '/api/login';
    static getClientProjects = host + '/api/proj/client/';
    static getClientMaps = host + '/api/proj/floor/client/';
    static getAdminProjects = host + '/api/proj/admin/';
    static getAdminMaps = host + '/api/proj/floor/admin/';
    static getEmpProjects = host + '/api/proj/emp/';
    static getEmpMaps = host + '/api/proj/floor/emp/';
    static setStatus = host + '/api/admin/';
    static assignTask = host + '/api/admin';
    static getAllEmp = host + '/api/emp/admin';
    static setStatus = host + '/api/admin/';
    static resetTask = host + '/api/emp/admin/';
}
export default Url;