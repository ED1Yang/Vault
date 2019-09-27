class PointsColor{
    static setColor(status){
        return status === 'New' ? 'gold' :
                    status === 'Assigned' ? 'pink' :
                        status === 'Uploaded' ? 'blue' : 
                            status === 'Done' ? 'green' :
                                status === 'Denied' ? 'black' :
                                    status === 'Requested' ? 'BlueViolet' :
                                        status === 'Reject' ? 'brown':
                                            status === 'Deleted' ? 'silver' : 'Aqua'
    }
}
export default PointsColor;