
const apiUrl = 'http://localhost:8080';

const getToken = () => {
    try {
        const storedAuthData = JSON.parse(localStorage.getItem('authData'));
        return storedAuthData['token'];
    }catch(e) {
        return ''
    }
} 

class _Get {

    call = async ({
        url,
        data = {}
    }) => {
        const params = data;
        const query = new URLSearchParams(params).toString();
        url = `${apiUrl}${url}?${query}`;
        const storedAuthData = JSON.parse(localStorage.getItem('authData'));
        let response = await fetch(url, {
            headers: {
                'Authorization': getToken()
            }
        });
        response = response.json();
        return Promise.resolve(response);
    }

    mainPage = () => {
        return this.call({
            url: '/outer/product/main'
        });
    }

    pageSearch = ({
        k
    }) => {
        return this.call({
            url: '/outer/product',
            data: {
                k
            }
        });
    }

    productInfo = ({
        productId
    }) => {
        return this.call({
            url: `/outer/product/${productId}`
        });
    }

}

class _Post {

    call = async ({
        url,
        data = {}
    }) => {
        url = `${apiUrl}${url}`;
        let response = await fetch(url,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': getToken()
                },
                body: JSON.stringify(data)
            } 
        );
        response = response.json();
        return Promise.resolve(response);
    }

    register = ({
        email,
        password,
        first_name,
        last_name
    }) => {
        return this.call({
            url: '/outer/user/register',
            data: {
                email,
                password,
                first_name,
                last_name
            }
        });
    }

    login = ({
        email,
        password,
    }) => {
        return this.call({
            url: '/outer/user/login',
            data: {
                email,
                password,
            }
        });
    }

    order = ({
        items
    }) => {
        return this.call({
            url: '/user/order',
            data: {
                items
            }
        });
    }

}

const GET = new _Get();
const POST = new _Post();
class _API {

    get = GET;

    post = POST;

}

const API = new _API();

export {
    API
}