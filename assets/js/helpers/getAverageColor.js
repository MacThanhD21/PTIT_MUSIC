export function getAverageColor(t, e) {
  const a = document.createElement("canvas");
  let r = (a.height = t.naturalHeight),
    n = (a.width = t.naturalWidth);
  const o = a.getContext("2d");
  let c, d;
  o.drawImage(t, 0, 0);
  let g,
    l,
    h,
    u = -4,
    i = 0;
  try {
    (c = o.getImageData(0, 0, n, r)), (d = c.data.length);
  } catch (t) {
    return console.error(t), { R: 0, G: 0, B: 0 };
  }
  for (g = l = h = 0; (u += 4 * e) < d; )
    ++i, (g += c.data[u]), (l += c.data[u + 1]), (h += c.data[u + 2]);
  return (
    (g = ~~(g / i)), (l = ~~(l / i)), (h = ~~(h / i)), { R: g, G: l, B: h }
  );
}
