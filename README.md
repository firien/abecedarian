# The Abecedarian

A web app to help children learn the alphabet. Specifically designed for iPad, but should work everywhere. For iPad, it is best to pin it to the homescreen, the horizontal swiping tends to trigger Safari Forward/Back navigation - when launched as a fullscreen app this quirk goes away.

It works without javascript, but with IntersectionObserver the letters will be drawn as they are intended to be handwritten.

If browser supports service workers, the app can be used offline.

Also relies heavily on [CSS Scroll Snap](https://www.w3.org/TR/css-scroll-snap-1/)

## Development notes

To build /docs folder

> yarn run cake build

Images rely on emoji glyphs, which vary from system to system. I would like to create my own images someday.
