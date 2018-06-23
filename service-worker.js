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

var precacheConfig = [["2017/05/04/java/java-array/index.html","85acdba4c0db73528750b7504204458d"],["2018/04/05/other/this-time-I-am-serious/index.html","c3d1462eaec632d65a45b45be3e325f0"],["2018/04/11/other/top-of-the-wave/index.html","8e00d07ae3ed30a36d75ae6f9e5581ee"],["2018/04/13/efficiency/the-best-way-to-program/index.html","af974a9c23b9bb7a183dddcd97d1d610"],["2018/04/13/other/IT-laws/index.html","572e6769fa0c8c6f65e7756dc5d1499e"],["2018/04/16/efficiency/mac-tool/index.html","2153949128f13fd9210a5629542ad031"],["2018/04/17/other/three-successful-transgenic-companies/index.html","fdb137a5ea4dc0e14b587e5e43224cc8"],["2018/04/18/other/understanding-the-domain/index.html","e07dc27fa7d3a2e72a3b18c258bffd75"],["2018/04/19/design-pattern/initialization-on-demand-holder-idiom/index.html","6d4e6bd538e9b6e29c7a6dc17691cf96"],["2018/05/04/android/android-processes-and-threads/index.html","c6b7ede18931f57d678eac145f5f1247"],["2018/05/04/android/service-is-a-context/index.html","3170c96b9c8ea85c3e420973cb028c3a"],["2018/05/05/algorithm/print-list-from-tail-to-head/index.html","682e173e1984c365fdb5009d7a47f715"],["2018/05/10/algorithm/bag-queue-stack/index.html","0ef77ab5d9ea519473b2e615eafe493d"],["2018/05/11/algorithm/merge-sort/index.html","34d35464f979b0a63cab2b01725761a5"],["2018/05/15/algorithm/DutchNationalProblem/index.html","775fe594e094bf66e6d47f590a9a7930"],["2018/05/15/algorithm/quick-sort/index.html","f81b1ce77070e4245814945e7f5591e7"],["2018/05/16/linux/5-ways-to-empty-or-delete-a-large-file-content-in-linux/index.html","71b6a59c8489369391a294853afdc37b"],["2018/05/26/c/deep-in-c-proccess/index.html","08715b5f9c76fc9e6970d92a926a9c25"],["2018/05/27/c/learn-to-use-gdb/index.html","ab6b83b1c832f8a6192d592414083f3c"],["2018/05/27/css/css-selectors/index.html","ae415be2804dd708bfca5858b0a64f82"],["2018/05/29/mysql/mysql-jdbc-zeroDateTimeBehavior/index.html","1336e01476a37475545d78aa5856f297"],["2018/06/02/linux/daily-command-tar/index.html","c94e47025baa14dcc06e991bf516ee34"],["2018/06/03/linux/daily-command-echo/index.html","0e662596c5493fb5553142521f32a84d"],["2018/06/04/linux/daily-command-ps/index.html","495ec518fbfbd29b4bd8dc807cde7b66"],["2018/06/07/linux/daily-command-netstat/index.html","57b87f9cb880ce301aaed77f42087b65"],["2018/06/08/linux/daily-command-find/index.html","b3b10a75887b6966dcf201b3104d1e0a"],["2018/06/08/linux/daily-command-xargs/index.html","c9d8d7fcd3a92ea4a9f3b1ab1157c189"],["2018/06/09/linux/daily-command-awk/index.html","12d0283d16045d25c3f765ca955947ce"],["2018/06/09/linux/daily-command-grep/index.html","cee92522414b663beef9973e558265aa"],["2018/06/09/linux/daily-command-io-redirection/index.html","4367ea2de624d4e0bbfdf1edfc1d8e51"],["2018/06/09/linux/daily-command-pipe/index.html","019f6efd9c11253e7af48cdc70919d3a"],["2018/06/09/linux/daily-command-tee/index.html","96b1bddfb618c01fe535ba54a529f6cf"],["2018/06/10/linux/daily-command-cat/index.html","bccca08b81a6f8017fa0de9b8a860551"],["2018/06/10/linux/daily-command-read/index.html","ab9e72329299cc130795c757524db7db"],["2018/06/11/linux/daily-command-df/index.html","d68bc545c30015c9b9c679c86460075b"],["2018/06/11/linux/daily-command-du/index.html","b655ab9dae837f7996594c1768c80a99"],["2018/06/11/linux/daily-command-scp/index.html","ffea6034457ec11c2f7957aab1657459"],["2018/06/11/linux/daily-command-sort/index.html","8dfa2f689a5b465786862321a5e27354"],["2018/06/11/linux/daily-command-top/index.html","09901863a8ed461816a4b7f9785e179d"],["2018/06/12/linux/daily-command-join/index.html","5e93d7798c7ca94bb7a84212d1416961"],["2018/06/12/linux/daily-command-ping/index.html","0a87cbcd854033a62f2eb03417d368d0"],["2018/06/12/linux/daily-command-route/index.html","5ae8a8795491befc6e8dea5649d0289b"],["2018/06/12/linux/daily-command-uniq/index.html","4358d4eb5107cc0768111bc739f9c027"],["2018/06/13/linux/daily-command-cut/index.html","6972c2b1414c218fe3b11d99d1d84fb6"],["2018/06/13/linux/daily-command-head/index.html","6af96342ffa8862bcc5a2ff07e9e0652"],["2018/06/13/linux/daily-command-more/index.html","3e488f42e51c87cc96e9a1f7f28a7412"],["2018/06/13/linux/daily-command-tail/index.html","a22c5b7153c3da55d7989944ca0f95fc"],["2018/06/13/linux/daily-command-type/index.html","8ddbf58564dfc9dc799dea6f2f3b6475"],["2018/06/14/linux/daily-command-touch/index.html","94b32baa8219056e6f5210bda49a05fa"],["2018/06/15/linux/daily-command-ls/index.html","b4ee966f6dd789837b0e7f99aef03087"],["2018/06/19/linux/daily-command-cd/index.html","a109fe9ca1ae1e34c9c856f47dcef4ef"],["2018/06/19/linux/daily-command-date/index.html","6ef788fe5ad92b20126249560525f557"],["2018/06/20/linux/daily-command-wc/index.html","63fc3e609860d758eb03c19a8fcc7a32"],["2018/06/21/linux/daily-command-stat/index.html","cabcb6186325b28366bfd61723b1f811"],["2018/06/22/linux/daily-command-mkdir/index.html","859c53d35fd7376674b8a52484f2733d"],["2018/06/23/daily-command-curl/index.html","2b80a7276ca607c1e4fd9461ddefd2f2"],["2018/06/23/daily-command-kill/index.html","db82ff4c02e324a222c6773464ef7e43"],["2018/06/23/linux/daily-command-sed/index.html","acd5852044de314ab4e1844f10562af1"],["about/index.html","9f9030a74fa71a6706a15a6cf2e5b818"],["archives/2017/05/index.html","fd1803c9cf138b2951aaaa49c5c26d5f"],["archives/2017/index.html","ae3c347b4d8d86d4db5e3bdf2dd87cd0"],["archives/2018/04/index.html","56292604248a7ba0bd27f366dde02e03"],["archives/2018/05/index.html","982a3232f172d574a428f811a0367a8e"],["archives/2018/06/index.html","3add003d9cfc2632f3a8f28b4a7edfee"],["archives/2018/index.html","76630a52c0726a673203e0ded45f67a4"],["archives/index.html","96b332390fcaef8cd6ce43e02dbeb422"],["atom/index.html","c373a0d2926a8a929c6051a8c60156b5"],["baidu_verify_Hinq5MRMln.html","26f7317b2d09315d2ac765fa03c86caf"],["categories/Linux/index.html","1b82521ff93b8f9e106c58adac4399cd"],["categories/index.html","a882e3e88b73441e63c11f048a761f8d"],["categories/网站/index.html","d2c95f22953f4473bb5f2a4c4eb416cf"],["categories/网站/域名/index.html","ef08adbba19fdbad5233ea6aa8224c30"],["categories/读书/index.html","6096e46f319c8dc0c1ba4664bde74b53"],["categories/读书/《浪潮之巅》/index.html","6906b5cb7aa8f9910abc053887373531"],["css/app.8c816fcf8aef253edb4e8ff26f3427f9.css","8c816fcf8aef253edb4e8ff26f3427f9"],["css/ins copy.css","77efb56d5042d0f5b8855c95173f70df"],["css/ins.css","6eb57e9f2b84acca30e1f930b2bbb204"],["css/style.css","e260d334d9a3ba1d2c86cfb7838fea7a"],["drafts/configure-multiple-vue-project-with-nginx.html","a7de89a7259059a4802a93a6e140c334"],["drafts/iframe.html","694745ca1720f59826d46fabc9102ddb"],["drafts/record-re-install-mac-os-10-12-6.html","8e6cff49ec8b998c5b3e73ed7bc5bcc0"],["fonts/chancery/Georgia.ttf","f5dc43ca33b20860f0f888b658f00aad"],["fonts/chancery/apple-chancery-webfont.eot","4ed7e60585ac6083e18a2df5a5c91cc1"],["fonts/chancery/apple-chancery-webfont.svg","e325e4f2b070121ea7d4050023b9f6f2"],["fonts/chancery/apple-chancery-webfont.ttf","49ec3c7bf028bca65ea9ef93614b2363"],["fonts/chancery/apple-chancery-webfont.woff","2e9659ae195f4a74a314901d88520ad0"],["icon_ios7.png","0bbfdda14a3114a73cb6f11200b83f33"],["image/reward/alipay.png","31b9ade4eab7ae253d9f7802430ecd68"],["image/reward/wechat.png","d23e08840223824da2e076076743d880"],["images/avatar/2scribble.png","fee12c0bd2b2eda943f57a5fd9188e96"],["images/avatar/FaceQ1500355612034.png","fee12c0bd2b2eda943f57a5fd9188e96"],["images/avatar/FaceQ1500355720977.png","5f13ba734b4fad42f08039d4643df43c"],["images/avatar/FaceQ1500378393950.png","0f289bf8475050cc0c2b669196c32cc8"],["images/avatar/FaceQ1500378683692.png","f4c9eafbdd795e116f59a3c3eba05e7b"],["images/avatar/FaceQ1500378691493.png","3c68743d9a51421bb3208b446f6f1552"],["images/avatar/FaceQ1500378720784.png","5f80639dc44364c87d708f22d213b43e"],["images/avatar/FaceQ1500378863705.png","1fbe486f016de41205aa1b6260460fdf"],["images/avatar/FaceQ1500378867481.png","9ebca68076068e3819af10957ab2d70c"],["images/avatar/scribble.png","1c2ac11d8866f2fdb7fa94d95baba18d"],["images/icons/icon-128x128.png","b50f11a11cf03561c2f70ae76bdc0322"],["images/icons/icon-144x144.png","4ba014295f8a81e6b55af2c50b8b56a8"],["images/icons/icon-152x152.png","07d8db97f20a90ee19485e2302f8aaf0"],["images/icons/icon-192x192.png","17001cadb99f64b40a125429d771a855"],["images/icons/icon-384x384.png","f50cf43e4446d2caa5ac812eddfee998"],["images/icons/icon-512x512.png","93c9c76a489c5121d6d8b6cd7804ce69"],["images/icons/icon-72x72.png","25119636dbe854290b95ecec978fb0c6"],["images/icons/icon-96x96.png","bce1e7f524666a2f211b13b6efa76763"],["index.html","6d5c5fee1570d8d0f5b5e380a38e6ba8"],["js/src/activate-power-mode.js","0450ca6f7281108da72a1e9665aea798"],["js/src/app.acbddb68268cee48be2a.js","e92f74eabc64f01dc20885c748e73e1b"],["js/src/bootstrap.js","587dc90fe04364592b5a4f846205ea8e"],["js/src/even.js","84254db5e304a6c3e87bf7fc5a079316"],["js/src/fold.js","233de0fedd08b65d06780246c2912fac"],["js/src/ins.js","6be70c309e71804dcd5df1e02022501b"],["js/src/lazyload.min.js","4a40c05da7019815a9dc74671848766e"],["js/src/manifest.5d56937d88b403e2a1a6.js","5c29453d59fe335645c80f2007650346"],["js/src/post-detail.js","5980a85e11a98dbb0140881105cf8c42"],["js/src/tags.js","8da79300fb57ed104fde29015fc6d64b"],["js/src/vendor.9942f0b07587c7901880.js","4babfeaaa702d46cf7f4ee6982b8c912"],["lib/fancybox/blank.gif","325472601571f31e1bf00674c368d335"],["lib/fancybox/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["lib/fancybox/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["lib/fancybox/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["lib/fancybox/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["lib/fancybox/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["lib/fancybox/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["lib/fancybox/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["lib/fancybox/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["lib/fancybox/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["lib/fancybox/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["lib/fancybox/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["lib/fancybox/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["lib/fancybox/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["lib/fancybox/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["lib/jquery/jquery-3.1.1.min.js","e071abda8fe61194711cfc2ab99fe104"],["lib/slideout/slideout.js","8d02b37e369a41a9cfe3d9f4b2204770"],["lib/slideout/slideout.min.js","4bb5425e886f09bd7c3acf6757a9aa04"],["page/2/index.html","bb3a67b74d7b7fa98b0c68cf12133ecb"],["page/3/index.html","cc16c544d87eff674d4370bc42850a1d"],["photos/index.html","29504d595b3306f48f4a023cbae98ced"],["resume/css/app.8c816fcf8aef253edb4e8ff26f3427f9.css","8c816fcf8aef253edb4e8ff26f3427f9"],["resume/index.html","36f436f9d3a2d02ce5b841ce99a44e25"],["resume/js/app.acbddb68268cee48be2a.js","94ff473f27927e2692f1d3e92d18ed01"],["resume/js/manifest.5d56937d88b403e2a1a6.js","4f1f4fd58d7ee2a53ceca29107a1b3cb"],["resume/js/vendor.9942f0b07587c7901880.js","b5c5131112d730ec79080164e06253bb"],["slides/index.html","74960750e94122adae508170b52efabe"],["tags/Algorithm/index.html","1a351653bb8ad89781f80b55897f198c"],["tags/Android/index.html","f17f46bda24db5d00448eb9064230024"],["tags/C/index.html","7c73de6b3ac85214b1439b6e9e31e661"],["tags/Linux/index.html","5ddd1a189f2b7f3bcaf8a9af4e542c84"],["tags/Mac/index.html","93e3e9303d4ed0b94b629c8c7167ccc5"],["tags/Mysql/index.html","169f51ab6c64101021c835b53369f376"],["tags/css/index.html","3852e37f9dc8a62192d3e40b229c746a"],["tags/index.html","dd983c51025a90227fbf2a2bfef582f1"],["tags/java/index.html","9921b6123326604ce767d8d5688dd8ee"],["tags/博客/index.html","306562a9ee8d42921e7dd7fd77838c61"],["tags/域名/index.html","0ec04a4f455fef2986e233a20c49f1c5"],["tags/效率/index.html","a9844c64cfe8e2ed0057b09887e5fbc6"],["tags/算法/index.html","18f9ebf1a5270855c5797aee423b5c49"],["tags/编程/index.html","862b2259fbce3763c05dc51be544fe87"],["tags/设计模式/index.html","74576c5236d73a0a8ef4f961140a24ae"],["tags/读书/index.html","9b205e5e89388373691e6d2f27cb3a57"],["uploads/avatar.jpg","dca53ec5967afa5e06330aac12ed7b5a"],["uploads/lovely.gif","640e73696f325b3e44dd56b05ef29c1c"]];
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







