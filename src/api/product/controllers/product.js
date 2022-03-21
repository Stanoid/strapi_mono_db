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
            select: [
              "name",
              "description",
              "colors",
              "image",
              "updatedAt",
              "publishedAt",
            ],
            populate: [
              "stocks",
              "catagories",
              "product.stocks",
              "vendor",
              "group",
            ],
          });

          let newres = [];

          for (let i = 0; i < res.length; i++) {
            if (res[i].vendor.id == regid) {
              newres.push(res[i]);
            }
          }

          const sanitizedEntity = await this.sanitizeOutput(newres, ctx);
          return sanitizedEntity;
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
}));
