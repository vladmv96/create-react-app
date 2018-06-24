import axios from 'axios';


const isValidFetchingAction = (action) => action.types && action.meta && action.meta.fetch && action.meta.fetch.url

export default  store => next => action => {
    if ( isValidFetchingAction(action) ) {
        const fetch = action.meta.fetch;
        console.log(fetch);
        delete action.meta.fetch;
        if (action.types.length >= 3)
        {
        const [ pending, success, error ] = action.types;

        next( { type: pending, meta: action.meta } );


        return axios( fetch )
        .then(response => { 
            store.dispatch({ type:success, payload: response.data, response, meta: action.meta });
            return response;
        })
        .catch(err => {
            store.dispatch({ type:error, payload: err.data, response: error, meta: action.meta });
            throw err;
        })
    }
}

    return next(action);
}