let score = 0;
function createRandomBubble() {
  const $bubble = $("<div>").addClass("bubble");
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomColor = `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256})`;

  $bubble.text(randomChar);
  $bubble.css({ left: Math.random() * (width - 35), top: Math.random() * (height - 35), backgroundColor: randomColor });

  $bubble.appendTo("#game-container");

  $bubble.click(function () {
    $(this).remove();
    score++;
    $("#score").text("Score: " + score);
  });
}
$(document).keydown(function (e) {
  const keyCode = e.which;
  if (keyCode >= 65 && keyCode <= 90) {
    const keyChar = String.fromCharCode(keyCode);
    $(".bubble").each(function () {
      if ($(this).text() === keyChar) {
        $(this).remove();
        score++;
        $("#score").text("Score: " + score);
      }
    });
  }
});
const width = screen.width - 100;
const height = screen.height - 200;

setInterval(createRandomBubble, 1000);
$(document).ready(function () {
});