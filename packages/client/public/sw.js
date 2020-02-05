/**
 * @license
 * Copyright @haytech. All Rights Reserved.
 *
 * Use of this source code is governed by MIT license.
 * https://haytech.ir
 */

// install event
self.addEventListener("install", evt => {
    // console.log("service worker installed");
});

// activate event
self.addEventListener("activate", evt => {
    //console.log('service worker activated');
});

// limit cache size
const limitCatchSize = (name, size) => {};

// fetch event cha
self.addEventListener("fetch", evt => {
    //console.log('fetch event', evt);
});
