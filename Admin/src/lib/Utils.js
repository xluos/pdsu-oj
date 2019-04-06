// 工具函数
export function get(object, path, defaultValue) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
          .reduce((o, k) => (o || {})[k], object) || defaultValue;
}

export function mixin(Obj, newObj) {
  if (!newObj) return Obj;
  for (const key in Obj) {
    if (Obj.hasOwnProperty(key)) {
      const item = newObj[key];
      item && (Obj[key] = item);
    }
  }
  return Obj
}
