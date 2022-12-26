import safelink from './safelink';

const sf = new safelink({
  exclude: ['webmanajemen.com'],
});

sf.parse(`
<a href="http://google.com">google.com</a>
<a href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" class="" data-x="" href="http://webmanajemen.com">webmanajemen.com</a>
<a id=idx href=http://webmanajemen.com>webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com?sdsjdjsd#sasdhdshsfjfdj">webmanajemen.com</a>
`);
