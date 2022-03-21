'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController("api::order.order", ({ strapi }) => ({

    async find(ctx) {

        let regid = null;

        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
          try {
            const udata = await strapi.plugins[
              "users-permissions"
            ].services.jwt.getToken(ctx);
    
            regid = udata.id;
          } catch (err) {
            return "unauthorized request catch triggred";
          }
    
          var url = require("url");
          var url_parts = url.parse(ctx.request.url, true);
          var query = url_parts.query;
          switch (query.func) {
            case "getMarkerterOrders":

           
                const res = await strapi.db.query("api::order.order").findMany({
                  where:{
                  user:{
                    id:regid
                  }
                  },
                    select: ["price", "commission","status"],
                    populate: ["user", "product"],
                  });

                  let newarr = [];
                  for (let i = 0; i < res.length; i++) {
                 if(res[i].user.id==regid){

                 }
                    
                  }


          
                return res
              break;
    
            default:
              return "Defaulting from Authed, You screwed up badly fam (: ";
              break;
          }
        } else {
         return "unauthorized access."
        }



      
    },

    

    async create(ctx) {

        let regid = null;

        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
          try {
            const udata = await strapi.plugins[
              "users-permissions"
            ].services.jwt.getToken(ctx);
    
            regid = udata.id;
          } catch (err) {
            return "unauthorized request catch triggred";
          }
    
          var url = require("url");
          var url_parts = url.parse(ctx.request.url, true);
          var query = url_parts.query;
          switch (query.func) {
            case "orderInit":

            for (let i = 0; i < ctx.request.body.data.length; i++) {
                const entity = await strapi.service("api::order.order").create({
                    data:{
                       user:regid,
                       status:1,
                       product:ctx.request.body.data[i].id,
                       price:ctx.request.body.data[i].price,
                       commission:ctx.request.body.data[i].commission,
                    }
             });
                
            }
          
                return "done"
              break;
    
            default:
              return "Defaulting from Authed, You screwed up badly fam (: ";
              break;
          }
        } else {
         return "unauthorized access."
        }



      
    }

  }));
  
 