const host="https://vault-intern-app-prod.azurewebsites.net";
// const host="http://localhost";

class Url{
    
    static addNewPoint = host + '/api/job/admin';
    static addNewPointEmp = host + '/api/job/emp';

    static getAdminPoints= host +'/api/proj/job/admin/';

    static getAdminProjects = host + '/api/proj/admin/';
    static addNewProject = host + '/api/proj/admin';
    static getClientProjects = host + '/api/proj/client/';
    static getEmpProjects = host + '/api/proj/emp/';

    static getAdminMaps = host + '/api/proj/floor/admin/';
    static addNewFloorPlan = host + '/api/proj/floor/admin';
    static getClientMaps = host + '/api/proj/floor/client/';
    static getEmpMaps = host + '/api/proj/floor/emp/';

    static getAllEmp = host + '/api/emp/admin';
    static resetTask = host + '/api/emp/admin/';

    static setStatus = host + '/api/admin/';
    static assignTask = host + '/api/admin';

    static getEmpPoints= host +'/api/emp/';
    static uploadImage = host + '/api/emp';

    static getClientPoints= host +'/api/client/';
    static addNewPointClient = host + '/api/client';

    static getClientList = host + '/api/getclient/admin/';

    static getHotspots = host + '/api/img/emp/';
    static addNewHotSpot = host + '/api/img/emp';

    static login = host + '/api/login';

}
export default Url;