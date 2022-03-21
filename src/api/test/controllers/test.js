'use strict';

/**
 *  test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::test.test', ({ strapi }) =>  ({
  


   
    async find(ctx) {
        let regid = null;
      ctx.query = { ...ctx.query}
      
     
    

      if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
          const udata = await strapi.plugins[
            'users-permissions'
          ].services.jwt.getToken(ctx);
    
        regid= udata.id;
        var url = require('url');
        var url_parts = url.parse(ctx.request.url, true);
        var query = url_parts.query; 
        switch(query.func){
       case "getVendorData":
        const { query } = ctx;
        const entity = await strapi.service('api::product.product').find(query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return sanitizedEntity;
           break;

             case "getUserData":
              const udata = await strapi.plugins[
                'users-permissions'
              ].services.jwt.getToken(ctx);
              return udata;
           
           break;

           default:
               return "no funciton detected";
               break
        }
    
    
        } catch (err) {
        
          return handleErrors(ctx, err, 'unauthorized');
        }}else{
            return "unauthorized request"
        }



  
    
    
      
    //  return ctx ;
    },
  
    // Method 3: Replacing a core action
    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;
  
      const entity = await strapi.service('api::product.product').findOne(id, query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(sanitizedEntity);
    }
  }));