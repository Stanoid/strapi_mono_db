'use strict';

/**
 *  catagory controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController("api::catagory.catagory", ({ strapi }) => ({
    async findOne(ctx) {

        const { id } = ctx.params;
    
        var url = require("url");
        var url_parts = url.parse(ctx.request.url, true);
        var query = url_parts.query;
        switch (query.func) {
          case "getCatProducts":
    
            const entity = await strapi.service("api::catagory.catagory").findOne(id, {
                select: ["name", "products"],
                populate: ["products", "products.catagories", "products.vendor","products.stock", "products.group"],
              });
              const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
          
              return sanitizedEntity;
    
            break;
    
        
    
             default:
    
            // const entityd = await strapi.service("api::product.product").findOne(id, {
            //     select: ["name", "description", "colors", "image"],
            //     populate: ["stock", "catagories", "vendor", "group"],
            //   });
            //   const sanitizedEntityd = await this.sanitizeOutput(entityd, ctx);
          
            //   return this.transformResponse(sanitizedEntityd);
    
            break;
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
          case "addcat":
        let ress;
        
              const entity = await strapi.service("api::catagory.catagory").create({
                  data:{
                  
                  
                     Name:ctx.request.body.data.name,
                     image:ctx.request.body.data.image,
                    
                  }
                 
           });
           ress=entity
              
        
        
              return ress
            break;
  
          default:
            return "Defaulting from Authed, You screwed up badly fam (: ";
            break;
        }
      } else {
       return "unauthorized access."
      }



    
  },

  }));
  