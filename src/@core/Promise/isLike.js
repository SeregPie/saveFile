import Function_is from '../Function/is';
import Object_is from '../Object/is';

export default function(value) {
	return Object_is(value) && Function_is(value.then);
}
