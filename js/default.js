var app = {
  init: function() {
    this.$tabs = $("footer>div");
    this.$panels = $("section");
    this.bind();
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
app.init();
