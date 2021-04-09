<template>
  <router-view/>
</template>

<style lang="scss">
*{
  margin: 0px;
  padding: 0px;
}
html,body{
  height:100%;
} 
#app{
  height:100%;
  overflow: scroll;
}
body{
  font-size: 18px;
  overflow-x: hidden;
}
.van-tab{
  // font-size: 34px;
  // line-height: 40px;
  padding-top: 20px;
  // color: #999999;
  //  border-bottom: 20px solid #c5c5c599;
}
// .van-tabs--line .van-tabs__wrap{
//   height: 50px;
//   padding-top: 10px;
//   margin-bottom: 100px;
//   border-bottom: 1px solid #c5c5c599;
// }
// .van-tab--active{
//   color:#E1463C
// }
// .van-tabs__line{
//   width: 106px;
// }
.re-swift .van-swipe__track{
  align-items: baseline;
  height: 807px;
}
.indexs .van-swipe__track{
  align-items: baseline;
}
.van-swipe__indicator--active{
  width: 28px !important;
}
.van-swipe__indicator{
  width: 12px;
  height: 12px;
  background-color: #C39F6C;
  border-radius: 8px;
}
.van-popup{
  overflow: inherit;
}
.lisCls{
  height: 0px;
  overflow: hidden;
  border:none;
  padding: 0px;
  margin: 0px;
}
.van-swipe__indicator{
  transition: width 0.2s;
}
.re-swift img{
  width: 100%;
}
.re-swift .van-swipe__track{
  width: 2000px !important;
}
.van-radio{
  margin-top: 10px;
  font-size: 24px;
}
.van-field__control{
  font-size: 24px;
}
.van-picker__cancel, .van-picker__confirm{
  font-size: 24px;
  padding: 10px;
}
.van-picker-column{
  font-size:24px;
}
.van-cell--clickable{
  margin: 0px 10px;
}
.van-cell--required::before{
  padding-top: 5px;
}
.van-field__label span{
  display: block;
  font-size: 24px;
  padding-top: 4px;
  width: 130px;
}
.van-field__label{
  width: 110px;
}
.mall{
  width: 600px;
}
.mall .van-dialog__footer{
  display: none;
}
</style>
