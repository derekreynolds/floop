// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'main/webapp/bower_components/modernizr/modernizr.js',
            'main/webapp/bower_components/jquery/dist/jquery.js',
            'main/webapp/bower_components/stomp-websocket/lib/stomp.min.js',
            'main/webapp/bower_components/sockjs-client/dist/sockjs.js',
            'main/webapp/bower_components/bootstrap/dist/js/bootstrap.js',
            'main/webapp/bower_components/json3/lib/json3.js',
            'main/webapp/bower_components/angular/angular.js',
            'main/webapp/bower_components/angular-ui-router/release/angular-ui-router.js',
            'main/webapp/bower_components/angular-resource/angular-resource.js',
            'main/webapp/bower_components/angular-cookies/angular-cookies.js',
            'main/webapp/bower_components/angular-sanitize/angular-sanitize.js',
            'main/webapp/bower_components/angular-translate/angular-translate.js',
            'main/webapp/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            'main/webapp/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'main/webapp/bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
            'main/webapp/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'main/webapp/bower_components/angular-cache-buster/angular-cache-buster.js',
            'main/webapp/bower_components/underscore.string/dist/underscore.string.js',
            'main/webapp/bower_components/angular-underscore-string/angular-underscore-string.js',
            'main/webapp/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'main/webapp/bower_components/lodash/lodash.js',
            'main/webapp/bower_components/restangular/dist/restangular.js',
            'main/webapp/bower_components/toastr/toastr.js',
            'main/webapp/bower_components/moment/moment.js',
            'main/webapp/bower_components/angular-animate/angular-animate.js',
            'main/webapp/bower_components/angular-ui-select/dist/select.js',
            'main/webapp/bower_components/angular-google-maps/dist/angular-google-maps.js',
            'main/webapp/bower_components/ui-utils/ui-utils.js',
            'main/webapp/bower_components/get-style-property/get-style-property.js',
            'main/webapp/bower_components/get-size/get-size.js',
            'main/webapp/bower_components/eventie/eventie.js',
            'main/webapp/bower_components/doc-ready/doc-ready.js',
            'main/webapp/bower_components/eventEmitter/EventEmitter.js',
            'main/webapp/bower_components/matches-selector/matches-selector.js',
            'main/webapp/bower_components/outlayer/item.js',
            'main/webapp/bower_components/outlayer/outlayer.js',
            'main/webapp/bower_components/masonry/masonry.js',
            'main/webapp/bower_components/imagesloaded/imagesloaded.js',
            'main/webapp/bower_components/angular-masonry/angular-masonry.js',
            'main/webapp/bower_components/angular-mocks/angular-mocks.js',
            // endbower
            'main/webapp/scripts/app/app.js',
            'main/webapp/scripts/app/**/*.js',
            'main/webapp/scripts/components/**/*.js',
            'test/javascript/**/!(karma.conf).js'
        ],


        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 9876,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
