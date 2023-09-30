import axios from 'axios'

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('https://identity.safaraneh.com/api/services/app/Account/Register', userData, {
            headers: {
                "TenantId": process.env.ABP_TENANT_ID,
                "apikey": process.env.API_KEY,
            }
        });
    }
}