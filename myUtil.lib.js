//ver alt0_3WAlt0test0W

exports.isArray=function(variable)/*ver alt0_0WAlt0test0W .*/
{
	return Array.isArray(variable);
};

exports.sprintf=function(format)/*ver alt0_0WAlt0test0W .*/
{
	let args = Array.prototype.slice.call(arguments, 1);
	let argIndex = 0;

	return format.replace(
		/%([sdif%])/g,
		function(match, type)
		{
			if(type === '%')
			{
				return '%';
			}

			var value = args[argIndex++];

			switch(type)
			{
				case 's':
					return String(value);

				case 'd':
					return parseInt(value, 10);

				case 'i':
					return parseInt(value, 10);

				case 'f':
					return parseFloat(value);

				default:
					return match;
			}
		}
	);
};

exports.isNumber=function(v)/*ver alt0_0WAlt0test0W .*/
{
	return typeof v === 'number' && !isNaN(v);
};

exports.isDefined=function(theVar)/*ver alt0_0WAlt0test0W .*/
{
	return theVar !== undefined && theVar!== null;
};

















