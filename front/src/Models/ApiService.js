import axios from './axios';

export default {
    
    
    Survey(){
        const url='survey';
        
        return{
            getAll: ()          => axios.get(url).then( res => res ).catch( e => e),
            getOne: ({id})      => axios.get(`${url}/${id}`).then( res => res ).catch( e => e),
            create: (data)      => axios.post(url,data).then( res => res ).catch( e => e),
            update: (id,data)   => axios.put(url,id,data).then( res => res ).catch( e => e),
            delete: ({id})      => axios.delete(`${url}/${id}`).then( res => res ).catch( e => e)
        }
        
    },

    Section(){
        const url='section';
        
        return{
            getAll: ()          => axios.get(url).then( res => res ).catch( e => e),
            getOne: ({id})      => axios.get(`${url}/${id}`).then( res => res ).catch( e => e),
            create: (data)      => axios.post(url,data).then( res => res ).catch( e => e),
            update: (id,data)   => axios.put(`${url}/${id}`,data).then( res => res ).catch( e => e),
            delete: ({id})      => axios.delete(`${url}/${id}`).then( res => res ).catch( e => e)
        }
        
    }
    
    
    
}