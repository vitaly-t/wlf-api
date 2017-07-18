export function pick (o, ...props) {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})))
}
