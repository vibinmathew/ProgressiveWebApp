(function(){'use strict';var name='webcomponents-loader.js';var polyfills=[];if(!('import' in document.createElement('link'))){polyfills.push('hi')}
if(!('attachShadow' in Element.prototype&&'getRootNode' in Element.prototype)||(window.ShadyDOM&&window.ShadyDOM.force)){polyfills.push('sd')}
if(!window.customElements||window.customElements.forcePolyfill){polyfills.push('ce')}
if(!('content' in document.createElement('template'))||!window.Promise||!(document.createDocumentFragment().cloneNode()instanceof DocumentFragment)){polyfills.push('pf')}
if(polyfills.length===4){polyfills=['lite']}
if(polyfills.length){var script=document.querySelector('script[src*="'+name+'"]');var newScript=document.createElement('script');var replacement='webcomponents-'+polyfills.join('-')+'.js';var url=script.src.replace(name,replacement);newScript.src=url;document.head.appendChild(newScript)}else{requestAnimationFrame(function(){window.dispatchEvent(new CustomEvent('WebComponentsReady'))})}})()