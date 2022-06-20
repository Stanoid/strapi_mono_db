'use strict';

/**
 *  order controller
 */


const { createCoreController } = require('@strapi/strapi').factories;
const fetch = require('node-fetch');

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
                  },
                  $not:{
                  status:9
                  },
                  },
                    select: ["price", "commission","status","buyers_name","buyers_address","buyers_phone","buyer_backup_number","qty","sale_price"],
                    populate: ["user", "product","product.stock"],
                  });

                  let newarr = [];
                  for (let i = 0; i < res.length; i++) {
                 if(res[i].user.id==regid){

                 }
                    
                  }


          
                return res
              break;

              case "getAdminOrders":

                const requestOptions = {
                  method: 'GET',
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization":   ctx.request.header.authorization
                  },
                };

               
                const responseprod = await  fetch('http://localhost:1338/api/users/me?populate=*', requestOptions);
                const userData = await responseprod.json();
            
    if(userData.type==4){
      const resa = await strapi.db.query("api::order.order").findMany({
        select: ["price", "commission","status","buyers_name","buyers_address","buyers_phone","buyer_backup_number","qty","sale_price"],
        populate: ["user", "product","product.stock"],
      });
     

     
      return resa;
    }else{

      return "gr8 job turd now i have your information"

    }
               
                  // .then(response => response.json())
                  // .then(data => {
                
                  //   console.log(data)
                  //   return data
                  // })
                  // .catch(err => {
                  //   return err
                  // })
                  // .finally(err => {
                  // return err
                  // })
            
              
            

                  // const udata = await strapi.plugins[
                  //   "users-permissions"
                  // ].services.jwt.getToken(ctx);
         
               
              break;


              case "getVendorOrders":

           
                const resv = await strapi.db.query("api::order.order").findMany({
                  where:{
                   
                  product:{
                   vendor:{
                     id:regid
                   }
                  },
                  $not:{
                  status:9
                  },
                  },
                    select: ["price", "commission","status","qty"],
                    populate: ["user", "product","product.stock"],
                  });
                return resv
              break;

              case "getDeliveryOrders":

           
                const resd = await strapi.db.query("api::order.order").findMany({
                  where:{
                   
                
                  status:3
                 
                  },
                  select: ["price", "commission","status","buyers_name","buyer_backup_number","buyers_address","buyers_phone","qty","sale_price"],
                  populate: ["user","vendor","product.vendor", "product","product.stock"],
                  });
                return resd
              break;
    

              case "getDeliveredOrders":

           
                const resdd = await strapi.db.query("api::order.order").findMany({
                  where:{
                   
                
                  status:4
                 
                  },
                  select: ["price", "commission","status","buyers_name","buyers_address","buyers_phone","qty","sale_price"],
                  populate: ["user","product.vendor", "product","product.stock"],
                  });
                return resdd
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
          let ress;
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
             ress=entity
                
            }
          
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


    
    async update(ctx) {

      let regid = null;

      if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
          const udata = await strapi.plugins[
            "users-permissions"
          ].services.jwt.getToken(ctx);
  
          regid = udata.id;
        } catch (err) {
          return "unauthorized request catch triggred"+ err;
        }
  
        var url = require("url");
        var url_parts = url.parse(ctx.request.url, true);
        var query = url_parts.query;
        switch (query.func) {
          case "makeSale":

            const res = await strapi.db.query("api::order.order").findMany({
              where:{
             id:query.order
              },
                select: ["price"],
                populate: ["user"],
              });

           

              if(res[0].user.id===regid){
             
                const reso = await strapi.db.query("api::order.order").update({
                  where:{
                 id:query.order
                  },
                  data:{
                    status:2,
                    sale_price:ctx.request.body.data.salePrice,
                    buyers_name:ctx.request.body.data.bName,
                    buyers_phone:ctx.request.body.data.bPhone,
                    buyer_backup_number:ctx.request.body.data.bbPhone,
                    buyers_address:ctx.request.body.data.bAdd,

                    qty:ctx.request.body.data.qty,
                  }
                  });

                  return reso

              }else{
                return "unauthed"
              }

          
        
            
            break;


            case "cancelSale":


  
              const ress = await strapi.db.query("api::order.order").findMany({
                where:{
               id:query.order
                },
                  select: ["price"],
                  populate: ["user"],
                });
  
            
                if(ress[0].user.id===regid){
               
                  const resoa = await strapi.db.query("api::order.order").update({
                    where:{
                   id:query.order
                    },
                    data:{
                      status:1,
                      sale_price:0,
                      buyers_name:"",
                      buyers_phone:"",
                      buyers_address:"",
                      qty:0,
                    }
                    });
  
                    return resoa
  
                }else{
                  return "unauthed"
                }
  
            
          
              
              break;

              case "deliverOrder":


  
                const ressd = await strapi.db.query("api::order.order").findMany({
                  where:{
                 id:query.order
                  },
                    select: ["price"],
                    populate: ["user"],
                  });
    
              
                 
                 
                    const resoad = await strapi.db.query("api::order.order").update({
                      where:{
                     id:query.order
                      },
                      data:{
                     status:4,
                        dby:regid,
                      }
                      });
    
                      return resoad
    
                
    
              
            
                
                break;
  

              case "cancelSaleVendor":


  
                const ressv = await strapi.db.query("api::order.order").findMany({
                  where:{
                 id:query.order
                  },
                    select: ["price"],
                    populate: ["user","product","product.vendor"],
                  });
    
               
    
                  if(ressv[0].product.vendor.id===regid){
                 
                    const resoa = await strapi.db.query("api::order.order").update({
                      where:{
                     id:query.order
                      },
                      data:{
                        status:8,
                        sale_price:0,
                        buyers_name:"",
                        buyers_phone:"",
                        buyers_address:"",
                        qty:0,
                      }
                      });
    
                      return resoa
    
                  }else{
                    return "unauthed"
                  }
    
              
            
                
                break;
  

              case "removeOrder":


  
                const ressa = await strapi.db.query("api::order.order").findMany({
                  where:{
                 id:query.order
                  },
                    select: ["price"],
                    populate: ["user"],
                  });
    
               
    
                  if(ressa[0].user.id===regid){
                 
                    const resoai = await strapi.db.query("api::order.order").update({
                      where:{
                     id:query.order
                      },
                      data:{
                        status:9,
                        sale_price:0,
                        buyers_name:"",
                        buyers_phone:"",
                        buyers_address:"",
                        qty:0,
                      }
                      });
    
                      return resoai
    
                  }else{
                    return "unauthed"
                  }
    
              
            
                
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
  
 