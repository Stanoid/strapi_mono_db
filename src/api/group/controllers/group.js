'use strict';

/**
 *  group controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::group.group', ({ strapi }) =>  ({
  
    async update(ctx){
        let regid = null;

            if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
          const udata = await strapi.plugins[
            'users-permissions'
          ].services.jwt.getToken(ctx);
    
        regid= udata.id;
      
        } catch (err) {
        
          return "unauthorized request catch triggred" ;
        }
    
        var url = require('url');
        var url_parts = url.parse(ctx.request.url, true);
        var query = url_parts.query; 
        switch(query.func){
            case 'joinGroup':
       

                const get = await strapi.db.query('api::group.group').findOne({
                   select:['id'],
                    where:{id:ctx.params.id},
                    populate:["customers"]
                });
    let allid = [];

    for (let i = 0; i < get.customers.length; i++) {
       allid.push(get.customers[i].id);
        
    }
    console.log("foorloopid",allid)
    allid.push(regid);
    console.log("after push foorloopid",allid)   
        
        
      const res = await strapi.db.query('api::group.group').update({
          where:{id:ctx.params.id},
          data:{
              customers: allid
          },
          populate:["customers"]
      });
            return res;
                break;

            default:
                return "no funtion detected";
                break;    
        }
    
    }else{
            return "unauthorized request else triggered"
        }

     
          
    
    },




   
    async find(ctx) {


        let regid = null;

        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
    try {
      const udata = await strapi.plugins[
        'users-permissions'
      ].services.jwt.getToken(ctx);

    regid= udata.id;
  
    } catch (err) {
    
      return "unauthorized request catch triggred" ;
    }

    var url = require('url');
    var url_parts = url.parse(ctx.request.url, true);
    var query = url_parts.query; 
    switch(query.func){
        case 'getVendorGroups':   
  const res = await strapi.db.query('api::group.group').findMany({
    select:['price','members','endDate'], 
      populate:['product','creator','customers','product.stocks']
  });

  let newres = [];

  for (let i = 0; i < res.length; i++) {
     if(res[i].creator.id==regid&&res[i].product!=null){
         newres.push(res[i]);
     }
      
  }

  const sanitizedEntity = await this.sanitizeOutput(newres, ctx);
        return sanitizedEntity;
            break;

        default:
            return ctx;
            break;    
    }

}else{
        return ctx
    }

        
   
    
    
      
  
    },
  
    // Method 3: Replacing a core action
    // async findOne(ctx) {
    //   const { id } = ctx.params;
    //   const { query } = ctx;
  
    //   const entity = await strapi.service('api::product.product').findOne(id, query);
    //   const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
    //   return this.transformResponse(sanitizedEntity);
    // }


  }));
