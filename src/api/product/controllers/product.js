"use strict";

/**
 *  product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  // async update(ctx){
  //     let regid = null;

  //         if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
  //     try {
  //       const udata = await strapi.plugins[
  //         'users-permissions'
  //       ].services.jwt.getToken(ctx);

  //     regid= udata.id;

  //     } catch (err) {

  //       return "unauthorized request catch triggred" ;
  //     }

  //     var url = require('url');
  //     var url_parts = url.parse(ctx.request.url, true);
  //     var query = url_parts.query;
  //     switch(query.func){
  //         case 'joinGroup':

  //             const get = await strapi.db.query('api::group.group').findOne({
  //                select:['id'],
  //                 where:{id:ctx.params.id},
  //                 populate:["customers"]
  //             });
  // let allid = [];

  // for (let i = 0; i < get.customers.length; i++) {
  //    allid.push(get.customers[i].id);

  // }
  // console.log("foorloopid",allid)
  // allid.push(regid);
  // console.log("after push foorloopid",allid)

  //   const res = await strapi.db.query('api::group.group').update({
  //       where:{id:ctx.params.id},
  //       data:{
  //           customers: allid
  //       },
  //       populate:["customers"]
  //   });
  //         return res;
  //             break;

  //         default:
  //             return "no funtion detected";
  //             break;
  //     }

  // }else{
  //         return "unauthorized request else triggered"
  //     }

  // },


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
        case "addProduct":

       console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere"+regid+ctx.request.body.data)
      
            const entity = await strapi.service("api::product.product").create({
                data:{
                   vendor:regid,
                   name:ctx.request.body.data.name,
                   description:ctx.request.body.data.description,
                   stock:ctx.request.body.data.stock,
                   colors:ctx.request.body.data.colors,
                   catagories:ctx.request.body.data.catagories,
                   image:ctx.request.body.data.image,
                  
                }
         });
            
        
      
            return entity
          break;

        default:
          return "Defaulting from Authed, You screwed up badly fam (: ";
          break;
      }
    } else {
     return "unauthorized access."
    }



  
},


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
        case "getVendorProducts":
          const res = await strapi.db.query("api::product.product").findMany({
            where:{
                   
              vendor:{
                id:regid
              },
             
              },
            select: [
              "name",
              "description",
              "colors",
              "image",
              "updatedAt",
              "publishedAt",
            ],
            populate: [
              "stock",
              "catagories",
              "product.stocks",
              "vendor",
              "group",
            ],
          });

         

         

          // const sanitizedEntity = await this.sanitizeOutput(newres, ctx);
          return res;
          break;

        default:
          return "Defaulting from Authed, You screwed up badly fam (: ";
          break;
      }
    } else {
      var url = require("url");
      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
        case "getAllProducts":
          const res = await strapi.db.query("api::product.product").findMany({
            select: ["name", "description", "colors", "image"],
            populate: ["stock", "catagories", "vendor", "group"],
          });

          const sanitizedEntity = await this.sanitizeOutput(res, ctx);
          return sanitizedEntity;
          break;

        default:
          // const res = await strapi.db.query('api::product.product').findMany({
          //     select:['name','description','colors','image'],
          //       populate:['stocks','catagories','product.stocks','vendor','group']
          //   });

          //   const sanitizedEntity = await this.sanitizeOutput(res, ctx);
          return "Defaulting from Unaothed, You screwed up badly fam (: ";

          break;
      }
    }
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;

    var url = require("url");
    var url_parts = url.parse(ctx.request.url, true);
    var query = url_parts.query;
    switch (query.func) {
      case "getFullProduct":

        const entity = await strapi.service("api::product.product").findOne(id, {
            select: ["name", "description", "colors", "image"],
            populate: ["stock", "catagories", "vendor", "group"],
          });
          const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      
          return this.transformResponse(sanitizedEntity);

        break;

        case "getBasicPrice":

          const entityb = await strapi.service("api::product.product").findOne(id, {
              select: ["name",],
              populate: ["stock"],
            });
            const sanitizedEntityb = await this.sanitizeOutput(entityb, ctx);
        
            return sanitizedEntityb;
  
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
  async update(ctx) {
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
        case "updateProduct":

          const entityb = await strapi.service("api::product.product").findOne(ctx.request.body.data.id, {
            select: ["name",],
            populate: ["vendor"],
          });

          if(entityb.vendor.id===regid){

            const reso = await strapi.db.query("api::stock.stock").update({
              where:{
             id:ctx.request.body.data.stockid
              },
              data:{
  
                stock:ctx.request.body.data.nstock,
                price:ctx.request.body.data.nprice,
                comm:ctx.request.body.data.ncomm,
                
               
              }
              });
  
              const resprod = await strapi.db.query("api::product.product").update({
                where:{
               id:ctx.request.body.data.id
                },
                data:{
    
                  name:ctx.request.body.data.name,
                  description:ctx.request.body.data.description,
                  colors:ctx.request.body.data.colors,
                  catagories:ctx.request.body.data.catagories,
                  
                 
                }
                });

                return resprod;


          }else{
            return "authed but dosnt belong to this user"
          }
         
     return entityb
           


          const reso = await strapi.db.query("api::stock.stock").update({
            where:{
           id:ctx.request.body.data.stockid
            },
            data:{

              stock:ctx.request.body.data.nstock,
              price:ctx.request.body.data.nprice,
              comm:ctx.request.body.data.ncom,
              
             
            }
            });

            const resprod = await strapi.db.query("api::product.product").update({
              where:{
             id:ctx.request.body.data.id
              },
              data:{
  
                name:ctx.request.body.data.name,
                description:ctx.request.body.data.description,
                colors:ctx.request.body.data.colors,
                catagories:ctx.request.body.data.catagories,
                
               
              }
              });

          break;

        default:
          return "Defaulting from Authed, You screwed up badly fam (: ";
          break;
      }
    } else {
     return "Unaothed"
    }

    

   
  },
}));
