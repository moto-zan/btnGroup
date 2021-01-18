// 暴露出对象
var btnGroup = btnGroup || {};
(
function () {
    // 先定义一个类，写类的生命周期
    function ButtonFact(params) {
      this.config = {
        title: '提示',
        content: '这是提示的文字',
        ele: '.motoui-footer', // 追加到哪个dom下级
        buttons: [
          {
          link: '',
          label: '确定', // 按钮的文字
          labelColor: 'whiter',
          btnBg: '', // 按钮的图片
          btnBgColor: '#07c160',
          clickCallback: function(params){ 
            console.log(params);
            location.href = ''} // 按钮的回调函数
          }
        ],
      },
      this.handlers = {}
    }
    ButtonFact.prototype = {
      // 给类添加方法
      render: function () {
        // 将字符串转化为jq对象
        var btnSnack = ''
        var btnArrs = this.config.buttons
        console.log(btnArrs.length === 1)
        // 通过数据控制样式变化，如果有背景图就让文字和背景颜色消失
        for (var i = 0, len = btnArrs.length; i < len; i++) {
          console.log(btnArrs[i].btnBg)
          if (btnArrs[i].btnBg) {
            btnArrs[i].label = ''
            btnArrs[i].btnBgColor = 'transparent'
          }
          if (btnArrs[i].clickCallback) {
            btnArrs[i].link = 'javascript:;'
          }
          // 如果是link有值，则赋值href, 没有的话替换为javascript:; btnArrs[i].btnBg
          btnSnack += 
          ' <div class="motoui-flex__item" style="color:'+ btnArrs[i].labelColor +
          '"><a class="link motoui-btn motoui-primary" id="motoui-btn__' + i +'" style="background:'+ (btnArrs[i].btnBgColor || '') +
          ' url(' + (btnArrs[i].btnBg || '')+  ') no-repeat top/100%;'+ 'color:'+ btnArrs[i].labelColor +
          '" href="'+ (btnArrs[i].link || 'javascript:;') +'">'+
          btnArrs[i].label + '</a></div>'
        }
        this.boundingBox = 
          '<div class="motoui__bd motoui__bd_spacing">'+ 
          ' <div class="motoui-flex motoui-btn__group">' +
          btnSnack + 
          ' </div> ' +
          '</div>'
        // 追加dom
        $(this.config.ele).append(this.boundingBox)
        // 如果只有一个按钮，样式要变化 motoui-flex motoui-only-child
        if(btnArrs.length===1) {
          $('.motoui-flex').addClass('motoui-only-child')
        }
        this.bind(btnArrs)
      },
      bind: function (btnArrs) {
        for (var i = 0, len = btnArrs.length; i < len; i++) {
          // 由于匿名函数里面没有i这个变量，所以这个i他要从父级函数中寻找i，而父级函数中的i在for循环中，当找到这个i的时候，是for循环完毕的i
          (function (i) {
            $('.motoui-btn__group').on('click', '#motoui-btn__' + i, function () {
              // 执行对应的回调函数 如果回调要传递参数怎么办, apply需要的是数组，是将arguments转化成相应的数组；
              // 此处的Array.prototype.slice.call(arguments)；是将arguments转化成相应的数组；
              btnArrs[i].clickCallback.apply(this, Array.prototype.slice.call(arguments,0))
            })
          })(i)
        }

      },
      init: function (cfg) {
        console.log(this)
        /* 
        config: {title: "提示", content: "这是提示的文字", alertHandler: null, confirmHandler: null, type: "未知的类型"}
        handlers:
        __proto__: Object
        __proto__:
        alert: ƒ (cfg)
        confirm: ƒ (cfg)
        render: ƒ ()
        */
       // 合并参数
       $.extend(this.config, cfg);
        // 调用render方法
        this.render()
        // 返回自身实例
        return this;
      }
    }

    // 暴露类的api方法，使得外部能随时调用
    btnGroup.show = function (cfg) {
      // options 为用户定义的配置参数
      return new ButtonFact().init(cfg)
    }
}
)()