
const baseUrl = 'https://api.evys.ru/'; 

const isValidFetchingAction = (action) => action.types && action.meta && action.meta.fetch && action.meta.fetch.url && action.meta.fetch.url[0] === '~' ;

const toEndPointUrl = (url) => `${baseUrl}${url.substr(1)}`;


export default store => next => action => { 
      
    if ( isValidFetchingAction(action) ) {
        action.meta.fetch.url = toEndPointUrl(action.meta.fetch.url);

        const { auth } = store.getState();   

        if ( auth.token ) {     
            action.meta.fetch.headers = { 'Authorization': `Basic ${auth.token}`, 'Account-Name': auth.permalink }
        }

    }
    return next(action);
}