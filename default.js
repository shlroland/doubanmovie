var app = {
  init: function() {
    this.$tabs = $("footer>div");
    this.$panels = $("section");
    this.bind();
    top250.init();
    bm.init();
    search.init();
  },
  bind: function() {
    var _this = this;
    this.$tabs.on("click", function() {
      var index = $(this).index();
      _this.$panels
        .eq(index)
        .fadeIn()
        .siblings()
        .hide();
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  }
};
var top250 = {
  init: function() {
    this.$element = $("#top250");
    this.isLoading = false;
    this.index = 0;
    this.isFinished = false;
    this.bind();
    this.start();
  },
  bind: function() {
    var _this = this;
    this.$element.scroll(function() {
      _this.start();
    });
  },
  start: function() {
    var _this = this;
    this.getData(data => {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    if (_this.isLoading) {
      return;
    }
    _this.isLoading = true;
    _this.$element.find(".loading").show();
    $.ajax({
      url: "//api.douban.com/v2/movie/top250",
      type: "GET",
      data: {
        start: this.index || 0,
        count: 20
      },
      dataType: "jsonp"
    })
      .done(function(data) {
        _this.index += 20;
        if (_this.index >= data.total) {
          _this.isFinished = true;
        }
        callback && callback(data);
      })
      .fail(function() {
        console.log("数据异常");
      })
      .always(function() {
        _this.isLoading = false;
        _this.$element.find(".loading").hide();
      });
  },
  render: function(data) {
    var _this = this;
    console.log(3)
    data.subjects.forEach(subject => {
      var tpl = `<div class="item">
        <a href="#">
        <div class="cover">
          <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="封面挂了">
        </div>
        <div class="detail">
          <h2>肖申克的救赎</h2>
          <div class="extra"><span class="score">9.3分</span><span>分</span> / <span class="collection"></span>收藏</div>
          <div class="extra">1994</div>
          <div class="extra">张艺谋</div>
          <div class="extra">张艺谋</div>
        </div>
      </a>
      </div>`;
      var $node = $(tpl);
      $node.find(".cover img").attr("src", subject.images.small);
      $node.find(".detail h2").text(subject.title);
      $node.find(".detail .score").text(subject.rating.average);
      $node.find(".detail .collection").text(subject.collect_count);
      $node
        .find(".detail .extra")
        .eq(1)
        .text(subject.year + " / " + subject.genres.join("、"));
      $node
        .find(".detail .extra")
        .eq(2)
        .text("导演：" + subject.directors.map(v => v.name).join("、"));
      $node
        .find(".detail .extra")
        .eq(3)
        .text("主演：" + subject.casts.map(v => v.name).join("、"));
        _this.$element.find(".container").append($node);
    });
  },
  isToBottom: function() {
      console.log(this.$element.find(".container"))
      console.log(this.$element.height() + this.$element.scrollTop())
    return (
      this.$element.find(".container") <=
      this.$element.height() + this.$element.scrollTop() + 10
    );

  }
};
var bm = {
  init: function() {
      this.$element = $('#beimei')
      this.bind()
      this.start()
  },
  bind: function() {},
  start: function() {
    var _this = this;
    this.getData(data => {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    if (_this.isLoading) {
      return;
    }
    _this.isLoading = true;
    _this.$element.find(".loading").show();
    $.ajax({
      url: "//api.douban.com/v2/movie/us_box",
      type: "GET",
      dataType: "jsonp"
    })
      .done(function(data) {
        callback && callback(data);
      })
      .fail(function() {
        console.log("数据异常");
      })
      .always(function() {
        _this.isLoading = false;
        _this.$element.find(".loading").hide();
      });
  },
  render: function(data) {
    console.log(data)
    var _this = this;
    data.subjects.forEach(subject => {
        subject = subject.subject
      var tpl = `<div class="item">
        <a href="#">
        <div class="cover">
          <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="封面挂了">
        </div>
        <div class="detail">
          <h2>肖申克的救赎</h2>
          <div class="extra"><span class="score">9.3分</span><span>分</span> / <span class="collection"></span>收藏</div>
          <div class="extra">1994</div>
          <div class="extra">张艺谋</div>
          <div class="extra">张艺谋</div>
        </div>
      </a>
      </div>`;
      var $node = $(tpl);
      $node.find(".cover img").attr("src", subject.images.small);
      $node.find(".detail h2").text(subject.title);
      $node.find(".detail .score").text(subject.rating.average);
      $node.find(".detail .collection").text(subject.collect_count);
      $node
        .find(".detail .extra")
        .eq(1)
        .text(subject.year + " / " + subject.genres.join("、"));
      $node
        .find(".detail .extra")
        .eq(2)
        .text("导演：" + subject.directors.map(v => v.name).join("、"));
      $node
        .find(".detail .extra")
        .eq(3)
        .text("主演：" + subject.casts.map(v => v.name).join("、"));
        _this.$element.find(".container").append($node);
    });
  },
};
var search = {
    init: function() {
        this.$element = $('#search')
        this.keyword = ''
        this.bind()
        // this.start()
    },
    bind: function() {
        _this = this
        this.$element.find('button').click(function () { 
            _this.keyword = _this.$element.find('input')[0].value
            console.log('_this.keyword')
            console.log(_this.keyword)
            _this.start()
         })
    },
    start: function() {
      var _this = this;
      this.getData(data => {
        _this.render(data);
      });
    },
    getData: function(callback) {
      var _this = this;
    //   if (_this.isLoading) {
    //     return;
    //   }
      _this.isLoading = true;
      _this.$element.find(".loading").show();
      $.ajax({
        url: "//api.douban.com/v2/movie/search",
        data:{
            q:_this.keyword
        },
        type: "GET",
        dataType: "jsonp"
      })
        .done(function(data) {
          callback && callback(data);
        })
        .fail(function() {
          console.log("数据异常");
        })
        .always(function() {
          _this.isLoading = false;
          _this.$element.find(".loading").hide();
        });
    },
    render: function(data) {
      console.log(data)
      var _this = this;
      data.subjects.forEach(subject => {
        var tpl = `<div class="item">
          <a href="#">
          <div class="cover">
            <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="封面挂了">
          </div>
          <div class="detail">
            <h2>肖申克的救赎</h2>
            <div class="extra"><span class="score">9.3分</span><span>分</span> / <span class="collection"></span>收藏</div>
            <div class="extra">1994</div>
            <div class="extra">张艺谋</div>
            <div class="extra">张艺谋</div>
          </div>
        </a>
        </div>`;
        var $node = $(tpl);
        $node.find(".cover img").attr("src", subject.images.small);
        $node.find(".detail h2").text(subject.title);
        $node.find(".detail .score").text(subject.rating.average);
        $node.find(".detail .collection").text(subject.collect_count);
        $node
          .find(".detail .extra")
          .eq(1)
          .text(subject.year + " / " + subject.genres.join("、"));
        $node
          .find(".detail .extra")
          .eq(2)
          .text("导演：" + subject.directors.map(v => v.name).join("、"));
        $node
          .find(".detail .extra")
          .eq(3)
          .text("主演：" + subject.casts.map(v => v.name).join("、"));
          _this.$element.find(".container").append($node);
      });
    },
};
app.init();
