"use strict";(self["webpackChunkvue_final_project"]=self["webpackChunkvue_final_project"]||[]).push([[92],{1092:function(t,r,c){c.r(r),c.d(r,{default:function(){return x}});var a=c(3396),l=c(7139);const i=(0,a._)("h2",null,"產品細節",-1),o={class:"container"},s={"aria-label":"breadcrumb"},e={class:"breadcrumb"},u={class:"breadcrumb-item"},d={class:"breadcrumb-item active","aria-current":"page"},n={class:"row"},p={class:"col-md-8"},_={class:"div"},h={class:"fw-bold"},m=["src","alt"],b={class:"col-md-4"},v={class:"text-decoration-line-through"},g={class:"text-bold"},w=(0,a._)("hr",null,null,-1);function f(t,r,c,f,k,z){const C=(0,a.up)("router-link"),x=(0,a.up)("vue-loading");return(0,a.wg)(),(0,a.iD)(a.HY,null,[i,(0,a._)("div",o,[(0,a._)("nav",s,[(0,a._)("ol",e,[(0,a._)("li",u,[(0,a.Wm)(C,{to:"/user/cart"},{default:(0,a.w5)((()=>[(0,a.Uk)("產品列表")])),_:1})]),(0,a._)("li",d,(0,l.zw)(k.product.title),1)])]),(0,a._)("div",n,[(0,a._)("div",p,[(0,a._)("div",_,[(0,a._)("h2",null,(0,l.zw)(k.product.title),1),(0,a._)("small",h,(0,l.zw)(k.product.content),1),(0,a._)("p",null,(0,l.zw)(k.product.description),1),(0,a._)("img",{src:k.product.imageUrl,alt:k.product.title,class:"img-fluid d-block",width:"200"},null,8,m)])]),(0,a._)("div",b,[(0,a._)("small",v,(0,l.zw)(k.product.origin_price),1),(0,a._)("p",g,(0,l.zw)(k.product.price),1),w,(0,a._)("button",{class:"btn btn-outline-primary",onClick:r[0]||(r[0]=(...r)=>t.addCart&&t.addCart(...r))}," 加入購物車 ")])])]),(0,a.Wm)(x,{active:k.isLoading},null,8,["active"])],64)}var k={data(){return{product:{},isLoading:!1}},computed:{productId(){return this.$route.params.productId}},created(){this.isLoading=!0;const t=`https://vue3-course-api.hexschool.io/api/pss940909/product/${this.productId}`;this.axios.get(t).then((t=>{console.log(t.data),this.product=t.data.product,console.log(this.product),this.isLoading=!1}))}},z=c(89);const C=(0,z.Z)(k,[["render",f]]);var x=C}}]);
//# sourceMappingURL=92.91bde0ed.js.map