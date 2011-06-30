/*
 * 'Missing e' Extension
 *
 * Copyright 2011, Jeremy Cutler
 * Released under the GPL version 3 licence.
 * SEE: GPL-LICENSE.txt
 *
 * This file is part of 'Missing e'.
 *
 * 'Missing e' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * 'Missing e' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'Missing e'. If not, see <http://www.gnu.org/licenses/>.
 */

/*global chrome, window */

if ((window.top === window &&
    !(/http:\/\/www\.tumblr\.com\/customize/.test(location.href))) ||
    /http:\/\/www\.tumblr\.com\/dashboard\/iframe/.test(location.href) ||
    /http:\/\/www\.tumblr\.com\/ask_form\//.test(location.href)) {

   chrome.extension.sendRequest({greeting: "start", url: location.href,
                                 bodyId: document.body.id}, function(response){
      var active = JSON.parse(response);
      var i;
      if (/http:\/\/www\.tumblr\.com\/tumblelog\/[^\/]*\/submissions/
               .test(location.href) ||
          /http:\/\/www\.tumblr\.com\/tumblelog\/[^\/]*\/messages/
               .test(location.href) ||
          /http:\/\/www\.tumblr\.com\/inbox/.test(location.href) ||
          /http:\/\/www\.tumblr\.com\/submissions/.test(location.href)) {
         document.domain = "tumblr.com";
      }
      var info = "'Missing e' Startup on ";
      info += active.url + "\n";
      for (i in active) {
         if (active.hasOwnProperty(i)) {
            if (i !== 'url') {
               info += i + ": " + (active[i] ? "active" : "inactive") + "\n";
            }
         }
      }
      console.log(info);
   });

   chrome.extension.sendRequest({greeting: "update"}, function (response) {
      var up = document.getElementById('missinge_update');
      if (up && response.update) {
         var post = '';
         if (response.link !== '') {
            post = 'post/' + response.link;
         }
         up.style.display = 'inline-block';
         up.getElementsByTagName('a')[0].href =
            'http://missinge.infraware.ca/update?b=chrome&l=' +
            encodeURI('http://blog.missinge.infraware.ca/' + post);
         document.getElementById('missinge_button').style.display = 'none';
      }
   });
}
