import axios from 'axios';

export const getLog = () => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://smart-lock-server.herokuapp.com/userPackage/getLog";
        axios.get(REQUEST_URL)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

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


