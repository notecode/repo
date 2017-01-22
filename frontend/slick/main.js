$(function () {
  console.log('xx');
//  $('#slides').slick({
//    slidesToShow: 3,
//    infinite: false
//  })
//

    var log = Log4js.getLogger("wph");
    log.addAppender(new Log4js.BrowserConsoleAppender),
    log.setLevel(Log4js.Level.ALL);

    log.info('info');
    log.debug('debug');
})
