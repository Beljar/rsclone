const distance = (pt1: Array<number>, pt2: Array<number>) => {
return ((((pt1[0] - pt2[0]) ** 2) + ((pt1[1] - pt2[1]) ** 2)) ** 0.5)
}

export {distance};