/**
 * @return {boolean}
 */

export default function isMobileValid(input) {
  let pattern = /(0|\+98)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/;
  return pattern.test(input);
}