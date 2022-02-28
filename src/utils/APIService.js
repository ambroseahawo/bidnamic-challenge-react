export default class APIService{
    static async RegisterUser(body){
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        return await resp.json();
    }

    static async LoginUser(body) {

        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        return await resp.json();
    }

    static async FetchDetails(token){
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/details/`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return await resp.json();
    }

    static async PostDetails(token, body){
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/details/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        return await resp.json();
    }

    static async UpdateDetails(token, detailsId, body){
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/details/${detailsId}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        return await resp.json();
    }

    static async DeleteDetails(token, detailsId) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/api/details/${detailsId}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
    }

    static async DeleteUsers(token) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/api/users/delete/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
    }
}
