const overrideSet = () => {
  // eslint-disable-next-line no-extend-native
  (Set.prototype as any).toJSON = function () {
    const obj: any[] = [];
    this.forEach((value: any) => obj.push(value));
    return obj;
  }
}

const overrideMap = () => {
  // eslint-disable-next-line no-extend-native
  (Map.prototype as any).toJSON = function () {
    const obj: any = {};
    this.forEach((value: any, key: any) => obj[key] = value);
    return obj;
  }
}

if (process.env.NODE_ENV !== 'production') {
  // Redux devtools does not show maps and sets
  overrideMap();
  overrideSet();
}
