var h_=Object.defineProperty;var f_=(r,t,e)=>t in r?h_(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var kt=(r,t,e)=>f_(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xu="170",d_=0,Bh=1,p_=2,Id=1,m_=2,Li=3,dr=0,En=1,Ni=2,lr=0,Ds=1,zh=2,kh=3,Hh=4,__=5,Lr=100,g_=101,v_=102,x_=103,S_=104,M_=200,y_=201,E_=202,T_=203,Ac=204,Cc=205,b_=206,w_=207,A_=208,C_=209,R_=210,P_=211,D_=212,L_=213,I_=214,Rc=0,Pc=1,Dc=2,ks=3,Lc=4,Ic=5,Uc=6,Nc=7,Ud=0,U_=1,N_=2,cr=0,O_=1,F_=2,B_=3,z_=4,k_=5,H_=6,V_=7,Nd=300,Hs=301,Vs=302,Oc=303,Fc=304,El=306,Fo=1e3,Ur=1001,Bc=1002,li=1003,G_=1004,la=1005,mi=1006,Il=1007,Nr=1008,Vi=1009,Od=1010,Fd=1011,Bo=1012,Yu=1013,qr=1014,Fi=1015,Qo=1016,qu=1017,$u=1018,Gs=1020,Bd=35902,zd=1021,kd=1022,ai=1023,Hd=1024,Vd=1025,Ls=1026,Ws=1027,Gd=1028,Zu=1029,Wd=1030,Ku=1031,Ju=1033,$a=33776,Za=33777,Ka=33778,Ja=33779,zc=35840,kc=35841,Hc=35842,Vc=35843,Gc=36196,Wc=37492,Xc=37496,Yc=37808,qc=37809,$c=37810,Zc=37811,Kc=37812,Jc=37813,jc=37814,Qc=37815,tu=37816,eu=37817,nu=37818,iu=37819,ru=37820,su=37821,ja=36492,ou=36494,au=36495,Xd=36283,lu=36284,cu=36285,uu=36286,W_=3200,X_=3201,Yd=0,Y_=1,nr="",Wn="srgb",js="srgb-linear",Tl="linear",_e="srgb",ss=7680,Vh=519,q_=512,$_=513,Z_=514,qd=515,K_=516,J_=517,j_=518,Q_=519,Gh=35044,Wh="300 es",Bi=2e3,cl=2001;class Qs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xh=1234567;const So=Math.PI/180,zo=180/Math.PI;function ns(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[r&255]+Qe[r>>8&255]+Qe[r>>16&255]+Qe[r>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function Je(r,t,e){return Math.max(t,Math.min(e,r))}function ju(r,t){return(r%t+t)%t}function tg(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function eg(r,t,e){return r!==t?(e-r)/(t-r):0}function Mo(r,t,e){return(1-e)*r+e*t}function ng(r,t,e,n){return Mo(r,t,1-Math.exp(-e*n))}function ig(r,t=1){return t-Math.abs(ju(r,t*2)-t)}function rg(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function sg(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function og(r,t){return r+Math.floor(Math.random()*(t-r+1))}function ag(r,t){return r+Math.random()*(t-r)}function lg(r){return r*(.5-Math.random())}function cg(r){r!==void 0&&(Xh=r);let t=Xh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ug(r){return r*So}function hg(r){return r*zo}function fg(r){return(r&r-1)===0&&r!==0}function dg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function pg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function mg(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),u=o((t+n)/2),h=s((t-n)/2),f=o((t-n)/2),d=s((n-t)/2),_=o((n-t)/2);switch(i){case"XYX":r.set(a*u,l*h,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*h,a*c);break;case"ZXZ":r.set(l*h,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*d,a*c);break;case"YXY":r.set(l*d,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Es(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function fn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ca={DEG2RAD:So,RAD2DEG:zo,generateUUID:ns,clamp:Je,euclideanModulo:ju,mapLinear:tg,inverseLerp:eg,lerp:Mo,damp:ng,pingpong:ig,smoothstep:rg,smootherstep:sg,randInt:og,randFloat:ag,randFloatSpread:lg,seededRandom:cg,degToRad:ug,radToDeg:hg,isPowerOfTwo:fg,ceilPowerOfTwo:dg,floorPowerOfTwo:pg,setQuaternionFromProperEuler:mg,normalize:fn,denormalize:Es};class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,n,i,s,o,a,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],g=i[0],m=i[3],p=i[6],E=i[1],S=i[4],v=i[7],C=i[2],A=i[5],b=i[8];return s[0]=o*g+a*E+l*C,s[3]=o*m+a*S+l*A,s[6]=o*p+a*v+l*b,s[1]=c*g+u*E+h*C,s[4]=c*m+u*S+h*A,s[7]=c*p+u*v+h*b,s[2]=f*g+d*E+_*C,s[5]=f*m+d*S+_*A,s[8]=f*p+d*v+_*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,_=e*h+n*f+i*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=h*g,t[1]=(i*c-u*n)*g,t[2]=(a*n-i*o)*g,t[3]=f*g,t[4]=(u*e-i*l)*g,t[5]=(i*s-a*e)*g,t[6]=d*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ul.makeScale(t,e)),this}rotate(t){return this.premultiply(Ul.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ul.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ul=new Qt;function $d(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ko(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _g(){const r=ko("canvas");return r.style.display="block",r}const Yh={};function uo(r){r in Yh||(Yh[r]=!0,console.warn(r))}function gg(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function vg(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xg(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const le={enabled:!0,workingColorSpace:js,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===_e&&(r.r=ki(r.r),r.g=ki(r.g),r.b=ki(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===_e&&(r.r=Is(r.r),r.g=Is(r.g),r.b=Is(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===nr?Tl:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Is(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const qh=[.64,.33,.3,.6,.15,.06],$h=[.2126,.7152,.0722],Zh=[.3127,.329],Kh=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jh=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);le.define({[js]:{primaries:qh,whitePoint:Zh,transfer:Tl,toXYZ:Kh,fromXYZ:Jh,luminanceCoefficients:$h,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:qh,whitePoint:Zh,transfer:_e,toXYZ:Kh,fromXYZ:Jh,luminanceCoefficients:$h,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}});let os;class Sg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{os===void 0&&(os=ko("canvas")),os.width=t.width,os.height=t.height;const n=os.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=os}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ko("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ki(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ki(e[n]/255)*255):e[n]=ki(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Mg=0;class Zd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=ns(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Nl(i[o].image)):s.push(Nl(i[o]))}else s=Nl(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Nl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Sg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yg=0;class on extends Qs{constructor(t=on.DEFAULT_IMAGE,e=on.DEFAULT_MAPPING,n=Ur,i=Ur,s=mi,o=Nr,a=ai,l=Vi,c=on.DEFAULT_ANISOTROPY,u=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=ns(),this.name="",this.source=new Zd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fo:t.x=t.x-Math.floor(t.x);break;case Ur:t.x=t.x<0?0:1;break;case Bc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fo:t.y=t.y-Math.floor(t.y);break;case Ur:t.y=t.y<0?0:1;break;case Bc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Nd;on.DEFAULT_ANISOTROPY=1;class Le{constructor(t=0,e=0,n=0,i=1){Le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,v=(d+1)/2,C=(p+1)/2,A=(u+f)/4,b=(h+g)/4,P=(_+m)/4;return S>v&&S>C?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=A/n,s=b/n):v>C?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=A/i,s=P/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=b/s,i=P/s),this.set(n,i,s,e),this}let E=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(h-g)/E,this.z=(f-u)/E,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Eg extends Qs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new on(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Zd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $r extends Eg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Kd extends on{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=li,this.minFilter=li,this.wrapR=Ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tg extends on{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=li,this.minFilter=li,this.wrapR=Ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ta{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],_=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=_,t[e+3]=g;return}if(h!==g||l!==f||c!==d||u!==_){let m=1-a;const p=l*f+c*d+u*_+h*g,E=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const C=Math.sqrt(S),A=Math.atan2(C,p*E);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const v=a*E;if(l=l*m+f*v,c=c*m+d*v,u=u*m+_*v,h=h*m+g*v,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],_=s[o+3];return t[e]=a*_+u*h+l*d-c*f,t[e+1]=l*_+u*f+c*h-a*d,t[e+2]=c*_+u*d+a*f-l*h,t[e+3]=u*_-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(jh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(jh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),u=2*(a*e-s*i),h=2*(s*n-o*e);return this.x=e+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=i+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ol.copy(this).projectOnVector(t),this.sub(Ol)}reflect(t){return this.sub(Ol.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ol=new z,jh=new ta;class ea{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ei.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ei.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ei.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ei):ei.fromBufferAttribute(s,o),ei.applyMatrix4(t.matrixWorld),this.expandByPoint(ei);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ua.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ua.copy(n.boundingBox)),ua.applyMatrix4(t.matrixWorld),this.union(ua)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ei),ei.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(io),ha.subVectors(this.max,io),as.subVectors(t.a,io),ls.subVectors(t.b,io),cs.subVectors(t.c,io),$i.subVectors(ls,as),Zi.subVectors(cs,ls),xr.subVectors(as,cs);let e=[0,-$i.z,$i.y,0,-Zi.z,Zi.y,0,-xr.z,xr.y,$i.z,0,-$i.x,Zi.z,0,-Zi.x,xr.z,0,-xr.x,-$i.y,$i.x,0,-Zi.y,Zi.x,0,-xr.y,xr.x,0];return!Fl(e,as,ls,cs,ha)||(e=[1,0,0,0,1,0,0,0,1],!Fl(e,as,ls,cs,ha))?!1:(fa.crossVectors($i,Zi),e=[fa.x,fa.y,fa.z],Fl(e,as,ls,cs,ha))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ei).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ei).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ai=[new z,new z,new z,new z,new z,new z,new z,new z],ei=new z,ua=new ea,as=new z,ls=new z,cs=new z,$i=new z,Zi=new z,xr=new z,io=new z,ha=new z,fa=new z,Sr=new z;function Fl(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Sr.fromArray(r,s);const a=i.x*Math.abs(Sr.x)+i.y*Math.abs(Sr.y)+i.z*Math.abs(Sr.z),l=t.dot(Sr),c=e.dot(Sr),u=n.dot(Sr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const bg=new ea,ro=new z,Bl=new z;class Qu{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):bg.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ro.subVectors(t,this.center);const e=ro.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ro,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ro.copy(t.center).add(Bl)),this.expandByPoint(ro.copy(t.center).sub(Bl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new z,zl=new z,da=new z,Ki=new z,kl=new z,pa=new z,Hl=new z;class wg{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,e),Ci.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){zl.copy(t).add(e).multiplyScalar(.5),da.copy(e).sub(t).normalize(),Ki.copy(this.origin).sub(zl);const s=t.distanceTo(e)*.5,o=-this.direction.dot(da),a=Ki.dot(this.direction),l=-Ki.dot(da),c=Ki.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*l-a,f=o*a-l,_=s*u,h>=0)if(f>=-_)if(f<=_){const g=1/u;h*=g,f*=g,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(zl).addScaledVector(da,f),d}intersectSphere(t,e){Ci.subVectors(t.center,this.origin);const n=Ci.dot(this.direction),i=Ci.dot(Ci)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,e,n,i,s){kl.subVectors(e,t),pa.subVectors(n,t),Hl.crossVectors(kl,pa);let o=this.direction.dot(Hl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ki.subVectors(this.origin,t);const l=a*this.direction.dot(pa.crossVectors(Ki,pa));if(l<0)return null;const c=a*this.direction.dot(kl.cross(Ki));if(c<0||l+c>o)return null;const u=-a*Ki.dot(Hl);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(t,e,n,i,s,o,a,l,c,u,h,f,d,_,g,m){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,u,h,f,d,_,g,m)}set(t,e,n,i,s,o,a,l,c,u,h,f,d,_,g,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/us.setFromMatrixColumn(t,0).length(),s=1/us.setFromMatrixColumn(t,1).length(),o=1/us.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,_=a*u,g=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+_*c,e[5]=f-g*c,e[9]=-a*l,e[2]=g-f*c,e[6]=_+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,_=c*u,g=c*h;e[0]=f+g*a,e[4]=_*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-_,e[6]=g+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,_=c*u,g=c*h;e[0]=f-g*a,e[4]=-o*h,e[8]=_+d*a,e[1]=d+_*a,e[5]=o*u,e[9]=g-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,_=a*u,g=a*h;e[0]=l*u,e[4]=_*c-d,e[8]=f*c+g,e[1]=l*h,e[5]=g*c+f,e[9]=d*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,_=a*l,g=a*c;e[0]=l*u,e[4]=g-f*h,e[8]=_*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+_,e[10]=f-g*h}else if(t.order==="XZY"){const f=o*l,d=o*c,_=a*l,g=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+g,e[5]=o*u,e[9]=d*h-_,e[2]=_*h-d,e[6]=a*u,e[10]=g*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ag,t,Cg)}lookAt(t,e,n){const i=this.elements;return Dn.subVectors(t,e),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Ji.crossVectors(n,Dn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Ji.crossVectors(n,Dn)),Ji.normalize(),ma.crossVectors(Dn,Ji),i[0]=Ji.x,i[4]=ma.x,i[8]=Dn.x,i[1]=Ji.y,i[5]=ma.y,i[9]=Dn.y,i[2]=Ji.z,i[6]=ma.z,i[10]=Dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],g=n[6],m=n[10],p=n[14],E=n[3],S=n[7],v=n[11],C=n[15],A=i[0],b=i[4],P=i[8],M=i[12],x=i[1],D=i[5],O=i[9],B=i[13],X=i[2],q=i[6],W=i[10],Y=i[14],H=i[3],rt=i[7],L=i[11],ct=i[15];return s[0]=o*A+a*x+l*X+c*H,s[4]=o*b+a*D+l*q+c*rt,s[8]=o*P+a*O+l*W+c*L,s[12]=o*M+a*B+l*Y+c*ct,s[1]=u*A+h*x+f*X+d*H,s[5]=u*b+h*D+f*q+d*rt,s[9]=u*P+h*O+f*W+d*L,s[13]=u*M+h*B+f*Y+d*ct,s[2]=_*A+g*x+m*X+p*H,s[6]=_*b+g*D+m*q+p*rt,s[10]=_*P+g*O+m*W+p*L,s[14]=_*M+g*B+m*Y+p*ct,s[3]=E*A+S*x+v*X+C*H,s[7]=E*b+S*D+v*q+C*rt,s[11]=E*P+S*O+v*W+C*L,s[15]=E*M+S*B+v*Y+C*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],_=t[3],g=t[7],m=t[11],p=t[15];return _*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+g*(+e*l*d-e*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+m*(+e*c*h-e*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+p*(-i*a*u-e*l*h+e*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],_=t[12],g=t[13],m=t[14],p=t[15],E=h*m*c-g*f*c+g*l*d-a*m*d-h*l*p+a*f*p,S=_*f*c-u*m*c-_*l*d+o*m*d+u*l*p-o*f*p,v=u*g*c-_*h*c+_*a*d-o*g*d-u*a*p+o*h*p,C=_*h*l-u*g*l-_*a*f+o*g*f+u*a*m-o*h*m,A=e*E+n*S+i*v+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/A;return t[0]=E*b,t[1]=(g*f*s-h*m*s-g*i*d+n*m*d+h*i*p-n*f*p)*b,t[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*b,t[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*b,t[4]=S*b,t[5]=(u*m*s-_*f*s+_*i*d-e*m*d-u*i*p+e*f*p)*b,t[6]=(_*l*s-o*m*s-_*i*c+e*m*c+o*i*p-e*l*p)*b,t[7]=(o*f*s-u*l*s+u*i*c-e*f*c-o*i*d+e*l*d)*b,t[8]=v*b,t[9]=(_*h*s-u*g*s-_*n*d+e*g*d+u*n*p-e*h*p)*b,t[10]=(o*g*s-_*a*s+_*n*c-e*g*c-o*n*p+e*a*p)*b,t[11]=(u*a*s-o*h*s-u*n*c+e*h*c+o*n*d-e*a*d)*b,t[12]=C*b,t[13]=(u*g*i-_*h*i+_*n*f-e*g*f-u*n*m+e*h*m)*b,t[14]=(_*a*i-o*g*i-_*n*l+e*g*l+o*n*m-e*a*m)*b,t[15]=(o*h*i-u*a*i+u*n*l-e*h*l-o*n*f+e*a*f)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,_=s*h,g=o*u,m=o*h,p=a*h,E=l*c,S=l*u,v=l*h,C=n.x,A=n.y,b=n.z;return i[0]=(1-(g+p))*C,i[1]=(d+v)*C,i[2]=(_-S)*C,i[3]=0,i[4]=(d-v)*A,i[5]=(1-(f+p))*A,i[6]=(m+E)*A,i[7]=0,i[8]=(_+S)*b,i[9]=(m-E)*b,i[10]=(1-(f+g))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=us.set(i[0],i[1],i[2]).length();const o=us.set(i[4],i[5],i[6]).length(),a=us.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ni.copy(this);const c=1/s,u=1/o,h=1/a;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=u,ni.elements[5]*=u,ni.elements[6]*=u,ni.elements[8]*=h,ni.elements[9]*=h,ni.elements[10]*=h,e.setFromRotationMatrix(ni),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Bi){const l=this.elements,c=2*s/(e-t),u=2*s/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i);let d,_;if(a===Bi)d=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===cl)d=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Bi){const l=this.elements,c=1/(e-t),u=1/(n-i),h=1/(o-s),f=(e+t)*c,d=(n+i)*u;let _,g;if(a===Bi)_=(o+s)*h,g=-2*h;else if(a===cl)_=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const us=new z,ni=new Pe,Ag=new z(0,0,0),Cg=new z(1,1,1),Ji=new z,ma=new z,Dn=new z,Qh=new Pe,tf=new ta;class Ei{constructor(t=0,e=0,n=0,i=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Qh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tf.setFromEuler(this),this.setFromQuaternion(tf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Jd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rg=0;const ef=new z,hs=new ta,Ri=new Pe,_a=new z,so=new z,Pg=new z,Dg=new ta,nf=new z(1,0,0),rf=new z(0,1,0),sf=new z(0,0,1),of={type:"added"},Lg={type:"removed"},fs={type:"childadded",child:null},Vl={type:"childremoved",child:null};class an extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const t=new z,e=new Ei,n=new ta,i=new z(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Qt}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.multiply(hs),this}rotateOnWorldAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.premultiply(hs),this}rotateX(t){return this.rotateOnAxis(nf,t)}rotateY(t){return this.rotateOnAxis(rf,t)}rotateZ(t){return this.rotateOnAxis(sf,t)}translateOnAxis(t,e){return ef.copy(t).applyQuaternion(this.quaternion),this.position.add(ef.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nf,t)}translateY(t){return this.translateOnAxis(rf,t)}translateZ(t){return this.translateOnAxis(sf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_a.copy(t):_a.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(so,_a,this.up):Ri.lookAt(_a,so,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),hs.setFromRotationMatrix(Ri),this.quaternion.premultiply(hs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(of),fs.child=t,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Lg),Vl.child=t,this.dispatchEvent(Vl),Vl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(of),fs.child=t,this.dispatchEvent(fs),fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,t,Pg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,Dg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}an.DEFAULT_UP=new z(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ii=new z,Pi=new z,Gl=new z,Di=new z,ds=new z,ps=new z,af=new z,Wl=new z,Xl=new z,Yl=new z,ql=new Le,$l=new Le,Zl=new Le;class oi{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),ii.subVectors(t,e),i.cross(ii);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){ii.subVectors(i,e),Pi.subVectors(n,e),Gl.subVectors(t,e);const o=ii.dot(ii),a=ii.dot(Pi),l=ii.dot(Gl),c=Pi.dot(Pi),u=Pi.dot(Gl),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-d-_,_,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Di.x),l.addScaledVector(o,Di.y),l.addScaledVector(a,Di.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return ql.setScalar(0),$l.setScalar(0),Zl.setScalar(0),ql.fromBufferAttribute(t,e),$l.fromBufferAttribute(t,n),Zl.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ql,s.x),o.addScaledVector($l,s.y),o.addScaledVector(Zl,s.z),o}static isFrontFacing(t,e,n,i){return ii.subVectors(n,e),Pi.subVectors(t,e),ii.cross(Pi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ii.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ii.cross(Pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return oi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return oi.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ds.subVectors(i,n),ps.subVectors(s,n),Wl.subVectors(t,n);const l=ds.dot(Wl),c=ps.dot(Wl);if(l<=0&&c<=0)return e.copy(n);Xl.subVectors(t,i);const u=ds.dot(Xl),h=ps.dot(Xl);if(u>=0&&h<=u)return e.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(ds,o);Yl.subVectors(t,s);const d=ds.dot(Yl),_=ps.dot(Yl);if(_>=0&&d<=_)return e.copy(s);const g=d*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(n).addScaledVector(ps,a);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return af.subVectors(s,i),a=(h-u)/(h-u+(d-_)),e.copy(i).addScaledVector(af,a);const p=1/(m+g+f);return o=g*p,a=f*p,e.copy(n).addScaledVector(ds,o).addScaledVector(ps,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const jd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},ga={h:0,s:0,l:0};function Kl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class he{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=le.workingColorSpace){if(t=ju(t,1),e=Je(e,0,1),n=Je(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Kl(o,s,t+1/3),this.g=Kl(o,s,t),this.b=Kl(o,s,t-1/3)}return le.toWorkingColorSpace(this,i),this}setStyle(t,e=Wn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Wn){const n=jd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}copyLinearToSRGB(t){return this.r=Is(t.r),this.g=Is(t.g),this.b=Is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Wn){return le.fromWorkingColorSpace(tn.copy(this),t),Math.round(Je(tn.r*255,0,255))*65536+Math.round(Je(tn.g*255,0,255))*256+Math.round(Je(tn.b*255,0,255))}getHexString(t=Wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(tn.copy(this),e);const n=tn.r,i=tn.g,s=tn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=Wn){le.fromWorkingColorSpace(tn.copy(this),t);const e=tn.r,n=tn.g,i=tn.b;return t!==Wn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ji),this.setHSL(ji.h+t,ji.s+e,ji.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ji),t.getHSL(ga);const n=Mo(ji.h,ga.h,e),i=Mo(ji.s,ga.s,e),s=Mo(ji.l,ga.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new he;he.NAMES=jd;let Ig=0;class na extends Qs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=ns(),this.name="",this.blending=Ds,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ac,this.blendDst=Cc,this.blendEquation=Lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==dr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ac&&(n.blendSrc=this.blendSrc),this.blendDst!==Cc&&(n.blendDst=this.blendDst),this.blendEquation!==Lr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class th extends na{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Ud,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Be=new z,va=new bt;class xi{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Gh,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)va.fromBufferAttribute(this,e),va.applyMatrix3(t),this.setXY(e,va.x,va.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Es(e,this.array)),e}setX(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Es(e,this.array)),e}setY(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Es(e,this.array)),e}setW(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),n=fn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),n=fn(n,this.array),i=fn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),n=fn(n,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Gh&&(t.usage=this.usage),t}}class Qd extends xi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class tp extends xi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jn extends xi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ug=0;const Vn=new Pe,Jl=new an,ms=new z,Ln=new ea,oo=new ea,Ye=new z;class Xi extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($d(t)?tp:Qd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Qt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Vn.makeRotationFromQuaternion(t),this.applyMatrix4(Vn),this}rotateX(t){return Vn.makeRotationX(t),this.applyMatrix4(Vn),this}rotateY(t){return Vn.makeRotationY(t),this.applyMatrix4(Vn),this}rotateZ(t){return Vn.makeRotationZ(t),this.applyMatrix4(Vn),this}translate(t,e,n){return Vn.makeTranslation(t,e,n),this.applyMatrix4(Vn),this}scale(t,e,n){return Vn.makeScale(t,e,n),this.applyMatrix4(Vn),this}lookAt(t){return Jl.lookAt(t),Jl.updateMatrix(),this.applyMatrix4(Jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jn(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ea);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qu);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];oo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(Ln.min,oo.min),Ln.expandByPoint(Ye),Ye.addVectors(Ln.max,oo.max),Ln.expandByPoint(Ye)):(Ln.expandByPoint(oo.min),Ln.expandByPoint(oo.max))}Ln.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Ye.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ye));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ye.fromBufferAttribute(a,c),l&&(ms.fromBufferAttribute(t,c),Ye.add(ms)),i=Math.max(i,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xi(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new z,l[P]=new z;const c=new z,u=new z,h=new z,f=new bt,d=new bt,_=new bt,g=new z,m=new z;function p(P,M,x){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,x),f.fromBufferAttribute(s,P),d.fromBufferAttribute(s,M),_.fromBufferAttribute(s,x),u.sub(c),h.sub(c),d.sub(f),_.sub(f);const D=1/(d.x*_.y-_.x*d.y);isFinite(D)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(D),a[P].add(g),a[M].add(g),a[x].add(g),l[P].add(m),l[M].add(m),l[x].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let P=0,M=E.length;P<M;++P){const x=E[P],D=x.start,O=x.count;for(let B=D,X=D+O;B<X;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const S=new z,v=new z,C=new z,A=new z;function b(P){C.fromBufferAttribute(i,P),A.copy(C);const M=a[P];S.copy(M),S.sub(C.multiplyScalar(C.dot(M))).normalize(),v.crossVectors(A,M);const D=v.dot(l[P])<0?-1:1;o.setXYZW(P,S.x,S.y,S.z,D)}for(let P=0,M=E.length;P<M;++P){const x=E[P],D=x.start,O=x.count;for(let B=D,X=D+O;B<X;B+=3)b(t.getX(B+0)),b(t.getX(B+1)),b(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new z,s=new z,o=new z,a=new z,l=new z,c=new z,u=new z,h=new z;if(t)for(let f=0,d=t.count;f<d;f+=3){const _=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,m),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?d=l[g]*a.data.stride+a.offset:d=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new xi(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Xi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lf=new Pe,Mr=new wg,xa=new Qu,cf=new z,Sa=new z,Ma=new z,ya=new z,jl=new z,Ea=new z,uf=new z,Ta=new z;class $n extends an{constructor(t=new Xi,e=new th){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Ea.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(jl.fromBufferAttribute(h,t),o?Ea.addScaledVector(jl,u):Ea.addScaledVector(jl.sub(e),u))}e.add(Ea)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(s),Mr.copy(t.ray).recast(t.near),!(xa.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(xa,cf)===null||Mr.origin.distanceToSquared(cf)>(t.far-t.near)**2))&&(lf.copy(s).invert(),Mr.copy(t.ray).applyMatrix4(lf),!(n.boundingBox!==null&&Mr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Mr)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],E=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=E,C=S;v<C;v+=3){const A=a.getX(v),b=a.getX(v+1),P=a.getX(v+2);i=ba(this,p,t,n,c,u,h,A,b,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const _=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const E=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);i=ba(this,o,t,n,c,u,h,E,S,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],E=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=E,C=S;v<C;v+=3){const A=v,b=v+1,P=v+2;i=ba(this,p,t,n,c,u,h,A,b,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const _=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const E=m,S=m+1,v=m+2;i=ba(this,o,t,n,c,u,h,E,S,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Ng(r,t,e,n,i,s,o,a){let l;if(t.side===En?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===dr,a),l===null)return null;Ta.copy(a),Ta.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ta);return c<e.near||c>e.far?null:{distance:c,point:Ta.clone(),object:r}}function ba(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Sa),r.getVertexPosition(l,Ma),r.getVertexPosition(c,ya);const u=Ng(r,t,e,n,Sa,Ma,ya,uf);if(u){const h=new z;oi.getBarycoord(uf,Sa,Ma,ya,h),i&&(u.uv=oi.getInterpolatedAttribute(i,a,l,c,h,new bt)),s&&(u.uv1=oi.getInterpolatedAttribute(s,a,l,c,h,new bt)),o&&(u.normal=oi.getInterpolatedAttribute(o,a,l,c,h,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new z,materialIndex:0};oi.getNormal(Sa,Ma,ya,f.normal),u.face=f,u.barycoord=h}return u}class ia extends Xi{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,n,e,t,o,s,0),_("z","y","x",1,-1,n,e,-t,o,s,1),_("x","z","y",1,1,t,n,e,i,o,2),_("x","z","y",1,-1,t,n,-e,i,o,3),_("x","y","z",1,-1,t,e,n,i,s,4),_("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Jn(c,3)),this.setAttribute("normal",new Jn(u,3)),this.setAttribute("uv",new Jn(h,2));function _(g,m,p,E,S,v,C,A,b,P,M){const x=v/b,D=C/P,O=v/2,B=C/2,X=A/2,q=b+1,W=P+1;let Y=0,H=0;const rt=new z;for(let L=0;L<W;L++){const ct=L*D-B;for(let Ut=0;Ut<q;Ut++){const Kt=Ut*x-O;rt[g]=Kt*E,rt[m]=ct*S,rt[p]=X,c.push(rt.x,rt.y,rt.z),rt[g]=0,rt[m]=0,rt[p]=A>0?1:-1,u.push(rt.x,rt.y,rt.z),h.push(Ut/b),h.push(1-L/P),Y+=1}}for(let L=0;L<P;L++)for(let ct=0;ct<b;ct++){const Ut=f+ct+q*L,Kt=f+ct+q*(L+1),Z=f+(ct+1)+q*(L+1),it=f+(ct+1)+q*L;l.push(Ut,Kt,it),l.push(Kt,Z,it),H+=6}a.addGroup(d,H,M),d+=H,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ia(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function pn(r){const t={};for(let e=0;e<r.length;e++){const n=Xs(r[e]);for(const i in n)t[i]=n[i]}return t}function Og(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function ep(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}const Fg={clone:Xs,merge:pn};var Bg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pr extends na{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bg,this.fragmentShader=zg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xs(t.uniforms),this.uniformsGroups=Og(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class np extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Bi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new z,hf=new bt,ff=new bt;class Xn extends np{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zo*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z)}getViewSize(t,e){return this.getViewBounds(t,hf,ff),e.subVectors(ff,hf)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(So*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _s=-90,gs=1;class kg extends an{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Xn(_s,gs,t,e);i.layers=this.layers,this.add(i);const s=new Xn(_s,gs,t,e);s.layers=this.layers,this.add(s);const o=new Xn(_s,gs,t,e);o.layers=this.layers,this.add(o);const a=new Xn(_s,gs,t,e);a.layers=this.layers,this.add(a);const l=new Xn(_s,gs,t,e);l.layers=this.layers,this.add(l);const c=new Xn(_s,gs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Bi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===cl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class ip extends on{constructor(t,e,n,i,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Hs,super(t,e,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hg extends $r{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ip(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:mi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ia(5,5,5),s=new pr({name:"CubemapFromEquirect",uniforms:Xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:lr});s.uniforms.tEquirect.value=e;const o=new $n(i,s),a=e.minFilter;return e.minFilter===Nr&&(e.minFilter=mi),new kg(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Ql=new z,Vg=new z,Gg=new Qt;class Ar{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ql.subVectors(n,e).cross(Vg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ql),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Gg.getNormalMatrix(t),i=this.coplanarPoint(Ql).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yr=new Qu,wa=new z;class eh{constructor(t=new Ar,e=new Ar,n=new Ar,i=new Ar,s=new Ar,o=new Ar){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Bi){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],_=i[9],g=i[10],m=i[11],p=i[12],E=i[13],S=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-d,v-p).normalize(),n[1].setComponents(l+s,f+c,m+d,v+p).normalize(),n[2].setComponents(l+o,f+u,m+_,v+E).normalize(),n[3].setComponents(l-o,f-u,m-_,v-E).normalize(),n[4].setComponents(l-a,f-h,m-g,v-S).normalize(),e===Bi)n[5].setComponents(l+a,f+h,m+g,v+S).normalize();else if(e===cl)n[5].setComponents(a,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(t){return yr.center.set(0,0,0),yr.radius=.7071067811865476,yr.applyMatrix4(t.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(wa.x=i.normal.x>0?t.max.x:t.min.x,wa.y=i.normal.y>0?t.max.y:t.min.y,wa.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(wa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rp(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Wg(r){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,a),h.length===0)r.bufferSubData(c,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],g=h[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,h[f]=g)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const g=h[d];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class ra extends Xi{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=t/a,f=e/l,d=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const E=p*f-o;for(let S=0;S<c;S++){const v=S*h-s;_.push(v,-E,0),g.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){const S=E+c*p,v=E+c*(p+1),C=E+1+c*(p+1),A=E+1+c*p;d.push(S,v,A),d.push(v,C,A)}this.setIndex(d),this.setAttribute("position",new Jn(_,3)),this.setAttribute("normal",new Jn(g,3)),this.setAttribute("uv",new Jn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ra(t.width,t.height,t.widthSegments,t.heightSegments)}}var Xg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$g=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,t0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,e0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,n0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,i0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,r0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,s0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,o0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,u0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,h0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,d0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,p0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,m0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,g0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,x0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,M0="gl_FragColor = linearToOutputTexel( gl_FragColor );",y0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,E0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,b0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,w0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,C0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,R0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,P0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,D0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,L0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,I0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,U0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,F0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,B0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,k0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,H0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,V0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,G0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,W0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,X0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,q0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Z0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,J0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,j0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Q0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ev=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ov=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,av=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_v=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ev=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Av=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Iv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Uv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ov=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Jv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ex=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ix=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ox=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ax=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,fx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,px=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,yx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Xg,alphahash_pars_fragment:Yg,alphamap_fragment:qg,alphamap_pars_fragment:$g,alphatest_fragment:Zg,alphatest_pars_fragment:Kg,aomap_fragment:Jg,aomap_pars_fragment:jg,batching_pars_vertex:Qg,batching_vertex:t0,begin_vertex:e0,beginnormal_vertex:n0,bsdfs:i0,iridescence_fragment:r0,bumpmap_pars_fragment:s0,clipping_planes_fragment:o0,clipping_planes_pars_fragment:a0,clipping_planes_pars_vertex:l0,clipping_planes_vertex:c0,color_fragment:u0,color_pars_fragment:h0,color_pars_vertex:f0,color_vertex:d0,common:p0,cube_uv_reflection_fragment:m0,defaultnormal_vertex:_0,displacementmap_pars_vertex:g0,displacementmap_vertex:v0,emissivemap_fragment:x0,emissivemap_pars_fragment:S0,colorspace_fragment:M0,colorspace_pars_fragment:y0,envmap_fragment:E0,envmap_common_pars_fragment:T0,envmap_pars_fragment:b0,envmap_pars_vertex:w0,envmap_physical_pars_fragment:F0,envmap_vertex:A0,fog_vertex:C0,fog_pars_vertex:R0,fog_fragment:P0,fog_pars_fragment:D0,gradientmap_pars_fragment:L0,lightmap_pars_fragment:I0,lights_lambert_fragment:U0,lights_lambert_pars_fragment:N0,lights_pars_begin:O0,lights_toon_fragment:B0,lights_toon_pars_fragment:z0,lights_phong_fragment:k0,lights_phong_pars_fragment:H0,lights_physical_fragment:V0,lights_physical_pars_fragment:G0,lights_fragment_begin:W0,lights_fragment_maps:X0,lights_fragment_end:Y0,logdepthbuf_fragment:q0,logdepthbuf_pars_fragment:$0,logdepthbuf_pars_vertex:Z0,logdepthbuf_vertex:K0,map_fragment:J0,map_pars_fragment:j0,map_particle_fragment:Q0,map_particle_pars_fragment:tv,metalnessmap_fragment:ev,metalnessmap_pars_fragment:nv,morphinstance_vertex:iv,morphcolor_vertex:rv,morphnormal_vertex:sv,morphtarget_pars_vertex:ov,morphtarget_vertex:av,normal_fragment_begin:lv,normal_fragment_maps:cv,normal_pars_fragment:uv,normal_pars_vertex:hv,normal_vertex:fv,normalmap_pars_fragment:dv,clearcoat_normal_fragment_begin:pv,clearcoat_normal_fragment_maps:mv,clearcoat_pars_fragment:_v,iridescence_pars_fragment:gv,opaque_fragment:vv,packing:xv,premultiplied_alpha_fragment:Sv,project_vertex:Mv,dithering_fragment:yv,dithering_pars_fragment:Ev,roughnessmap_fragment:Tv,roughnessmap_pars_fragment:bv,shadowmap_pars_fragment:wv,shadowmap_pars_vertex:Av,shadowmap_vertex:Cv,shadowmask_pars_fragment:Rv,skinbase_vertex:Pv,skinning_pars_vertex:Dv,skinning_vertex:Lv,skinnormal_vertex:Iv,specularmap_fragment:Uv,specularmap_pars_fragment:Nv,tonemapping_fragment:Ov,tonemapping_pars_fragment:Fv,transmission_fragment:Bv,transmission_pars_fragment:zv,uv_pars_fragment:kv,uv_pars_vertex:Hv,uv_vertex:Vv,worldpos_vertex:Gv,background_vert:Wv,background_frag:Xv,backgroundCube_vert:Yv,backgroundCube_frag:qv,cube_vert:$v,cube_frag:Zv,depth_vert:Kv,depth_frag:Jv,distanceRGBA_vert:jv,distanceRGBA_frag:Qv,equirect_vert:tx,equirect_frag:ex,linedashed_vert:nx,linedashed_frag:ix,meshbasic_vert:rx,meshbasic_frag:sx,meshlambert_vert:ox,meshlambert_frag:ax,meshmatcap_vert:lx,meshmatcap_frag:cx,meshnormal_vert:ux,meshnormal_frag:hx,meshphong_vert:fx,meshphong_frag:dx,meshphysical_vert:px,meshphysical_frag:mx,meshtoon_vert:_x,meshtoon_frag:gx,points_vert:vx,points_frag:xx,shadow_vert:Sx,shadow_frag:Mx,sprite_vert:yx,sprite_frag:Ex},yt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},di={basic:{uniforms:pn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:pn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new he(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:pn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:pn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:pn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new he(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:pn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:pn([yt.points,yt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:pn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:pn([yt.common,yt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:pn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:pn([yt.sprite,yt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:pn([yt.common,yt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:pn([yt.lights,yt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};di.physical={uniforms:pn([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const Aa={r:0,b:0,g:0},Er=new Ei,Tx=new Pe;function bx(r,t,e,n,i,s,o){const a=new he(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function _(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?e:t).get(S)),S}function g(E){let S=!1;const v=_(E);v===null?p(a,l):v&&v.isColor&&(p(v,1),S=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(E,S){const v=_(S);v&&(v.isCubeTexture||v.mapping===El)?(u===void 0&&(u=new $n(new ia(1,1,1),new pr({name:"BackgroundCubeMaterial",uniforms:Xs(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Er.copy(S.backgroundRotation),Er.x*=-1,Er.y*=-1,Er.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Er.y*=-1,Er.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(Er)),u.material.toneMapped=le.getTransfer(v.colorSpace)!==_e,(h!==v||f!==v.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new $n(new ra(2,2),new pr({name:"BackgroundMaterial",uniforms:Xs(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=le.getTransfer(v.colorSpace)!==_e,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,S){E.getRGB(Aa,ep(r)),n.buffers.color.setClear(Aa.r,Aa.g,Aa.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(E,S=1){a.set(E),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:g,addToRenderList:m}}function wx(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(x,D,O,B,X){let q=!1;const W=h(B,O,D);s!==W&&(s=W,c(s.object)),q=d(x,B,O,X),q&&_(x,B,O,X),X!==null&&t.update(X,r.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(x,D,O,B),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function u(x){return r.deleteVertexArray(x)}function h(x,D,O){const B=O.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let q=X[D.id];q===void 0&&(q={},X[D.id]=q);let W=q[B];return W===void 0&&(W=f(l()),q[B]=W),W}function f(x){const D=[],O=[],B=[];for(let X=0;X<e;X++)D[X]=0,O[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:B,object:x,attributes:{},index:null}}function d(x,D,O,B){const X=s.attributes,q=D.attributes;let W=0;const Y=O.getAttributes();for(const H in Y)if(Y[H].location>=0){const L=X[H];let ct=q[H];if(ct===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor)),L===void 0||L.attribute!==ct||ct&&L.data!==ct.data)return!0;W++}return s.attributesNum!==W||s.index!==B}function _(x,D,O,B){const X={},q=D.attributes;let W=0;const Y=O.getAttributes();for(const H in Y)if(Y[H].location>=0){let L=q[H];L===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(L=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(L=x.instanceColor));const ct={};ct.attribute=L,L&&L.data&&(ct.data=L.data),X[H]=ct,W++}s.attributes=X,s.attributesNum=W,s.index=B}function g(){const x=s.newAttributes;for(let D=0,O=x.length;D<O;D++)x[D]=0}function m(x){p(x,0)}function p(x,D){const O=s.newAttributes,B=s.enabledAttributes,X=s.attributeDivisors;O[x]=1,B[x]===0&&(r.enableVertexAttribArray(x),B[x]=1),X[x]!==D&&(r.vertexAttribDivisor(x,D),X[x]=D)}function E(){const x=s.newAttributes,D=s.enabledAttributes;for(let O=0,B=D.length;O<B;O++)D[O]!==x[O]&&(r.disableVertexAttribArray(O),D[O]=0)}function S(x,D,O,B,X,q,W){W===!0?r.vertexAttribIPointer(x,D,O,X,q):r.vertexAttribPointer(x,D,O,B,X,q)}function v(x,D,O,B){g();const X=B.attributes,q=O.getAttributes(),W=D.defaultAttributeValues;for(const Y in q){const H=q[Y];if(H.location>=0){let rt=X[Y];if(rt===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(rt=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(rt=x.instanceColor)),rt!==void 0){const L=rt.normalized,ct=rt.itemSize,Ut=t.get(rt);if(Ut===void 0)continue;const Kt=Ut.buffer,Z=Ut.type,it=Ut.bytesPerElement,xt=Z===r.INT||Z===r.UNSIGNED_INT||rt.gpuType===Yu;if(rt.isInterleavedBufferAttribute){const st=rt.data,Ct=st.stride,Dt=rt.offset;if(st.isInstancedInterleavedBuffer){for(let Ot=0;Ot<H.locationSize;Ot++)p(H.location+Ot,st.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ot=0;Ot<H.locationSize;Ot++)m(H.location+Ot);r.bindBuffer(r.ARRAY_BUFFER,Kt);for(let Ot=0;Ot<H.locationSize;Ot++)S(H.location+Ot,ct/H.locationSize,Z,L,Ct*it,(Dt+ct/H.locationSize*Ot)*it,xt)}else{if(rt.isInstancedBufferAttribute){for(let st=0;st<H.locationSize;st++)p(H.location+st,rt.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let st=0;st<H.locationSize;st++)m(H.location+st);r.bindBuffer(r.ARRAY_BUFFER,Kt);for(let st=0;st<H.locationSize;st++)S(H.location+st,ct/H.locationSize,Z,L,ct*it,ct/H.locationSize*st*it,xt)}}else if(W!==void 0){const L=W[Y];if(L!==void 0)switch(L.length){case 2:r.vertexAttrib2fv(H.location,L);break;case 3:r.vertexAttrib3fv(H.location,L);break;case 4:r.vertexAttrib4fv(H.location,L);break;default:r.vertexAttrib1fv(H.location,L)}}}}E()}function C(){P();for(const x in n){const D=n[x];for(const O in D){const B=D[O];for(const X in B)u(B[X].object),delete B[X];delete D[O]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const D=n[x.id];for(const O in D){const B=D[O];for(const X in B)u(B[X].object),delete B[X];delete D[O]}delete n[x.id]}function b(x){for(const D in n){const O=n[D];if(O[x.id]===void 0)continue;const B=O[x.id];for(const X in B)u(B[X].object),delete B[X];delete O[x.id]}}function P(){M(),o=!0,s!==i&&(s=i,c(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:b,initAttributes:g,enableAttribute:m,disableUnusedAttributes:E}}function Ax(r,t,e){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,h){h!==0&&(r.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];e.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*f[g];e.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Cx(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(b){return!(b!==ai&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const P=b===Qo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Vi&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Fi&&!P)}function l(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),E=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:C,maxSamples:A}}function Rx(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Ar,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const E=s?0:n,S=E*4;let v=p.clippingState||null;l.value=v,v=u(_,f,S,d);for(let C=0;C!==S;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=d+g*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=d;S!==g;++S,v+=4)o.copy(h[S]).applyMatrix4(E,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function Px(r){let t=new WeakMap;function e(o,a){return a===Oc?o.mapping=Hs:a===Fc&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oc||a===Fc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Hg(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class sp extends np{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ws=4,df=[.125,.215,.35,.446,.526,.582],Ir=20,tc=new sp,pf=new he;let ec=null,nc=0,ic=0,rc=!1;const Cr=(1+Math.sqrt(5))/2,vs=1/Cr,mf=[new z(-Cr,vs,0),new z(Cr,vs,0),new z(-vs,0,Cr),new z(vs,0,Cr),new z(0,Cr,-vs),new z(0,Cr,vs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class _f{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){ec=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ec,nc,ic),this._renderer.xr.enabled=rc,t.scissorTest=!1,Ca(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ec=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),rc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:Qo,format:ai,colorSpace:js,depthBuffer:!1},i=gf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gf(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dx(s)),this._blurMaterial=Lx(s,t,e)}return i}_compileMaterial(t){const e=new $n(this._lodPlanes[0],t);this._renderer.compile(e,tc)}_sceneToCubeUV(t,e,n,i){const a=new Xn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(pf),u.toneMapping=cr,u.autoClear=!1;const d=new th({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),_=new $n(new ia,d);let g=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,g=!0):(d.color.copy(pf),g=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):E===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const S=this._cubeSize;Ca(i,E*S,p>2?S:0,S,S),u.setRenderTarget(i),g&&u.render(_,a),u.render(t,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Hs||t.mapping===Vs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=xf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vf());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new $n(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Ca(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,tc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=mf[(i-s-1)%mf.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new $n(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ir-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Ir;m>Ir&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ir}`);const p=[];let E=0;for(let b=0;b<Ir;++b){const P=b/g,M=Math.exp(-P*P/2);p.push(M),b===0?E+=M:b<m&&(E+=2*M)}for(let b=0;b<p.length;b++)p[b]=p[b]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-n;const v=this._sizeLods[i],C=3*v*(i>S-ws?i-S+ws:0),A=4*(this._cubeSize-v);Ca(e,C,A,3*v,2*v),l.setRenderTarget(e),l.render(h,tc)}}function Dx(r){const t=[],e=[],n=[];let i=r;const s=r-ws+1+df.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-ws?l=df[o-r+ws-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,g=3,m=2,p=1,E=new Float32Array(g*_*d),S=new Float32Array(m*_*d),v=new Float32Array(p*_*d);for(let A=0;A<d;A++){const b=A%3*2/3-1,P=A>2?0:-1,M=[b,P,0,b+2/3,P,0,b+2/3,P+1,0,b,P,0,b+2/3,P+1,0,b,P+1,0];E.set(M,g*_*A),S.set(f,m*_*A);const x=[A,A,A,A,A,A];v.set(x,p*_*A)}const C=new Xi;C.setAttribute("position",new xi(E,g)),C.setAttribute("uv",new xi(S,m)),C.setAttribute("faceIndex",new xi(v,p)),t.push(C),i>ws&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function gf(r,t,e){const n=new $r(r,t,e);return n.texture.mapping=El,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ca(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Lx(r,t,e){const n=new Float32Array(Ir),i=new z(0,1,0);return new pr({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function vf(){return new pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function xf(){return new pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function nh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ix(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Oc||l===Fc,u=l===Hs||l===Vs;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new _f(r)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&i(d)?(e===null&&(e=new _f(r)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ux(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&uo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Nx(r,t,e,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let m=0,p=g.length;m<p;m++)t.remove(g[m])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)t.update(f[_],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const _ in d){const g=d[_];for(let m=0,p=g.length;m<p;m++)t.update(g[m],r.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,_=h.attributes.position;let g=0;if(d!==null){const E=d.array;g=d.version;for(let S=0,v=E.length;S<v;S+=3){const C=E[S+0],A=E[S+1],b=E[S+2];f.push(C,A,A,b,b,C)}}else if(_!==void 0){const E=_.array;g=_.version;for(let S=0,v=E.length/3-1;S<v;S+=3){const C=S+0,A=S+1,b=S+2;f.push(C,A,A,b,b,C)}}else return;const m=new($d(f)?tp:Qd)(f,1);m.version=g;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Ox(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){r.drawElements(n,d,s,f*o),e.update(d,n,1)}function c(f,d,_){_!==0&&(r.drawElementsInstanced(n,d,s,f*o,_),e.update(d,n,_))}function u(f,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];e.update(m,n,1)}function h(f,d,_,g){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,g,0,_);let p=0;for(let E=0;E<_;E++)p+=d[E]*g[E];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Fx(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Bx(r,t,e){const n=new WeakMap,i=new Le;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let x=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let C=a.attributes.position.count*v,A=1;C>t.maxTextureSize&&(A=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const b=new Float32Array(C*A*4*h),P=new Kd(b,C,A,h);P.type=Fi,P.needsUpdate=!0;const M=v*4;for(let D=0;D<h;D++){const O=p[D],B=E[D],X=S[D],q=C*A*4*D;for(let W=0;W<O.count;W++){const Y=W*M;_===!0&&(i.fromBufferAttribute(O,W),b[q+Y+0]=i.x,b[q+Y+1]=i.y,b[q+Y+2]=i.z,b[q+Y+3]=0),g===!0&&(i.fromBufferAttribute(B,W),b[q+Y+4]=i.x,b[q+Y+5]=i.y,b[q+Y+6]=i.z,b[q+Y+7]=0),m===!0&&(i.fromBufferAttribute(X,W),b[q+Y+8]=i.x,b[q+Y+9]=i.y,b[q+Y+10]=i.z,b[q+Y+11]=X.itemSize===4?i.w:1)}}f={count:h,texture:P,size:new bt(C,A)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function zx(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class op extends on{constructor(t,e,n,i,s,o,a,l,c,u=Ls){if(u!==Ls&&u!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ls&&(n=qr),n===void 0&&u===Ws&&(n=Gs),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:li,this.minFilter=l!==void 0?l:li,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ap=new on,Sf=new op(1,1),lp=new Kd,cp=new Tg,up=new ip,Mf=[],yf=[],Ef=new Float32Array(16),Tf=new Float32Array(9),bf=new Float32Array(4);function to(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Mf[i];if(s===void 0&&(s=new Float32Array(i),Mf[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function We(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Xe(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function bl(r,t){let e=yf[t];e===void 0&&(e=new Int32Array(t),yf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function kx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Hx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2fv(this.addr,t),Xe(e,t)}}function Vx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;r.uniform3fv(this.addr,t),Xe(e,t)}}function Gx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4fv(this.addr,t),Xe(e,t)}}function Wx(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;bf.set(n),r.uniformMatrix2fv(this.addr,!1,bf),Xe(e,n)}}function Xx(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Tf.set(n),r.uniformMatrix3fv(this.addr,!1,Tf),Xe(e,n)}}function Yx(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Ef.set(n),r.uniformMatrix4fv(this.addr,!1,Ef),Xe(e,n)}}function qx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function $x(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2iv(this.addr,t),Xe(e,t)}}function Zx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;r.uniform3iv(this.addr,t),Xe(e,t)}}function Kx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4iv(this.addr,t),Xe(e,t)}}function Jx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function jx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;r.uniform2uiv(this.addr,t),Xe(e,t)}}function Qx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;r.uniform3uiv(this.addr,t),Xe(e,t)}}function tS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;r.uniform4uiv(this.addr,t),Xe(e,t)}}function eS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Sf.compareFunction=qd,s=Sf):s=ap,e.setTexture2D(t||s,i)}function nS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||cp,i)}function iS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||up,i)}function rS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||lp,i)}function sS(r){switch(r){case 5126:return kx;case 35664:return Hx;case 35665:return Vx;case 35666:return Gx;case 35674:return Wx;case 35675:return Xx;case 35676:return Yx;case 5124:case 35670:return qx;case 35667:case 35671:return $x;case 35668:case 35672:return Zx;case 35669:case 35673:return Kx;case 5125:return Jx;case 36294:return jx;case 36295:return Qx;case 36296:return tS;case 35678:case 36198:case 36298:case 36306:case 35682:return eS;case 35679:case 36299:case 36307:return nS;case 35680:case 36300:case 36308:case 36293:return iS;case 36289:case 36303:case 36311:case 36292:return rS}}function oS(r,t){r.uniform1fv(this.addr,t)}function aS(r,t){const e=to(t,this.size,2);r.uniform2fv(this.addr,e)}function lS(r,t){const e=to(t,this.size,3);r.uniform3fv(this.addr,e)}function cS(r,t){const e=to(t,this.size,4);r.uniform4fv(this.addr,e)}function uS(r,t){const e=to(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function hS(r,t){const e=to(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function fS(r,t){const e=to(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function dS(r,t){r.uniform1iv(this.addr,t)}function pS(r,t){r.uniform2iv(this.addr,t)}function mS(r,t){r.uniform3iv(this.addr,t)}function _S(r,t){r.uniform4iv(this.addr,t)}function gS(r,t){r.uniform1uiv(this.addr,t)}function vS(r,t){r.uniform2uiv(this.addr,t)}function xS(r,t){r.uniform3uiv(this.addr,t)}function SS(r,t){r.uniform4uiv(this.addr,t)}function MS(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ap,s[o])}function yS(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||cp,s[o])}function ES(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||up,s[o])}function TS(r,t,e){const n=this.cache,i=t.length,s=bl(e,i);We(n,s)||(r.uniform1iv(this.addr,s),Xe(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||lp,s[o])}function bS(r){switch(r){case 5126:return oS;case 35664:return aS;case 35665:return lS;case 35666:return cS;case 35674:return uS;case 35675:return hS;case 35676:return fS;case 5124:case 35670:return dS;case 35667:case 35671:return pS;case 35668:case 35672:return mS;case 35669:case 35673:return _S;case 5125:return gS;case 36294:return vS;case 36295:return xS;case 36296:return SS;case 35678:case 36198:case 36298:case 36306:case 35682:return MS;case 35679:case 36299:case 36307:return yS;case 35680:case 36300:case 36308:case 36293:return ES;case 36289:case 36303:case 36311:case 36292:return TS}}class wS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=sS(e.type)}}class AS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=bS(e.type)}}class CS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const sc=/(\w+)(\])?(\[|\.)?/g;function wf(r,t){r.seq.push(t),r.map[t.id]=t}function RS(r,t,e){const n=r.name,i=n.length;for(sc.lastIndex=0;;){const s=sc.exec(n),o=sc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){wf(e,c===void 0?new wS(a,r,t):new AS(a,r,t));break}else{let h=e.map[a];h===void 0&&(h=new CS(a),wf(e,h)),e=h}}}class Qa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);RS(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Af(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const PS=37297;let DS=0;function LS(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Cf=new Qt;function IS(r){le._getMatrix(Cf,le.workingColorSpace,r);const t=`mat3( ${Cf.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(r)){case Tl:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Rf(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+LS(r.getShaderSource(t),o)}else return i}function US(r,t){const e=IS(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function NS(r,t){let e;switch(t){case O_:e="Linear";break;case F_:e="Reinhard";break;case B_:e="Cineon";break;case z_:e="ACESFilmic";break;case H_:e="AgX";break;case V_:e="Neutral";break;case k_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ra=new z;function OS(){le.getLuminanceCoefficients(Ra);const r=Ra.x.toFixed(4),t=Ra.y.toFixed(4),e=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function FS(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function BS(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function zS(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ho(r){return r!==""}function Pf(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Df(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kS=/^[ \t]*#include +<([\w\d./]+)>/gm;function hu(r){return r.replace(kS,VS)}const HS=new Map;function VS(r,t){let e=te[t];if(e===void 0){const n=HS.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return hu(e)}const GS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lf(r){return r.replace(GS,WS)}function WS(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function If(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function XS(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Id?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===m_?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Li&&(t="SHADOWMAP_TYPE_VSM"),t}function YS(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case El:t="ENVMAP_TYPE_CUBE_UV";break}return t}function qS(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function $S(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ud:t="ENVMAP_BLENDING_MULTIPLY";break;case U_:t="ENVMAP_BLENDING_MIX";break;case N_:t="ENVMAP_BLENDING_ADD";break}return t}function ZS(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function KS(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=XS(e),c=YS(e),u=qS(e),h=$S(e),f=ZS(e),d=FS(e),_=BS(s),g=i.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ho).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ho).join(`
`),p.length>0&&(p+=`
`)):(m=[If(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),p=[If(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cr?"#define TONE_MAPPING":"",e.toneMapping!==cr?te.tonemapping_pars_fragment:"",e.toneMapping!==cr?NS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,US("linearToOutputTexel",e.outputColorSpace),OS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ho).join(`
`)),o=hu(o),o=Pf(o,e),o=Df(o,e),a=hu(a),a=Pf(a,e),a=Df(a,e),o=Lf(o),a=Lf(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=E+m+o,v=E+p+a,C=Af(i,i.VERTEX_SHADER,S),A=Af(i,i.FRAGMENT_SHADER,v);i.attachShader(g,C),i.attachShader(g,A),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function b(D){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(g).trim(),B=i.getShaderInfoLog(C).trim(),X=i.getShaderInfoLog(A).trim();let q=!0,W=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,C,A);else{const Y=Rf(i,C,"vertex"),H=Rf(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+Y+`
`+H)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||X==="")&&(W=!1);W&&(D.diagnostics={runnable:q,programLog:O,vertexShader:{log:B,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(C),i.deleteShader(A),P=new Qa(i,g),M=zS(i,g)}let P;this.getUniforms=function(){return P===void 0&&b(this),P};let M;this.getAttributes=function(){return M===void 0&&b(this),M};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(g,PS)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=DS++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=A,this}let JS=0;class jS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new QS(t),e.set(t,n)),n}}class QS{constructor(t){this.id=JS++,this.code=t,this.usedTimes=0}}function tM(r,t,e,n,i,s,o){const a=new Jd,l=new jS,c=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,x,D,O,B){const X=O.fog,q=B.geometry,W=M.isMeshStandardMaterial?O.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||W),H=Y&&Y.mapping===El?Y.image.height:null,rt=_[M.type];M.precision!==null&&(d=i.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const L=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ct=L!==void 0?L.length:0;let Ut=0;q.morphAttributes.position!==void 0&&(Ut=1),q.morphAttributes.normal!==void 0&&(Ut=2),q.morphAttributes.color!==void 0&&(Ut=3);let Kt,Z,it,xt;if(rt){const Tt=di[rt];Kt=Tt.vertexShader,Z=Tt.fragmentShader}else Kt=M.vertexShader,Z=M.fragmentShader,l.update(M),it=l.getVertexShaderID(M),xt=l.getFragmentShaderID(M);const st=r.getRenderTarget(),Ct=r.state.buffers.depth.getReversed(),Dt=B.isInstancedMesh===!0,Ot=B.isBatchedMesh===!0,Ht=!!M.map,et=!!M.matcap,Q=!!Y,R=!!M.aoMap,Et=!!M.lightMap,nt=!!M.bumpMap,N=!!M.normalMap,at=!!M.displacementMap,Nt=!!M.emissiveMap,Mt=!!M.metalnessMap,w=!!M.roughnessMap,y=M.anisotropy>0,k=M.clearcoat>0,J=M.dispersion>0,j=M.iridescence>0,K=M.sheen>0,dt=M.transmission>0,ht=y&&!!M.anisotropyMap,_t=k&&!!M.clearcoatMap,Yt=k&&!!M.clearcoatNormalMap,ot=k&&!!M.clearcoatRoughnessMap,ft=j&&!!M.iridescenceMap,zt=j&&!!M.iridescenceThicknessMap,Bt=K&&!!M.sheenColorMap,wt=K&&!!M.sheenRoughnessMap,Jt=!!M.specularMap,Vt=!!M.specularColorMap,ae=!!M.specularIntensityMap,I=dt&&!!M.transmissionMap,mt=dt&&!!M.thicknessMap,$=!!M.gradientMap,tt=!!M.alphaMap,pt=M.alphaTest>0,gt=!!M.alphaHash,Gt=!!M.extensions;let ce=cr;M.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ce=r.toneMapping);const De={shaderID:rt,shaderType:M.type,shaderName:M.name,vertexShader:Kt,fragmentShader:Z,defines:M.defines,customVertexShaderID:it,customFragmentShaderID:xt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Ot,batchingColor:Ot&&B._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&B.instanceColor!==null,instancingMorph:Dt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:st===null?r.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:js,alphaToCoverage:!!M.alphaToCoverage,map:Ht,matcap:et,envMap:Q,envMapMode:Q&&Y.mapping,envMapCubeUVHeight:H,aoMap:R,lightMap:Et,bumpMap:nt,normalMap:N,displacementMap:f&&at,emissiveMap:Nt,normalMapObjectSpace:N&&M.normalMapType===Y_,normalMapTangentSpace:N&&M.normalMapType===Yd,metalnessMap:Mt,roughnessMap:w,anisotropy:y,anisotropyMap:ht,clearcoat:k,clearcoatMap:_t,clearcoatNormalMap:Yt,clearcoatRoughnessMap:ot,dispersion:J,iridescence:j,iridescenceMap:ft,iridescenceThicknessMap:zt,sheen:K,sheenColorMap:Bt,sheenRoughnessMap:wt,specularMap:Jt,specularColorMap:Vt,specularIntensityMap:ae,transmission:dt,transmissionMap:I,thicknessMap:mt,gradientMap:$,opaque:M.transparent===!1&&M.blending===Ds&&M.alphaToCoverage===!1,alphaMap:tt,alphaTest:pt,alphaHash:gt,combine:M.combine,mapUv:Ht&&g(M.map.channel),aoMapUv:R&&g(M.aoMap.channel),lightMapUv:Et&&g(M.lightMap.channel),bumpMapUv:nt&&g(M.bumpMap.channel),normalMapUv:N&&g(M.normalMap.channel),displacementMapUv:at&&g(M.displacementMap.channel),emissiveMapUv:Nt&&g(M.emissiveMap.channel),metalnessMapUv:Mt&&g(M.metalnessMap.channel),roughnessMapUv:w&&g(M.roughnessMap.channel),anisotropyMapUv:ht&&g(M.anisotropyMap.channel),clearcoatMapUv:_t&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:wt&&g(M.sheenRoughnessMap.channel),specularMapUv:Jt&&g(M.specularMap.channel),specularColorMapUv:Vt&&g(M.specularColorMap.channel),specularIntensityMapUv:ae&&g(M.specularIntensityMap.channel),transmissionMapUv:I&&g(M.transmissionMap.channel),thicknessMapUv:mt&&g(M.thicknessMap.channel),alphaMapUv:tt&&g(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(N||y),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!q.attributes.uv&&(Ht||tt),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ct,skinning:B.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:Ut,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:ce,decodeVideoTexture:Ht&&M.map.isVideoTexture===!0&&le.getTransfer(M.map.colorSpace)===_e,decodeVideoTextureEmissive:Nt&&M.emissiveMap.isVideoTexture===!0&&le.getTransfer(M.emissiveMap.colorSpace)===_e,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ni,flipSided:M.side===En,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Gt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&M.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function p(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const D in M.defines)x.push(D),x.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(E(x,M),S(x,M),x.push(r.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function E(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function S(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const x=_[M.type];let D;if(x){const O=di[x];D=Fg.clone(O.uniforms)}else D=M.uniforms;return D}function C(M,x){let D;for(let O=0,B=u.length;O<B;O++){const X=u[O];if(X.cacheKey===x){D=X,++D.usedTimes;break}}return D===void 0&&(D=new KS(r,x,M,s),u.push(D)),D}function A(M){if(--M.usedTimes===0){const x=u.indexOf(M);u[x]=u[u.length-1],u.pop(),M.destroy()}}function b(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:A,releaseShaderCache:b,programs:u,dispose:P}}function eM(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function nM(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Uf(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Nf(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,d,_,g,m){let p=r[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},r[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=g,p.group=m),t++,p}function a(h,f,d,_,g,m){const p=o(h,f,d,_,g,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(h,f,d,_,g,m){const p=o(h,f,d,_,g,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(h,f){e.length>1&&e.sort(h||nM),n.length>1&&n.sort(f||Uf),i.length>1&&i.sort(f||Uf)}function u(){for(let h=t,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function iM(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new Nf,r.set(n,[o])):i>=s.length?(o=new Nf,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function rM(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new he};break;case"SpotLight":e={position:new z,direction:new z,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new he,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new he,groundColor:new he};break;case"RectAreaLight":e={color:new he,position:new z,halfWidth:new z,halfHeight:new z};break}return r[t.id]=e,e}}}function sM(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let oM=0;function aM(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function lM(r){const t=new rM,e=sM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const i=new z,s=new Pe,o=new Pe;function a(c){let u=0,h=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,E=0,S=0,v=0,C=0,A=0,b=0;c.sort(aM);for(let M=0,x=c.length;M<x;M++){const D=c[M],O=D.color,B=D.intensity,X=D.distance,q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=O.r*B,h+=O.g*B,f+=O.b*B;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],B);b++}else if(D.isDirectionalLight){const W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Y=D.shadow,H=e.get(D);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=D.shadow.matrix,E++}n.directional[d]=W,d++}else if(D.isSpotLight){const W=t.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(O).multiplyScalar(B),W.distance=X,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[g]=W;const Y=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,Y.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[g]=Y.matrix,D.castShadow){const H=e.get(D);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,n.spotShadow[g]=H,n.spotShadowMap[g]=q,v++}g++}else if(D.isRectAreaLight){const W=t.get(D);W.color.copy(O).multiplyScalar(B),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=W,m++}else if(D.isPointLight){const W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){const Y=D.shadow,H=e.get(D);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,H.shadowCameraNear=Y.camera.near,H.shadowCameraFar=Y.camera.far,n.pointShadow[_]=H,n.pointShadowMap[_]=q,n.pointShadowMatrix[_]=D.shadow.matrix,S++}n.point[_]=W,_++}else if(D.isHemisphereLight){const W=t.get(D);W.skyColor.copy(D.color).multiplyScalar(B),W.groundColor.copy(D.groundColor).multiplyScalar(B),n.hemi[p]=W,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==d||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==E||P.numPointShadows!==S||P.numSpotShadows!==v||P.numSpotMaps!==C||P.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=b,P.directionalLength=d,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=E,P.numPointShadows=S,P.numSpotShadows=v,P.numSpotMaps=C,P.numLightProbes=b,n.version=oM++)}function l(c,u){let h=0,f=0,d=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const S=c[p];if(S.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(S.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Of(r){const t=new lM(r),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function cM(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new Of(r),t.set(i,[a])):s>=o.length?(a=new Of(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class uM extends na{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=W_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class hM extends na{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pM(r,t,e){let n=new eh;const i=new bt,s=new bt,o=new Le,a=new uM({depthPacking:X_}),l=new hM,c={},u=e.maxTextureSize,h={[dr]:En,[En]:dr,[Ni]:Ni},f=new pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:fM,fragmentShader:dM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Xi;_.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new $n(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Id;let p=this.type;this.render=function(A,b,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=r.getRenderTarget(),x=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),O=r.state;O.setBlending(lr),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const B=p!==Li&&this.type===Li,X=p===Li&&this.type!==Li;for(let q=0,W=A.length;q<W;q++){const Y=A[q],H=Y.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const rt=H.getFrameExtents();if(i.multiply(rt),s.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/rt.x),i.x=s.x*rt.x,H.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/rt.y),i.y=s.y*rt.y,H.mapSize.y=s.y)),H.map===null||B===!0||X===!0){const ct=this.type!==Li?{minFilter:li,magFilter:li}:{};H.map!==null&&H.map.dispose(),H.map=new $r(i.x,i.y,ct),H.map.texture.name=Y.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const L=H.getViewportCount();for(let ct=0;ct<L;ct++){const Ut=H.getViewport(ct);o.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),O.viewport(o),H.updateMatrices(Y,ct),n=H.getFrustum(),v(b,P,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===Li&&E(H,P),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(M,x,D)};function E(A,b){const P=t.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new $r(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(b,null,P,f,g,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(b,null,P,d,g,null)}function S(A,b,P,M){let x=null;const D=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)x=D;else if(x=P.isPointLight===!0?l:a,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const O=x.uuid,B=b.uuid;let X=c[O];X===void 0&&(X={},c[O]=X);let q=X[B];q===void 0&&(q=x.clone(),X[B]=q,b.addEventListener("dispose",C)),x=q}if(x.visible=b.visible,x.wireframe=b.wireframe,M===Li?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:h[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=r.properties.get(x);O.light=P}return x}function v(A,b,P,M,x){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===Li)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const B=t.update(A),X=A.material;if(Array.isArray(X)){const q=B.groups;for(let W=0,Y=q.length;W<Y;W++){const H=q[W],rt=X[H.materialIndex];if(rt&&rt.visible){const L=S(A,rt,M,x);A.onBeforeShadow(r,A,b,P,B,L,H),r.renderBufferDirect(P,null,B,L,A,H),A.onAfterShadow(r,A,b,P,B,L,H)}}}else if(X.visible){const q=S(A,X,M,x);A.onBeforeShadow(r,A,b,P,B,q,null),r.renderBufferDirect(P,null,B,q,A,null),A.onAfterShadow(r,A,b,P,B,q,null)}}const O=A.children;for(let B=0,X=O.length;B<X;B++)v(O[B],b,P,M,x)}function C(A){A.target.removeEventListener("dispose",C);for(const P in c){const M=c[P],x=A.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const mM={[Rc]:Pc,[Dc]:Uc,[Lc]:Nc,[ks]:Ic,[Pc]:Rc,[Uc]:Dc,[Nc]:Lc,[Ic]:ks};function _M(r,t){function e(){let I=!1;const mt=new Le;let $=null;const tt=new Le(0,0,0,0);return{setMask:function(pt){$!==pt&&!I&&(r.colorMask(pt,pt,pt,pt),$=pt)},setLocked:function(pt){I=pt},setClear:function(pt,gt,Gt,ce,De){De===!0&&(pt*=ce,gt*=ce,Gt*=ce),mt.set(pt,gt,Gt,ce),tt.equals(mt)===!1&&(r.clearColor(pt,gt,Gt,ce),tt.copy(mt))},reset:function(){I=!1,$=null,tt.set(-1,0,0,0)}}}function n(){let I=!1,mt=!1,$=null,tt=null,pt=null;return{setReversed:function(gt){if(mt!==gt){const Gt=t.get("EXT_clip_control");mt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const ce=pt;pt=null,this.setClear(ce)}mt=gt},getReversed:function(){return mt},setTest:function(gt){gt?st(r.DEPTH_TEST):Ct(r.DEPTH_TEST)},setMask:function(gt){$!==gt&&!I&&(r.depthMask(gt),$=gt)},setFunc:function(gt){if(mt&&(gt=mM[gt]),tt!==gt){switch(gt){case Rc:r.depthFunc(r.NEVER);break;case Pc:r.depthFunc(r.ALWAYS);break;case Dc:r.depthFunc(r.LESS);break;case ks:r.depthFunc(r.LEQUAL);break;case Lc:r.depthFunc(r.EQUAL);break;case Ic:r.depthFunc(r.GEQUAL);break;case Uc:r.depthFunc(r.GREATER);break;case Nc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}tt=gt}},setLocked:function(gt){I=gt},setClear:function(gt){pt!==gt&&(mt&&(gt=1-gt),r.clearDepth(gt),pt=gt)},reset:function(){I=!1,$=null,tt=null,pt=null,mt=!1}}}function i(){let I=!1,mt=null,$=null,tt=null,pt=null,gt=null,Gt=null,ce=null,De=null;return{setTest:function(Tt){I||(Tt?st(r.STENCIL_TEST):Ct(r.STENCIL_TEST))},setMask:function(Tt){mt!==Tt&&!I&&(r.stencilMask(Tt),mt=Tt)},setFunc:function(Tt,Lt,jt){($!==Tt||tt!==Lt||pt!==jt)&&(r.stencilFunc(Tt,Lt,jt),$=Tt,tt=Lt,pt=jt)},setOp:function(Tt,Lt,jt){(gt!==Tt||Gt!==Lt||ce!==jt)&&(r.stencilOp(Tt,Lt,jt),gt=Tt,Gt=Lt,ce=jt)},setLocked:function(Tt){I=Tt},setClear:function(Tt){De!==Tt&&(r.clearStencil(Tt),De=Tt)},reset:function(){I=!1,mt=null,$=null,tt=null,pt=null,gt=null,Gt=null,ce=null,De=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,E=null,S=null,v=null,C=null,A=null,b=new he(0,0,0),P=0,M=!1,x=null,D=null,O=null,B=null,X=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Y=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=Y>=1):H.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=Y>=2);let rt=null,L={};const ct=r.getParameter(r.SCISSOR_BOX),Ut=r.getParameter(r.VIEWPORT),Kt=new Le().fromArray(ct),Z=new Le().fromArray(Ut);function it(I,mt,$,tt){const pt=new Uint8Array(4),gt=r.createTexture();r.bindTexture(I,gt),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Gt=0;Gt<$;Gt++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(mt,0,r.RGBA,1,1,tt,0,r.RGBA,r.UNSIGNED_BYTE,pt):r.texImage2D(mt+Gt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pt);return gt}const xt={};xt[r.TEXTURE_2D]=it(r.TEXTURE_2D,r.TEXTURE_2D,1),xt[r.TEXTURE_CUBE_MAP]=it(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[r.TEXTURE_2D_ARRAY]=it(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),xt[r.TEXTURE_3D]=it(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(r.DEPTH_TEST),o.setFunc(ks),nt(!1),N(Bh),st(r.CULL_FACE),R(lr);function st(I){u[I]!==!0&&(r.enable(I),u[I]=!0)}function Ct(I){u[I]!==!1&&(r.disable(I),u[I]=!1)}function Dt(I,mt){return h[I]!==mt?(r.bindFramebuffer(I,mt),h[I]=mt,I===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=mt),I===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=mt),!0):!1}function Ot(I,mt){let $=d,tt=!1;if(I){$=f.get(mt),$===void 0&&($=[],f.set(mt,$));const pt=I.textures;if($.length!==pt.length||$[0]!==r.COLOR_ATTACHMENT0){for(let gt=0,Gt=pt.length;gt<Gt;gt++)$[gt]=r.COLOR_ATTACHMENT0+gt;$.length=pt.length,tt=!0}}else $[0]!==r.BACK&&($[0]=r.BACK,tt=!0);tt&&r.drawBuffers($)}function Ht(I){return _!==I?(r.useProgram(I),_=I,!0):!1}const et={[Lr]:r.FUNC_ADD,[g_]:r.FUNC_SUBTRACT,[v_]:r.FUNC_REVERSE_SUBTRACT};et[x_]=r.MIN,et[S_]=r.MAX;const Q={[M_]:r.ZERO,[y_]:r.ONE,[E_]:r.SRC_COLOR,[Ac]:r.SRC_ALPHA,[R_]:r.SRC_ALPHA_SATURATE,[A_]:r.DST_COLOR,[b_]:r.DST_ALPHA,[T_]:r.ONE_MINUS_SRC_COLOR,[Cc]:r.ONE_MINUS_SRC_ALPHA,[C_]:r.ONE_MINUS_DST_COLOR,[w_]:r.ONE_MINUS_DST_ALPHA,[P_]:r.CONSTANT_COLOR,[D_]:r.ONE_MINUS_CONSTANT_COLOR,[L_]:r.CONSTANT_ALPHA,[I_]:r.ONE_MINUS_CONSTANT_ALPHA};function R(I,mt,$,tt,pt,gt,Gt,ce,De,Tt){if(I===lr){g===!0&&(Ct(r.BLEND),g=!1);return}if(g===!1&&(st(r.BLEND),g=!0),I!==__){if(I!==m||Tt!==M){if((p!==Lr||v!==Lr)&&(r.blendEquation(r.FUNC_ADD),p=Lr,v=Lr),Tt)switch(I){case Ds:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zh:r.blendFunc(r.ONE,r.ONE);break;case kh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Hh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ds:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case kh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Hh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,S=null,C=null,A=null,b.set(0,0,0),P=0,m=I,M=Tt}return}pt=pt||mt,gt=gt||$,Gt=Gt||tt,(mt!==p||pt!==v)&&(r.blendEquationSeparate(et[mt],et[pt]),p=mt,v=pt),($!==E||tt!==S||gt!==C||Gt!==A)&&(r.blendFuncSeparate(Q[$],Q[tt],Q[gt],Q[Gt]),E=$,S=tt,C=gt,A=Gt),(ce.equals(b)===!1||De!==P)&&(r.blendColor(ce.r,ce.g,ce.b,De),b.copy(ce),P=De),m=I,M=!1}function Et(I,mt){I.side===Ni?Ct(r.CULL_FACE):st(r.CULL_FACE);let $=I.side===En;mt&&($=!$),nt($),I.blending===Ds&&I.transparent===!1?R(lr):R(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const tt=I.stencilWrite;a.setTest(tt),tt&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Nt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?st(r.SAMPLE_ALPHA_TO_COVERAGE):Ct(r.SAMPLE_ALPHA_TO_COVERAGE)}function nt(I){x!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),x=I)}function N(I){I!==d_?(st(r.CULL_FACE),I!==D&&(I===Bh?r.cullFace(r.BACK):I===p_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ct(r.CULL_FACE),D=I}function at(I){I!==O&&(W&&r.lineWidth(I),O=I)}function Nt(I,mt,$){I?(st(r.POLYGON_OFFSET_FILL),(B!==mt||X!==$)&&(r.polygonOffset(mt,$),B=mt,X=$)):Ct(r.POLYGON_OFFSET_FILL)}function Mt(I){I?st(r.SCISSOR_TEST):Ct(r.SCISSOR_TEST)}function w(I){I===void 0&&(I=r.TEXTURE0+q-1),rt!==I&&(r.activeTexture(I),rt=I)}function y(I,mt,$){$===void 0&&(rt===null?$=r.TEXTURE0+q-1:$=rt);let tt=L[$];tt===void 0&&(tt={type:void 0,texture:void 0},L[$]=tt),(tt.type!==I||tt.texture!==mt)&&(rt!==$&&(r.activeTexture($),rt=$),r.bindTexture(I,mt||xt[I]),tt.type=I,tt.texture=mt)}function k(){const I=L[rt];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{r.compressedTexImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function dt(){try{r.texSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Yt(){try{r.texStorage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{r.texStorage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ft(){try{r.texImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function zt(){try{r.texImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Bt(I){Kt.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),Kt.copy(I))}function wt(I){Z.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Z.copy(I))}function Jt(I,mt){let $=c.get(mt);$===void 0&&($=new WeakMap,c.set(mt,$));let tt=$.get(I);tt===void 0&&(tt=r.getUniformBlockIndex(mt,I.name),$.set(I,tt))}function Vt(I,mt){const tt=c.get(mt).get(I);l.get(mt)!==tt&&(r.uniformBlockBinding(mt,tt,I.__bindingPointIndex),l.set(mt,tt))}function ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},rt=null,L={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,E=null,S=null,v=null,C=null,A=null,b=new he(0,0,0),P=0,M=!1,x=null,D=null,O=null,B=null,X=null,Kt.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:st,disable:Ct,bindFramebuffer:Dt,drawBuffers:Ot,useProgram:Ht,setBlending:R,setMaterial:Et,setFlipSided:nt,setCullFace:N,setLineWidth:at,setPolygonOffset:Nt,setScissorTest:Mt,activeTexture:w,bindTexture:y,unbindTexture:k,compressedTexImage2D:J,compressedTexImage3D:j,texImage2D:ft,texImage3D:zt,updateUBOMapping:Jt,uniformBlockBinding:Vt,texStorage2D:Yt,texStorage3D:ot,texSubImage2D:K,texSubImage3D:dt,compressedTexSubImage2D:ht,compressedTexSubImage3D:_t,scissor:Bt,viewport:wt,reset:ae}}function Ff(r,t,e,n){const i=gM(n);switch(e){case zd:return r*t;case Hd:return r*t;case Vd:return r*t*2;case Gd:return r*t/i.components*i.byteLength;case Zu:return r*t/i.components*i.byteLength;case Wd:return r*t*2/i.components*i.byteLength;case Ku:return r*t*2/i.components*i.byteLength;case kd:return r*t*3/i.components*i.byteLength;case ai:return r*t*4/i.components*i.byteLength;case Ju:return r*t*4/i.components*i.byteLength;case $a:case Za:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ka:case Ja:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case kc:case Vc:return Math.max(r,16)*Math.max(t,8)/4;case zc:case Hc:return Math.max(r,8)*Math.max(t,8)/2;case Gc:case Wc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Xc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Yc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case qc:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case $c:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Zc:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Kc:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Jc:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case jc:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Qc:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case tu:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case eu:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case nu:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case iu:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ru:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case su:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ja:case ou:case au:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Xd:case lu:return Math.ceil(r/4)*Math.ceil(t/4)*8;case cu:case uu:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function gM(r){switch(r){case Vi:case Od:return{byteLength:1,components:1};case Bo:case Fd:case Qo:return{byteLength:2,components:1};case qu:case $u:return{byteLength:2,components:4};case qr:case Yu:case Fi:return{byteLength:4,components:1};case Bd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function vM(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,y){return d?new OffscreenCanvas(w,y):ko("canvas")}function g(w,y,k){let J=1;const j=Mt(w);if((j.width>k||j.height>k)&&(J=k/Math.max(j.width,j.height)),J<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const K=Math.floor(J*j.width),dt=Math.floor(J*j.height);h===void 0&&(h=_(K,dt));const ht=y?_(K,dt):h;return ht.width=K,ht.height=dt,ht.getContext("2d").drawImage(w,0,0,K,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+K+"x"+dt+")."),ht}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){r.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(w,y,k,J,j=!1){if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let K=y;if(y===r.RED&&(k===r.FLOAT&&(K=r.R32F),k===r.HALF_FLOAT&&(K=r.R16F),k===r.UNSIGNED_BYTE&&(K=r.R8)),y===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.R8UI),k===r.UNSIGNED_SHORT&&(K=r.R16UI),k===r.UNSIGNED_INT&&(K=r.R32UI),k===r.BYTE&&(K=r.R8I),k===r.SHORT&&(K=r.R16I),k===r.INT&&(K=r.R32I)),y===r.RG&&(k===r.FLOAT&&(K=r.RG32F),k===r.HALF_FLOAT&&(K=r.RG16F),k===r.UNSIGNED_BYTE&&(K=r.RG8)),y===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RG8UI),k===r.UNSIGNED_SHORT&&(K=r.RG16UI),k===r.UNSIGNED_INT&&(K=r.RG32UI),k===r.BYTE&&(K=r.RG8I),k===r.SHORT&&(K=r.RG16I),k===r.INT&&(K=r.RG32I)),y===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGB8UI),k===r.UNSIGNED_SHORT&&(K=r.RGB16UI),k===r.UNSIGNED_INT&&(K=r.RGB32UI),k===r.BYTE&&(K=r.RGB8I),k===r.SHORT&&(K=r.RGB16I),k===r.INT&&(K=r.RGB32I)),y===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),k===r.UNSIGNED_INT&&(K=r.RGBA32UI),k===r.BYTE&&(K=r.RGBA8I),k===r.SHORT&&(K=r.RGBA16I),k===r.INT&&(K=r.RGBA32I)),y===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),y===r.RGBA){const dt=j?Tl:le.getTransfer(J);k===r.FLOAT&&(K=r.RGBA32F),k===r.HALF_FLOAT&&(K=r.RGBA16F),k===r.UNSIGNED_BYTE&&(K=dt===_e?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(w,y){let k;return w?y===null||y===qr||y===Gs?k=r.DEPTH24_STENCIL8:y===Fi?k=r.DEPTH32F_STENCIL8:y===Bo&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===qr||y===Gs?k=r.DEPTH_COMPONENT24:y===Fi?k=r.DEPTH_COMPONENT32F:y===Bo&&(k=r.DEPTH_COMPONENT16),k}function C(w,y){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==li&&w.minFilter!==mi?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function A(w){const y=w.target;y.removeEventListener("dispose",A),P(y),y.isVideoTexture&&u.delete(y)}function b(w){const y=w.target;y.removeEventListener("dispose",b),x(y)}function P(w){const y=n.get(w);if(y.__webglInit===void 0)return;const k=w.source,J=f.get(k);if(J){const j=J[y.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(w),Object.keys(J).length===0&&f.delete(k)}n.remove(w)}function M(w){const y=n.get(w);r.deleteTexture(y.__webglTexture);const k=w.source,J=f.get(k);delete J[y.__cacheKey],o.memory.textures--}function x(w){const y=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(y.__webglFramebuffer[J]))for(let j=0;j<y.__webglFramebuffer[J].length;j++)r.deleteFramebuffer(y.__webglFramebuffer[J][j]);else r.deleteFramebuffer(y.__webglFramebuffer[J]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[J])}else{if(Array.isArray(y.__webglFramebuffer))for(let J=0;J<y.__webglFramebuffer.length;J++)r.deleteFramebuffer(y.__webglFramebuffer[J]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let J=0;J<y.__webglColorRenderbuffer.length;J++)y.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[J]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const k=w.textures;for(let J=0,j=k.length;J<j;J++){const K=n.get(k[J]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[J])}n.remove(w)}let D=0;function O(){D=0}function B(){const w=D;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),D+=1,w}function X(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function q(w,y){const k=n.get(w);if(w.isVideoTexture&&at(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){const J=w.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(k,w,y);return}}e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+y)}function W(w,y){const k=n.get(w);if(w.version>0&&k.__version!==w.version){Z(k,w,y);return}e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+y)}function Y(w,y){const k=n.get(w);if(w.version>0&&k.__version!==w.version){Z(k,w,y);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+y)}function H(w,y){const k=n.get(w);if(w.version>0&&k.__version!==w.version){it(k,w,y);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+y)}const rt={[Fo]:r.REPEAT,[Ur]:r.CLAMP_TO_EDGE,[Bc]:r.MIRRORED_REPEAT},L={[li]:r.NEAREST,[G_]:r.NEAREST_MIPMAP_NEAREST,[la]:r.NEAREST_MIPMAP_LINEAR,[mi]:r.LINEAR,[Il]:r.LINEAR_MIPMAP_NEAREST,[Nr]:r.LINEAR_MIPMAP_LINEAR},ct={[q_]:r.NEVER,[Q_]:r.ALWAYS,[$_]:r.LESS,[qd]:r.LEQUAL,[Z_]:r.EQUAL,[j_]:r.GEQUAL,[K_]:r.GREATER,[J_]:r.NOTEQUAL};function Ut(w,y){if(y.type===Fi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===mi||y.magFilter===Il||y.magFilter===la||y.magFilter===Nr||y.minFilter===mi||y.minFilter===Il||y.minFilter===la||y.minFilter===Nr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,rt[y.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,rt[y.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,rt[y.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,L[y.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,L[y.minFilter]),y.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===li||y.minFilter!==la&&y.minFilter!==Nr||y.type===Fi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Kt(w,y){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",A));const J=y.source;let j=f.get(J);j===void 0&&(j={},f.set(J,j));const K=X(y);if(K!==w.__cacheKey){j[K]===void 0&&(j[K]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),j[K].usedTimes++;const dt=j[w.__cacheKey];dt!==void 0&&(j[w.__cacheKey].usedTimes--,dt.usedTimes===0&&M(y)),w.__cacheKey=K,w.__webglTexture=j[K].texture}return k}function Z(w,y,k){let J=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(J=r.TEXTURE_3D);const j=Kt(w,y),K=y.source;e.bindTexture(J,w.__webglTexture,r.TEXTURE0+k);const dt=n.get(K);if(K.version!==dt.__version||j===!0){e.activeTexture(r.TEXTURE0+k);const ht=le.getPrimaries(le.workingColorSpace),_t=y.colorSpace===nr?null:le.getPrimaries(y.colorSpace),Yt=y.colorSpace===nr||ht===_t?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let ot=g(y.image,!1,i.maxTextureSize);ot=Nt(y,ot);const ft=s.convert(y.format,y.colorSpace),zt=s.convert(y.type);let Bt=S(y.internalFormat,ft,zt,y.colorSpace,y.isVideoTexture);Ut(J,y);let wt;const Jt=y.mipmaps,Vt=y.isVideoTexture!==!0,ae=dt.__version===void 0||j===!0,I=K.dataReady,mt=C(y,ot);if(y.isDepthTexture)Bt=v(y.format===Ws,y.type),ae&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,Bt,ot.width,ot.height):e.texImage2D(r.TEXTURE_2D,0,Bt,ot.width,ot.height,0,ft,zt,null));else if(y.isDataTexture)if(Jt.length>0){Vt&&ae&&e.texStorage2D(r.TEXTURE_2D,mt,Bt,Jt[0].width,Jt[0].height);for(let $=0,tt=Jt.length;$<tt;$++)wt=Jt[$],Vt?I&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,wt.width,wt.height,ft,zt,wt.data):e.texImage2D(r.TEXTURE_2D,$,Bt,wt.width,wt.height,0,ft,zt,wt.data);y.generateMipmaps=!1}else Vt?(ae&&e.texStorage2D(r.TEXTURE_2D,mt,Bt,ot.width,ot.height),I&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ot.width,ot.height,ft,zt,ot.data)):e.texImage2D(r.TEXTURE_2D,0,Bt,ot.width,ot.height,0,ft,zt,ot.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Vt&&ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,Bt,Jt[0].width,Jt[0].height,ot.depth);for(let $=0,tt=Jt.length;$<tt;$++)if(wt=Jt[$],y.format!==ai)if(ft!==null)if(Vt){if(I)if(y.layerUpdates.size>0){const pt=Ff(wt.width,wt.height,y.format,y.type);for(const gt of y.layerUpdates){const Gt=wt.data.subarray(gt*pt/wt.data.BYTES_PER_ELEMENT,(gt+1)*pt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,gt,wt.width,wt.height,1,ft,Gt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,wt.width,wt.height,ot.depth,ft,wt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,$,Bt,wt.width,wt.height,ot.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?I&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,wt.width,wt.height,ot.depth,ft,zt,wt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,$,Bt,wt.width,wt.height,ot.depth,0,ft,zt,wt.data)}else{Vt&&ae&&e.texStorage2D(r.TEXTURE_2D,mt,Bt,Jt[0].width,Jt[0].height);for(let $=0,tt=Jt.length;$<tt;$++)wt=Jt[$],y.format!==ai?ft!==null?Vt?I&&e.compressedTexSubImage2D(r.TEXTURE_2D,$,0,0,wt.width,wt.height,ft,wt.data):e.compressedTexImage2D(r.TEXTURE_2D,$,Bt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?I&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,wt.width,wt.height,ft,zt,wt.data):e.texImage2D(r.TEXTURE_2D,$,Bt,wt.width,wt.height,0,ft,zt,wt.data)}else if(y.isDataArrayTexture)if(Vt){if(ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,Bt,ot.width,ot.height,ot.depth),I)if(y.layerUpdates.size>0){const $=Ff(ot.width,ot.height,y.format,y.type);for(const tt of y.layerUpdates){const pt=ot.data.subarray(tt*$/ot.data.BYTES_PER_ELEMENT,(tt+1)*$/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,tt,ot.width,ot.height,1,ft,zt,pt)}y.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,ft,zt,ot.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Bt,ot.width,ot.height,ot.depth,0,ft,zt,ot.data);else if(y.isData3DTexture)Vt?(ae&&e.texStorage3D(r.TEXTURE_3D,mt,Bt,ot.width,ot.height,ot.depth),I&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,ft,zt,ot.data)):e.texImage3D(r.TEXTURE_3D,0,Bt,ot.width,ot.height,ot.depth,0,ft,zt,ot.data);else if(y.isFramebufferTexture){if(ae)if(Vt)e.texStorage2D(r.TEXTURE_2D,mt,Bt,ot.width,ot.height);else{let $=ot.width,tt=ot.height;for(let pt=0;pt<mt;pt++)e.texImage2D(r.TEXTURE_2D,pt,Bt,$,tt,0,ft,zt,null),$>>=1,tt>>=1}}else if(Jt.length>0){if(Vt&&ae){const $=Mt(Jt[0]);e.texStorage2D(r.TEXTURE_2D,mt,Bt,$.width,$.height)}for(let $=0,tt=Jt.length;$<tt;$++)wt=Jt[$],Vt?I&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,ft,zt,wt):e.texImage2D(r.TEXTURE_2D,$,Bt,ft,zt,wt);y.generateMipmaps=!1}else if(Vt){if(ae){const $=Mt(ot);e.texStorage2D(r.TEXTURE_2D,mt,Bt,$.width,$.height)}I&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ft,zt,ot)}else e.texImage2D(r.TEXTURE_2D,0,Bt,ft,zt,ot);m(y)&&p(J),dt.__version=K.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function it(w,y,k){if(y.image.length!==6)return;const J=Kt(w,y),j=y.source;e.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+k);const K=n.get(j);if(j.version!==K.__version||J===!0){e.activeTexture(r.TEXTURE0+k);const dt=le.getPrimaries(le.workingColorSpace),ht=y.colorSpace===nr?null:le.getPrimaries(y.colorSpace),_t=y.colorSpace===nr||dt===ht?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Yt=y.isCompressedTexture||y.image[0].isCompressedTexture,ot=y.image[0]&&y.image[0].isDataTexture,ft=[];for(let tt=0;tt<6;tt++)!Yt&&!ot?ft[tt]=g(y.image[tt],!0,i.maxCubemapSize):ft[tt]=ot?y.image[tt].image:y.image[tt],ft[tt]=Nt(y,ft[tt]);const zt=ft[0],Bt=s.convert(y.format,y.colorSpace),wt=s.convert(y.type),Jt=S(y.internalFormat,Bt,wt,y.colorSpace),Vt=y.isVideoTexture!==!0,ae=K.__version===void 0||J===!0,I=j.dataReady;let mt=C(y,zt);Ut(r.TEXTURE_CUBE_MAP,y);let $;if(Yt){Vt&&ae&&e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,Jt,zt.width,zt.height);for(let tt=0;tt<6;tt++){$=ft[tt].mipmaps;for(let pt=0;pt<$.length;pt++){const gt=$[pt];y.format!==ai?Bt!==null?Vt?I&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,0,0,gt.width,gt.height,Bt,gt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,Jt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,0,0,gt.width,gt.height,Bt,wt,gt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt,Jt,gt.width,gt.height,0,Bt,wt,gt.data)}}}else{if($=y.mipmaps,Vt&&ae){$.length>0&&mt++;const tt=Mt(ft[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,Jt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ot){Vt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,ft[tt].width,ft[tt].height,Bt,wt,ft[tt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Jt,ft[tt].width,ft[tt].height,0,Bt,wt,ft[tt].data);for(let pt=0;pt<$.length;pt++){const Gt=$[pt].image[tt].image;Vt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,0,0,Gt.width,Gt.height,Bt,wt,Gt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,Jt,Gt.width,Gt.height,0,Bt,wt,Gt.data)}}else{Vt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Bt,wt,ft[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Jt,Bt,wt,ft[tt]);for(let pt=0;pt<$.length;pt++){const gt=$[pt];Vt?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,0,0,Bt,wt,gt.image[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,pt+1,Jt,Bt,wt,gt.image[tt])}}}m(y)&&p(r.TEXTURE_CUBE_MAP),K.__version=j.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function xt(w,y,k,J,j,K){const dt=s.convert(k.format,k.colorSpace),ht=s.convert(k.type),_t=S(k.internalFormat,dt,ht,k.colorSpace),Yt=n.get(y),ot=n.get(k);if(ot.__renderTarget=y,!Yt.__hasExternalTextures){const ft=Math.max(1,y.width>>K),zt=Math.max(1,y.height>>K);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,K,_t,ft,zt,y.depth,0,dt,ht,null):e.texImage2D(j,K,_t,ft,zt,0,dt,ht,null)}e.bindFramebuffer(r.FRAMEBUFFER,w),N(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,j,ot.__webglTexture,0,nt(y)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,j,ot.__webglTexture,K),e.bindFramebuffer(r.FRAMEBUFFER,null)}function st(w,y,k){if(r.bindRenderbuffer(r.RENDERBUFFER,w),y.depthBuffer){const J=y.depthTexture,j=J&&J.isDepthTexture?J.type:null,K=v(y.stencilBuffer,j),dt=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=nt(y);N(y)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ht,K,y.width,y.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ht,K,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,K,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,w)}else{const J=y.textures;for(let j=0;j<J.length;j++){const K=J[j],dt=s.convert(K.format,K.colorSpace),ht=s.convert(K.type),_t=S(K.internalFormat,dt,ht,K.colorSpace),Yt=nt(y);k&&N(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt,_t,y.width,y.height):N(y)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Yt,_t,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,_t,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ct(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(y.depthTexture);J.__renderTarget=y,(!J.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q(y.depthTexture,0);const j=J.__webglTexture,K=nt(y);if(y.depthTexture.format===Ls)N(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(y.depthTexture.format===Ws)N(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Dt(w){const y=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const J=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),J){const j=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,J.removeEventListener("dispose",j)};J.addEventListener("dispose",j),y.__depthDisposeCallback=j}y.__boundDepthTexture=J}if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ct(y.__webglFramebuffer,w)}else if(k){y.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[J]),y.__webglDepthbuffer[J]===void 0)y.__webglDepthbuffer[J]=r.createRenderbuffer(),st(y.__webglDepthbuffer[J],w,!1);else{const j=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,K)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),st(y.__webglDepthbuffer,w,!1);else{const J=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,j)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ot(w,y,k){const J=n.get(w);y!==void 0&&xt(J.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&Dt(w)}function Ht(w){const y=w.texture,k=n.get(w),J=n.get(y);w.addEventListener("dispose",b);const j=w.textures,K=w.isWebGLCubeRenderTarget===!0,dt=j.length>1;if(dt||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=y.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[ht]=[];for(let _t=0;_t<y.mipmaps.length;_t++)k.__webglFramebuffer[ht][_t]=r.createFramebuffer()}else k.__webglFramebuffer[ht]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let ht=0;ht<y.mipmaps.length;ht++)k.__webglFramebuffer[ht]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(dt)for(let ht=0,_t=j.length;ht<_t;ht++){const Yt=n.get(j[ht]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=r.createTexture(),o.memory.textures++)}if(w.samples>0&&N(w)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ht=0;ht<j.length;ht++){const _t=j[ht];k.__webglColorRenderbuffer[ht]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ht]);const Yt=s.convert(_t.format,_t.colorSpace),ot=s.convert(_t.type),ft=S(_t.internalFormat,Yt,ot,_t.colorSpace,w.isXRRenderTarget===!0),zt=nt(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,zt,ft,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.RENDERBUFFER,k.__webglColorRenderbuffer[ht])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),st(k.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){e.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,y);for(let ht=0;ht<6;ht++)if(y.mipmaps&&y.mipmaps.length>0)for(let _t=0;_t<y.mipmaps.length;_t++)xt(k.__webglFramebuffer[ht][_t],w,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ht,_t);else xt(k.__webglFramebuffer[ht],w,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(y)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let ht=0,_t=j.length;ht<_t;ht++){const Yt=j[ht],ot=n.get(Yt);e.bindTexture(r.TEXTURE_2D,ot.__webglTexture),Ut(r.TEXTURE_2D,Yt),xt(k.__webglFramebuffer,w,Yt,r.COLOR_ATTACHMENT0+ht,r.TEXTURE_2D,0),m(Yt)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let ht=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ht=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ht,J.__webglTexture),Ut(ht,y),y.mipmaps&&y.mipmaps.length>0)for(let _t=0;_t<y.mipmaps.length;_t++)xt(k.__webglFramebuffer[_t],w,y,r.COLOR_ATTACHMENT0,ht,_t);else xt(k.__webglFramebuffer,w,y,r.COLOR_ATTACHMENT0,ht,0);m(y)&&p(ht),e.unbindTexture()}w.depthBuffer&&Dt(w)}function et(w){const y=w.textures;for(let k=0,J=y.length;k<J;k++){const j=y[k];if(m(j)){const K=E(w),dt=n.get(j).__webglTexture;e.bindTexture(K,dt),p(K),e.unbindTexture()}}}const Q=[],R=[];function Et(w){if(w.samples>0){if(N(w)===!1){const y=w.textures,k=w.width,J=w.height;let j=r.COLOR_BUFFER_BIT;const K=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=n.get(w),ht=y.length>1;if(ht)for(let _t=0;_t<y.length;_t++)e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let _t=0;_t<y.length;_t++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),ht){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const Yt=n.get(y[_t]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Yt,0)}r.blitFramebuffer(0,0,k,J,0,0,k,J,j,r.NEAREST),l===!0&&(Q.length=0,R.length=0,Q.push(r.COLOR_ATTACHMENT0+_t),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Q.push(K),R.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,R)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Q))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ht)for(let _t=0;_t<y.length;_t++){e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const Yt=n.get(y[_t]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,Yt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const y=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function nt(w){return Math.min(i.maxSamples,w.samples)}function N(w){const y=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function at(w){const y=o.render.frame;u.get(w)!==y&&(u.set(w,y),w.update())}function Nt(w,y){const k=w.colorSpace,J=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==js&&k!==nr&&(le.getTransfer(k)===_e?(J!==ai||j!==Vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),y}function Mt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=Y,this.setTextureCube=H,this.rebindTextures=Ot,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=N}function xM(r,t){function e(n,i=nr){let s;const o=le.getTransfer(i);if(n===Vi)return r.UNSIGNED_BYTE;if(n===qu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===$u)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bd)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Od)return r.BYTE;if(n===Fd)return r.SHORT;if(n===Bo)return r.UNSIGNED_SHORT;if(n===Yu)return r.INT;if(n===qr)return r.UNSIGNED_INT;if(n===Fi)return r.FLOAT;if(n===Qo)return r.HALF_FLOAT;if(n===zd)return r.ALPHA;if(n===kd)return r.RGB;if(n===ai)return r.RGBA;if(n===Hd)return r.LUMINANCE;if(n===Vd)return r.LUMINANCE_ALPHA;if(n===Ls)return r.DEPTH_COMPONENT;if(n===Ws)return r.DEPTH_STENCIL;if(n===Gd)return r.RED;if(n===Zu)return r.RED_INTEGER;if(n===Wd)return r.RG;if(n===Ku)return r.RG_INTEGER;if(n===Ju)return r.RGBA_INTEGER;if(n===$a||n===Za||n===Ka||n===Ja)if(o===_e)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===$a)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ka)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===$a)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Za)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ka)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ja)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zc||n===kc||n===Hc||n===Vc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===zc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gc||n===Wc||n===Xc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Gc||n===Wc)return o===_e?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yc||n===qc||n===$c||n===Zc||n===Kc||n===Jc||n===jc||n===Qc||n===tu||n===eu||n===nu||n===iu||n===ru||n===su)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Yc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$c)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Kc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===jc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qc)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tu)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===eu)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nu)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===iu)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ru)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===su)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ja||n===ou||n===au)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===ja)return o===_e?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ou)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===au)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xd||n===lu||n===cu||n===uu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ja)return s.COMPRESSED_RED_RGTC1_EXT;if(n===lu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class SM extends Xn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pa extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}const MM={type:"move"};class oc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(MM)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pa;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const yM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,EM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class TM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new on,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new pr({vertexShader:yM,fragmentShader:EM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $n(new ra(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bM extends Qs{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const g=new TM,m=e.getContextAttributes();let p=null,E=null;const S=[],v=[],C=new bt;let A=null;const b=new Xn;b.viewport=new Le;const P=new Xn;P.viewport=new Le;const M=[b,P],x=new SM;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let it=S[Z];return it===void 0&&(it=new oc,S[Z]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Z){let it=S[Z];return it===void 0&&(it=new oc,S[Z]=it),it.getGripSpace()},this.getHand=function(Z){let it=S[Z];return it===void 0&&(it=new oc,S[Z]=it),it.getHandSpace()};function B(Z){const it=v.indexOf(Z.inputSource);if(it===-1)return;const xt=S[it];xt!==void 0&&(xt.update(Z.inputSource,Z.frame,c||o),xt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function X(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",q);for(let Z=0;Z<S.length;Z++){const it=v[Z];it!==null&&(v[Z]=null,S[Z].disconnect(it))}D=null,O=null,g.reset(),t.setRenderTarget(p),d=null,f=null,h=null,i=null,E=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",X),i.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,it),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),E=new $r(d.framebufferWidth,d.framebufferHeight,{format:ai,type:Vi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,xt=null,st=null;m.depth&&(st=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?Ws:Ls,xt=m.stencil?Gs:qr);const Ct={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:s};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(Ct),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new $r(f.textureWidth,f.textureHeight,{format:ai,type:Vi,depthTexture:new op(f.textureWidth,f.textureHeight,xt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Kt.setContext(i),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(Z){for(let it=0;it<Z.removed.length;it++){const xt=Z.removed[it],st=v.indexOf(xt);st>=0&&(v[st]=null,S[st].disconnect(xt))}for(let it=0;it<Z.added.length;it++){const xt=Z.added[it];let st=v.indexOf(xt);if(st===-1){for(let Dt=0;Dt<S.length;Dt++)if(Dt>=v.length){v.push(xt),st=Dt;break}else if(v[Dt]===null){v[Dt]=xt,st=Dt;break}if(st===-1)break}const Ct=S[st];Ct&&Ct.connect(xt)}}const W=new z,Y=new z;function H(Z,it,xt){W.setFromMatrixPosition(it.matrixWorld),Y.setFromMatrixPosition(xt.matrixWorld);const st=W.distanceTo(Y),Ct=it.projectionMatrix.elements,Dt=xt.projectionMatrix.elements,Ot=Ct[14]/(Ct[10]-1),Ht=Ct[14]/(Ct[10]+1),et=(Ct[9]+1)/Ct[5],Q=(Ct[9]-1)/Ct[5],R=(Ct[8]-1)/Ct[0],Et=(Dt[8]+1)/Dt[0],nt=Ot*R,N=Ot*Et,at=st/(-R+Et),Nt=at*-R;if(it.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Nt),Z.translateZ(at),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ct[10]===-1)Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const Mt=Ot+at,w=Ht+at,y=nt-Nt,k=N+(st-Nt),J=et*Ht/w*Mt,j=Q*Ht/w*Mt;Z.projectionMatrix.makePerspective(y,k,J,j,Mt,w),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function rt(Z,it){it===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(it.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let it=Z.near,xt=Z.far;g.texture!==null&&(g.depthNear>0&&(it=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),x.near=P.near=b.near=it,x.far=P.far=b.far=xt,(D!==x.near||O!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),D=x.near,O=x.far),b.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,x.layers.mask=b.layers.mask|P.layers.mask;const st=Z.parent,Ct=x.cameras;rt(x,st);for(let Dt=0;Dt<Ct.length;Dt++)rt(Ct[Dt],st);Ct.length===2?H(x,b,P):x.projectionMatrix.copy(b.projectionMatrix),L(Z,x,st)};function L(Z,it,xt){xt===null?Z.matrix.copy(it.matrixWorld):(Z.matrix.copy(xt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(it.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=zo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let ct=null;function Ut(Z,it){if(u=it.getViewerPose(c||o),_=it,u!==null){const xt=u.views;d!==null&&(t.setRenderTargetFramebuffer(E,d.framebuffer),t.setRenderTarget(E));let st=!1;xt.length!==x.cameras.length&&(x.cameras.length=0,st=!0);for(let Dt=0;Dt<xt.length;Dt++){const Ot=xt[Dt];let Ht=null;if(d!==null)Ht=d.getViewport(Ot);else{const Q=h.getViewSubImage(f,Ot);Ht=Q.viewport,Dt===0&&(t.setRenderTargetTextures(E,Q.colorTexture,f.ignoreDepthValues?void 0:Q.depthStencilTexture),t.setRenderTarget(E))}let et=M[Dt];et===void 0&&(et=new Xn,et.layers.enable(Dt),et.viewport=new Le,M[Dt]=et),et.matrix.fromArray(Ot.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(Ot.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),Dt===0&&(x.matrix.copy(et.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),st===!0&&x.cameras.push(et)}const Ct=i.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Dt=h.getDepthInformation(xt[0]);Dt&&Dt.isValid&&Dt.texture&&g.init(t,Dt,i.renderState)}}for(let xt=0;xt<S.length;xt++){const st=v[xt],Ct=S[xt];st!==null&&Ct!==void 0&&Ct.update(st,it,c||o)}ct&&ct(Z,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),_=null}const Kt=new rp;Kt.setAnimationLoop(Ut),this.setAnimationLoop=function(Z){ct=Z},this.dispose=function(){}}}const Tr=new Ei,wM=new Pe;function AM(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ep(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,E,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===En&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===En&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),S=E.envMap,v=E.envMapRotation;S&&(m.envMap.value=S,Tr.copy(v),Tr.x*=-1,Tr.y*=-1,Tr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Tr.y*=-1,Tr.z*=-1),m.envMapRotation.value.setFromMatrix4(wM.makeRotationFromEuler(Tr)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===En&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function CM(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,S){const v=S.program;n.uniformBlockBinding(E,v)}function c(E,S){let v=i[E.id];v===void 0&&(_(E),v=u(E),i[E.id]=v,E.addEventListener("dispose",m));const C=S.program;n.updateUBOMapping(E,C);const A=t.render.frame;s[E.id]!==A&&(f(E),s[E.id]=A)}function u(E){const S=h();E.__bindingPointIndex=S;const v=r.createBuffer(),C=E.__size,A=E.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,C,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,v),v}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const S=i[E.id],v=E.uniforms,C=E.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let A=0,b=v.length;A<b;A++){const P=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,x=P.length;M<x;M++){const D=P[M];if(d(D,A,M,C)===!0){const O=D.__offset,B=Array.isArray(D.value)?D.value:[D.value];let X=0;for(let q=0;q<B.length;q++){const W=B[q],Y=g(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,O+X,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,X),X+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(E,S,v,C){const A=E.value,b=S+"_"+v;if(C[b]===void 0)return typeof A=="number"||typeof A=="boolean"?C[b]=A:C[b]=A.clone(),!0;{const P=C[b];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return C[b]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function _(E){const S=E.uniforms;let v=0;const C=16;for(let b=0,P=S.length;b<P;b++){const M=Array.isArray(S[b])?S[b]:[S[b]];for(let x=0,D=M.length;x<D;x++){const O=M[x],B=Array.isArray(O.value)?O.value:[O.value];for(let X=0,q=B.length;X<q;X++){const W=B[X],Y=g(W),H=v%C,rt=H%Y.boundary,L=H+rt;v+=rt,L!==0&&C-L<Y.storage&&(v+=C-L),O.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=Y.storage}}}const A=v%C;return A>0&&(v+=C-A),E.__size=v,E.__cache={},this}function g(E){const S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){const S=E.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function p(){for(const E in i)r.deleteBuffer(i[E]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class RM{constructor(t={}){const{canvas:e=_g(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const E=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Wn,this.toneMapping=cr,this.toneMappingExposure=1;const v=this;let C=!1,A=0,b=0,P=null,M=-1,x=null;const D=new Le,O=new Le;let B=null;const X=new he(0);let q=0,W=e.width,Y=e.height,H=1,rt=null,L=null;const ct=new Le(0,0,W,Y),Ut=new Le(0,0,W,Y);let Kt=!1;const Z=new eh;let it=!1,xt=!1;const st=new Pe,Ct=new Pe,Dt=new z,Ot=new Le,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function Q(){return P===null?H:1}let R=n;function Et(T,U){return e.getContext(T,U)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xu}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),R===null){const U="webgl2";if(R=Et(U,T),R===null)throw Et(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let nt,N,at,Nt,Mt,w,y,k,J,j,K,dt,ht,_t,Yt,ot,ft,zt,Bt,wt,Jt,Vt,ae,I;function mt(){nt=new Ux(R),nt.init(),Vt=new xM(R,nt),N=new Cx(R,nt,t,Vt),at=new _M(R,nt),N.reverseDepthBuffer&&f&&at.buffers.depth.setReversed(!0),Nt=new Fx(R),Mt=new eM,w=new vM(R,nt,at,Mt,N,Vt,Nt),y=new Px(v),k=new Ix(v),J=new Wg(R),ae=new wx(R,J),j=new Nx(R,J,Nt,ae),K=new zx(R,j,J,Nt),Bt=new Bx(R,N,w),ot=new Rx(Mt),dt=new tM(v,y,k,nt,N,ae,ot),ht=new AM(v,Mt),_t=new iM,Yt=new cM(nt),zt=new bx(v,y,k,at,K,d,l),ft=new pM(v,K,N),I=new CM(R,Nt,N,at),wt=new Ax(R,nt,Nt),Jt=new Ox(R,nt,Nt),Nt.programs=dt.programs,v.capabilities=N,v.extensions=nt,v.properties=Mt,v.renderLists=_t,v.shadowMap=ft,v.state=at,v.info=Nt}mt();const $=new bM(v,R);this.xr=$,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(T){T!==void 0&&(H=T,this.setSize(W,Y,!1))},this.getSize=function(T){return T.set(W,Y)},this.setSize=function(T,U,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,Y=U,e.width=Math.floor(T*H),e.height=Math.floor(U*H),V===!0&&(e.style.width=T+"px",e.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(W*H,Y*H).floor()},this.setDrawingBufferSize=function(T,U,V){W=T,Y=U,H=V,e.width=Math.floor(T*V),e.height=Math.floor(U*V),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(ct)},this.setViewport=function(T,U,V,G){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,U,V,G),at.viewport(D.copy(ct).multiplyScalar(H).round())},this.getScissor=function(T){return T.copy(Ut)},this.setScissor=function(T,U,V,G){T.isVector4?Ut.set(T.x,T.y,T.z,T.w):Ut.set(T,U,V,G),at.scissor(O.copy(Ut).multiplyScalar(H).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(T){at.setScissorTest(Kt=T)},this.setOpaqueSort=function(T){rt=T},this.setTransparentSort=function(T){L=T},this.getClearColor=function(T){return T.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(T=!0,U=!0,V=!0){let G=0;if(T){let F=!1;if(P!==null){const lt=P.texture.format;F=lt===Ju||lt===Ku||lt===Zu}if(F){const lt=P.texture.type,ut=lt===Vi||lt===qr||lt===Bo||lt===Gs||lt===qu||lt===$u,vt=zt.getClearColor(),At=zt.getClearAlpha(),Wt=vt.r,$t=vt.g,Pt=vt.b;ut?(_[0]=Wt,_[1]=$t,_[2]=Pt,_[3]=At,R.clearBufferuiv(R.COLOR,0,_)):(g[0]=Wt,g[1]=$t,g[2]=Pt,g[3]=At,R.clearBufferiv(R.COLOR,0,g))}else G|=R.COLOR_BUFFER_BIT}U&&(G|=R.DEPTH_BUFFER_BIT),V&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),_t.dispose(),Yt.dispose(),Mt.dispose(),y.dispose(),k.dispose(),K.dispose(),ae.dispose(),I.dispose(),dt.dispose(),$.dispose(),$.removeEventListener("sessionstart",St),$.removeEventListener("sessionend",qt),It.stop()};function tt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=Nt.autoReset,U=ft.enabled,V=ft.autoUpdate,G=ft.needsUpdate,F=ft.type;mt(),Nt.autoReset=T,ft.enabled=U,ft.autoUpdate=V,ft.needsUpdate=G,ft.type=F}function gt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Gt(T){const U=T.target;U.removeEventListener("dispose",Gt),ce(U)}function ce(T){De(T),Mt.remove(T)}function De(T){const U=Mt.get(T).programs;U!==void 0&&(U.forEach(function(V){dt.releaseProgram(V)}),T.isShaderMaterial&&dt.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,V,G,F,lt){U===null&&(U=Ht);const ut=F.isMesh&&F.matrixWorld.determinant()<0,vt=Rn(T,U,V,G,F);at.setMaterial(G,ut);let At=V.index,Wt=1;if(G.wireframe===!0){if(At=j.getWireframeAttribute(V),At===void 0)return;Wt=2}const $t=V.drawRange,Pt=V.attributes.position;let Zt=$t.start*Wt,ue=($t.start+$t.count)*Wt;lt!==null&&(Zt=Math.max(Zt,lt.start*Wt),ue=Math.min(ue,(lt.start+lt.count)*Wt)),At!==null?(Zt=Math.max(Zt,0),ue=Math.min(ue,At.count)):Pt!=null&&(Zt=Math.max(Zt,0),ue=Math.min(ue,Pt.count));const de=ue-Zt;if(de<0||de===1/0)return;ae.setup(F,G,vt,V,At);let Fe,pe=wt;if(At!==null&&(Fe=J.get(At),pe=Jt,pe.setIndex(Fe)),F.isMesh)G.wireframe===!0?(at.setLineWidth(G.wireframeLinewidth*Q()),pe.setMode(R.LINES)):pe.setMode(R.TRIANGLES);else if(F.isLine){let Ft=G.linewidth;Ft===void 0&&(Ft=1),at.setLineWidth(Ft*Q()),F.isLineSegments?pe.setMode(R.LINES):F.isLineLoop?pe.setMode(R.LINE_LOOP):pe.setMode(R.LINE_STRIP)}else F.isPoints?pe.setMode(R.POINTS):F.isSprite&&pe.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)pe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))pe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ft=F._multiDrawStarts,wi=F._multiDrawCounts,me=F._multiDrawCount,ti=At?J.get(At).bytesPerElement:1,rs=Mt.get(G).currentProgram.getUniforms();for(let Pn=0;Pn<me;Pn++)rs.setValue(R,"_gl_DrawID",Pn),pe.render(Ft[Pn]/ti,wi[Pn])}else if(F.isInstancedMesh)pe.renderInstances(Zt,de,F.count);else if(V.isInstancedBufferGeometry){const Ft=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,wi=Math.min(V.instanceCount,Ft);pe.renderInstances(Zt,de,wi)}else pe.render(Zt,de)};function Tt(T,U,V){T.transparent===!0&&T.side===Ni&&T.forceSinglePass===!1?(T.side=En,T.needsUpdate=!0,ge(T,U,V),T.side=dr,T.needsUpdate=!0,ge(T,U,V),T.side=Ni):ge(T,U,V)}this.compile=function(T,U,V=null){V===null&&(V=T),p=Yt.get(V),p.init(U),S.push(p),V.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),T!==V&&T.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const G=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const lt=F.material;if(lt)if(Array.isArray(lt))for(let ut=0;ut<lt.length;ut++){const vt=lt[ut];Tt(vt,V,F),G.add(vt)}else Tt(lt,V,F),G.add(lt)}),S.pop(),p=null,G},this.compileAsync=function(T,U,V=null){const G=this.compile(T,U,V);return new Promise(F=>{function lt(){if(G.forEach(function(ut){Mt.get(ut).currentProgram.isReady()&&G.delete(ut)}),G.size===0){F(T);return}setTimeout(lt,10)}nt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let Lt=null;function jt(T){Lt&&Lt(T)}function St(){It.stop()}function qt(){It.start()}const It=new rp;It.setAnimationLoop(jt),typeof self<"u"&&It.setContext(self),this.setAnimationLoop=function(T){Lt=T,$.setAnimationLoop(T),T===null?It.stop():It.start()},$.addEventListener("sessionstart",St),$.addEventListener("sessionend",qt),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(U),U=$.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,U,P),p=Yt.get(T,S.length),p.init(U),S.push(p),Ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Z.setFromProjectionMatrix(Ct),xt=this.localClippingEnabled,it=ot.init(this.clippingPlanes,xt),m=_t.get(T,E.length),m.init(),E.push(m),$.enabled===!0&&$.isPresenting===!0){const lt=v.xr.getDepthSensingMesh();lt!==null&&Xt(lt,U,-1/0,v.sortObjects)}Xt(T,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(rt,L),et=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,et&&zt.addToRenderList(m,T),this.info.render.frame++,it===!0&&ot.beginShadows();const V=p.state.shadowsArray;ft.render(V,T,U),it===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,F=m.transmissive;if(p.setupLights(),U.isArrayCamera){const lt=U.cameras;if(F.length>0)for(let ut=0,vt=lt.length;ut<vt;ut++){const At=lt[ut];ee(G,F,T,At)}et&&zt.render(T);for(let ut=0,vt=lt.length;ut<vt;ut++){const At=lt[ut];Ue(m,T,At,At.viewport)}}else F.length>0&&ee(G,F,T,U),et&&zt.render(T),Ue(m,T,U);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(v,T,U),ae.resetDefaultState(),M=-1,x=null,S.pop(),S.length>0?(p=S[S.length-1],it===!0&&ot.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Xt(T,U,V,G){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){G&&Ot.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ct);const ut=K.update(T),vt=T.material;vt.visible&&m.push(T,ut,vt,V,Ot.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){const ut=K.update(T),vt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ot.copy(T.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Ot.copy(ut.boundingSphere.center)),Ot.applyMatrix4(T.matrixWorld).applyMatrix4(Ct)),Array.isArray(vt)){const At=ut.groups;for(let Wt=0,$t=At.length;Wt<$t;Wt++){const Pt=At[Wt],Zt=vt[Pt.materialIndex];Zt&&Zt.visible&&m.push(T,ut,Zt,V,Ot.z,Pt)}}else vt.visible&&m.push(T,ut,vt,V,Ot.z,null)}}const lt=T.children;for(let ut=0,vt=lt.length;ut<vt;ut++)Xt(lt[ut],U,V,G)}function Ue(T,U,V,G){const F=T.opaque,lt=T.transmissive,ut=T.transparent;p.setupLightsView(V),it===!0&&ot.setGlobalState(v.clippingPlanes,V),G&&at.viewport(D.copy(G)),F.length>0&&Se(F,U,V),lt.length>0&&Se(lt,U,V),ut.length>0&&Se(ut,U,V),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function ee(T,U,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new $r(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?Qo:Vi,minFilter:Nr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));const lt=p.state.transmissionRenderTarget[G.id],ut=G.viewport||D;lt.setSize(ut.z,ut.w);const vt=v.getRenderTarget();v.setRenderTarget(lt),v.getClearColor(X),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),et&&zt.render(V);const At=v.toneMapping;v.toneMapping=cr;const Wt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),it===!0&&ot.setGlobalState(v.clippingPlanes,G),Se(T,V,G),w.updateMultisampleRenderTarget(lt),w.updateRenderTargetMipmap(lt),nt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Pt=0,Zt=U.length;Pt<Zt;Pt++){const ue=U[Pt],de=ue.object,Fe=ue.geometry,pe=ue.material,Ft=ue.group;if(pe.side===Ni&&de.layers.test(G.layers)){const wi=pe.side;pe.side=En,pe.needsUpdate=!0,He(de,V,G,Fe,pe,Ft),pe.side=wi,pe.needsUpdate=!0,$t=!0}}$t===!0&&(w.updateMultisampleRenderTarget(lt),w.updateRenderTargetMipmap(lt))}v.setRenderTarget(vt),v.setClearColor(X,q),Wt!==void 0&&(G.viewport=Wt),v.toneMapping=At}function Se(T,U,V){const G=U.isScene===!0?U.overrideMaterial:null;for(let F=0,lt=T.length;F<lt;F++){const ut=T[F],vt=ut.object,At=ut.geometry,Wt=G===null?ut.material:G,$t=ut.group;vt.layers.test(V.layers)&&He(vt,U,V,At,Wt,$t)}}function He(T,U,V,G,F,lt){T.onBeforeRender(v,U,V,G,F,lt),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,U,V,G,T,lt),F.transparent===!0&&F.side===Ni&&F.forceSinglePass===!1?(F.side=En,F.needsUpdate=!0,v.renderBufferDirect(V,U,G,F,T,lt),F.side=dr,F.needsUpdate=!0,v.renderBufferDirect(V,U,G,F,T,lt),F.side=Ni):v.renderBufferDirect(V,U,G,F,T,lt),T.onAfterRender(v,U,V,G,F,lt)}function ge(T,U,V){U.isScene!==!0&&(U=Ht);const G=Mt.get(T),F=p.state.lights,lt=p.state.shadowsArray,ut=F.state.version,vt=dt.getParameters(T,F.state,lt,U,V),At=dt.getProgramCacheKey(vt);let Wt=G.programs;G.environment=T.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(T.isMeshStandardMaterial?k:y).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Wt===void 0&&(T.addEventListener("dispose",Gt),Wt=new Map,G.programs=Wt);let $t=Wt.get(At);if($t!==void 0){if(G.currentProgram===$t&&G.lightsStateVersion===ut)return fe(T,vt),$t}else vt.uniforms=dt.getUniforms(T),T.onBeforeCompile(vt,v),$t=dt.acquireProgram(vt,At),Wt.set(At,$t),G.uniforms=vt.uniforms;const Pt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Pt.clippingPlanes=ot.uniform),fe(T,vt),G.needsLights=un(T),G.lightsStateVersion=ut,G.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=$t,G.uniformsList=null,$t}function ve(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=Qa.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function fe(T,U){const V=Mt.get(T);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Rn(T,U,V,G,F){U.isScene!==!0&&(U=Ht),w.resetTextureUnits();const lt=U.fog,ut=G.isMeshStandardMaterial?U.environment:null,vt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:js,At=(G.isMeshStandardMaterial?k:y).get(G.envMap||ut),Wt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,$t=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pt=!!V.morphAttributes.position,Zt=!!V.morphAttributes.normal,ue=!!V.morphAttributes.color;let de=cr;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(de=v.toneMapping);const Fe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,pe=Fe!==void 0?Fe.length:0,Ft=Mt.get(G),wi=p.state.lights;if(it===!0&&(xt===!0||T!==x)){const Hn=T===x&&G.id===M;ot.setState(G,T,Hn)}let me=!1;G.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==wi.state.version||Ft.outputColorSpace!==vt||F.isBatchedMesh&&Ft.batching===!1||!F.isBatchedMesh&&Ft.batching===!0||F.isBatchedMesh&&Ft.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ft.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ft.instancing===!1||!F.isInstancedMesh&&Ft.instancing===!0||F.isSkinnedMesh&&Ft.skinning===!1||!F.isSkinnedMesh&&Ft.skinning===!0||F.isInstancedMesh&&Ft.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ft.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ft.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ft.instancingMorph===!1&&F.morphTexture!==null||Ft.envMap!==At||G.fog===!0&&Ft.fog!==lt||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==ot.numPlanes||Ft.numIntersection!==ot.numIntersection)||Ft.vertexAlphas!==Wt||Ft.vertexTangents!==$t||Ft.morphTargets!==Pt||Ft.morphNormals!==Zt||Ft.morphColors!==ue||Ft.toneMapping!==de||Ft.morphTargetsCount!==pe)&&(me=!0):(me=!0,Ft.__version=G.version);let ti=Ft.currentProgram;me===!0&&(ti=ge(G,U,F));let rs=!1,Pn=!1,eo=!1;const Ee=ti.getUniforms(),ui=Ft.uniforms;if(at.useProgram(ti.program)&&(rs=!0,Pn=!0,eo=!0),G.id!==M&&(M=G.id,Pn=!0),rs||x!==T){at.buffers.depth.getReversed()?(st.copy(T.projectionMatrix),vg(st),xg(st),Ee.setValue(R,"projectionMatrix",st)):Ee.setValue(R,"projectionMatrix",T.projectionMatrix),Ee.setValue(R,"viewMatrix",T.matrixWorldInverse);const Yi=Ee.map.cameraPosition;Yi!==void 0&&Yi.setValue(R,Dt.setFromMatrixPosition(T.matrixWorld)),N.logarithmicDepthBuffer&&Ee.setValue(R,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Ee.setValue(R,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,Pn=!0,eo=!0)}if(F.isSkinnedMesh){Ee.setOptional(R,F,"bindMatrix"),Ee.setOptional(R,F,"bindMatrixInverse");const Hn=F.skeleton;Hn&&(Hn.boneTexture===null&&Hn.computeBoneTexture(),Ee.setValue(R,"boneTexture",Hn.boneTexture,w))}F.isBatchedMesh&&(Ee.setOptional(R,F,"batchingTexture"),Ee.setValue(R,"batchingTexture",F._matricesTexture,w),Ee.setOptional(R,F,"batchingIdTexture"),Ee.setValue(R,"batchingIdTexture",F._indirectTexture,w),Ee.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&Ee.setValue(R,"batchingColorTexture",F._colorsTexture,w));const no=V.morphAttributes;if((no.position!==void 0||no.normal!==void 0||no.color!==void 0)&&Bt.update(F,V,ti),(Pn||Ft.receiveShadow!==F.receiveShadow)&&(Ft.receiveShadow=F.receiveShadow,Ee.setValue(R,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ui.envMap.value=At,ui.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(ui.envMapIntensity.value=U.environmentIntensity),Pn&&(Ee.setValue(R,"toneMappingExposure",v.toneMappingExposure),Ft.needsLights&&ye(ui,eo),lt&&G.fog===!0&&ht.refreshFogUniforms(ui,lt),ht.refreshMaterialUniforms(ui,G,H,Y,p.state.transmissionRenderTarget[T.id]),Qa.upload(R,ve(Ft),ui,w)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Qa.upload(R,ve(Ft),ui,w),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Ee.setValue(R,"center",F.center),Ee.setValue(R,"modelViewMatrix",F.modelViewMatrix),Ee.setValue(R,"normalMatrix",F.normalMatrix),Ee.setValue(R,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Hn=G.uniformsGroups;for(let Yi=0,qi=Hn.length;Yi<qi;Yi++){const Fh=Hn[Yi];I.update(Fh,ti),I.bind(Fh,ti)}}return ti}function ye(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function un(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,U,V){Mt.get(T.texture).__webglTexture=U,Mt.get(T.depthTexture).__webglTexture=V;const G=Mt.get(T);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,U){const V=Mt.get(T);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,V=0){P=T,A=U,b=V;let G=!0,F=null,lt=!1,ut=!1;if(T){const At=Mt.get(T);if(At.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(At.__webglFramebuffer===void 0)w.setupRenderTarget(T);else if(At.__hasExternalTextures)w.rebindTextures(T,Mt.get(T.texture).__webglTexture,Mt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Pt=T.depthTexture;if(At.__boundDepthTexture!==Pt){if(Pt!==null&&Mt.has(Pt)&&(T.width!==Pt.image.width||T.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(T)}}const Wt=T.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(ut=!0);const $t=Mt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray($t[U])?F=$t[U][V]:F=$t[U],lt=!0):T.samples>0&&w.useMultisampledRTT(T)===!1?F=Mt.get(T).__webglMultisampledFramebuffer:Array.isArray($t)?F=$t[V]:F=$t,D.copy(T.viewport),O.copy(T.scissor),B=T.scissorTest}else D.copy(ct).multiplyScalar(H).floor(),O.copy(Ut).multiplyScalar(H).floor(),B=Kt;if(at.bindFramebuffer(R.FRAMEBUFFER,F)&&G&&at.drawBuffers(T,F),at.viewport(D),at.scissor(O),at.setScissorTest(B),lt){const At=Mt.get(T.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,At.__webglTexture,V)}else if(ut){const At=Mt.get(T.texture),Wt=U||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,At.__webglTexture,V||0,Wt)}M=-1},this.readRenderTargetPixels=function(T,U,V,G,F,lt,ut){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Mt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){at.bindFramebuffer(R.FRAMEBUFFER,vt);try{const At=T.texture,Wt=At.format,$t=At.type;if(!N.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!N.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-G&&V>=0&&V<=T.height-F&&R.readPixels(U,V,G,F,Vt.convert(Wt),Vt.convert($t),lt)}finally{const At=P!==null?Mt.get(P).__webglFramebuffer:null;at.bindFramebuffer(R.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(T,U,V,G,F,lt,ut){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Mt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){const At=T.texture,Wt=At.format,$t=At.type;if(!N.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!N.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=T.width-G&&V>=0&&V<=T.height-F){at.bindFramebuffer(R.FRAMEBUFFER,vt);const Pt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Pt),R.bufferData(R.PIXEL_PACK_BUFFER,lt.byteLength,R.STREAM_READ),R.readPixels(U,V,G,F,Vt.convert(Wt),Vt.convert($t),0);const Zt=P!==null?Mt.get(P).__webglFramebuffer:null;at.bindFramebuffer(R.FRAMEBUFFER,Zt);const ue=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await gg(R,ue,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Pt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,lt),R.deleteBuffer(Pt),R.deleteSync(ue),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,U=null,V=0){T.isTexture!==!0&&(uo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,T=arguments[1]);const G=Math.pow(2,-V),F=Math.floor(T.image.width*G),lt=Math.floor(T.image.height*G),ut=U!==null?U.x:0,vt=U!==null?U.y:0;w.setTexture2D(T,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,ut,vt,F,lt),at.unbindTexture()},this.copyTextureToTexture=function(T,U,V=null,G=null,F=0){T.isTexture!==!0&&(uo("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1],U=arguments[2],F=arguments[3]||0,V=null);let lt,ut,vt,At,Wt,$t,Pt,Zt,ue;const de=T.isCompressedTexture?T.mipmaps[F]:T.image;V!==null?(lt=V.max.x-V.min.x,ut=V.max.y-V.min.y,vt=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,Wt=V.min.y,$t=V.isBox3?V.min.z:0):(lt=de.width,ut=de.height,vt=de.depth||1,At=0,Wt=0,$t=0),G!==null?(Pt=G.x,Zt=G.y,ue=G.z):(Pt=0,Zt=0,ue=0);const Fe=Vt.convert(U.format),pe=Vt.convert(U.type);let Ft;U.isData3DTexture?(w.setTexture3D(U,0),Ft=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(w.setTexture2DArray(U,0),Ft=R.TEXTURE_2D_ARRAY):(w.setTexture2D(U,0),Ft=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const wi=R.getParameter(R.UNPACK_ROW_LENGTH),me=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ti=R.getParameter(R.UNPACK_SKIP_PIXELS),rs=R.getParameter(R.UNPACK_SKIP_ROWS),Pn=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,de.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,de.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,At),R.pixelStorei(R.UNPACK_SKIP_ROWS,Wt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,$t);const eo=T.isDataArrayTexture||T.isData3DTexture,Ee=U.isDataArrayTexture||U.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const ui=Mt.get(T),no=Mt.get(U),Hn=Mt.get(ui.__renderTarget),Yi=Mt.get(no.__renderTarget);at.bindFramebuffer(R.READ_FRAMEBUFFER,Hn.__webglFramebuffer),at.bindFramebuffer(R.DRAW_FRAMEBUFFER,Yi.__webglFramebuffer);for(let qi=0;qi<vt;qi++)eo&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Mt.get(T).__webglTexture,F,$t+qi),T.isDepthTexture?(Ee&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Mt.get(U).__webglTexture,F,ue+qi),R.blitFramebuffer(At,Wt,lt,ut,Pt,Zt,lt,ut,R.DEPTH_BUFFER_BIT,R.NEAREST)):Ee?R.copyTexSubImage3D(Ft,F,Pt,Zt,ue+qi,At,Wt,lt,ut):R.copyTexSubImage2D(Ft,F,Pt,Zt,ue+qi,At,Wt,lt,ut);at.bindFramebuffer(R.READ_FRAMEBUFFER,null),at.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Ee?T.isDataTexture||T.isData3DTexture?R.texSubImage3D(Ft,F,Pt,Zt,ue,lt,ut,vt,Fe,pe,de.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(Ft,F,Pt,Zt,ue,lt,ut,vt,Fe,de.data):R.texSubImage3D(Ft,F,Pt,Zt,ue,lt,ut,vt,Fe,pe,de):T.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,F,Pt,Zt,lt,ut,Fe,pe,de.data):T.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,F,Pt,Zt,de.width,de.height,Fe,de.data):R.texSubImage2D(R.TEXTURE_2D,F,Pt,Zt,lt,ut,Fe,pe,de);R.pixelStorei(R.UNPACK_ROW_LENGTH,wi),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,me),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ti),R.pixelStorei(R.UNPACK_SKIP_ROWS,rs),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Pn),F===0&&U.generateMipmaps&&R.generateMipmap(Ft),at.unbindTexture()},this.copyTextureToTexture3D=function(T,U,V=null,G=null,F=0){return T.isTexture!==!0&&(uo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,T=arguments[2],U=arguments[3],F=arguments[4]||0),uo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,U,V,G,F)},this.initRenderTarget=function(T){Mt.get(T).__webglFramebuffer===void 0&&w.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?w.setTextureCube(T,0):T.isData3DTexture?w.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?w.setTexture2DArray(T,0):w.setTexture2D(T,0),at.unbindTexture()},this.resetState=function(){A=0,b=0,P=null,at.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}}class ih{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new he(t),this.near=e,this.far=n}clone(){return new ih(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class PM extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class DM extends on{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new bt:new z);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new z,i=[],s=[],o=[],a=new z,l=new Pe;for(let d=0;d<=t;d++){const _=d/t;i[d]=this.getTangentAt(_,new z)}s[0]=new z,o[0]=new z;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Je(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,_))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(Je(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let _=1;_<=t;_++)s[_].applyMatrix4(l.makeRotationAxis(i[_],d*_)),o[_].crossVectors(i[_],s[_])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class rh extends bi{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new bt){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class LM extends rh{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function sh(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Da=new z,ac=new sh,lc=new sh,cc=new sh;class IM extends bi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new z){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%s]:(Da.subVectors(i[0],i[1]).add(i[0]),c=Da);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(Da.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=Da),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),ac.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,_,g,m),lc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,_,g,m),cc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&(ac.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),lc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),cc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(ac.calc(l),lc.calc(l),cc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new z().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Bf(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function UM(r,t){const e=1-r;return e*e*t}function NM(r,t){return 2*(1-r)*r*t}function OM(r,t){return r*r*t}function yo(r,t,e,n){return UM(r,t)+NM(r,e)+OM(r,n)}function FM(r,t){const e=1-r;return e*e*e*t}function BM(r,t){const e=1-r;return 3*e*e*r*t}function zM(r,t){return 3*(1-r)*r*r*t}function kM(r,t){return r*r*r*t}function Eo(r,t,e,n,i){return FM(r,t)+BM(r,e)+zM(r,n)+kM(r,i)}class hp extends bi{constructor(t=new bt,e=new bt,n=new bt,i=new bt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new bt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Eo(t,i.x,s.x,o.x,a.x),Eo(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class HM extends bi{constructor(t=new z,e=new z,n=new z,i=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new z){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Eo(t,i.x,s.x,o.x,a.x),Eo(t,i.y,s.y,o.y,a.y),Eo(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fp extends bi{constructor(t=new bt,e=new bt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new bt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new bt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class VM extends bi{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dp extends bi{constructor(t=new bt,e=new bt,n=new bt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new bt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(yo(t,i.x,s.x,o.x),yo(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class GM extends bi{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(yo(t,i.x,s.x,o.x),yo(t,i.y,s.y,o.y),yo(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pp extends bi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new bt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Bf(a,l.x,c.x,u.x,h.x),Bf(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new bt().fromArray(i))}return this}}var fu=Object.freeze({__proto__:null,ArcCurve:LM,CatmullRomCurve3:IM,CubicBezierCurve:hp,CubicBezierCurve3:HM,EllipseCurve:rh,LineCurve:fp,LineCurve3:VM,QuadraticBezierCurve:dp,QuadraticBezierCurve3:GM,SplineCurve:pp});class WM extends bi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fu[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new fu[i.type]().fromJSON(i))}return this}}class du extends WM{constructor(t){super(),this.type="Path",this.currentPoint=new bt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new fp(this.currentPoint.clone(),new bt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new dp(this.currentPoint.clone(),new bt(t,e),new bt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new hp(this.currentPoint.clone(),new bt(t,e),new bt(n,i),new bt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new pp(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new rh(t,e,n,i,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class mp extends du{constructor(t){super(t),this.uuid=ns(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new du().fromJSON(i))}return this}}const XM={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=_p(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,f,d;if(n&&(s=KM(r,t,s,e)),r.length>80*e){a=c=r[0],l=u=r[1];for(let _=e;_<i;_+=e)h=r[_],f=r[_+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Ho(s,o,e,a,l,d,0),o}};function _p(r,t,e,n,i){let s,o;if(i===ay(r,t,e,n)>0)for(s=t;s<e;s+=n)o=zf(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=zf(s,r[s],r[s+1],o);return o&&wl(o,o.next)&&(Go(o),o=o.next),o}function Zr(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(wl(e,e.next)||Ce(e.prev,e,e.next)===0)){if(Go(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ho(r,t,e,n,i,s,o){if(!r)return;!o&&s&&ey(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?qM(r,n,i,s):YM(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),Go(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=$M(Zr(r),t,e),Ho(r,t,e,n,i,s,2)):o===2&&ZM(r,t,e,n,i,s):Ho(Zr(r),t,e,n,i,s,1);break}}}function YM(r){const t=r.prev,e=r,n=r.next;if(Ce(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,u=i<s?i<o?i:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,f=i>s?i>o?i:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let _=n.next;for(;_!==t;){if(_.x>=u&&_.x<=f&&_.y>=h&&_.y<=d&&As(i,a,s,l,o,c,_.x,_.y)&&Ce(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function qM(r,t,e,n){const i=r.prev,s=r,o=r.next;if(Ce(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,u=i.y,h=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,_=u<h?u<f?u:f:h<f?h:f,g=a>l?a>c?a:c:l>c?l:c,m=u>h?u>f?u:f:h>f?h:f,p=pu(d,_,t,e,n),E=pu(g,m,t,e,n);let S=r.prevZ,v=r.nextZ;for(;S&&S.z>=p&&v&&v.z<=E;){if(S.x>=d&&S.x<=g&&S.y>=_&&S.y<=m&&S!==i&&S!==o&&As(a,u,l,h,c,f,S.x,S.y)&&Ce(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=d&&v.x<=g&&v.y>=_&&v.y<=m&&v!==i&&v!==o&&As(a,u,l,h,c,f,v.x,v.y)&&Ce(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=g&&S.y>=_&&S.y<=m&&S!==i&&S!==o&&As(a,u,l,h,c,f,S.x,S.y)&&Ce(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=E;){if(v.x>=d&&v.x<=g&&v.y>=_&&v.y<=m&&v!==i&&v!==o&&As(a,u,l,h,c,f,v.x,v.y)&&Ce(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function $M(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!wl(i,s)&&gp(i,n,n.next,s)&&Vo(i,s)&&Vo(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),Go(n),Go(n.next),n=r=s),n=n.next}while(n!==r);return Zr(n)}function ZM(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ry(o,a)){let l=vp(o,a);o=Zr(o,o.next),l=Zr(l,l.next),Ho(o,t,e,n,i,s,0),Ho(l,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function KM(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=_p(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(iy(c));for(i.sort(JM),s=0;s<i.length;s++)e=jM(i[s],e);return e}function JM(r,t){return r.x-t.x}function jM(r,t){const e=QM(r,t);if(!e)return t;const n=vp(e,r);return Zr(n,n.next),Zr(e,e.next)}function QM(r,t){let e=t,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=s&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===s))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&As(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(s-e.x),Vo(e,r)&&(h<u||h===u&&(e.x>i.x||e.x===i.x&&ty(i,e)))&&(i=e,u=h)),e=e.next;while(e!==a);return i}function ty(r,t){return Ce(r.prev,r,t.prev)<0&&Ce(t.next,r,r.next)<0}function ey(r,t,e,n){let i=r;do i.z===0&&(i.z=pu(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,ny(i)}function ny(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function pu(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function iy(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function As(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function ry(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!sy(r,t)&&(Vo(r,t)&&Vo(t,r)&&oy(r,t)&&(Ce(r.prev,r,t.prev)||Ce(r,t.prev,t))||wl(r,t)&&Ce(r.prev,r,r.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function wl(r,t){return r.x===t.x&&r.y===t.y}function gp(r,t,e,n){const i=Ia(Ce(r,t,e)),s=Ia(Ce(r,t,n)),o=Ia(Ce(e,n,r)),a=Ia(Ce(e,n,t));return!!(i!==s&&o!==a||i===0&&La(r,e,t)||s===0&&La(r,n,t)||o===0&&La(e,r,n)||a===0&&La(e,t,n))}function La(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Ia(r){return r>0?1:r<0?-1:0}function sy(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&gp(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Vo(r,t){return Ce(r.prev,r,r.next)<0?Ce(r,t,r.next)>=0&&Ce(r,r.prev,t)>=0:Ce(r,t,r.prev)<0||Ce(r,r.next,t)<0}function oy(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function vp(r,t){const e=new mu(r.i,r.x,r.y),n=new mu(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function zf(r,t,e,n){const i=new mu(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Go(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function mu(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ay(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class To{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return To.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];kf(t),Hf(n,t);let o=t.length;e.forEach(kf);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Hf(n,e[l]);const a=XM.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function kf(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Hf(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class oh extends Xi{constructor(t=new mp([new bt(.5,.5),new bt(-.5,.5),new bt(-.5,-.5),new bt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Jn(i,3)),this.setAttribute("uv",new Jn(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:d-.1,g=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:ly;let S,v=!1,C,A,b,P;p&&(S=p.getSpacedPoints(u),v=!0,f=!1,C=p.computeFrenetFrames(u,!1),A=new z,b=new z,P=new z),f||(m=0,d=0,_=0,g=0);const M=a.extractPoints(c);let x=M.shape;const D=M.holes;if(!To.isClockWise(x)){x=x.reverse();for(let et=0,Q=D.length;et<Q;et++){const R=D[et];To.isClockWise(R)&&(D[et]=R.reverse())}}const B=To.triangulateShape(x,D),X=x;for(let et=0,Q=D.length;et<Q;et++){const R=D[et];x=x.concat(R)}function q(et,Q,R){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(Q,R)}const W=x.length,Y=B.length;function H(et,Q,R){let Et,nt,N;const at=et.x-Q.x,Nt=et.y-Q.y,Mt=R.x-et.x,w=R.y-et.y,y=at*at+Nt*Nt,k=at*w-Nt*Mt;if(Math.abs(k)>Number.EPSILON){const J=Math.sqrt(y),j=Math.sqrt(Mt*Mt+w*w),K=Q.x-Nt/J,dt=Q.y+at/J,ht=R.x-w/j,_t=R.y+Mt/j,Yt=((ht-K)*w-(_t-dt)*Mt)/(at*w-Nt*Mt);Et=K+at*Yt-et.x,nt=dt+Nt*Yt-et.y;const ot=Et*Et+nt*nt;if(ot<=2)return new bt(Et,nt);N=Math.sqrt(ot/2)}else{let J=!1;at>Number.EPSILON?Mt>Number.EPSILON&&(J=!0):at<-Number.EPSILON?Mt<-Number.EPSILON&&(J=!0):Math.sign(Nt)===Math.sign(w)&&(J=!0),J?(Et=-Nt,nt=at,N=Math.sqrt(y)):(Et=at,nt=Nt,N=Math.sqrt(y/2))}return new bt(Et/N,nt/N)}const rt=[];for(let et=0,Q=X.length,R=Q-1,Et=et+1;et<Q;et++,R++,Et++)R===Q&&(R=0),Et===Q&&(Et=0),rt[et]=H(X[et],X[R],X[Et]);const L=[];let ct,Ut=rt.concat();for(let et=0,Q=D.length;et<Q;et++){const R=D[et];ct=[];for(let Et=0,nt=R.length,N=nt-1,at=Et+1;Et<nt;Et++,N++,at++)N===nt&&(N=0),at===nt&&(at=0),ct[Et]=H(R[Et],R[N],R[at]);L.push(ct),Ut=Ut.concat(ct)}for(let et=0;et<m;et++){const Q=et/m,R=d*Math.cos(Q*Math.PI/2),Et=_*Math.sin(Q*Math.PI/2)+g;for(let nt=0,N=X.length;nt<N;nt++){const at=q(X[nt],rt[nt],Et);st(at.x,at.y,-R)}for(let nt=0,N=D.length;nt<N;nt++){const at=D[nt];ct=L[nt];for(let Nt=0,Mt=at.length;Nt<Mt;Nt++){const w=q(at[Nt],ct[Nt],Et);st(w.x,w.y,-R)}}}const Kt=_+g;for(let et=0;et<W;et++){const Q=f?q(x[et],Ut[et],Kt):x[et];v?(b.copy(C.normals[0]).multiplyScalar(Q.x),A.copy(C.binormals[0]).multiplyScalar(Q.y),P.copy(S[0]).add(b).add(A),st(P.x,P.y,P.z)):st(Q.x,Q.y,0)}for(let et=1;et<=u;et++)for(let Q=0;Q<W;Q++){const R=f?q(x[Q],Ut[Q],Kt):x[Q];v?(b.copy(C.normals[et]).multiplyScalar(R.x),A.copy(C.binormals[et]).multiplyScalar(R.y),P.copy(S[et]).add(b).add(A),st(P.x,P.y,P.z)):st(R.x,R.y,h/u*et)}for(let et=m-1;et>=0;et--){const Q=et/m,R=d*Math.cos(Q*Math.PI/2),Et=_*Math.sin(Q*Math.PI/2)+g;for(let nt=0,N=X.length;nt<N;nt++){const at=q(X[nt],rt[nt],Et);st(at.x,at.y,h+R)}for(let nt=0,N=D.length;nt<N;nt++){const at=D[nt];ct=L[nt];for(let Nt=0,Mt=at.length;Nt<Mt;Nt++){const w=q(at[Nt],ct[Nt],Et);v?st(w.x,w.y+S[u-1].y,S[u-1].x+R):st(w.x,w.y,h+R)}}}Z(),it();function Z(){const et=i.length/3;if(f){let Q=0,R=W*Q;for(let Et=0;Et<Y;Et++){const nt=B[Et];Ct(nt[2]+R,nt[1]+R,nt[0]+R)}Q=u+m*2,R=W*Q;for(let Et=0;Et<Y;Et++){const nt=B[Et];Ct(nt[0]+R,nt[1]+R,nt[2]+R)}}else{for(let Q=0;Q<Y;Q++){const R=B[Q];Ct(R[2],R[1],R[0])}for(let Q=0;Q<Y;Q++){const R=B[Q];Ct(R[0]+W*u,R[1]+W*u,R[2]+W*u)}}n.addGroup(et,i.length/3-et,0)}function it(){const et=i.length/3;let Q=0;xt(X,Q),Q+=X.length;for(let R=0,Et=D.length;R<Et;R++){const nt=D[R];xt(nt,Q),Q+=nt.length}n.addGroup(et,i.length/3-et,1)}function xt(et,Q){let R=et.length;for(;--R>=0;){const Et=R;let nt=R-1;nt<0&&(nt=et.length-1);for(let N=0,at=u+m*2;N<at;N++){const Nt=W*N,Mt=W*(N+1),w=Q+Et+Nt,y=Q+nt+Nt,k=Q+nt+Mt,J=Q+Et+Mt;Dt(w,y,k,J)}}}function st(et,Q,R){l.push(et),l.push(Q),l.push(R)}function Ct(et,Q,R){Ot(et),Ot(Q),Ot(R);const Et=i.length/3,nt=E.generateTopUV(n,i,Et-3,Et-2,Et-1);Ht(nt[0]),Ht(nt[1]),Ht(nt[2])}function Dt(et,Q,R,Et){Ot(et),Ot(Q),Ot(Et),Ot(Q),Ot(R),Ot(Et);const nt=i.length/3,N=E.generateSideWallUV(n,i,nt-6,nt-3,nt-2,nt-1);Ht(N[0]),Ht(N[1]),Ht(N[3]),Ht(N[1]),Ht(N[2]),Ht(N[3])}function Ot(et){i.push(l[et*3+0]),i.push(l[et*3+1]),i.push(l[et*3+2])}function Ht(et){s.push(et.x),s.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return cy(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new fu[i.type]().fromJSON(i)),new oh(n,t.options)}}const ly={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],u=t[i*3+1];return[new bt(s,o),new bt(a,l),new bt(c,u)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],u=t[n*3+1],h=t[n*3+2],f=t[i*3],d=t[i*3+1],_=t[i*3+2],g=t[s*3],m=t[s*3+1],p=t[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new bt(o,1-l),new bt(c,1-h),new bt(f,1-_),new bt(g,1-p)]:[new bt(a,1-l),new bt(u,1-h),new bt(d,1-_),new bt(m,1-p)]}};function cy(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Al extends Xi{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new z,f=new z,d=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){const E=[],S=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){const A=C/e;h.x=-t*Math.cos(i+A*s)*Math.sin(o+S*a),h.y=t*Math.cos(o+S*a),h.z=t*Math.sin(i+A*s)*Math.sin(o+S*a),_.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(A+v,1-S),E.push(c++)}u.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){const S=u[p][E+1],v=u[p][E],C=u[p+1][E],A=u[p+1][E+1];(p!==0||o>0)&&d.push(S,v,A),(p!==n-1||l<Math.PI)&&d.push(v,C,A)}this.setIndex(d),this.setAttribute("position",new Jn(_,3)),this.setAttribute("normal",new Jn(g,3)),this.setAttribute("uv",new Jn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Al(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Vf extends na{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yd,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Gf={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class xp{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],_=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null}}}const uy=new xp;class ah{constructor(t){this.manager=t!==void 0?t:uy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ah.DEFAULT_MATERIAL_NAME="__DEFAULT";class hy extends ah{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Gf.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=ko("img");function l(){u(),Gf.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(h){u(),i&&i(h),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class fy extends ah{constructor(t){super(t)}load(t,e,n,i){const s=new on,o=new hy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class Sp extends an{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const uc=new Pe,Wf=new z,Xf=new z;class dy{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new eh,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Wf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wf),Xf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xf),e.updateMatrixWorld(),uc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class py extends dy{constructor(){super(new sp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class my extends Sp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new py}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _y extends Sp{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class gy{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Yf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Yf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Yf(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xu);function Ii(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Mp(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var zn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ys={duration:.5,overwrite:!1,delay:0},lh,ln,be,Zn=1e8,Me=1/Zn,_u=Math.PI*2,vy=_u/4,xy=0,yp=Math.sqrt,Sy=Math.cos,My=Math.sin,Ke=function(t){return typeof t=="string"},Ie=function(t){return typeof t=="function"},Gi=function(t){return typeof t=="number"},ch=function(t){return typeof t>"u"},Ti=function(t){return typeof t=="object"},Tn=function(t){return t!==!1},uh=function(){return typeof window<"u"},Ua=function(t){return Ie(t)||Ke(t)},Ep=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},cn=Array.isArray,gu=/(?:-?\.?\d|\.)+/gi,Tp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Cs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,hc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,bp=/[+-]=-?[.\d]+/,wp=/[^,'"\[\]\s]+/gi,yy=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ae,hi,vu,hh,kn={},ul={},Ap,Cp=function(t){return(ul=Kr(t,kn))&&Cn},fh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Wo=function(t,e){return!e&&console.warn(t)},Rp=function(t,e){return t&&(kn[t]=e)&&ul&&(ul[t]=e)||kn},Xo=function(){return 0},Ey={suppressEvents:!0,isStart:!0,kill:!1},tl={suppressEvents:!0,kill:!1},Ty={suppressEvents:!0},dh={},ur=[],xu={},Pp,Nn={},fc={},qf=30,el=[],ph="",mh=function(t){var e=t[0],n,i;if(Ti(e)||Ie(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=el.length;i--&&!el[i].targetTest(e););n=el[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new tm(t[i],n)))||t.splice(i,1);return t},kr=function(t){return t._gsap||mh(Kn(t))[0]._gsap},Dp=function(t,e,n){return(n=t[e])&&Ie(n)?t[e]():ch(n)&&t.getAttribute&&t.getAttribute(e)||n},bn=function(t,e){return(t=t.split(",")).forEach(e)||t},Ne=function(t){return Math.round(t*1e5)/1e5||0},Ze=function(t){return Math.round(t*1e7)/1e7||0},Us=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},by=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},hl=function(){var t=ur.length,e=ur.slice(0),n,i;for(xu={},ur.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Lp=function(t,e,n,i){ur.length&&!ln&&hl(),t.render(e,n,ln&&e<0&&(t._initted||t._startAt)),ur.length&&!ln&&hl()},Ip=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(wp).length<2?e:Ke(t)?t.trim():t},Up=function(t){return t},Qn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},wy=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Kr=function(t,e){for(var n in e)t[n]=e[n];return t},$f=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Ti(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},fl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},bo=function(t){var e=t.parent||Ae,n=t.keyframes?wy(cn(t.keyframes)):Qn;if(Tn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Ay=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Np=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Cl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},mr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Hr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Cy=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Su=function(t,e,n,i){return t._startAt&&(ln?t._startAt.revert(tl):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},Ry=function r(t){return!t||t._ts&&r(t.parent)},Zf=function(t){return t._repeat?qs(t._tTime,t=t.duration()+t._rDelay)*t:0},qs=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},dl=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Rl=function(t){return t._end=Ze(t._start+(t._tDur/Math.abs(t._ts||t._rts||Me)||0))},Pl=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Ze(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Rl(t),n._dirty||Hr(n,t)),t},Op=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=dl(t.rawTime(),e),(!e._dur||sa(0,e.totalDuration(),n)-e._tTime>Me)&&e.render(n,!0)),Hr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-Me}},pi=function(t,e,n,i){return e.parent&&mr(e),e._start=Ze((Gi(n)?n:n||t!==Ae?Gn(t,n,e):t._time)+e._delay),e._end=Ze(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Np(t,e,"_first","_last",t._sort?"_start":0),Mu(e)||(t._recent=e),i||Op(t,e),t._ts<0&&Pl(t,t._tTime),t},Fp=function(t,e){return(kn.ScrollTrigger||fh("scrollTrigger",e))&&kn.ScrollTrigger.create(e,t)},Bp=function(t,e,n,i,s){if(gh(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!ln&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Pp!==On.frame)return ur.push(t),t._lazy=[s,i],1},Py=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Mu=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Dy=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&Py(t)&&!(!t._initted&&Mu(t))||(t._ts<0||t._dp._ts<0)&&!Mu(t))?0:1,a=t._rDelay,l=0,c,u,h;if(a&&t._repeat&&(l=sa(0,t._tDur,e),u=qs(l,a),t._yoyo&&u&1&&(o=1-o),u!==qs(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||ln||i||t._zTime===Me||!e&&t._zTime){if(!t._initted&&Bp(t,e,i,n,l))return;for(h=t._zTime,t._zTime=e||(n?Me:0),n||(n=e&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Su(t,e,n,!0),t._onUpdate&&!n&&Bn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Bn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&mr(t,1),!n&&!ln&&(Bn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Ly=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},$s=function(t,e,n,i){var s=t._repeat,o=Ze(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Ze(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Pl(t,t._tTime=t._tDur*a),t.parent&&Rl(t),n||Hr(t.parent,t),t},Kf=function(t){return t instanceof xn?Hr(t):$s(t,t._dur)},Iy={_start:0,endTime:Xo,totalDuration:Xo},Gn=function r(t,e,n){var i=t.labels,s=t._recent||Iy,o=t.duration()>=Zn?s.endTime(!1):t._dur,a,l,c;return Ke(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(cn(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},wo=function(t,e,n){var i=Gi(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Tn(l.vars.inherit)&&l.parent;o.immediateRender=Tn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new ke(e[0],o,e[s+1])},vr=function(t,e){return t||t===0?e(t):e},sa=function(t,e,n){return n<t?t:n>e?e:n},rn=function(t,e){return!Ke(t)||!(e=yy.exec(t))?"":e[1]},Uy=function(t,e,n){return vr(n,function(i){return sa(t,e,i)})},yu=[].slice,zp=function(t,e){return t&&Ti(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ti(t[0]))&&!t.nodeType&&t!==hi},Ny=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Ke(i)&&!e||zp(i,1)?(s=n).push.apply(s,Kn(i)):n.push(i)})||n},Kn=function(t,e,n){return be&&!e&&be.selector?be.selector(t):Ke(t)&&!n&&(vu||!Zs())?yu.call((e||hh).querySelectorAll(t),0):cn(t)?Ny(t,n):zp(t)?yu.call(t,0):t?[t]:[]},Eu=function(t){return t=Kn(t)[0]||Wo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Kn(e,n.querySelectorAll?n:n===t?Wo("Invalid scope")||hh.createElement("div"):t)}},kp=function(t){return t.sort(function(){return .5-Math.random()})},Hp=function(t){if(Ie(t))return t;var e=Ti(t)?t:{each:t},n=Vr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,u=i,h=i;return Ke(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,_){var g=(_||e).length,m=o[g],p,E,S,v,C,A,b,P,M;if(!m){if(M=e.grid==="auto"?0:(e.grid||[1,Zn])[1],!M){for(b=-Zn;b<(b=_[M++].getBoundingClientRect().left)&&M<g;);M<g&&M--}for(m=o[g]=[],p=l?Math.min(M,g)*u-.5:i%M,E=M===Zn?0:l?g*h/M-.5:i/M|0,b=0,P=Zn,A=0;A<g;A++)S=A%M-p,v=E-(A/M|0),m[A]=C=c?Math.abs(c==="y"?v:S):yp(S*S+v*v),C>b&&(b=C),C<P&&(P=C);i==="random"&&kp(m),m.max=b-P,m.min=P,m.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(M>g?g-1:c?c==="y"?g/M:M:Math.max(M,g/M))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=rn(e.amount||e.each)||0,n=n&&g<0?Jp(n):n}return g=(m[f]-m.min)/m.max||0,Ze(m.b+(n?n(g):g)*m.v)+m.u}},Tu=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Ze(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Gi(n)?0:rn(n))}},Vp=function(t,e){var n=cn(t),i,s;return!n&&Ti(t)&&(i=n=t.radius||Zn,t.values?(t=Kn(t.values),(s=!Gi(t[0]))&&(i*=i)):t=Tu(t.increment)),vr(e,n?Ie(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Zn,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-a,d=t[h].y-l,f=f*f+d*d):f=Math.abs(t[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?t[u]:o,s||u===o||Gi(o)?u:u+rn(o)}:Tu(t))},Gp=function(t,e,n,i){return vr(cn(t)?!e:n===!0?!!(n=0):!i,function(){return cn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Oy=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},Fy=function(t,e){return function(n){return t(parseFloat(n))+(e||rn(n))}},By=function(t,e,n){return Xp(t,e,0,1,n)},Wp=function(t,e,n){return vr(n,function(i){return t[~~e(i)]})},zy=function r(t,e,n){var i=e-t;return cn(t)?Wp(t,r(0,t.length),e):vr(n,function(s){return(i+(s-t)%i)%i+t})},ky=function r(t,e,n){var i=e-t,s=i*2;return cn(t)?Wp(t,r(0,t.length-1),e):vr(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},Yo=function(t){for(var e=0,n="",i,s,o,a;~(i=t.indexOf("random(",e));)o=t.indexOf(")",i),a=t.charAt(i+7)==="[",s=t.substr(i+7,o-i-7).match(a?wp:gu),n+=t.substr(e,i-e)+Gp(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),e=o+1;return n+t.substr(e,t.length-e)},Xp=function(t,e,n,i,s){var o=e-t,a=i-n;return vr(s,function(l){return n+((l-t)/o*a||0)})},Hy=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=Ke(t),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(cn(t)&&!cn(e)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(r(t[c-1],t[c]));h--,s=function(_){_*=h;var g=Math.min(f,~~_);return u[g](_-g)},n=e}else i||(t=Kr(cn(t)?[]:{},t));if(!u){for(l in e)_h.call(a,t,l,"get",e[l]);s=function(_){return Sh(_,a)||(o?t.p:t)}}}return vr(n,s)},Jf=function(t,e,n){var i=t.labels,s=Zn,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Bn=function(t,e,n){var i=t.vars,s=i[e],o=be,a=t._ctx,l,c,u;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&ur.length&&hl(),a&&(be=a),u=l?s.apply(c,l):s.call(c),be=o,u},fo=function(t){return mr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!ln),t.progress()<1&&Bn(t,"onInterrupt"),t},Rs,Yp=[],qp=function(t){if(t)if(t=!t.name&&t.default||t,uh()||t.headless){var e=t.name,n=Ie(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Xo,render:Sh,add:_h,kill:iE,modifier:nE,rawVars:0},o={targetTest:0,get:0,getSetter:xh,aliases:{},register:0};if(Zs(),t!==i){if(Nn[e])return;Qn(i,Qn(fl(t,s),o)),Kr(i.prototype,Kr(s,fl(t,o))),Nn[i.prop=e]=i,t.targetTest&&(el.push(i),dh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Rp(e,i),t.register&&t.register(Cn,i,wn)}else Yp.push(t)},xe=255,po={aqua:[0,xe,xe],lime:[0,xe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,xe],navy:[0,0,128],white:[xe,xe,xe],olive:[128,128,0],yellow:[xe,xe,0],orange:[xe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[xe,0,0],pink:[xe,192,203],cyan:[0,xe,xe],transparent:[xe,xe,xe,0]},dc=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*xe+.5|0},$p=function(t,e,n){var i=t?Gi(t)?[t>>16,t>>8&xe,t&xe]:0:po.black,s,o,a,l,c,u,h,f,d,_;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),po[t])i=po[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&xe,i&xe,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&xe,t&xe]}else if(t.substr(0,3)==="hsl"){if(i=_=t.match(gu),!e)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=dc(l+1/3,s,o),i[1]=dc(l,s,o),i[2]=dc(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Tp),n&&i.length<4&&(i[3]=1),i}else i=t.match(gu)||po.transparent;i=i.map(Number)}return e&&!_&&(s=i[0]/xe,o=i[1]/xe,a=i[2]/xe,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Zp=function(t){var e=[],n=[],i=-1;return t.split(hr).forEach(function(s){var o=s.match(Cs)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},jf=function(t,e,n){var i="",s=(t+i).match(hr),o=e?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=$p(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Zp(t),l=n.c,l.join(i)!==u.c.join(i)))for(c=t.replace(hr,"1").split(Cs),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(hr),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},hr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in po)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),Vy=/hsl[a]?\(/,Kp=function(t){var e=t.join(" "),n;if(hr.lastIndex=0,hr.test(e))return n=Vy.test(e),t[1]=jf(t[1],n),t[0]=jf(t[0],n,Zp(t[1])),!0},qo,On=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,_=function g(m){var p=r()-i,E=m===!0,S,v,C,A;if((p>t||p<0)&&(n+=p-e),i+=p,C=i-n,S=C-o,(S>0||E)&&(A=++h.frame,f=C-h.time*1e3,h.time=C=C/1e3,o+=S+(S>=s?4:s-S),v=1),E||(l=c(g)),v)for(d=0;d<a.length;d++)a[d](C,f,A,m)};return h={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Ap&&(!vu&&uh()&&(hi=vu=window,hh=hi.document||{},kn.gsap=Cn,(hi.gsapVersions||(hi.gsapVersions=[])).push(Cn.version),Cp(ul||hi.GreenSockGlobals||!hi.gsap&&hi||{}),Yp.forEach(qp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},qo=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),qo=0,c=Xo},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,p,E){var S=p?function(v,C,A,b){m(v,C,A,b),h.remove(S)}:m;return h.remove(m),a[E?"unshift":"push"](S),Zs(),S},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},h}(),Zs=function(){return!qo&&On.wake()},oe={},Gy=/^[\d.\-M][\d.\-,\s]/,Wy=/["']/g,Xy=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(Wy,"").trim():+c,i=l.substr(a+1).trim();return e},Yy=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},qy=function(t){var e=(t+"").split("("),n=oe[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Xy(e[1])]:Yy(t).split(",").map(Ip)):oe._CE&&Gy.test(t)?oe._CE("",t):n},Jp=function(t){return function(e){return 1-t(1-e)}},jp=function r(t,e){for(var n=t._first,i;n;)n instanceof xn?r(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?r(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},Vr=function(t,e){return t&&(Ie(t)?t:oe[t]||qy(t))||e},is=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return bn(t,function(a){oe[a]=kn[a]=s,oe[o=a.toLowerCase()]=n;for(var l in s)oe[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=oe[a+"."+l]=s[l]}),s},Qp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},pc=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/_u*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*My((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Qp(a);return s=_u/s,l.config=function(c,u){return r(t,c,u)},l},mc=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Qp(n);return i.config=function(s){return r(t,s)},i};bn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;is(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});oe.Linear.easeNone=oe.none=oe.Linear.easeIn;is("Elastic",pc("in"),pc("out"),pc());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};is("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);is("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});is("Circ",function(r){return-(yp(1-r*r)-1)});is("Sine",function(r){return r===1?1:-Sy(r*vy)+1});is("Back",mc("in"),mc("out"),mc());oe.SteppedEase=oe.steps=kn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-Me;return function(a){return((i*sa(0,o,a)|0)+s)*n}}};Ys.ease=oe["quad.out"];bn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ph+=r+","+r+"Params,"});var tm=function(t,e){this.id=xy++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Dp,this.set=e?e.getSetter:xh},$o=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,$s(this,+e.duration,1,1),this.data=e.data,be&&(this._ctx=be,be.data.push(this)),qo||On.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,$s(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Zs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Pl(this,n),!s._dp||s.parent||Op(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&pi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Me||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Lp(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Zf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Zf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?qs(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-Me?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?dl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Me?0:this._rts,this.totalTime(sa(-Math.abs(this._delay),this._tDur,s),i!==!1),Rl(this),Cy(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Zs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Me&&(this._tTime-=Me)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&pi(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Tn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?dl(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Ty);var i=ln;return ln=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),ln=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Kf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Kf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Gn(this,n),Tn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Tn(i))},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Me:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Me,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Me)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this;return new Promise(function(s){var o=Ie(n)?n:Up,a=function(){var c=i.then;i.then=null,Ie(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},t.kill=function(){fo(this)},r}();Qn($o.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Me,_prom:0,_ps:!1,_rts:1});var xn=function(r){Mp(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Tn(n.sortChildren),Ae&&pi(n.parent||Ae,Ii(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Fp(Ii(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return wo(0,arguments,this),this},e.from=function(i,s,o){return wo(1,arguments,this),this},e.fromTo=function(i,s,o,a){return wo(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,bo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new ke(i,s,Gn(this,o),1),this},e.call=function(i,s,o){return pi(this,ke.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new ke(i,o,Gn(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,bo(o).immediateRender=Tn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},e.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,bo(a).immediateRender=Tn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Ze(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,_,g,m,p,E,S,v,C,A,b;if(this!==Ae&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,S=this._ts,p=!S,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Ze(u%m),u===l?(g=this._repeat,f=c):(g=~~(u/m),g&&g===u/m&&(f=c,g--),f>c&&(f=c)),C=qs(this._tTime,m),!a&&this._tTime&&C!==g&&this._tTime-C*m-this._dur<=0&&(C=g),A&&g&1&&(f=c-f,b=1),g!==C&&!this._lock){var P=A&&C&1,M=P===(A&&g&1);if(g<C&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(b?0:Ze(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Bn(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;jp(this,b)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(E=Ly(this,Ze(a),Ze(f)),E&&(u-=f-(f=E._start))),this._tTime=u,this._time=f,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(Bn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(_=d._next,(d._act||f>=d._start)&&d._ts&&E!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!p){E=0,_&&(u+=this._zTime=-Me);break}}d=_}else{d=this._last;for(var x=i<0?i:f;d;){if(_=d._prev,(d._act||x<=d._end)&&d._ts&&E!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,o||ln&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!p){E=0,_&&(u+=this._zTime=x?-Me:Me);break}}d=_}}if(E&&!s&&(this.pause(),E.render(f>=a?0:-Me)._zTime=f>=a?1:-1,this._ts))return this._start=v,Rl(this),this.render(i,s,o);this._onUpdate&&!s&&Bn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&mr(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Bn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(Gi(s)||(s=Gn(this,s,i)),!(i instanceof $o)){if(cn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Ke(i))return this.addLabel(i,s);if(Ie(i))i=ke.delayedCall(0,i);else return this}return this!==i?pi(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Zn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof ke?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return Ke(i)?this.removeLabel(i):Ie(i)?this.killTweensOf(i):(Cl(this,i),i===this._recent&&(this._recent=this._last),Hr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ze(On.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Gn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=ke.delayedCall(0,s||Xo,o);return a.data="isPause",this._hasPause=1,pi(this,a,Gn(this,i))},e.removePause=function(i){var s=this._first;for(i=Gn(this,i);s;)s._start===i&&s.data==="isPause"&&mr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ir!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=Kn(i),l=this._first,c=Gi(s),u;l;)l instanceof ke?by(l._targets,a)&&(c?(!ir||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=Gn(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,_=ke.to(o,Qn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Me,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&$s(_,m,0,1).render(_._time,!0,!0),d=1}u&&u.apply(_,h||[])}},s));return f?_.render(0):_},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,Qn({startAt:{time:Gn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Jf(this,Gn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Jf(this,Gn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Me)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Hr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Hr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=Zn,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,pi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;$s(o,o===Ae&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(Ae._ts&&(Lp(Ae,dl(i,Ae)),Pp=On.frame),On.frame>=qf){qf+=zn.autoSleep||120;var s=Ae._first;if((!s||!s._ts)&&zn.autoSleep&&On._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||On.sleep()}}},t}($o);Qn(xn.prototype,{_lock:0,_hasPause:0,_forcing:0});var $y=function(t,e,n,i,s,o,a){var l=new wn(this._pt,t,e,0,1,om,null,s),c=0,u=0,h,f,d,_,g,m,p,E;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Yo(i)),o&&(E=[n,i],o(E,t,e),n=E[0],i=E[1]),f=n.match(hc)||[];h=hc.exec(i);)_=h[0],g=i.substring(c,h.index),d?d=(d+1)%5:g.substr(-5)==="rgba("&&(d=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?Us(m,_)-m:parseFloat(_)-m,m:d&&d<4?Math.round:0},c=hc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(bp.test(i)||p)&&(l.e=0),this._pt=l,l},_h=function(t,e,n,i,s,o,a,l,c,u){Ie(i)&&(i=i(s||0,t,o));var h=t[e],f=n!=="get"?n:Ie(h)?c?t[e.indexOf("set")||!Ie(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,d=Ie(h)?c?Qy:rm:vh,_;if(Ke(i)&&(~i.indexOf("random(")&&(i=Yo(i)),i.charAt(1)==="="&&(_=Us(f,i)+(rn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||bu)return!isNaN(f*i)&&i!==""?(_=new wn(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?eE:sm,0,d),c&&(_.fp=c),a&&_.modifier(a,this,t),this._pt=_):(!h&&!(e in t)&&fh(e,i),$y.call(this,t,e,f,i,d,l||zn.stringFilter,c))},Zy=function(t,e,n,i,s){if(Ie(t)&&(t=Ao(t,s,e,n,i)),!Ti(t)||t.style&&t.nodeType||cn(t)||Ep(t))return Ke(t)?Ao(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Ao(t[a],s,e,n,i);return o},em=function(t,e,n,i,s,o){var a,l,c,u;if(Nn[t]&&(a=new Nn[t]).init(s,a.rawVars?e[t]:Zy(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new wn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==Rs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ir,bu,gh=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,_=t._dur,g=t._startAt,m=t._targets,p=t.parent,E=p&&p.data==="nested"?p.vars.targets:m,S=t._overwrite==="auto"&&!lh,v=t.timeline,C,A,b,P,M,x,D,O,B,X,q,W,Y;if(v&&(!f||!s)&&(s="none"),t._ease=Vr(s,Ys.ease),t._yEase=h?Jp(Vr(h===!0?s:h,Ys.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(O=m[0]?kr(m[0]).harness:0,W=O&&i[O.prop],C=fl(i,dh),g&&(g._zTime<0&&g.progress(1),e<0&&u&&a&&!d?g.render(-1,!0):g.revert(u&&_?tl:Ey),g._lazy=0),o){if(mr(t._startAt=ke.set(m,Qn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&Tn(l),startAt:null,delay:0,onUpdate:c&&function(){return Bn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(ln||!a&&!d)&&t._startAt.revert(tl),a&&_&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&_&&!g){if(e&&(a=!1),b=Qn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Tn(l),immediateRender:a,stagger:0,parent:p},C),W&&(b[O.prop]=W),mr(t._startAt=ke.set(m,b)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(ln?t._startAt.revert(tl):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,Me,Me);else if(!e)return}for(t._pt=t._ptCache=0,l=_&&Tn(l)||l&&!_,A=0;A<m.length;A++){if(M=m[A],D=M._gsap||mh(m)[A]._gsap,t._ptLookup[A]=X={},xu[D.id]&&ur.length&&hl(),q=E===m?A:E.indexOf(M),O&&(B=new O).init(M,W||C,t,q,E)!==!1&&(t._pt=P=new wn(t._pt,M,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(H){X[H]=P}),B.priority&&(x=1)),!O||W)for(b in C)Nn[b]&&(B=em(b,C,t,q,M,E))?B.priority&&(x=1):X[b]=P=_h.call(t,M,b,"get",C[b],q,E,0,i.stringFilter);t._op&&t._op[A]&&t.kill(M,t._op[A]),S&&t._pt&&(ir=t,Ae.killTweensOf(M,X,t.globalTime(e)),Y=!t.parent,ir=0),t._pt&&l&&(xu[D.id]=1)}x&&am(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Y,f&&e<=0&&v.render(Zn,!0,!0)},Ky=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return bu=1,t.vars[e]="+=0",gh(t,a),bu=0,l?Wo(e+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Ne(n)+rn(h.e)),h.b&&(h.b=u.s+rn(h.b))},Jy=function(t,e){var n=t[0]?kr(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=Kr({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},jy=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(cn(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Ao=function(t,e,n,i,s){return Ie(t)?t.call(e,n,i,s):Ke(t)&&~t.indexOf("random(")?Yo(t):t},nm=ph+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",im={};bn(nm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return im[r]=1});var ke=function(r){Mp(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:bo(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,E=i.parent||Ae,S=(cn(n)||Ep(n)?Gi(n[0]):"length"in i)?[n]:Kn(n),v,C,A,b,P,M,x,D;if(a._targets=S.length?mh(S):Wo("GSAP target "+n+" not found. https://gsap.com",!zn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,_||f||Ua(c)||Ua(u)){if(i=a.vars,v=a.timeline=new xn({data:"nested",defaults:g||{},targets:E&&E.data==="nested"?E.vars.targets:S}),v.kill(),v.parent=v._dp=Ii(a),v._start=0,f||Ua(c)||Ua(u)){if(b=S.length,x=f&&Hp(f),Ti(f))for(P in f)~nm.indexOf(P)&&(D||(D={}),D[P]=f[P]);for(C=0;C<b;C++)A=fl(i,im),A.stagger=0,p&&(A.yoyoEase=p),D&&Kr(A,D),M=S[C],A.duration=+Ao(c,Ii(a),C,M,S),A.delay=(+Ao(u,Ii(a),C,M,S)||0)-a._delay,!f&&b===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),v.to(M,A,x?x(C,M,S):0),v._ease=oe.none;v.duration()?c=u=0:a.timeline=0}else if(_){bo(Qn(v.vars.defaults,{ease:"none"})),v._ease=Vr(_.ease||i.ease||"none");var O=0,B,X,q;if(cn(_))_.forEach(function(W){return v.to(S,W,">")}),v.duration();else{A={};for(P in _)P==="ease"||P==="easeEach"||jy(P,_[P],A,_.easeEach);for(P in A)for(B=A[P].sort(function(W,Y){return W.t-Y.t}),O=0,C=0;C<B.length;C++)X=B[C],q={ease:X.e,duration:(X.t-(C?B[C-1].t:0))/100*c},q[P]=X.v,v.to(S,q,O),O+=q.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!lh&&(ir=Ii(a),Ae.killTweensOf(S),ir=0),pi(E,Ii(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!_&&a._start===Ze(E._time)&&Tn(h)&&Ry(Ii(a))&&E.data!=="nested")&&(a._tTime=-Me,a.render(Math.max(0,-u)||0)),m&&Fp(Ii(a),m),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-Me&&!u?l:i<Me?0:i,f,d,_,g,m,p,E,S,v;if(!c)Dy(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(f=h,S=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=Ze(h%g),h===l?(_=this._repeat,f=c):(_=~~(h/g),_&&_===Ze(h/g)&&(f=c,_--),f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=qs(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=h,this;_!==m&&(S&&this._yEase&&jp(S,p),this.vars.repeatRefresh&&!p&&!this._lock&&this._time!==g&&this._initted&&(this._lock=o=1,this.render(Ze(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(Bp(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=E=(v||this._ease)(f/c),this._from&&(this.ratio=E=1-E),f&&!a&&!s&&!_&&(Bn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(E,d.d),d=d._next;S&&S.render(i<0?i:S._dur*S._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Su(this,i,s,o),Bn(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&Bn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Su(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&mr(this,1),!s&&!(u&&!a)&&(h||a||p)&&(Bn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){qo||On.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||gh(this,c),u=this._ease(c/this._dur),Ky(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Pl(this,0),this.parent||Np(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?fo(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ir&&ir.vars.overwrite!==!0)._first||fo(this),this.parent&&o!==this.timeline.totalDuration()&&$s(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Kn(i):a,c=this._ptLookup,u=this._pt,h,f,d,_,g,m,p;if((!s||s==="all")&&Ay(a,l))return s==="all"&&(this._pt=0),fo(this);for(h=this._op=this._op||[],s!=="all"&&(Ke(s)&&(g={},bn(s,function(E){return g[E]=1}),s=g),s=Jy(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(h[p]=s,_=f,d={}):(d=h[p]=h[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Cl(this,m,"_pt"),delete f[g]),d!=="all"&&(d[g]=1)}return this._initted&&!this._pt&&u&&fo(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return wo(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return wo(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return Ae.killTweensOf(i,s,o)},t}($o);Qn(ke.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});bn("staggerTo,staggerFrom,staggerFromTo",function(r){ke[r]=function(){var t=new xn,e=yu.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var vh=function(t,e,n){return t[e]=n},rm=function(t,e,n){return t[e](n)},Qy=function(t,e,n,i){return t[e](i.fp,n)},tE=function(t,e,n){return t.setAttribute(e,n)},xh=function(t,e){return Ie(t[e])?rm:ch(t[e])&&t.setAttribute?tE:vh},sm=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},eE=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},om=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Sh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},nE=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},iE=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Cl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},rE=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},am=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},wn=function(){function r(e,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||sm,this.d=l||this,this.set=c||vh,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=rE,this.m=n,this.mt=s,this.tween=i},r}();bn(ph+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return dh[r]=1});kn.TweenMax=kn.TweenLite=ke;kn.TimelineLite=kn.TimelineMax=xn;Ae=new xn({sortChildren:!1,defaults:Ys,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});zn.stringFilter=Kp;var Gr=[],nl={},sE=[],Qf=0,oE=0,_c=function(t){return(nl[t]||sE).map(function(e){return e()})},wu=function(){var t=Date.now(),e=[];t-Qf>2&&(_c("matchMediaInit"),Gr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=hi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),_c("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Qf=t,_c("matchMedia"))},lm=function(){function r(e,n){this.selector=n&&Eu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=oE++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Ie(n)&&(s=i,i=n,n=Ie);var o=this,a=function(){var c=be,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Eu(s)),be=o,h=i.apply(o,arguments),Ie(h)&&o._r.push(h),be=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Ie?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=be;be=null,n(this),be=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof ke&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof xn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ke)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Gr.length;o--;)Gr[o].id===this.id&&Gr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),aE=function(){function r(e){this.contexts=[],this.scope=e,be&&be.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Ti(n)||(n={matches:n});var o=new lm(0,s||this.scope),a=o.conditions={},l,c,u;be&&!o.selector&&(o.selector=be.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=hi.matchMedia(n[c]),l&&(Gr.indexOf(o)<0&&Gr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(wu):l.addEventListener("change",wu)));return u&&i(o,function(h){return o.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),pl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return qp(i)})},timeline:function(t){return new xn(t)},getTweensOf:function(t,e){return Ae.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ke(t)&&(t=Kn(t)[0]);var s=kr(t||{}).get,o=n?Up:Ip;return n==="native"&&(n=""),t&&(e?o((Nn[e]&&Nn[e].get||s)(t,e,n,i)):function(a,l,c){return o((Nn[a]&&Nn[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Kn(t),t.length>1){var i=t.map(function(u){return Cn.quickSetter(u,e,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var o=Nn[e],a=kr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var h=new o;Rs._pt=0,h.init(t,n?u+n:u,Rs,0,[t]),h.render(1,h),Rs._pt&&Sh(1,Rs)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var i,s=Cn.to(t,Kr((i={},i[e]="+=0.1",i.paused=!0,i),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return Ae.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Vr(t.ease,Ys.ease)),$f(Ys,t||{})},config:function(t){return $f(zn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Nn[a]&&!kn[a]&&Wo(e+" effect requires "+a+" plugin.")}),fc[e]=function(a,l,c){return n(Kn(a),Qn(l||{},s),c)},o&&(xn.prototype[e]=function(a,l,c){return this.add(fc[e](a,Ti(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){oe[t]=Vr(e)},parseEase:function(t,e){return arguments.length?Vr(t,e):oe},getById:function(t){return Ae.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new xn(t),i,s;for(n.smoothChildTiming=Tn(t.smoothChildTiming),Ae.remove(n),n._dp=0,n._time=n._tTime=Ae._time,i=Ae._first;i;)s=i._next,(e||!(!i._dur&&i instanceof ke&&i.vars.onComplete===i._targets[0]))&&pi(n,i,i._start-i._delay),i=s;return pi(Ae,n,0),n},context:function(t,e){return t?new lm(t,e):be},matchMedia:function(t){return new aE(t)},matchMediaRefresh:function(){return Gr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||wu()},addEventListener:function(t,e){var n=nl[t]||(nl[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=nl[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:zy,wrapYoyo:ky,distribute:Hp,random:Gp,snap:Vp,normalize:By,getUnit:rn,clamp:Uy,splitColor:$p,toArray:Kn,selector:Eu,mapRange:Xp,pipe:Oy,unitize:Fy,interpolate:Hy,shuffle:kp},install:Cp,effects:fc,ticker:On,updateRoot:xn.updateRoot,plugins:Nn,globalTimeline:Ae,core:{PropTween:wn,globals:Rp,Tween:ke,Timeline:xn,Animation:$o,getCache:kr,_removeLinkedListItem:Cl,reverting:function(){return ln},context:function(t){return t&&be&&(be.data.push(t),t._ctx=be),be},suppressOverwrites:function(t){return lh=t}}};bn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return pl[r]=ke[r]});On.add(xn.updateRoot);Rs=pl.to({},{duration:0});var lE=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},cE=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=lE(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},gc=function(t,e){return{name:t,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Ke(s)&&(l={},bn(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}cE(a,s)}}}},Cn=pl.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)ln?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},gc("roundProps",Tu),gc("modifiers"),gc("snap",Vp))||pl;ke.version=xn.version=Cn.version="3.12.5";Ap=1;uh()&&Zs();oe.Power0;oe.Power1;oe.Power2;oe.Power3;oe.Power4;oe.Linear;oe.Quad;oe.Cubic;oe.Quart;oe.Quint;oe.Strong;oe.Elastic;oe.Back;oe.SteppedEase;oe.Bounce;oe.Sine;oe.Expo;oe.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var td,rr,Ns,Mh,Or,ed,yh,uE=function(){return typeof window<"u"},Wi={},Rr=180/Math.PI,Os=Math.PI/180,xs=Math.atan2,nd=1e8,Eh=/([A-Z])/g,hE=/(left|right|width|margin|padding|x)/i,fE=/[\s,\(]\S/,_i={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Au=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},dE=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},pE=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},mE=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},cm=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},um=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},_E=function(t,e,n){return t.style[e]=n},gE=function(t,e,n){return t.style.setProperty(e,n)},vE=function(t,e,n){return t._gsap[e]=n},xE=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},SE=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},ME=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Re="transform",An=Re+"Origin",yE=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Wi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=_i[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Ui(i,a)}):this.tfm[t]=o.x?o[t]:Ui(i,t),t===An&&(this.tfm.zOrigin=o.zOrigin);else return _i.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(Re)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(An,e,"")),t=Re}(s||e)&&this.props.push(t,e,s[t])},hm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},EE=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Eh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=yh(),(!s||!s.isStart)&&!n[Re]&&(hm(n),i.zOrigin&&n[An]&&(n[An]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},fm=function(t,e){var n={target:t,props:[],revert:EE,save:yE};return t._gsap||Cn.core.getCache(t),e&&e.split(",").forEach(function(i){return n.save(i)}),n},dm,Cu=function(t,e){var n=rr.createElementNS?rr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):rr.createElement(t);return n&&n.style?n:rr.createElement(t)},Si=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Eh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ks(e)||e,1)||""},id="O,Moz,ms,Ms,Webkit".split(","),Ks=function(t,e,n){var i=e||Or,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(id[o]+t in s););return o<0?null:(o===3?"ms":o>=0?id[o]:"")+t},Ru=function(){uE()&&window.document&&(td=window,rr=td.document,Ns=rr.documentElement,Or=Cu("div")||{style:{}},Cu("div"),Re=Ks(Re),An=Re+"Origin",Or.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",dm=!!Ks("perspective"),yh=Cn.core.reverting,Mh=1)},vc=function r(t){var e=Cu("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,o;if(Ns.appendChild(e),e.appendChild(this),this.style.display="block",t)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),Ns.removeChild(e),this.style.cssText=s,o},rd=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},pm=function(t){var e;try{e=t.getBBox()}catch{e=vc.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===vc||(e=vc.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+rd(t,["x","cx","x1"])||0,y:+rd(t,["y","cy","y1"])||0,width:0,height:0}:e},mm=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&pm(t))},Jr=function(t,e){if(e){var n=t.style,i;e in Wi&&e!==An&&(e=Re),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Eh,"-$1").toLowerCase())):n.removeAttribute(e)}},sr=function(t,e,n,i,s,o){var a=new wn(t._pt,e,n,0,1,o?um:cm);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},sd={deg:1,rad:1,turn:1},TE={grid:1,flex:1},_r=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Or.style,l=hE.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",_,g,m,p;if(i===o||!s||sd[i]||sd[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),p=t.getCTM&&mm(t),(d||o==="%")&&(Wi[e]||~e.indexOf("adius")))return _=p?t.getBBox()[l?"width":"height"]:t[u],Ne(d?s/_*h:s/100*_);if(a[l?"width":"height"]=h+(f?o:i),g=~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===rr||!g.appendChild)&&(g=rr.body),m=g._gsap,m&&d&&m.width&&l&&m.time===On.time&&!m.uncache)return Ne(s/m.width*h);if(d&&(e==="height"||e==="width")){var E=t.style[e];t.style[e]=h+i,_=t[u],E?t.style[e]=E:Jr(t,e)}else(d||o==="%")&&!TE[Si(g,"display")]&&(a.position=Si(t,"position")),g===t&&(a.position="static"),g.appendChild(Or),_=Or[u],g.removeChild(Or),a.position="absolute";return l&&d&&(m=kr(g),m.time=On.time,m.width=g[u]),Ne(f?_*s/h:_&&s?h/_*s:0)},Ui=function(t,e,n,i){var s;return Mh||Ru(),e in _i&&e!=="transform"&&(e=_i[e],~e.indexOf(",")&&(e=e.split(",")[0])),Wi[e]&&e!=="transform"?(s=Ko(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:_l(Si(t,An))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=ml[e]&&ml[e](t,e,n)||Si(t,e)||Dp(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?_r(t,e,s,n)+n:s},bE=function(t,e,n,i){if(!n||n==="none"){var s=Ks(e,t,1),o=s&&Si(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=Si(t,"borderTopColor"))}var a=new wn(this._pt,t.style,e,0,1,om),l=0,c=0,u,h,f,d,_,g,m,p,E,S,v,C;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=t.style[e],t.style[e]=i,i=Si(t,e)||i,g?t.style[e]=g:Jr(t,e)),u=[n,i],Kp(u),n=u[0],i=u[1],f=n.match(Cs)||[],C=i.match(Cs)||[],C.length){for(;h=Cs.exec(i);)m=h[0],E=i.substring(l,h.index),_?_=(_+1)%5:(E.substr(-5)==="rgba("||E.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(d=parseFloat(g)||0,v=g.substr((d+"").length),m.charAt(1)==="="&&(m=Us(d,m)+v),p=parseFloat(m),S=m.substr((p+"").length),l=Cs.lastIndex-S.length,S||(S=S||zn.units[e]||v,l===i.length&&(i+=S,a.e+=S)),v!==S&&(d=_r(t,e,g,S)||0),a._pt={_next:a._pt,p:E||c===1?E:",",s:d,c:p-d,m:_&&_<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?um:cm;return bp.test(i)&&(a.e=0),this._pt=a,a},od={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wE=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=od[n]||n,e[1]=od[i]||i,e.join(" ")},AE=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Wi[a]&&(l=1,a=a==="transformOrigin"?An:Re),Jr(n,a);l&&(Jr(n,Re),o&&(o.svg&&n.removeAttribute("transform"),Ko(n,1),o.uncache=1,hm(i)))}},ml={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new wn(t._pt,e,n,0,0,AE);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},Zo=[1,0,0,1,0,0],_m={},gm=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},ad=function(t){var e=Si(t,Re);return gm(e)?Zo:e.substr(7).match(Tp).map(Ne)},Th=function(t,e){var n=t._gsap||kr(t),i=t.style,s=ad(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Zo:s):(s===Zo&&!t.offsetParent&&t!==Ns&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent)&&(c=1,a=t.nextElementSibling,Ns.appendChild(t)),s=ad(t),l?i.display=l:Jr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Ns.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Pu=function(t,e,n,i,s,o){var a=t._gsap,l=s||Th(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],_=l[1],g=l[2],m=l[3],p=l[4],E=l[5],S=e.split(" "),v=parseFloat(S[0])||0,C=parseFloat(S[1])||0,A,b,P,M;n?l!==Zo&&(b=d*m-_*g)&&(P=v*(m/b)+C*(-g/b)+(g*E-m*p)/b,M=v*(-_/b)+C*(d/b)-(d*E-_*p)/b,v=P,C=M):(A=pm(t),v=A.x+(~S[0].indexOf("%")?v/100*A.width:v),C=A.y+(~(S[1]||S[0]).indexOf("%")?C/100*A.height:C)),i||i!==!1&&a.smooth?(p=v-c,E=C-u,a.xOffset=h+(p*d+E*g)-p,a.yOffset=f+(p*_+E*m)-E):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=C,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[An]="0px 0px",o&&(sr(o,a,"xOrigin",c,v),sr(o,a,"yOrigin",u,C),sr(o,a,"xOffset",h,a.xOffset),sr(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+C)},Ko=function(t,e){var n=t._gsap||new tm(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=Si(t,An)||"0",u,h,f,d,_,g,m,p,E,S,v,C,A,b,P,M,x,D,O,B,X,q,W,Y,H,rt,L,ct,Ut,Kt,Z,it;return u=h=f=g=m=p=E=S=v=0,d=_=1,n.svg=!!(t.getCTM&&mm(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Re]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Re]!=="none"?l[Re]:"")),i.scale=i.rotate=i.translate="none"),b=Th(t,n.svg),n.svg&&(n.uncache?(H=t.getBBox(),c=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",Y=""):Y=!e&&t.getAttribute("data-svg-origin"),Pu(t,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,b)),C=n.xOrigin||0,A=n.yOrigin||0,b!==Zo&&(D=b[0],O=b[1],B=b[2],X=b[3],u=q=b[4],h=W=b[5],b.length===6?(d=Math.sqrt(D*D+O*O),_=Math.sqrt(X*X+B*B),g=D||O?xs(O,D)*Rr:0,E=B||X?xs(B,X)*Rr+g:0,E&&(_*=Math.abs(Math.cos(E*Os))),n.svg&&(u-=C-(C*D+A*B),h-=A-(C*O+A*X))):(it=b[6],Kt=b[7],L=b[8],ct=b[9],Ut=b[10],Z=b[11],u=b[12],h=b[13],f=b[14],P=xs(it,Ut),m=P*Rr,P&&(M=Math.cos(-P),x=Math.sin(-P),Y=q*M+L*x,H=W*M+ct*x,rt=it*M+Ut*x,L=q*-x+L*M,ct=W*-x+ct*M,Ut=it*-x+Ut*M,Z=Kt*-x+Z*M,q=Y,W=H,it=rt),P=xs(-B,Ut),p=P*Rr,P&&(M=Math.cos(-P),x=Math.sin(-P),Y=D*M-L*x,H=O*M-ct*x,rt=B*M-Ut*x,Z=X*x+Z*M,D=Y,O=H,B=rt),P=xs(O,D),g=P*Rr,P&&(M=Math.cos(P),x=Math.sin(P),Y=D*M+O*x,H=q*M+W*x,O=O*M-D*x,W=W*M-q*x,D=Y,q=H),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),d=Ne(Math.sqrt(D*D+O*O+B*B)),_=Ne(Math.sqrt(W*W+it*it)),P=xs(q,W),E=Math.abs(P)>2e-4?P*Rr:0,v=Z?1/(Z<0?-Z:Z):0),n.svg&&(Y=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!gm(Si(t,Re)),Y&&t.setAttribute("transform",Y))),Math.abs(E)>90&&Math.abs(E)<270&&(s?(d*=-1,E+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,E+=E<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Ne(d),n.scaleY=Ne(_),n.rotation=Ne(g)+a,n.rotationX=Ne(m)+a,n.rotationY=Ne(p)+a,n.skewX=E+a,n.skewY=S+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[An]=_l(c)),n.xOffset=n.yOffset=0,n.force3D=zn.force3D,n.renderTransform=n.svg?RE:dm?vm:CE,n.uncache=0,n},_l=function(t){return(t=t.split(" "))[0]+" "+t[1]},xc=function(t,e,n){var i=rn(e);return Ne(parseFloat(e)+parseFloat(_r(t,"x",n+"px",i)))+i},CE=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,vm(t,e)},br="0deg",ao="0px",wr=") ",vm=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,E=n.target,S=n.zOrigin,v="",C=p==="auto"&&t&&t!==1||p===!0;if(S&&(h!==br||u!==br)){var A=parseFloat(u)*Os,b=Math.sin(A),P=Math.cos(A),M;A=parseFloat(h)*Os,M=Math.cos(A),o=xc(E,o,b*M*-S),a=xc(E,a,-Math.sin(A)*-S),l=xc(E,l,P*M*-S+S)}m!==ao&&(v+="perspective("+m+wr),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(C||o!==ao||a!==ao||l!==ao)&&(v+=l!==ao||C?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+wr),c!==br&&(v+="rotate("+c+wr),u!==br&&(v+="rotateY("+u+wr),h!==br&&(v+="rotateX("+h+wr),(f!==br||d!==br)&&(v+="skew("+f+", "+d+wr),(_!==1||g!==1)&&(v+="scale("+_+", "+g+wr),E.style[Re]=v||"translate(0, 0)"},RE=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,E=n.forceCSS,S=parseFloat(o),v=parseFloat(a),C,A,b,P,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Os,c*=Os,C=Math.cos(l)*h,A=Math.sin(l)*h,b=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=Os,M=Math.tan(c-u),M=Math.sqrt(1+M*M),b*=M,P*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),C*=M,A*=M)),C=Ne(C),A=Ne(A),b=Ne(b),P=Ne(P)):(C=h,P=f,A=b=0),(S&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(S=_r(d,"x",o,"px"),v=_r(d,"y",a,"px")),(_||g||m||p)&&(S=Ne(S+_-(_*C+g*b)+m),v=Ne(v+g-(_*A+g*P)+p)),(i||s)&&(M=d.getBBox(),S=Ne(S+i/100*M.width),v=Ne(v+s/100*M.height)),M="matrix("+C+","+A+","+b+","+P+","+S+","+v+")",d.setAttribute("transform",M),E&&(d.style[Re]=M)},PE=function(t,e,n,i,s){var o=360,a=Ke(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Rr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*nd)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*nd)%o-~~(c/o)*o)),t._pt=f=new wn(t._pt,e,n,i,c,dE),f.e=u,f.u="deg",t._props.push(n),f},ld=function(t,e){for(var n in e)t[n]=e[n];return t},DE=function(t,e,n){var i=ld({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Re]=e,a=Ko(n,1),Jr(n,Re),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Re],o[Re]=e,a=Ko(n,1),o[Re]=c);for(l in Wi)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=rn(c),_=rn(u),h=d!==_?_r(n,l,c,_):parseFloat(c),f=parseFloat(u),t._pt=new wn(t._pt,a,l,h,f-h,Au),t._pt.u=_||0,t._props.push(l));ld(a,i)};bn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});ml[t>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(_){return Ui(a,_,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(_,g){return d[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,d,h)}});var xm={name:"css",register:Ru,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,h,f,d,_,g,m,p,E,S,v,C,A,b,P;Mh||Ru(),this.styles=this.styles||fm(t),P=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(u=e[g],!(Nn[g]&&em(g,e,n,i,t,s)))){if(d=typeof u,_=ml[g],d==="function"&&(u=u.call(n,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Yo(u)),_)_(this,t,g,u,n)&&(b=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),u+="",hr.lastIndex=0,hr.test(c)||(m=rn(c),p=rn(u)),p?m!==p&&(c=_r(t,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(d!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,t,s):l[g],Ke(c)&&~c.indexOf("random(")&&(c=Yo(c)),rn(c+"")||c==="auto"||(c+=zn.units[g]||rn(Ui(t,g))||""),(c+"").charAt(1)==="="&&(c=Ui(t,g))):c=Ui(t,g),f=parseFloat(c),E=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),E&&(u=u.substr(2)),h=parseFloat(u),g in _i&&(g==="autoAlpha"&&(f===1&&Ui(t,"visibility")==="hidden"&&h&&(f=0),P.push("visibility",0,a.visibility),sr(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=_i[g],~g.indexOf(",")&&(g=g.split(",")[0]))),S=g in Wi,S){if(this.styles.save(g),v||(C=t._gsap,C.renderTransform&&!e.parseTransform||Ko(t,e.parseTransform),A=e.smoothOrigin!==!1&&C.smooth,v=this._pt=new wn(this._pt,a,Re,0,1,C.renderTransform,C,0,-1),v.dep=1),g==="scale")this._pt=new wn(this._pt,C,"scaleY",C.scaleY,(E?Us(C.scaleY,E+h):h)-C.scaleY||0,Au),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(An,0,a[An]),u=wE(u),C.svg?Pu(t,u,0,A,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==C.zOrigin&&sr(this,C,"zOrigin",C.zOrigin,p),sr(this,a,g,_l(c),_l(u)));continue}else if(g==="svgOrigin"){Pu(t,u,1,A,0,this);continue}else if(g in _m){PE(this,C,g,f,E?Us(f,E+u):u);continue}else if(g==="smoothOrigin"){sr(this,C,"smooth",C.smooth,u);continue}else if(g==="force3D"){C[g]=u;continue}else if(g==="transform"){DE(this,u,t);continue}}else g in a||(g=Ks(g)||g);if(S||(h||h===0)&&(f||f===0)&&!fE.test(u)&&g in a)m=(c+"").substr((f+"").length),h||(h=0),p=rn(u)||(g in zn.units?zn.units[g]:m),m!==p&&(f=_r(t,g,c,p)),this._pt=new wn(this._pt,S?C:a,g,f,(E?Us(f,E+h):h)-f,!S&&(p==="px"||g==="zIndex")&&e.autoRound!==!1?mE:Au),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=pE);else if(g in a)bE.call(this,t,g,c,E?E+u:u);else if(g in t)this.add(t,g,c||t[g],E?E+u:u,i,s);else if(g!=="parseTransform"){fh(g,u);continue}S||(g in a?P.push(g,0,a[g]):P.push(g,1,c||t[g])),o.push(g)}}b&&am(this)},render:function(t,e){if(e.tween._time||!yh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ui,aliases:_i,getSetter:function(t,e,n){var i=_i[e];return i&&i.indexOf(",")<0&&(e=i),e in Wi&&e!==An&&(t._gsap.x||Ui(t,"x"))?n&&ed===n?e==="scale"?xE:vE:(ed=n||{})&&(e==="scale"?SE:ME):t.style&&!ch(t.style[e])?_E:~e.indexOf("-")?gE:xh(t,e)},core:{_removeProperty:Jr,_getMatrix:Th}};Cn.utils.checkPrefix=Ks;Cn.core.getStyleSaver=fm;(function(r,t,e,n){var i=bn(r+","+t+","+e,function(s){Wi[s]=1});bn(t,function(s){zn.units[s]="deg",_m[s]=1}),_i[i[13]]=r+","+t,bn(n,function(s){var o=s.split(":");_i[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");bn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){zn.units[r]="px"});Cn.registerPlugin(xm);var oa=Cn.registerPlugin(xm)||Cn;oa.core.Tween;function LE(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function IE(r,t,e){return t&&LE(r.prototype,t),r}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var je,il,Fn,or,ar,Fs,Sm,Pr,Co,Mm,zi,ri,ym,Em=function(){return je||typeof window<"u"&&(je=window.gsap)&&je.registerPlugin&&je},Tm=1,Ps=[],ie=[],Mi=[],Ro=Date.now,Du=function(t,e){return e},UE=function(){var t=Co.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,ie),i.push.apply(i,Mi),ie=n,Mi=i,Du=function(o,a){return e[o](a)}},fr=function(t,e){return~Mi.indexOf(t)&&Mi[Mi.indexOf(t)+1][e]},Po=function(t){return!!~Mm.indexOf(t)},dn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},hn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Na="scrollLeft",Oa="scrollTop",Lu=function(){return zi&&zi.isPressed||ie.cache++},gl=function(t,e){var n=function i(s){if(s||s===0){Tm&&(Fn.history.scrollRestoration="manual");var o=zi&&zi.isPressed;s=i.v=Math.round(s)||(zi&&zi.iOS?1:0),t(s),i.cacheID=ie.cache,o&&Du("ss",s)}else(e||ie.cache!==i.cacheID||Du("ref"))&&(i.cacheID=ie.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},Sn={s:Na,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:gl(function(r){return arguments.length?Fn.scrollTo(r,Ge.sc()):Fn.pageXOffset||or[Na]||ar[Na]||Fs[Na]||0})},Ge={s:Oa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Sn,sc:gl(function(r){return arguments.length?Fn.scrollTo(Sn.sc(),r):Fn.pageYOffset||or[Oa]||ar[Oa]||Fs[Oa]||0})},yn=function(t,e){return(e&&e._ctx&&e._ctx.selector||je.utils.toArray)(t)[0]||(typeof t=="string"&&je.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},gr=function(t,e){var n=e.s,i=e.sc;Po(t)&&(t=or.scrollingElement||ar);var s=ie.indexOf(t),o=i===Ge.sc?1:2;!~s&&(s=ie.push(t)-1),ie[s+o]||dn(t,"scroll",Lu);var a=ie[s+o],l=a||(ie[s+o]=gl(fr(t,n),!0)||(Po(t)?i:gl(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=je.getProperty(t,"scrollBehavior")==="smooth"),l},Iu=function(t,e,n){var i=t,s=t,o=Ro(),a=o,l=e||50,c=Math.max(500,l*3),u=function(_,g){var m=Ro();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=Ro();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:h,getVelocity:f}},lo=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},cd=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},bm=function(){Co=je.core.globals().ScrollTrigger,Co&&Co.core&&UE()},wm=function(t){return je=t||Em(),!il&&je&&typeof document<"u"&&document.body&&(Fn=window,or=document,ar=or.documentElement,Fs=or.body,Mm=[Fn,or,ar,Fs],je.utils.clamp,ym=je.core.context||function(){},Pr="onpointerenter"in Fs?"pointer":"mouse",Sm=Oe.isTouch=Fn.matchMedia&&Fn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Fn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ri=Oe.eventTypes=("ontouchstart"in ar?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ar?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Tm=0},500),bm(),il=1),il};Sn.op=Ge;ie.cache=0;var Oe=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){il||wm(je)||console.warn("Please gsap.registerPlugin(Observer)"),Co||bm();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,E=n.onDrag,S=n.onPress,v=n.onRelease,C=n.onRight,A=n.onLeft,b=n.onUp,P=n.onDown,M=n.onChangeX,x=n.onChangeY,D=n.onChange,O=n.onToggleX,B=n.onToggleY,X=n.onHover,q=n.onHoverEnd,W=n.onMove,Y=n.ignoreCheck,H=n.isNormalizer,rt=n.onGestureStart,L=n.onGestureEnd,ct=n.onWheel,Ut=n.onEnable,Kt=n.onDisable,Z=n.onClick,it=n.scrollSpeed,xt=n.capture,st=n.allowClicks,Ct=n.lockAxis,Dt=n.onLockAxis;this.target=a=yn(a)||ar,this.vars=n,d&&(d=je.utils.toArray(d)),i=i||1e-9,s=s||0,_=_||1,it=it||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Fn.getComputedStyle(Fs).lineHeight)||22);var Ot,Ht,et,Q,R,Et,nt,N=this,at=0,Nt=0,Mt=n.passive||!u,w=gr(a,Sn),y=gr(a,Ge),k=w(),J=y(),j=~o.indexOf("touch")&&!~o.indexOf("pointer")&&ri[0]==="pointerdown",K=Po(a),dt=a.ownerDocument||or,ht=[0,0,0],_t=[0,0,0],Yt=0,ot=function(){return Yt=Ro()},ft=function(Lt,jt){return(N.event=Lt)&&d&&~d.indexOf(Lt.target)||jt&&j&&Lt.pointerType!=="touch"||Y&&Y(Lt,jt)},zt=function(){N._vx.reset(),N._vy.reset(),Ht.pause(),h&&h(N)},Bt=function(){var Lt=N.deltaX=cd(ht),jt=N.deltaY=cd(_t),St=Math.abs(Lt)>=i,qt=Math.abs(jt)>=i;D&&(St||qt)&&D(N,Lt,jt,ht,_t),St&&(C&&N.deltaX>0&&C(N),A&&N.deltaX<0&&A(N),M&&M(N),O&&N.deltaX<0!=at<0&&O(N),at=N.deltaX,ht[0]=ht[1]=ht[2]=0),qt&&(P&&N.deltaY>0&&P(N),b&&N.deltaY<0&&b(N),x&&x(N),B&&N.deltaY<0!=Nt<0&&B(N),Nt=N.deltaY,_t[0]=_t[1]=_t[2]=0),(Q||et)&&(W&&W(N),et&&(E(N),et=!1),Q=!1),Et&&!(Et=!1)&&Dt&&Dt(N),R&&(ct(N),R=!1),Ot=0},wt=function(Lt,jt,St){ht[St]+=Lt,_t[St]+=jt,N._vx.update(Lt),N._vy.update(jt),c?Ot||(Ot=requestAnimationFrame(Bt)):Bt()},Jt=function(Lt,jt){Ct&&!nt&&(N.axis=nt=Math.abs(Lt)>Math.abs(jt)?"x":"y",Et=!0),nt!=="y"&&(ht[2]+=Lt,N._vx.update(Lt,!0)),nt!=="x"&&(_t[2]+=jt,N._vy.update(jt,!0)),c?Ot||(Ot=requestAnimationFrame(Bt)):Bt()},Vt=function(Lt){if(!ft(Lt,1)){Lt=lo(Lt,u);var jt=Lt.clientX,St=Lt.clientY,qt=jt-N.x,It=St-N.y,Xt=N.isDragging;N.x=jt,N.y=St,(Xt||Math.abs(N.startX-jt)>=s||Math.abs(N.startY-St)>=s)&&(E&&(et=!0),Xt||(N.isDragging=!0),Jt(qt,It),Xt||m&&m(N))}},ae=N.onPress=function(Tt){ft(Tt,1)||Tt&&Tt.button||(N.axis=nt=null,Ht.pause(),N.isPressed=!0,Tt=lo(Tt),at=Nt=0,N.startX=N.x=Tt.clientX,N.startY=N.y=Tt.clientY,N._vx.reset(),N._vy.reset(),dn(H?a:dt,ri[1],Vt,Mt,!0),N.deltaX=N.deltaY=0,S&&S(N))},I=N.onRelease=function(Tt){if(!ft(Tt,1)){hn(H?a:dt,ri[1],Vt,!0);var Lt=!isNaN(N.y-N.startY),jt=N.isDragging,St=jt&&(Math.abs(N.x-N.startX)>3||Math.abs(N.y-N.startY)>3),qt=lo(Tt);!St&&Lt&&(N._vx.reset(),N._vy.reset(),u&&st&&je.delayedCall(.08,function(){if(Ro()-Yt>300&&!Tt.defaultPrevented){if(Tt.target.click)Tt.target.click();else if(dt.createEvent){var It=dt.createEvent("MouseEvents");It.initMouseEvent("click",!0,!0,Fn,1,qt.screenX,qt.screenY,qt.clientX,qt.clientY,!1,!1,!1,!1,0,null),Tt.target.dispatchEvent(It)}}})),N.isDragging=N.isGesturing=N.isPressed=!1,h&&jt&&!H&&Ht.restart(!0),p&&jt&&p(N),v&&v(N,St)}},mt=function(Lt){return Lt.touches&&Lt.touches.length>1&&(N.isGesturing=!0)&&rt(Lt,N.isDragging)},$=function(){return(N.isGesturing=!1)||L(N)},tt=function(Lt){if(!ft(Lt)){var jt=w(),St=y();wt((jt-k)*it,(St-J)*it,1),k=jt,J=St,h&&Ht.restart(!0)}},pt=function(Lt){if(!ft(Lt)){Lt=lo(Lt,u),ct&&(R=!0);var jt=(Lt.deltaMode===1?l:Lt.deltaMode===2?Fn.innerHeight:1)*_;wt(Lt.deltaX*jt,Lt.deltaY*jt,0),h&&!H&&Ht.restart(!0)}},gt=function(Lt){if(!ft(Lt)){var jt=Lt.clientX,St=Lt.clientY,qt=jt-N.x,It=St-N.y;N.x=jt,N.y=St,Q=!0,h&&Ht.restart(!0),(qt||It)&&Jt(qt,It)}},Gt=function(Lt){N.event=Lt,X(N)},ce=function(Lt){N.event=Lt,q(N)},De=function(Lt){return ft(Lt)||lo(Lt,u)&&Z(N)};Ht=N._dc=je.delayedCall(f||.25,zt).pause(),N.deltaX=N.deltaY=0,N._vx=Iu(0,50,!0),N._vy=Iu(0,50,!0),N.scrollX=w,N.scrollY=y,N.isDragging=N.isGesturing=N.isPressed=!1,ym(this),N.enable=function(Tt){return N.isEnabled||(dn(K?dt:a,"scroll",Lu),o.indexOf("scroll")>=0&&dn(K?dt:a,"scroll",tt,Mt,xt),o.indexOf("wheel")>=0&&dn(a,"wheel",pt,Mt,xt),(o.indexOf("touch")>=0&&Sm||o.indexOf("pointer")>=0)&&(dn(a,ri[0],ae,Mt,xt),dn(dt,ri[2],I),dn(dt,ri[3],I),st&&dn(a,"click",ot,!0,!0),Z&&dn(a,"click",De),rt&&dn(dt,"gesturestart",mt),L&&dn(dt,"gestureend",$),X&&dn(a,Pr+"enter",Gt),q&&dn(a,Pr+"leave",ce),W&&dn(a,Pr+"move",gt)),N.isEnabled=!0,Tt&&Tt.type&&ae(Tt),Ut&&Ut(N)),N},N.disable=function(){N.isEnabled&&(Ps.filter(function(Tt){return Tt!==N&&Po(Tt.target)}).length||hn(K?dt:a,"scroll",Lu),N.isPressed&&(N._vx.reset(),N._vy.reset(),hn(H?a:dt,ri[1],Vt,!0)),hn(K?dt:a,"scroll",tt,xt),hn(a,"wheel",pt,xt),hn(a,ri[0],ae,xt),hn(dt,ri[2],I),hn(dt,ri[3],I),hn(a,"click",ot,!0),hn(a,"click",De),hn(dt,"gesturestart",mt),hn(dt,"gestureend",$),hn(a,Pr+"enter",Gt),hn(a,Pr+"leave",ce),hn(a,Pr+"move",gt),N.isEnabled=N.isPressed=N.isDragging=!1,Kt&&Kt(N))},N.kill=N.revert=function(){N.disable();var Tt=Ps.indexOf(N);Tt>=0&&Ps.splice(Tt,1),zi===N&&(zi=0)},Ps.push(N),H&&Po(a)&&(zi=N),N.enable(g)},IE(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Oe.version="3.12.5";Oe.create=function(r){return new Oe(r)};Oe.register=wm;Oe.getAll=function(){return Ps.slice()};Oe.getById=function(r){return Ps.filter(function(t){return t.vars.id===r})[0]};Em()&&je.registerPlugin(Oe);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Rt,Ts,se,we,si,Te,Am,vl,Jo,Do,mo,Fa,en,Dl,Uu,_n,ud,hd,bs,Cm,Sc,Rm,mn,Nu,Pm,Dm,er,Ou,bh,Bs,wh,xl,Fu,Mc,Ba=1,nn=Date.now,yc=nn(),jn=0,_o=0,fd=function(t,e,n){var i=Un(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},dd=function(t,e){return e&&(!Un(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},NE=function r(){return _o&&requestAnimationFrame(r)},pd=function(){return Dl=1},md=function(){return Dl=0},fi=function(t){return t},go=function(t){return Math.round(t*1e5)/1e5||0},Lm=function(){return typeof window<"u"},Im=function(){return Rt||Lm()&&(Rt=window.gsap)&&Rt.registerPlugin&&Rt},jr=function(t){return!!~Am.indexOf(t)},Um=function(t){return(t==="Height"?wh:se["inner"+t])||si["client"+t]||Te["client"+t]},Nm=function(t){return fr(t,"getBoundingClientRect")||(jr(t)?function(){return ll.width=se.innerWidth,ll.height=wh,ll}:function(){return Oi(t)})},OE=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=fr(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?Um(s):t["client"+s])||0}},FE=function(t,e){return!e||~Mi.indexOf(t)?Nm(t):function(){return ll}},gi=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=fr(t,n))?o()-Nm(t)()[s]:jr(t)?(si[n]||Te[n])-Um(i):t[n]-t["offset"+i])},za=function(t,e){for(var n=0;n<bs.length;n+=3)(!e||~e.indexOf(bs[n+1]))&&t(bs[n],bs[n+1],bs[n+2])},Un=function(t){return typeof t=="string"},Mn=function(t){return typeof t=="function"},vo=function(t){return typeof t=="number"},Dr=function(t){return typeof t=="object"},co=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Ec=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},Ss=Math.abs,Om="left",Fm="top",Ah="right",Ch="bottom",Wr="width",Xr="height",Lo="Right",Io="Left",Uo="Top",No="Bottom",ze="padding",Yn="margin",Js="Width",Rh="Height",Ve="px",qn=function(t){return se.getComputedStyle(t)},BE=function(t){var e=qn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},_d=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Oi=function(t,e){var n=e&&qn(t)[Uu]!=="matrix(1, 0, 0, 1, 0, 0)"&&Rt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect();return n&&n.progress(0).kill(),i},Sl=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},Bm=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},zE=function(t){return function(e){return Rt.utils.snap(Bm(t),e)}},Ph=function(t){var e=Rt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},kE=function(t){return function(e,n){return Ph(Bm(t))(e,n.direction)}},ka=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},$e=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},qe=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Ha=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},gd={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Va={toggleActions:"play",anticipatePin:0},Ml={top:0,left:0,center:.5,bottom:1,right:1},rl=function(t,e){if(Un(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in Ml?Ml[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Ga=function(t,e,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,_=we.createElement("div"),g=jr(n)||fr(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,p=g?Te:n,E=t.indexOf("start")!==-1,S=E?c:u,v="border-color:"+S+";font-size:"+h+";color:"+S+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===Ge?Ah:Ch)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=E,_.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),_.style.cssText=v,_.innerText=e||e===0?t+"-"+e:t,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],sl(_,0,i,E),_},sl=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Js]=1,s["border"+a+Js]=0,s[n.p]=e+"px",Rt.set(t,s)},ne=[],Bu={},jo,vd=function(){return nn()-jn>34&&(jo||(jo=requestAnimationFrame(Hi)))},Ms=function(){(!mn||!mn.isPressed||mn.startX>Te.clientWidth)&&(ie.cache++,mn?jo||(jo=requestAnimationFrame(Hi)):Hi(),jn||ts("scrollStart"),jn=nn())},Tc=function(){Dm=se.innerWidth,Pm=se.innerHeight},xo=function(){ie.cache++,!en&&!Rm&&!we.fullscreenElement&&!we.webkitFullscreenElement&&(!Nu||Dm!==se.innerWidth||Math.abs(se.innerHeight-Pm)>se.innerHeight*.25)&&vl.restart(!0)},Qr={},HE=[],zm=function r(){return qe(re,"scrollEnd",r)||Fr(!0)},ts=function(t){return Qr[t]&&Qr[t].map(function(e){return e()})||HE},In=[],km=function(t){for(var e=0;e<In.length;e+=5)(!t||In[e+4]&&In[e+4].query===t)&&(In[e].style.cssText=In[e+1],In[e].getBBox&&In[e].setAttribute("transform",In[e+2]||""),In[e+3].uncache=1)},Dh=function(t,e){var n;for(_n=0;_n<ne.length;_n++)n=ne[_n],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));xl=!0,e&&km(e),e||ts("revert")},Hm=function(t,e){ie.cache++,(e||!gn)&&ie.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),Un(t)&&(se.history.scrollRestoration=bh=t)},gn,Yr=0,xd,VE=function(){if(xd!==Yr){var t=xd=Yr;requestAnimationFrame(function(){return t===Yr&&Fr(!0)})}},Vm=function(){Te.appendChild(Bs),wh=!mn&&Bs.offsetHeight||se.innerHeight,Te.removeChild(Bs)},Sd=function(t){return Jo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Fr=function(t,e){if(jn&&!t&&!xl){$e(re,"scrollEnd",zm);return}Vm(),gn=re.isRefreshing=!0,ie.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=ts("refreshInit");Cm&&re.sort(),e||Dh(),ie.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ne.slice(0).forEach(function(i){return i.refresh()}),xl=!1,ne.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Fu=1,Sd(!0),ne.forEach(function(i){var s=gi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Sd(!1),Fu=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ie.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Hm(bh,1),vl.pause(),Yr++,gn=2,Hi(2),ne.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),gn=re.isRefreshing=!1,ts("refresh")},zu=0,ol=1,Oo,Hi=function(t){if(t===2||!gn&&!xl){re.isUpdating=!0,Oo&&Oo.update(0);var e=ne.length,n=nn(),i=n-yc>=50,s=e&&ne[0].scroll();if(ol=zu>s?-1:1,gn||(zu=s),i&&(jn&&!Dl&&n-jn>200&&(jn=0,ts("scrollEnd")),mo=yc,yc=n),ol<0){for(_n=e;_n-- >0;)ne[_n]&&ne[_n].update(0,i);ol=1}else for(_n=0;_n<e;_n++)ne[_n]&&ne[_n].update(0,i);re.isUpdating=!1}jo=0},ku=[Om,Fm,Ch,Ah,Yn+No,Yn+Lo,Yn+Uo,Yn+Io,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],al=ku.concat([Wr,Xr,"boxSizing","max"+Js,"max"+Rh,"position",Yn,ze,ze+Uo,ze+Lo,ze+No,ze+Io]),GE=function(t,e,n){zs(n);var i=t._gsap;if(i.spacerIsNative)zs(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},bc=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=ku.length,o=e.style,a=t.style,l;s--;)l=ku[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ch]=a[Ah]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Wr]=Sl(t,Sn)+Ve,o[Xr]=Sl(t,Ge)+Ve,o[ze]=a[Yn]=a[Fm]=a[Om]="0",zs(i),a[Wr]=a["max"+Js]=n[Wr],a[Xr]=a["max"+Rh]=n[Xr],a[ze]=n[ze],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},WE=/([A-Z])/g,zs=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||Rt.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(WE,"-$1").toLowerCase())}},Wa=function(t){for(var e=al.length,n=t.style,i=[],s=0;s<e;s++)i.push(al[s],n[al[s]]);return i.t=t,i},XE=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},ll={left:0,top:0},Md=function(t,e,n,i,s,o,a,l,c,u,h,f,d,_){Mn(t)&&(t=t(l)),Un(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?rl("0"+t.substr(3),n):0));var g=d?d.time():0,m,p,E;if(d&&d.seek(0),isNaN(t)||(t=+t),vo(t))d&&(t=Rt.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,t)),a&&sl(a,n,i,!0);else{Mn(e)&&(e=e(l));var S=(t||"0").split(" "),v,C,A,b;E=yn(e,l)||Te,v=Oi(E)||{},(!v||!v.left&&!v.top)&&qn(E).display==="none"&&(b=E.style.display,E.style.display="block",v=Oi(E),b?E.style.display=b:E.style.removeProperty("display")),C=rl(S[0],v[i.d]),A=rl(S[1]||"0",n),t=v[i.p]-c[i.p]-u+C+s-A,a&&sl(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(_&&(l[_]=t||-.001,t<0&&(t=0)),o){var P=t+n,M=o._isStart;m="scroll"+i.d2,sl(o,P,i,M&&P>20||!M&&(h?Math.max(Te[m],si[m]):o.parentNode[m])<=P+1),h&&(c=Oi(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Ve))}return d&&E&&(m=Oi(E),d.seek(f),p=Oi(E),d._caScrollDist=m[i.p]-p[i.p],t=t/d._caScrollDist*f),d&&d.seek(g),d?t:Math.round(t)},YE=/(webkit|moz|length|cssText|inset)/i,yd=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===Te){t._stOrig=s.cssText,a=qn(t);for(o in a)!+o&&!YE.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;Rt.core.getCache(t).uncache=1,e.appendChild(t)}},Gm=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=o,o}},Xa=function(t,e,n){var i={};i[e.p]="+="+n,Rt.set(t,i)},Ed=function(t,e){var n=gr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,_={};c=c||n();var g=Gm(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){ie.cache++,o.tween&&Hi()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=Rt.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},$e(t,"wheel",n.wheelHandler),re.isTouch&&$e(t,"touchmove",n.wheelHandler),s},re=function(){function r(e,n){Ts||r.register(Rt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ou(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!_o){this.update=this.refresh=this.kill=fi;return}n=_d(Un(n)||vo(n)||n.nodeType?{trigger:n}:n,Va);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,E=s.onSnapComplete,S=s.once,v=s.snap,C=s.pinReparent,A=s.pinSpacer,b=s.containerAnimation,P=s.fastScrollEnd,M=s.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Sn:Ge,D=!h&&h!==0,O=yn(n.scroller||se),B=Rt.core.getCache(O),X=jr(O),q=("pinType"in n?n.pinType:fr(O,"pinType")||X&&"fixed")==="fixed",W=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],Y=D&&n.toggleActions.split(" "),H="markers"in n?n.markers:Va.markers,rt=X?0:parseFloat(qn(O)["border"+x.p2+Js])||0,L=this,ct=n.onRefreshInit&&function(){return n.onRefreshInit(L)},Ut=OE(O,X,x),Kt=FE(O,X),Z=0,it=0,xt=0,st=gr(O,x),Ct,Dt,Ot,Ht,et,Q,R,Et,nt,N,at,Nt,Mt,w,y,k,J,j,K,dt,ht,_t,Yt,ot,ft,zt,Bt,wt,Jt,Vt,ae,I,mt,$,tt,pt,gt,Gt,ce;if(L._startClamp=L._endClamp=!1,L._dir=x,m*=45,L.scroller=O,L.scroll=b?b.time.bind(b):st,Ht=st(),L.vars=n,i=i||n.animation,"refreshPriority"in n&&(Cm=1,n.refreshPriority===-9999&&(Oo=L)),B.tweenScroll=B.tweenScroll||{top:Ed(O,Ge),left:Ed(O,Sn)},L.tweenTo=Ct=B.tweenScroll[x.p],L.scrubDuration=function(St){mt=vo(St)&&St,mt?I?I.duration(St):I=Rt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:mt,paused:!0,onComplete:function(){return p&&p(L)}}):(I&&I.progress(1).kill(),I=0)},i&&(i.vars.lazy=!1,i._initted&&!L.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),L.animation=i.pause(),i.scrollTrigger=L,L.scrubDuration(h),Vt=0,l||(l=i.vars.id)),v&&((!Dr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Te.style&&Rt.set(X?[Te,si]:O,{scrollBehavior:"auto"}),ie.forEach(function(St){return Mn(St)&&St.target===(X?we.scrollingElement||si:O)&&(St.smooth=!1)}),Ot=Mn(v.snapTo)?v.snapTo:v.snapTo==="labels"?zE(i):v.snapTo==="labelsDirectional"?kE(i):v.directional!==!1?function(St,qt){return Ph(v.snapTo)(St,nn()-it<500?0:qt.direction)}:Rt.utils.snap(v.snapTo),$=v.duration||{min:.1,max:2},$=Dr($)?Do($.min,$.max):Do($,$),tt=Rt.delayedCall(v.delay||mt/2||.1,function(){var St=st(),qt=nn()-it<500,It=Ct.tween;if((qt||Math.abs(L.getVelocity())<10)&&!It&&!Dl&&Z!==St){var Xt=(St-Q)/w,Ue=i&&!D?i.totalProgress():Xt,ee=qt?0:(Ue-ae)/(nn()-mo)*1e3||0,Se=Rt.utils.clamp(-Xt,1-Xt,Ss(ee/2)*ee/.185),He=Xt+(v.inertia===!1?0:Se),ge,ve,fe=v,Rn=fe.onStart,ye=fe.onInterrupt,un=fe.onComplete;if(ge=Ot(He,L),vo(ge)||(ge=He),ve=Math.round(Q+ge*w),St<=R&&St>=Q&&ve!==St){if(It&&!It._initted&&It.data<=Ss(ve-St))return;v.inertia===!1&&(Se=ge-Xt),Ct(ve,{duration:$(Ss(Math.max(Ss(He-Ue),Ss(ge-Ue))*.185/ee/.05||0)),ease:v.ease||"power3",data:Ss(ve-St),onInterrupt:function(){return tt.restart(!0)&&ye&&ye(L)},onComplete:function(){L.update(),Z=st(),i&&(I?I.resetTo("totalProgress",ge,i._tTime/i._tDur):i.progress(ge)),Vt=ae=i&&!D?i.totalProgress():L.progress,E&&E(L),un&&un(L)}},St,Se*w,ve-St-Se*w),Rn&&Rn(L,Ct.tween)}}else L.isActive&&Z!==St&&tt.restart(!0)}).pause()),l&&(Bu[l]=L),f=L.trigger=yn(f||d!==!0&&d),ce=f&&f._gsap&&f._gsap.stRevert,ce&&(ce=ce(L)),d=d===!0?f:yn(d),Un(a)&&(a={targets:f,className:a}),d&&(_===!1||_===Yn||(_=!_&&d.parentNode&&d.parentNode.style&&qn(d.parentNode).display==="flex"?!1:ze),L.pin=d,Dt=Rt.core.getCache(d),Dt.spacer?y=Dt.pinState:(A&&(A=yn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),Dt.spacerIsNative=!!A,A&&(Dt.spacerState=Wa(A))),Dt.spacer=j=A||we.createElement("div"),j.classList.add("pin-spacer"),l&&j.classList.add("pin-spacer-"+l),Dt.pinState=y=Wa(d)),n.force3D!==!1&&Rt.set(d,{force3D:!0}),L.spacer=j=Dt.spacer,Jt=qn(d),ot=Jt[_+x.os2],dt=Rt.getProperty(d),ht=Rt.quickSetter(d,x.a,Ve),bc(d,j,Jt),J=Wa(d)),H){Nt=Dr(H)?_d(H,gd):gd,N=Ga("scroller-start",l,O,x,Nt,0),at=Ga("scroller-end",l,O,x,Nt,0,N),K=N["offset"+x.op.d2];var De=yn(fr(O,"content")||O);Et=this.markerStart=Ga("start",l,De,x,Nt,K,0,b),nt=this.markerEnd=Ga("end",l,De,x,Nt,K,0,b),b&&(Gt=Rt.quickSetter([Et,nt],x.a,Ve)),!q&&!(Mi.length&&fr(O,"fixedMarkers")===!0)&&(BE(X?Te:O),Rt.set([N,at],{force3D:!0}),zt=Rt.quickSetter(N,x.a,Ve),wt=Rt.quickSetter(at,x.a,Ve))}if(b){var Tt=b.vars.onUpdate,Lt=b.vars.onUpdateParams;b.eventCallback("onUpdate",function(){L.update(0,0,1),Tt&&Tt.apply(b,Lt||[])})}if(L.previous=function(){return ne[ne.indexOf(L)-1]},L.next=function(){return ne[ne.indexOf(L)+1]},L.revert=function(St,qt){if(!qt)return L.kill(!0);var It=St!==!1||!L.enabled,Xt=en;It!==L.isReverted&&(It&&(pt=Math.max(st(),L.scroll.rec||0),xt=L.progress,gt=i&&i.progress()),Et&&[Et,nt,N,at].forEach(function(Ue){return Ue.style.display=It?"none":"block"}),It&&(en=L,L.update(It)),d&&(!C||!L.isActive)&&(It?GE(d,j,y):bc(d,j,qn(d),ft)),It||L.update(It),en=Xt,L.isReverted=It)},L.refresh=function(St,qt,It,Xt){if(!((en||!L.enabled)&&!qt)){if(d&&St&&jn){$e(r,"scrollEnd",zm);return}!gn&&ct&&ct(L),en=L,Ct.tween&&!It&&(Ct.tween.kill(),Ct.tween=0),I&&I.pause(),g&&i&&i.revert({kill:!1}).invalidate(),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var Ue=Ut(),ee=Kt(),Se=b?b.duration():gi(O,x),He=w<=.01,ge=0,ve=Xt||0,fe=Dr(It)?It.end:n.end,Rn=n.endTrigger||f,ye=Dr(It)?It.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),un=L.pinnedContainer=n.pinnedContainer&&yn(n.pinnedContainer,L),T=f&&Math.max(0,ne.indexOf(L))||0,U=T,V,G,F,lt,ut,vt,At,Wt,$t,Pt,Zt,ue,de;for(H&&Dr(It)&&(ue=Rt.getProperty(N,x.p),de=Rt.getProperty(at,x.p));U--;)vt=ne[U],vt.end||vt.refresh(0,1)||(en=L),At=vt.pin,At&&(At===f||At===d||At===un)&&!vt.isReverted&&(Pt||(Pt=[]),Pt.unshift(vt),vt.revert(!0,!0)),vt!==ne[U]&&(T--,U--);for(Mn(ye)&&(ye=ye(L)),ye=fd(ye,"start",L),Q=Md(ye,f,Ue,x,st(),Et,N,L,ee,rt,q,Se,b,L._startClamp&&"_startClamp")||(d?-.001:0),Mn(fe)&&(fe=fe(L)),Un(fe)&&!fe.indexOf("+=")&&(~fe.indexOf(" ")?fe=(Un(ye)?ye.split(" ")[0]:"")+fe:(ge=rl(fe.substr(2),Ue),fe=Un(ye)?ye:(b?Rt.utils.mapRange(0,b.duration(),b.scrollTrigger.start,b.scrollTrigger.end,Q):Q)+ge,Rn=f)),fe=fd(fe,"end",L),R=Math.max(Q,Md(fe||(Rn?"100% 0":Se),Rn,Ue,x,st()+ge,nt,at,L,ee,rt,q,Se,b,L._endClamp&&"_endClamp"))||-.001,ge=0,U=T;U--;)vt=ne[U],At=vt.pin,At&&vt.start-vt._pinPush<=Q&&!b&&vt.end>0&&(V=vt.end-(L._startClamp?Math.max(0,vt.start):vt.start),(At===f&&vt.start-vt._pinPush<Q||At===un)&&isNaN(ye)&&(ge+=V*(1-vt.progress)),At===d&&(ve+=V));if(Q+=ge,R+=ge,L._startClamp&&(L._startClamp+=ge),L._endClamp&&!gn&&(L._endClamp=R||-.001,R=Math.min(R,gi(O,x))),w=R-Q||(Q-=.01)&&.001,He&&(xt=Rt.utils.clamp(0,1,Rt.utils.normalize(Q,R,pt))),L._pinPush=ve,Et&&ge&&(V={},V[x.a]="+="+ge,un&&(V[x.p]="-="+st()),Rt.set([Et,nt],V)),d&&!(Fu&&L.end>=gi(O,x)))V=qn(d),lt=x===Ge,F=st(),_t=parseFloat(dt(x.a))+ve,!Se&&R>1&&(Zt=(X?we.scrollingElement||si:O).style,Zt={style:Zt,value:Zt["overflow"+x.a.toUpperCase()]},X&&qn(Te)["overflow"+x.a.toUpperCase()]!=="scroll"&&(Zt.style["overflow"+x.a.toUpperCase()]="scroll")),bc(d,j,V),J=Wa(d),G=Oi(d,!0),Wt=q&&gr(O,lt?Sn:Ge)(),_?(ft=[_+x.os2,w+ve+Ve],ft.t=j,U=_===ze?Sl(d,x)+w+ve:0,U&&(ft.push(x.d,U+Ve),j.style.flexBasis!=="auto"&&(j.style.flexBasis=U+Ve)),zs(ft),un&&ne.forEach(function(Fe){Fe.pin===un&&Fe.vars.pinSpacing!==!1&&(Fe._subPinOffset=!0)}),q&&st(pt)):(U=Sl(d,x),U&&j.style.flexBasis!=="auto"&&(j.style.flexBasis=U+Ve)),q&&(ut={top:G.top+(lt?F-Q:Wt)+Ve,left:G.left+(lt?Wt:F-Q)+Ve,boxSizing:"border-box",position:"fixed"},ut[Wr]=ut["max"+Js]=Math.ceil(G.width)+Ve,ut[Xr]=ut["max"+Rh]=Math.ceil(G.height)+Ve,ut[Yn]=ut[Yn+Uo]=ut[Yn+Lo]=ut[Yn+No]=ut[Yn+Io]="0",ut[ze]=V[ze],ut[ze+Uo]=V[ze+Uo],ut[ze+Lo]=V[ze+Lo],ut[ze+No]=V[ze+No],ut[ze+Io]=V[ze+Io],k=XE(y,ut,C),gn&&st(0)),i?($t=i._initted,Sc(1),i.render(i.duration(),!0,!0),Yt=dt(x.a)-_t+w+ve,Bt=Math.abs(w-Yt)>1,q&&Bt&&k.splice(k.length-2,2),i.render(0,!0,!0),$t||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Sc(0)):Yt=w,Zt&&(Zt.value?Zt.style["overflow"+x.a.toUpperCase()]=Zt.value:Zt.style.removeProperty("overflow-"+x.a));else if(f&&st()&&!b)for(G=f.parentNode;G&&G!==Te;)G._pinOffset&&(Q-=G._pinOffset,R-=G._pinOffset),G=G.parentNode;Pt&&Pt.forEach(function(Fe){return Fe.revert(!1,!0)}),L.start=Q,L.end=R,Ht=et=gn?pt:st(),!b&&!gn&&(Ht<pt&&st(pt),L.scroll.rec=0),L.revert(!1,!0),it=nn(),tt&&(Z=-1,tt.restart(!0)),en=0,i&&D&&(i._initted||gt)&&i.progress()!==gt&&i.progress(gt||0,!0).render(i.time(),!0,!0),(He||xt!==L.progress||b||g)&&(i&&!D&&i.totalProgress(b&&Q<-.001&&!xt?Rt.utils.normalize(Q,R,0):xt,!0),L.progress=He||(Ht-Q)/w===xt?0:xt),d&&_&&(j._pinOffset=Math.round(L.progress*Yt)),I&&I.invalidate(),isNaN(ue)||(ue-=Rt.getProperty(N,x.p),de-=Rt.getProperty(at,x.p),Xa(N,x,ue),Xa(Et,x,ue-(Xt||0)),Xa(at,x,de),Xa(nt,x,de-(Xt||0))),He&&!gn&&L.update(),u&&!gn&&!Mt&&(Mt=!0,u(L),Mt=!1)}},L.getVelocity=function(){return(st()-et)/(nn()-mo)*1e3||0},L.endAnimation=function(){co(L.callbackAnimation),i&&(I?I.progress(1):i.paused()?D||co(i,L.direction<0,1):co(i,i.reversed()))},L.labelToScroll=function(St){return i&&i.labels&&(Q||L.refresh()||Q)+i.labels[St]/i.duration()*w||0},L.getTrailing=function(St){var qt=ne.indexOf(L),It=L.direction>0?ne.slice(0,qt).reverse():ne.slice(qt+1);return(Un(St)?It.filter(function(Xt){return Xt.vars.preventOverlaps===St}):It).filter(function(Xt){return L.direction>0?Xt.end<=Q:Xt.start>=R})},L.update=function(St,qt,It){if(!(b&&!It&&!St)){var Xt=gn===!0?pt:L.scroll(),Ue=St?0:(Xt-Q)/w,ee=Ue<0?0:Ue>1?1:Ue||0,Se=L.progress,He,ge,ve,fe,Rn,ye,un,T;if(qt&&(et=Ht,Ht=b?st():Xt,v&&(ae=Vt,Vt=i&&!D?i.totalProgress():ee)),m&&d&&!en&&!Ba&&jn&&(!ee&&Q<Xt+(Xt-et)/(nn()-mo)*m?ee=1e-4:ee===1&&R>Xt+(Xt-et)/(nn()-mo)*m&&(ee=.9999)),ee!==Se&&L.enabled){if(He=L.isActive=!!ee&&ee<1,ge=!!Se&&Se<1,ye=He!==ge,Rn=ye||!!ee!=!!Se,L.direction=ee>Se?1:-1,L.progress=ee,Rn&&!en&&(ve=ee&&!Se?0:ee===1?1:Se===1?2:3,D&&(fe=!ye&&Y[ve+1]!=="none"&&Y[ve+1]||Y[ve],T=i&&(fe==="complete"||fe==="reset"||fe in i))),M&&(ye||T)&&(T||h||!i)&&(Mn(M)?M(L):L.getTrailing(M).forEach(function(F){return F.endAnimation()})),D||(I&&!en&&!Ba?(I._dp._time-I._start!==I._time&&I.render(I._dp._time-I._start),I.resetTo?I.resetTo("totalProgress",ee,i._tTime/i._tDur):(I.vars.totalProgress=ee,I.invalidate().restart())):i&&i.totalProgress(ee,!!(en&&(it||St)))),d){if(St&&_&&(j.style[_+x.os2]=ot),!q)ht(go(_t+Yt*ee));else if(Rn){if(un=!St&&ee>Se&&R+1>Xt&&Xt+1>=gi(O,x),C)if(!St&&(He||un)){var U=Oi(d,!0),V=Xt-Q;yd(d,Te,U.top+(x===Ge?V:0)+Ve,U.left+(x===Ge?0:V)+Ve)}else yd(d,j);zs(He||un?k:J),Bt&&ee<1&&He||ht(_t+(ee===1&&!un?Yt:0))}}v&&!Ct.tween&&!en&&!Ba&&tt.restart(!0),a&&(ye||S&&ee&&(ee<1||!Mc))&&Jo(a.targets).forEach(function(F){return F.classList[He||S?"add":"remove"](a.className)}),o&&!D&&!St&&o(L),Rn&&!en?(D&&(T&&(fe==="complete"?i.pause().totalProgress(1):fe==="reset"?i.restart(!0).pause():fe==="restart"?i.restart(!0):i[fe]()),o&&o(L)),(ye||!Mc)&&(c&&ye&&Ec(L,c),W[ve]&&Ec(L,W[ve]),S&&(ee===1?L.kill(!1,1):W[ve]=0),ye||(ve=ee===1?1:3,W[ve]&&Ec(L,W[ve]))),P&&!He&&Math.abs(L.getVelocity())>(vo(P)?P:2500)&&(co(L.callbackAnimation),I?I.progress(1):co(i,fe==="reverse"?1:!ee,1))):D&&o&&!en&&o(L)}if(wt){var G=b?Xt/b.duration()*(b._caScrollDist||0):Xt;zt(G+(N._isFlipped?1:0)),wt(G)}Gt&&Gt(-Xt/b.duration()*(b._caScrollDist||0))}},L.enable=function(St,qt){L.enabled||(L.enabled=!0,$e(O,"resize",xo),X||$e(O,"scroll",Ms),ct&&$e(r,"refreshInit",ct),St!==!1&&(L.progress=xt=0,Ht=et=Z=st()),qt!==!1&&L.refresh())},L.getTween=function(St){return St&&Ct?Ct.tween:I},L.setPositions=function(St,qt,It,Xt){if(b){var Ue=b.scrollTrigger,ee=b.duration(),Se=Ue.end-Ue.start;St=Ue.start+Se*St/ee,qt=Ue.start+Se*qt/ee}L.refresh(!1,!1,{start:dd(St,It&&!!L._startClamp),end:dd(qt,It&&!!L._endClamp)},Xt),L.update()},L.adjustPinSpacing=function(St){if(ft&&St){var qt=ft.indexOf(x.d)+1;ft[qt]=parseFloat(ft[qt])+St+Ve,ft[1]=parseFloat(ft[1])+St+Ve,zs(ft)}},L.disable=function(St,qt){if(L.enabled&&(St!==!1&&L.revert(!0,!0),L.enabled=L.isActive=!1,qt||I&&I.pause(),pt=0,Dt&&(Dt.uncache=1),ct&&qe(r,"refreshInit",ct),tt&&(tt.pause(),Ct.tween&&Ct.tween.kill()&&(Ct.tween=0)),!X)){for(var It=ne.length;It--;)if(ne[It].scroller===O&&ne[It]!==L)return;qe(O,"resize",xo),X||qe(O,"scroll",Ms)}},L.kill=function(St,qt){L.disable(St,qt),I&&!qt&&I.kill(),l&&delete Bu[l];var It=ne.indexOf(L);It>=0&&ne.splice(It,1),It===_n&&ol>0&&_n--,It=0,ne.forEach(function(Xt){return Xt.scroller===L.scroller&&(It=1)}),It||gn||(L.scroll.rec=0),i&&(i.scrollTrigger=null,St&&i.revert({kill:!1}),qt||i.kill()),Et&&[Et,nt,N,at].forEach(function(Xt){return Xt.parentNode&&Xt.parentNode.removeChild(Xt)}),Oo===L&&(Oo=0),d&&(Dt&&(Dt.uncache=1),It=0,ne.forEach(function(Xt){return Xt.pin===d&&It++}),It||(Dt.spacer=0)),n.onKill&&n.onKill(L)},ne.push(L),L.enable(!1,!1),ce&&ce(L),i&&i.add&&!w){var jt=L.update;L.update=function(){L.update=jt,Q||R||L.refresh()},Rt.delayedCall(.01,L.update),w=.01,Q=R=0}else L.refresh();d&&VE()},r.register=function(n){return Ts||(Rt=n||Im(),Lm()&&window.document&&r.enable(),Ts=_o),Ts},r.defaults=function(n){if(n)for(var i in n)Va[i]=n[i];return Va},r.disable=function(n,i){_o=0,ne.forEach(function(o){return o[i?"kill":"disable"](n)}),qe(se,"wheel",Ms),qe(we,"scroll",Ms),clearInterval(Fa),qe(we,"touchcancel",fi),qe(Te,"touchstart",fi),ka(qe,we,"pointerdown,touchstart,mousedown",pd),ka(qe,we,"pointerup,touchend,mouseup",md),vl.kill(),za(qe);for(var s=0;s<ie.length;s+=3)Ha(qe,ie[s],ie[s+1]),Ha(qe,ie[s],ie[s+2])},r.enable=function(){if(se=window,we=document,si=we.documentElement,Te=we.body,Rt&&(Jo=Rt.utils.toArray,Do=Rt.utils.clamp,Ou=Rt.core.context||fi,Sc=Rt.core.suppressOverwrites||fi,bh=se.history.scrollRestoration||"auto",zu=se.pageYOffset,Rt.core.globals("ScrollTrigger",r),Te)){_o=1,Bs=document.createElement("div"),Bs.style.height="100vh",Bs.style.position="absolute",Vm(),NE(),Oe.register(Rt),r.isTouch=Oe.isTouch,er=Oe.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Nu=Oe.isTouch===1,$e(se,"wheel",Ms),Am=[se,we,si,Te],Rt.matchMedia?(r.matchMedia=function(l){var c=Rt.matchMedia(),u;for(u in l)c.add(u,l[u]);return c},Rt.addEventListener("matchMediaInit",function(){return Dh()}),Rt.addEventListener("matchMediaRevert",function(){return km()}),Rt.addEventListener("matchMedia",function(){Fr(0,1),ts("matchMedia")}),Rt.matchMedia("(orientation: portrait)",function(){return Tc(),Tc})):console.warn("Requires GSAP 3.11.0 or later"),Tc(),$e(we,"scroll",Ms);var n=Te.style,i=n.borderTopStyle,s=Rt.core.Animation.prototype,o,a;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",o=Oi(Te),Ge.m=Math.round(o.top+Ge.sc())||0,Sn.m=Math.round(o.left+Sn.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),Fa=setInterval(vd,250),Rt.delayedCall(.5,function(){return Ba=0}),$e(we,"touchcancel",fi),$e(Te,"touchstart",fi),ka($e,we,"pointerdown,touchstart,mousedown",pd),ka($e,we,"pointerup,touchend,mouseup",md),Uu=Rt.utils.checkPrefix("transform"),al.push(Uu),Ts=nn(),vl=Rt.delayedCall(.2,Fr).pause(),bs=[we,"visibilitychange",function(){var l=se.innerWidth,c=se.innerHeight;we.hidden?(ud=l,hd=c):(ud!==l||hd!==c)&&xo()},we,"DOMContentLoaded",Fr,se,"load",Fr,se,"resize",xo],za($e),ne.forEach(function(l){return l.enable(0,1)}),a=0;a<ie.length;a+=3)Ha(qe,ie[a],ie[a+1]),Ha(qe,ie[a],ie[a+2])}},r.config=function(n){"limitCallbacks"in n&&(Mc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Fa)||(Fa=i)&&setInterval(vd,i),"ignoreMobileResize"in n&&(Nu=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(za(qe)||za($e,n.autoRefreshEvents||"none"),Rm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=yn(n),o=ie.indexOf(s),a=jr(s);~o&&ie.splice(o,a?6:2),i&&(a?Mi.unshift(se,i,Te,i,si,i):Mi.unshift(s,i))},r.clearMatchMedia=function(n){ne.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Un(n)?yn(n):n).getBoundingClientRect(),a=o[s?Wr:Xr]*i||0;return s?o.right-a>0&&o.left+a<se.innerWidth:o.bottom-a>0&&o.top+a<se.innerHeight},r.positionInViewport=function(n,i,s){Un(n)&&(n=yn(n));var o=n.getBoundingClientRect(),a=o[s?Wr:Xr],l=i==null?a/2:i in Ml?Ml[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/se.innerWidth:(o.top+l)/se.innerHeight},r.killAll=function(n){if(ne.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Qr.killAll||[];Qr={},i.forEach(function(s){return s()})}},r}();re.version="3.12.5";re.saveStyles=function(r){return r?Jo(r).forEach(function(t){if(t&&t.style){var e=In.indexOf(t);e>=0&&In.splice(e,5),In.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Rt.core.getCache(t),Ou())}}):In};re.revert=function(r,t){return Dh(!r,t)};re.create=function(r,t){return new re(r,t)};re.refresh=function(r){return r?xo():(Ts||re.register())&&Fr(!0)};re.update=function(r){return++ie.cache&&Hi(r===!0?2:0)};re.clearScrollMemory=Hm;re.maxScroll=function(r,t){return gi(r,t?Sn:Ge)};re.getScrollFunc=function(r,t){return gr(yn(r),t?Sn:Ge)};re.getById=function(r){return Bu[r]};re.getAll=function(){return ne.filter(function(r){return r.vars.id!=="ScrollSmoother"})};re.isScrolling=function(){return!!jn};re.snapDirectional=Ph;re.addEventListener=function(r,t){var e=Qr[r]||(Qr[r]=[]);~e.indexOf(t)||e.push(t)};re.removeEventListener=function(r,t){var e=Qr[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};re.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var h=[],f=[],d=Rt.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(_){h.length||d.restart(!0),h.push(_.trigger),f.push(_),s<=h.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&Mn(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return Mn(s)&&(s=s(),$e(re,"refresh",function(){return s=t.batchMax()})),Jo(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(re.create(c))}),e};var Td=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},wc=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Oe.isTouch?" pinch-zoom":""):"none",t===si&&r(Te,e)},Ya={auto:1,scroll:1},qE=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Rt.core.getCache(s),a=nn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Te&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ya[(l=qn(s)).overflowY]||Ya[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!jr(s)&&(Ya[(l=qn(s)).overflowY]||Ya[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},Wm=function(t,e,n,i){return Oe.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&qE,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&$e(we,Oe.eventTypes[0],wd,!1,!0)},onDisable:function(){return qe(we,Oe.eventTypes[0],wd,!0)}})},$E=/(input|label|select|textarea)/i,bd,wd=function(t){var e=$E.test(t.target.tagName);(e||bd)&&(t._gsapAllow=!0,bd=e)},ZE=function(t){Dr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=yn(t.target)||si,u=Rt.core.globals().ScrollSmoother,h=u&&u.get(),f=er&&(t.content&&yn(t.content)||h&&t.content!==!1&&!h.smooth()&&h.content()),d=gr(c,Ge),_=gr(c,Sn),g=1,m=(Oe.isTouch&&se.visualViewport?se.visualViewport.scale*se.visualViewport.width:se.outerWidth)/se.innerWidth,p=0,E=Mn(i)?function(){return i(a)}:function(){return i||2.8},S,v,C=Wm(c,t.type,!0,s),A=function(){return v=!1},b=fi,P=fi,M=function(){l=gi(c,Ge),P=Do(er?1:0,l),n&&(b=Do(0,gi(c,Sn))),S=Yr},x=function(){f._gsap.y=go(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},D=function(){if(v){requestAnimationFrame(A);var H=go(a.deltaY/2),rt=P(d.v-H);if(f&&rt!==d.v+d.offset){d.offset=rt-d.v;var L=go((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",f._gsap.y=L+"px",d.cacheID=ie.cache,Hi()}return!0}d.offset&&x(),v=!0},O,B,X,q,W=function(){M(),O.isActive()&&O.vars.scrollY>l&&(d()>l?O.progress(1)&&d(l):O.resetTo("scrollY",l))};return f&&Rt.set(f,{y:"+=0"}),t.ignoreCheck=function(Y){return er&&Y.type==="touchmove"&&D()||g>1.05&&Y.type!=="touchstart"||a.isGesturing||Y.touches&&Y.touches.length>1},t.onPress=function(){v=!1;var Y=g;g=go((se.visualViewport&&se.visualViewport.scale||1)/m),O.pause(),Y!==g&&wc(c,g>1.01?!0:n?!1:"x"),B=_(),X=d(),M(),S=Yr},t.onRelease=t.onGestureStart=function(Y,H){if(d.offset&&x(),!H)q.restart(!0);else{ie.cache++;var rt=E(),L,ct;n&&(L=_(),ct=L+rt*.05*-Y.velocityX/.227,rt*=Td(_,L,ct,gi(c,Sn)),O.vars.scrollX=b(ct)),L=d(),ct=L+rt*.05*-Y.velocityY/.227,rt*=Td(d,L,ct,gi(c,Ge)),O.vars.scrollY=P(ct),O.invalidate().duration(rt).play(.01),(er&&O.vars.scrollY>=l||L>=l-1)&&Rt.to({},{onUpdate:W,duration:rt})}o&&o(Y)},t.onWheel=function(){O._ts&&O.pause(),nn()-p>1e3&&(S=0,p=nn())},t.onChange=function(Y,H,rt,L,ct){if(Yr!==S&&M(),H&&n&&_(b(L[2]===H?B+(Y.startX-Y.x):_()+H-L[1])),rt){d.offset&&x();var Ut=ct[2]===rt,Kt=Ut?X+Y.startY-Y.y:d()+rt-ct[1],Z=P(Kt);Ut&&Kt!==Z&&(X+=Z-Kt),d(Z)}(rt||H)&&Hi()},t.onEnable=function(){wc(c,n?!1:"x"),re.addEventListener("refresh",W),$e(se,"resize",W),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=_.smooth=!1),C.enable()},t.onDisable=function(){wc(c,!0),qe(se,"resize",W),re.removeEventListener("refresh",W),C.kill()},t.lockAxis=t.lockAxis!==!1,a=new Oe(t),a.iOS=er,er&&!d()&&d(1),er&&Rt.ticker.add(fi),q=a._dc,O=Rt.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Gm(d,d(),function(){return O.pause()})},onUpdate:Hi,onComplete:q.vars.onComplete}),a};re.sort=function(r){return ne.sort(r||function(t,e){return(t.vars.refreshPriority||0)*-1e6+t.start-(e.start+(e.vars.refreshPriority||0)*-1e6)})};re.observe=function(r){return new Oe(r)};re.normalizeScroll=function(r){if(typeof r>"u")return mn;if(r===!0&&mn)return mn.enable();if(r===!1){mn&&mn.kill(),mn=r;return}var t=r instanceof Oe?r:ZE(r);return mn&&mn.target===t.target&&mn.kill(),jr(t.target)&&(mn=t),t};re.core={_getVelocityProp:Iu,_inputObserver:Wm,_scrollers:ie,_proxies:Mi,bridge:{ss:function(){jn||ts("scrollStart"),jn=nn()},ref:function(){return en}}};Im()&&Rt.registerPlugin(re);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function t(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function e(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=t,DocumentFragment.prototype.replaceChildren=t),Element.prototype.replaceWith||(Element.prototype.replaceWith=e,DocumentFragment.prototype.replaceWith=e))})();function KE(r,t){if(!(r instanceof t))throw new TypeError("Cannot call a class as a function")}function Ad(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Cd(r,t,e){return t&&Ad(r.prototype,t),e&&Ad(r,e),r}function JE(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function Rd(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),e.push.apply(e,n)}return e}function Pd(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?Rd(Object(e),!0).forEach(function(n){JE(r,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Rd(Object(e)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))})}return r}function Xm(r,t){return QE(r)||eT(r,t)||Ym(r,t)||iT()}function vn(r){return jE(r)||tT(r)||Ym(r)||nT()}function jE(r){if(Array.isArray(r))return Hu(r)}function QE(r){if(Array.isArray(r))return r}function tT(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function eT(r,t){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var e=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(e.push(a.value),!(t&&e.length===t));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return e}}function Ym(r,t){if(r){if(typeof r=="string")return Hu(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);if(e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set")return Array.from(r);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return Hu(r,t)}}function Hu(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function nT(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function iT(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Br(r,t){return Object.getOwnPropertyNames(Object(r)).reduce(function(e,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(t),n);return Object.defineProperty(e,n,s||i)},{})}function aa(r){return typeof r=="string"}function Lh(r){return Array.isArray(r)}function qa(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=Br(r),e;return t.types!==void 0?e=t.types:t.split!==void 0&&(e=t.split),e!==void 0&&(t.types=(aa(e)||Lh(e)?String(e):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(t.absolute||t.position)&&(t.absolute=t.absolute||/absolute/.test(r.position)),t}function Ih(r){var t=aa(r)||Lh(r)?String(r):"";return{none:!t,lines:/line/i.test(t),words:/word/i.test(t),chars:/char/i.test(t)}}function Ll(r){return r!==null&&typeof r=="object"}function rT(r){return Ll(r)&&/^(1|3|11)$/.test(r.nodeType)}function sT(r){return typeof r=="number"&&r>-1&&r%1===0}function oT(r){return Ll(r)&&sT(r.length)}function es(r){return Lh(r)?r:r==null?[]:oT(r)?Array.prototype.slice.call(r):[r]}function Dd(r){var t=r;return aa(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?t=document.getElementById(r.trim().slice(1)):t=document.querySelectorAll(r)),es(t).reduce(function(e,n){return[].concat(vn(e),vn(es(n).filter(rT)))},[])}var aT=Object.entries,yl="_splittype",ci={},lT=0;function vi(r,t,e){if(!Ll(r))return console.warn("[data.set] owner is not an object"),null;var n=r[yl]||(r[yl]=++lT),i=ci[n]||(ci[n]={});return e===void 0?t&&Object.getPrototypeOf(t)===Object.prototype&&(ci[n]=Pd(Pd({},i),t)):t!==void 0&&(i[t]=e),e}function zr(r,t){var e=Ll(r)?r[yl]:null,n=e&&ci[e]||{};return n}function qm(r){var t=r&&r[yl];t&&(delete r[t],delete ci[t])}function cT(){Object.keys(ci).forEach(function(r){delete ci[r]})}function uT(){aT(ci).forEach(function(r){var t=Xm(r,2),e=t[0],n=t[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(ci[e]=null,delete ci[e])})}function hT(r){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",e=r?String(r):"";return e.trim().replace(/\s+/g," ").split(t)}var Uh="\\ud800-\\udfff",$m="\\u0300-\\u036f\\ufe20-\\ufe23",Zm="\\u20d0-\\u20f0",Km="\\ufe0e\\ufe0f",fT="[".concat(Uh,"]"),Vu="[".concat($m).concat(Zm,"]"),Gu="\\ud83c[\\udffb-\\udfff]",dT="(?:".concat(Vu,"|").concat(Gu,")"),Jm="[^".concat(Uh,"]"),jm="(?:\\ud83c[\\udde6-\\uddff]){2}",Qm="[\\ud800-\\udbff][\\udc00-\\udfff]",t_="\\u200d",e_="".concat(dT,"?"),n_="[".concat(Km,"]?"),pT="(?:"+t_+"(?:"+[Jm,jm,Qm].join("|")+")"+n_+e_+")*",mT=n_+e_+pT,_T="(?:".concat(["".concat(Jm).concat(Vu,"?"),Vu,jm,Qm,fT].join("|"),`
)`),gT=RegExp("".concat(Gu,"(?=").concat(Gu,")|").concat(_T).concat(mT),"g"),vT=[t_,Uh,$m,Zm,Km],xT=RegExp("[".concat(vT.join(""),"]"));function ST(r){return r.split("")}function i_(r){return xT.test(r)}function MT(r){return r.match(gT)||[]}function yT(r){return i_(r)?MT(r):ST(r)}function ET(r){return r==null?"":String(r)}function TT(r){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=ET(r),r&&aa(r)&&!t&&i_(r)?yT(r):r.split(t)}function Wu(r,t){var e=document.createElement(r);return t&&Object.keys(t).forEach(function(n){var i=t[n],s=aa(i)?i.trim():i;s===null||s===""||(n==="children"?e.append.apply(e,vn(es(s))):e.setAttribute(n,s))}),e}var Nh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function bT(r,t){t=Br(Nh,t);var e=Ih(t.types),n=t.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=hT(i).reduce(function(l,c,u,h){var f,d;return e.chars&&(d=TT(c).map(function(_){var g=Wu(n,{class:"".concat(t.splitClass," ").concat(t.charClass),style:"display: inline-block;",children:_});return vi(g,"isChar",!0),a=[].concat(vn(a),[g]),g})),e.words||e.lines?(f=Wu(n,{class:"".concat(t.wordClass," ").concat(t.splitClass),style:"display: inline-block; ".concat(e.words&&t.absolute?"position: relative;":""),children:e.chars?d:c}),vi(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):d.forEach(function(_){s.appendChild(_)}),u<h.length-1&&s.append(" "),e.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function r_(r,t){var e=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(e))return n;if(e===3&&/\S/.test(r.nodeValue))return bT(r,t);var i=es(r.childNodes);if(i.length&&(vi(r,"isSplit",!0),!zr(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";vi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,h){var f=r_(h,t),d=f.words,_=f.chars;return{words:[].concat(vn(u.words),vn(d)),chars:[].concat(vn(u.chars),vn(_))}},n)}function wT(r,t,e,n){if(!e.absolute)return{top:t?r.offsetTop:null};var i=r.offsetParent,s=Xm(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var h=r.getBoundingClientRect(),f=h.width,d=h.height,_=h.x,g=h.y,m=g+a-c,p=_+o-l;return{width:f,height:d,top:m,left:p}}function s_(r){zr(r).isWord?(qm(r),r.replaceWith.apply(r,vn(r.childNodes))):es(r.children).forEach(function(t){return s_(t)})}var AT=function(){return document.createDocumentFragment()};function CT(r,t,e){var n=Ih(t.types),i=t.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,h,f=[],d=r.parentElement,_=r.nextElementSibling,g=AT(),m=window.getComputedStyle(r),p=m.textAlign,E=parseFloat(m.fontSize),S=E*.2;return t.absolute&&(h={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,vi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),es(s).forEach(function(v){var C=v.parentElement===r,A=wT(v,C,t,e),b=A.width,P=A.height,M=A.top,x=A.left;/^br$/i.test(v.nodeName)||(n.lines&&C&&((l===null||M-l>=S)&&(l=M,o.push(a=[])),a.push(v)),t.absolute&&vi(v,{top:M,left:x,width:b,height:P}))}),d&&d.removeChild(r),n.lines&&(f=o.map(function(v){var C=Wu(i,{class:"".concat(t.splitClass," ").concat(t.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});vi(C,"isLine",!0);var A={height:0,top:1e4};return g.appendChild(C),v.forEach(function(b,P,M){var x=zr(b),D=x.isWordEnd,O=x.top,B=x.height,X=M[P+1];A.height=Math.max(A.height,B),A.top=Math.min(A.top,O),C.appendChild(b),D&&zr(X).isWordStart&&C.append(" ")}),t.absolute&&vi(C,{height:A.height,top:A.top}),C}),n.words||s_(g),r.replaceChildren(g)),t.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),es(s).forEach(function(v){var C=zr(v),A=C.isLine,b=C.top,P=C.left,M=C.width,x=C.height,D=zr(v.parentElement),O=!A&&D.isLine;v.style.top="".concat(O?b-D.top:b,"px"),v.style.left=A?"".concat(h.left,"px"):"".concat(P-(O?h.left:0),"px"),v.style.height="".concat(x,"px"),v.style.width=A?"".concat(h.width,"px"):"".concat(M,"px"),v.style.position="absolute"})),d&&(_?d.insertBefore(r,_):d.appendChild(r)),f}var ys=Br(Nh,{}),RT=function(){Cd(r,null,[{key:"clearData",value:function(){cT()}},{key:"setDefaults",value:function(e){return ys=Br(ys,qa(e)),Nh}},{key:"revert",value:function(e){Dd(e).forEach(function(n){var i=zr(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",qm(n))})}},{key:"create",value:function(e,n){return new r(e,n)}},{key:"data",get:function(){return ci}},{key:"defaults",get:function(){return ys},set:function(e){ys=Br(ys,qa(e))}}]);function r(t,e){KE(this,r),this.isSplit=!1,this.settings=Br(ys,qa(e)),this.elements=Dd(t),this.split()}return Cd(r,[{key:"split",value:function(e){var n=this;this.revert(),this.elements.forEach(function(o){vi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];e!==void 0&&(this.settings=Br(this.settings,qa(e)));var s=Ih(this.settings.types);s.none||(this.elements.forEach(function(o){vi(o,"isRoot",!0);var a=r_(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(vn(n.words),vn(l)),n.chars=[].concat(vn(n.chars),vn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=CT(o,n.settings,i);n.lines=[].concat(vn(n.lines),vn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),uT())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();class o_{constructor(t="null",e=null){this.containerId=t,this.loadingManager=e,this.scene=new PM,this.fov=75,this.camera=new Xn(this.fov,window.innerWidth/window.innerHeight,.1,5e3),this.camera.position.z=5,this.clock=new gy,this.mesh=null,this.init()}init(){alert("INIT CLASS MUST BE INITIALIZED IN CHILD CLASS")}update(){alert("UPDATE CLASS MUST BE INITIALIZED IN CHILD CLASS")}}class PT extends o_{constructor(t,e){super(t,e),this.clearAlpha=0,this.mouseX=0,this.mouseY=0,this.camera.fov=35,this.floor=null,this.windowHalfX=window.innerWidth/2,this.windowHalfY=window.innerHeight/2,this.onDocumentMouseMove=this.onDocumentMouseMove.bind(this),document.addEventListener("mousemove",this.onDocumentMouseMove)}init(){this.camera.position.z=1500,this.scene.fog=new ih(14604739,3500,4e3);const t=document.createElement("canvas"),e=t.getContext("2d");t.width=1024,t.height=1024;const n=64;for(let S=0;S<t.height/n;S++)for(let v=0;v<t.width/n;v++)e.fillStyle=(v+S)%2===0?"#ffe3a6":"#030200",e.fillRect(v*n,S*n,n,n);const i=new DM(t);i.wrapS=Fo,i.wrapT=Fo,i.repeat.set(100,100),i.encoding=void 0,i.needsUpdate=!0;const s=new ra(100,100),o=new Vf({map:i});this.floor=new $n(s,o),this.floor.name="floor",this.floor.rotation.x=-Math.PI/2,this.floor.scale.set(1e3,1e3,1e3),this.floor.receiveShadow=!0,this.scene.add(this.floor);const a=100,l=160,c=new mp;c.moveTo(-a/2,-l/2),c.lineTo(a/2,-l/2),c.lineTo(a/2,l/2),c.lineTo(-a/2,l/2),c.lineTo(-a/2,-l/2);const u=80,h=140,f=new du;f.moveTo(-u/2,-h/2),f.lineTo(u/2,-h/2),f.lineTo(u/2,h/2),f.lineTo(-u/2,h/2),f.lineTo(-u/2,-h/2),c.holes.push(f);const d={depth:2,bevelEnabled:!0,bevelThickness:.2,bevelSize:.2,bevelSegments:2},_=new oh(c,d);new Al(100,64,64);const g=new Vf({color:"green"}),m=new $n(_,g);m.position.set(0,100,1e3),this.scene.add(m),m.castShadow=!0;const p=new _y(16777215,.5);this.scene.add(p);const E=new my(16777215,3);E.position.set(5,10,7.5),E.castShadow=!0,this.scene.add(E)}update(){const n=ca.clamp((this.camera.position.z-0)/1500,0,1),i=1,s=300,o=ca.lerp(i,this.mouseX,n);this.camera.position.x+=(o-this.camera.position.x)*.05;const a=-(this.mouseY-200),l=ca.clamp(a,50,200),c=ca.lerp(s,l,n);this.camera.position.y+=(c-this.camera.position.y)*.05,this.camera.lookAt(0,0,0),console.log(this.scene.getObjectByName("floor").rotation.z)}onDocumentMouseMove(t){this.mouseX=t.clientX-this.windowHalfX,this.mouseY=t.clientY-this.windowHalfY}}class DT extends o_{constructor(t,e){super(t,e),this.clearAlpha=1}init(){const t=new Al(1,32,32),e=new th({color:65280});new fy(this.loadingManager).load("./textures/checker.jpg",i=>{e.map=i,e.needsUpdate=!0}),this.mesh=new $n(t,e),this.scene.add(this.mesh),this.camera.position.z=5}update(){this.mesh.rotation.x+=this.clock.getDelta(),this.mesh.rotation.y+=this.clock.getDelta()}}var LT="1.1.16";function a_(r,t,e){return Math.max(r,Math.min(t,e))}function IT(r,t,e){return(1-e)*r+e*t}function UT(r,t,e,n){return IT(r,t,1-Math.exp(-e*n))}function NT(r,t){return(r%t+t)%t}var OT=class{constructor(){kt(this,"isRunning",!1);kt(this,"value",0);kt(this,"from",0);kt(this,"to",0);kt(this,"currentTime",0);kt(this,"lerp");kt(this,"duration");kt(this,"easing");kt(this,"onUpdate")}advance(r){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=a_(0,this.currentTime/this.duration,1);t=n>=1;const i=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=UT(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function FT(r,t){let e;return function(...n){let i=this;clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(i,n)},t)}}var BT=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){kt(this,"width",0);kt(this,"height",0);kt(this,"scrollHeight",0);kt(this,"scrollWidth",0);kt(this,"debouncedResize");kt(this,"wrapperResizeObserver");kt(this,"contentResizeObserver");kt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});kt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});kt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,e&&(this.debouncedResize=FT(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,t;(r=this.wrapperResizeObserver)==null||r.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},l_=class{constructor(){kt(this,"events",{})}emit(r,...t){var n;let e=this.events[r]||[];for(let i=0,s=e.length;i<s;i++)(n=e[i])==null||n.call(e,...t)}on(r,t){var e;return(e=this.events[r])!=null&&e.push(t)||(this.events[r]=[t]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>t!==i)}}off(r,t){var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}destroy(){this.events={}}},Ld=100/6,tr={passive:!1},zT=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){kt(this,"touchStart",{x:0,y:0});kt(this,"lastDelta",{x:0,y:0});kt(this,"window",{width:0,height:0});kt(this,"emitter",new l_);kt(this,"onTouchStart",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});kt(this,"onTouchMove",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});kt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});kt(this,"onWheel",r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=n===1?Ld:n===2?this.window.width:1,s=n===1?Ld:n===2?this.window.height:1;t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})});kt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,tr),this.element.addEventListener("touchstart",this.onTouchStart,tr),this.element.addEventListener("touchmove",this.onTouchMove,tr),this.element.addEventListener("touchend",this.onTouchEnd,tr)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,tr),this.element.removeEventListener("touchstart",this.onTouchStart,tr),this.element.removeEventListener("touchmove",this.onTouchMove,tr),this.element.removeEventListener("touchend",this.onTouchEnd,tr)}},kT=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=C=>Math.min(1,1.001-Math.pow(2,-10*C)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f="vertical",touchMultiplier:d=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:E=!0,autoRaf:S=!1,__experimental__naiveDimensions:v=!1}={}){kt(this,"_isScrolling",!1);kt(this,"_isStopped",!1);kt(this,"_isLocked",!1);kt(this,"_preventNextNativeScrollEvent",!1);kt(this,"_resetVelocityTimeout",null);kt(this,"__rafID",null);kt(this,"isTouching");kt(this,"time",0);kt(this,"userData",{});kt(this,"lastVelocity",0);kt(this,"velocity",0);kt(this,"direction",0);kt(this,"options");kt(this,"targetScroll");kt(this,"animatedScroll");kt(this,"animate",new OT);kt(this,"emitter",new l_);kt(this,"dimensions");kt(this,"virtualScroll");kt(this,"onPointerDown",r=>{r.button===1&&this.reset()});kt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(this.isTouching=n.type==="touchstart"||n.type==="touchmove",this.options.syncTouch&&i&&n.type==="touchstart"&&!this.isStopped&&!this.isLocked){this.reset();return}const a=t===0&&e===0,l=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(a||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,E,S;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((E=m.hasAttribute)==null?void 0:E.call(m,"data-lenis-prevent-touch"))||s&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=e;this.options.gestureOrientation==="both"?f=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(f=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const d=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...d?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});kt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isScrolling="native",this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});kt(this,"raf",r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=LT,(!r||r===document.documentElement||r===document.body)&&(r=window),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:E,autoRaf:S,__experimental__naiveDimensions:v},this.dimensions=new BT(r,t,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new zT(e,{touchMultiplier:d,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}setScroll(r){this.isHorizontal?this.rootElement.scrollLeft=r:this.rootElement.scrollTop=r}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();t-=this.isHorizontal?_.left:_.top}const d=f.getBoundingClientRect();r=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=t,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=a_(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=h??{},e){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={};return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),d||this.emit(),d&&(this.reset(),this.emit(),l==null||l(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?NT(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};let sn=null,HT=60;new RT(".split");const Oh=new xp;oa.registerPlugin(re);const VT=document.getElementById("loadingHeadGif");VT.setAttribute("src","./gifs/LoadingHead3.gif");Oh.onLoad=()=>{setTimeout(function(){window.scrollTo(0,0),document.body.style.overflow="auto";const t=new kT;function e(n){t.raf(n),requestAnimationFrame(e)}requestAnimationFrame(e)},0),oa.timeline().to(".bg-div",{opacity:0,ease:"power1.in",duration:.8}).to("#loading-screen",{yPercent:-100,ease:"power3.inOut",duration:1}).from(".split .char",{yPercent:100,ease:"power1.inOut",duration:1,stagger:.001}),u_()};const yi=new RM({antialias:!0});yi.outputEncoding=void 0;yi.gammaFactor=100;const GT=new PT("first-scene",Oh,yi);new DT("second-scene",Oh,yi);WT(GT);window.addEventListener("resize",c_);function c_(){if(sn){const r=document.getElementById(sn.containerId);yi.setSize(r.offsetWidth,r.offsetHeight),yi.setPixelRatio(window.devicePixelRatio),yi.setClearAlpha(sn.clearAlpha),sn.camera.aspect=r.offsetWidth/r.offsetHeight,sn.camera.updateProjectionMatrix()}}function WT(r){sn=r;const t=document.getElementById(sn.containerId);c_(),t.appendChild(yi.domElement),yi.render(sn.scene,sn.camera)}function u_(){setTimeout(()=>{requestAnimationFrame(u_),sn&&(sn.update(),yi.render(sn.scene,sn.camera))},1e3/HT)}const XT=oa.timeline({scrollTrigger:{trigger:"#first-scene",pin:!0,start:"top top",end:"+=1000",scrub:1}});XT.to(sn.camera.position,{z:0}).to(sn.scene.getObjectByName("floor").rotation,{z:-Math.PI/4,onComplete:()=>{oa.to(sn.scene.getObjectByName("floor").material.map.offset,{x:-100,y:-100,duration:1100,ease:"none"})}}).from(".walk",{opacity:0});
