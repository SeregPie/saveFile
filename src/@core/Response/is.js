export default function(value) {
	let {Response} = globalThis;
	return !!Response && value instanceof Response;
}
