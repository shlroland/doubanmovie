var n = 0;
var isLoading = false;
$("footer>div").click(function() {
  var index = $(this).index();
  $("section")
    .eq(index)
    .fadeIn()
    .siblings()
    .hide();
  $(this)
    .addClass("active")
    .siblings()
    .removeClass("active");
});
begin();
function begin() {
  if (isLoading) {
    return;
  }
  isLoading = true;
  $(".loading").show();
  $.ajax({
    url: "//api.douban.com/v2/movie/top250",
    type: "GET",
    data: {
      start: n,
      count: 20
    },
    dataType: "jsonp"
  })
    .done(function(data) {
      console.log(data);
      setData(data);
      n += 20;
    })
    .fail(function() {
      cosnsole.log(111);
    })
    .always(function() {
      isLoading = false;
      $(".loading").show();
    });
}
var clock;
$("main").scroll(function() {
  if (clock) {
    clearTimeout(clock);
  }
  clock = setTimeout(() => {
    if (
      $("section")
        .eq(0)
        .height() <=
      $("main").scrollTop() + $("main").height()
    ) {
      console.log(1);
      begin();
    }
  },300);
});

function setData(data) {
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
    $("#top250 .container").append($node);
  });
}
