import axios from 'axios';



export const getAllDoor = () => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://smart-lock-server.herokuapp.com/door/getAllDoor";
        axios.get(REQUEST_URL)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

export const updateUserPermissions = ({body = null, _id = null}) => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://smart-lock-server.herokuapp.com/user/updateUserPermission/" + _id ;
        axios.put(REQUEST_URL, body)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://smart-lock-server.herokuapp.com/user/getUsers";
        axios.get(REQUEST_URL)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

export const getLogByDoorId = ({ body = null }) => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://smart-lock-server.herokuapp.com/log/getLogByDoorId";
        axios.post(REQUEST_URL, body)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};


