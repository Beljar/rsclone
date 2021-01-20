function polygonArea(pts: Array<Array<number>>) {
  console.log(pts);
  return Math.abs(
    pts.reduce((acc: number, itm: Array<number>, idx: number) => {
      if (idx) {
        console.log(acc)
        acc += ((pts[idx - 1][0] + itm[0]) * (pts[idx - 1][1] - itm[1]));
      } else {
        acc += ((pts[pts.length - 1][0] + itm[0]) * (pts[pts.length - 1][1] - itm[1]));
      }
      return acc;
    }, 0) / 2)
}

export default polygonArea;