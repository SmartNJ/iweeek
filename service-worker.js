/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2017/05/04/java/java-array/index.html","41f9d6c35a23f8804bd19ee12e24b806"],["2018/04/05/other/this-time-I-am-serious/index.html","dc9ff7db519a80b5e22ebc3a1f352947"],["2018/04/11/other/top-of-the-wave/index.html","a77c61e4c90a9bf18a40201abedcd5c7"],["2018/04/13/efficiency/the-best-way-to-program/index.html","b77992174cf33af8600f3bc3b08fc213"],["2018/04/13/other/IT-laws/index.html","f3b218d3ba574e44694a3e4ee5c5c8a0"],["2018/04/16/efficiency/mac-tool/index.html","830c888fa4d4088b3695171f3e394126"],["2018/04/17/other/three-successful-transgenic-companies/index.html","4d7e18ff5c35ea2605a5b0040ce071aa"],["2018/04/18/other/understanding-the-domain/index.html","493122a2e9d0de9816c97c1606ca2554"],["2018/04/19/design-pattern/initialization-on-demand-holder-idiom/index.html","595e8b52ac5d574d1dec40057e491e38"],["2018/05/04/android/android-processes-and-threads/index.html","c32ccc2a635227cdc1d10a86cc658206"],["2018/05/04/android/service-is-a-context/index.html","61d3cfdc2b42b5b766f06d92f13f4cc0"],["2018/05/05/algorithm/print-list-from-tail-to-head/index.html","cdfcbe7cec2b6d1eb953709c0cd27c28"],["2018/05/10/algorithm/bag-queue-stack/index.html","c7183b383762d5cf7885b85cea101de6"],["2018/05/11/algorithm/merge-sort/index.html","8d44979e9e7fde6411642520f353e17d"],["2018/05/15/algorithm/DutchNationalProblem/index.html","1e92a08a909ac2e789574e76a7cbf635"],["2018/05/15/algorithm/quick-sort/index.html","06465e58934dd57fd669128fd7a320e4"],["2018/05/16/linux/5-ways-to-empty-or-delete-a-large-file-content-in-linux/index.html","ed2327da469eb419c1840ece0d482a0f"],["2018/05/26/c/deep-in-c-proccess/index.html","d85f70efe98f4c4c23d15d406bbf2893"],["2018/05/27/c/learn-to-use-gdb/index.html","1ac45f563a034c29c999b504ae63dcc7"],["2018/05/27/css/css-selectors/index.html","adcaa13aef70ae803820c1421c589b35"],["2018/05/29/mysql/mysql-jdbc-zeroDateTimeBehavior/index.html","bf70cb0d1cb3500411219dce06243ef1"],["2018/06/02/linux/daily-command-tar/index.html","cf68bd516e274ae69e07bd82e5324afa"],["2018/06/03/linux/daily-command-echo/index.html","b0dc00b856c517f682c976d6e98970d3"],["2018/06/04/linux/daily-command-lsof/index.html","2e0f892dac42c9f07579d30ac03c04c9"],["2018/06/04/linux/daily-command-ps/index.html","a94942363da1ab305e1ea0d9671e9e79"],["2018/06/06/linux/daily-command-iftop/index.html","3a4839037e008fbf42ef27f9fc1b6ca7"],["2018/06/07/linux/daily-command-netstat/index.html","4072212a7d3824c56d3523fa072f157b"],["2018/06/08/linux/daily-command-find/index.html","a185f927fe3663ff4ec14985ccfa60a9"],["2018/06/08/linux/daily-command-xargs/index.html","20cd73ec1f62bbbae4b63b6001d91c0a"],["2018/06/09/linux/daily-command-awk/index.html","6aaf439eae81a57020fffe207b5afddd"],["2018/06/09/linux/daily-command-grep/index.html","01b8cad1df3f33f4f7ff221c0dc44984"],["2018/06/09/linux/daily-command-io-redirection/index.html","2cfab08febdec9be1010c9336a1d999e"],["2018/06/09/linux/daily-command-pipe/index.html","4b77ff4655eef90d967869a5b523f50f"],["2018/06/09/linux/daily-command-tee/index.html","a4af0f42269157df9feb9d5fe63ece2d"],["2018/06/10/linux/daily-command-cat/index.html","b78071b67099851e51b5346a0afd0065"],["2018/06/10/linux/daily-command-read/index.html","2710d222dc242064fe8c1e6b2abb1af4"],["2018/06/11/linux/daily-command-df/index.html","3443dd1c1bfb6188d67fac4338161dc1"],["2018/06/11/linux/daily-command-du/index.html","567dc3771a6bb2d50afb72b1e1d7c776"],["2018/06/11/linux/daily-command-scp/index.html","9041c6fe13618e6aa0b2fb4a5c3f2646"],["2018/06/11/linux/daily-command-sort/index.html","bf3a27b9b62f788ffe331b68b163b7de"],["2018/06/11/linux/daily-command-top/index.html","a3012b071290fc606138e7e6b1238c5e"],["2018/06/12/linux/daily-command-join/index.html","dcb8caf28cf87364e628a0fc50d7f066"],["2018/06/12/linux/daily-command-ping/index.html","7462f9843bfefc508d820dd07a0ba2a2"],["2018/06/12/linux/daily-command-route/index.html","6dac6fb8e8e176c4b913ba4944a3b44b"],["2018/06/12/linux/daily-command-uniq/index.html","0855a6ee076d188a50de7ac72f557dfb"],["2018/06/13/linux/daily-command-cut/index.html","54050574d88366e79644c628a60b656f"],["2018/06/13/linux/daily-command-head/index.html","341ba47e505b8729f1e1113c7026c354"],["2018/06/13/linux/daily-command-more/index.html","ec2ad40bba9480297d9a10f45ea13687"],["2018/06/13/linux/daily-command-tail/index.html","2fc406d4b944abd7d941afbe5017b05e"],["2018/06/13/linux/daily-command-type/index.html","de8ec0748569d768c94e342e202d8cc3"],["2018/06/14/linux/daily-command-touch/index.html","7da13fe56d99565e5f61eb9aea7873d7"],["2018/06/15/linux/daily-command-ls/index.html","2af77154cda4f1c54f96cc52652d4252"],["2018/06/19/daily-command-cd/index.html","5f903b49f25f0923765e57c270061821"],["2018/06/19/daily-command-date/index.html","a28fe13da52f0c21a39a8fe5e068196f"],["2018/06/20/daily-command-stat/index.html","407c085f4f7d20609e062f15b63506bc"],["2018/06/20/daily-command-wc/index.html","3e5c18bb1537815e2e7b6e89232ea2e2"],["2018/06/20/linux/daily-command-sed/index.html","1afcc2b88ac732dcad8160b4aa84d89d"],["about/index.html","54d175d53e0a4169fbf697e1c63fdc99"],["archives/2017/05/index.html","23522ec2eef85c16d3df8eca1b029b90"],["archives/2017/index.html","c851db5205b1e90b14b4025b859b018f"],["archives/2018/04/index.html","d8661fa039b056804552809cc1336de6"],["archives/2018/05/index.html","380924bcee1af8f1e743c3363c987ba4"],["archives/2018/06/index.html","538b1bee3e38f50444e36e8ba00228d0"],["archives/2018/index.html","ef51aa5fa493a265f6c7b1bb4f3ecd7f"],["archives/index.html","0849db0462180c623d699c8b6dee17bf"],["atom/index.html","1ae6d951f744b8b582ad2b514445a968"],["baidu_verify_Hinq5MRMln.html","26f7317b2d09315d2ac765fa03c86caf"],["books/index.html","ea30965efcdaf3f4d611b55d2c33585e"],["categories/Linux/index.html","7f6f3cdb63b914d89dd33651038214e6"],["categories/index.html","ba72b57bf0c101ad01aa4e0af839b218"],["categories/网站/index.html","9b9ddbab4f62e92fbd29056f1735b8e9"],["categories/网站/域名/index.html","859c7515b11a88836b7195cb6946d605"],["categories/读书/index.html","6e38870f71dece70a3ebeef006a4ae59"],["categories/读书/《浪潮之巅》/index.html","7e2df597084a294224ec7531e95b4457"],["css/app.8c816fcf8aef253edb4e8ff26f3427f9.css","8c816fcf8aef253edb4e8ff26f3427f9"],["css/ins copy.css","77efb56d5042d0f5b8855c95173f70df"],["css/ins.css","6eb57e9f2b84acca30e1f930b2bbb204"],["css/style.css","02969607806d4b847662f963d53e4b70"],["drafts/configure-multiple-vue-project-with-nginx.html","45ea03b6abec36bea8a0207a673bd5a0"],["drafts/iframe.html","a59fa2dd8e0b4c2dc15a220fc850a25e"],["drafts/record-re-install-mac-os-10-12-6.html","c2180e14819ff7c5b6e088911b36a526"],["fonts/chancery/Georgia.ttf","f5dc43ca33b20860f0f888b658f00aad"],["fonts/chancery/apple-chancery-webfont.eot","4ed7e60585ac6083e18a2df5a5c91cc1"],["fonts/chancery/apple-chancery-webfont.svg","e325e4f2b070121ea7d4050023b9f6f2"],["fonts/chancery/apple-chancery-webfont.ttf","49ec3c7bf028bca65ea9ef93614b2363"],["fonts/chancery/apple-chancery-webfont.woff","2e9659ae195f4a74a314901d88520ad0"],["icon_ios7.png","0bbfdda14a3114a73cb6f11200b83f33"],["image/reward/alipay.png","31b9ade4eab7ae253d9f7802430ecd68"],["image/reward/wechat.png","d23e08840223824da2e076076743d880"],["images/avatar/2scribble.png","fee12c0bd2b2eda943f57a5fd9188e96"],["images/avatar/FaceQ1500355612034.png","fee12c0bd2b2eda943f57a5fd9188e96"],["images/avatar/FaceQ1500355720977.png","5f13ba734b4fad42f08039d4643df43c"],["images/avatar/FaceQ1500378393950.png","0f289bf8475050cc0c2b669196c32cc8"],["images/avatar/FaceQ1500378683692.png","f4c9eafbdd795e116f59a3c3eba05e7b"],["images/avatar/FaceQ1500378691493.png","3c68743d9a51421bb3208b446f6f1552"],["images/avatar/FaceQ1500378720784.png","5f80639dc44364c87d708f22d213b43e"],["images/avatar/FaceQ1500378863705.png","1fbe486f016de41205aa1b6260460fdf"],["images/avatar/FaceQ1500378867481.png","9ebca68076068e3819af10957ab2d70c"],["images/avatar/scribble.png","1c2ac11d8866f2fdb7fa94d95baba18d"],["images/icons/icon-128x128.png","b50f11a11cf03561c2f70ae76bdc0322"],["images/icons/icon-144x144.png","4ba014295f8a81e6b55af2c50b8b56a8"],["images/icons/icon-152x152.png","07d8db97f20a90ee19485e2302f8aaf0"],["images/icons/icon-192x192.png","17001cadb99f64b40a125429d771a855"],["images/icons/icon-384x384.png","f50cf43e4446d2caa5ac812eddfee998"],["images/icons/icon-512x512.png","93c9c76a489c5121d6d8b6cd7804ce69"],["images/icons/icon-72x72.png","25119636dbe854290b95ecec978fb0c6"],["images/icons/icon-96x96.png","bce1e7f524666a2f211b13b6efa76763"],["index.html","a71a8ff54ed8ab603c0bdec3ff2dbf29"],["js/src/activate-power-mode.js","0450ca6f7281108da72a1e9665aea798"],["js/src/app.acbddb68268cee48be2a.js","e92f74eabc64f01dc20885c748e73e1b"],["js/src/bootstrap.js","587dc90fe04364592b5a4f846205ea8e"],["js/src/even.js","84254db5e304a6c3e87bf7fc5a079316"],["js/src/fold.js","233de0fedd08b65d06780246c2912fac"],["js/src/ins.js","6be70c309e71804dcd5df1e02022501b"],["js/src/lazyload.min.js","4a40c05da7019815a9dc74671848766e"],["js/src/manifest.5d56937d88b403e2a1a6.js","5c29453d59fe335645c80f2007650346"],["js/src/post-detail.js","5980a85e11a98dbb0140881105cf8c42"],["js/src/tags.js","8da79300fb57ed104fde29015fc6d64b"],["js/src/vendor.9942f0b07587c7901880.js","4babfeaaa702d46cf7f4ee6982b8c912"],["lib/fancybox/blank.gif","325472601571f31e1bf00674c368d335"],["lib/fancybox/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["lib/fancybox/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["lib/fancybox/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["lib/fancybox/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["lib/fancybox/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["lib/fancybox/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["lib/fancybox/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["lib/fancybox/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["lib/fancybox/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["lib/fancybox/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["lib/fancybox/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["lib/fancybox/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["lib/fancybox/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["lib/fancybox/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["lib/jquery/jquery-3.1.1.min.js","e071abda8fe61194711cfc2ab99fe104"],["lib/slideout/slideout.js","8d02b37e369a41a9cfe3d9f4b2204770"],["lib/slideout/slideout.min.js","4bb5425e886f09bd7c3acf6757a9aa04"],["page/2/index.html","3f345a7eb69d902385a13376d1d22eea"],["page/3/index.html","86a7ef20e8c03f6be7ce94930957a38a"],["page/4/index.html","70a5cb424160d3954fc7bf9055d15eba"],["page/5/index.html","3e15ea4958a1e885ef2b9fdde02fa891"],["photos/index.html","68e64e41ba40a4b34c8302626f5ff39e"],["resume/css/app.8c816fcf8aef253edb4e8ff26f3427f9.css","8c816fcf8aef253edb4e8ff26f3427f9"],["resume/index.html","36f436f9d3a2d02ce5b841ce99a44e25"],["resume/js/app.acbddb68268cee48be2a.js","94ff473f27927e2692f1d3e92d18ed01"],["resume/js/manifest.5d56937d88b403e2a1a6.js","4f1f4fd58d7ee2a53ceca29107a1b3cb"],["resume/js/vendor.9942f0b07587c7901880.js","b5c5131112d730ec79080164e06253bb"],["slides/index.html","1857bc3685ed540758d9b2594f3e754c"],["tags/Algorithm/index.html","0fa31a160984453650af1ae5e8e112dc"],["tags/Android/index.html","1b1ec27d147b39bd06ed1d5da86d280b"],["tags/C/index.html","874366a35a0ccf11cb6a74522b8c4542"],["tags/Linux/index.html","0882e26a5c4736d86296547fd9457c04"],["tags/Mac/index.html","5df015d9b4555846e536c86be5ac2938"],["tags/Mysql/index.html","d92ed867486ca9416e009bbf5562cff2"],["tags/css/index.html","35793c4ba8ac7f7e130b8326550c2850"],["tags/index.html","c981b8c1a9c6388633b5d933ecfdf8b5"],["tags/java/index.html","809e21f09785678b7e3cf0f8e50a4164"],["tags/博客/index.html","b1a94d0a114d9f553c5dfe625ab917c7"],["tags/域名/index.html","04329fa60ea10ac171f77e0e47c7be58"],["tags/效率/index.html","1eb9caa14e1fbb6de64f247cba045eea"],["tags/算法/index.html","c55df028a36119e777e513777f3e99a2"],["tags/编程/index.html","95e6950745901035bb2dc28e2dceed67"],["tags/设计模式/index.html","1b524af7242e84fb8b7e0c117484b348"],["tags/读书/index.html","00d4c9666831ba205aca0909fbef9026"],["uploads/avatar.jpg","dca53ec5967afa5e06330aac12ed7b5a"],["uploads/lovely.gif","640e73696f325b3e44dd56b05ef29c1c"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







