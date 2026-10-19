//ver alt0_8WAlt0test0W

var myUtil=require('./myUtil.lib.js');

exports.column=function(array, columnKey, indexKey)/*ver alt0_1WAlt0test0W .*/
{
	var result = {};

	var hasIndexKey = indexKey !== undefined && indexKey !== null;

	for (var i = 0; i < array.length; ++i)
	{
		var item = array[i];

		// PHP array_column() works with arrays and objects.
		if (
			item === null ||
			(typeof item !== 'object' && typeof item !== 'function')
		)
		{
			continue;
		}

		// column_key === null -> return the whole item
		var hasColumn = columnKey === null ||
			Object.prototype.hasOwnProperty.call(item, columnKey);

		if (!hasColumn)
		{
			continue;
		}

		var value = columnKey === null
			? item
			: item[columnKey];

		if (hasIndexKey)
		{
			// The index key must exist in the item.
			if (!Object.prototype.hasOwnProperty.call(item, indexKey))
			{
				continue;
			}

			result[item[indexKey]] = value;
		}
		else
		{
			// Numeric sequential keys, like PHP's array_column().
			result[i] = value;
		}
	}

	return hasIndexKey
		? result
		: Object.keys(result).map(function(key) {
			return result[key];
		});
};

exports.areSetsEqual=function(setA, setB)/*ver alt0_0WAlt0test0W .*/
{
	// different size -> not equal
	if(setA.size !== setB.size)
	{
		return false;
	}
	
	// every element from A must exist in B
	for(let value of setA)
	{
		if(!setB.has(value))
		{
			return false;
		}
	}
	
	return true;
}

exports.diff=function(arrA, arrB)/*ver alt0_0WAlt0test0W .*/
{
	const setA=new Set(arrA);
	const setB=new Set(arrB);
	const _difference=new Set(setA);
	for(const elem of setB)
	{
		_difference.delete(elem);
	}
	return Array.from(_difference);
};

exports.union=function(arrA, arrB)/*ver alt0_0WAlt0test0W .*/
{
	const setA=new Set(arrA);
	const setB=new Set(arrB);
	const _union=new Set(setA);
	for(const elem of setB)
	{
		_union.add(elem);
	}
	return Array.from(_union);
};

exports.intersect=function(arrA, arrB)/*ver alt0_0WAlt0test0W .*/
{
	const setA=new Set(arrA);
	const setB=new Set(arrB);
	const _intersection=new Set();
	for(const elem of setB)
	{
		if(setA.has(elem))
		{
			_intersection.add(elem);
		}
	}
	return Array.from(_intersection);
};

exports.binarySearch=function(ar, el, compare_fn)/*ver alt0_0WAlt0test0W .*/
{
	var m=0;
	var n=ar.length-1;
	while(m<=n)
	{
		var k=(n+m)>>1;
		var cmp=compare_fn(el, ar[k]);
		if(cmp>0)
		{
			m=k+1;
		}
		else if(cmp<0)
		{
			n=k-1;
		}
		else
		{
			return k;
		}
	}
	return -m-1;
};

function mergeNumericIndexedArrays(
	_1st,
	_2nd,
	params/*={
		isInPlace: / * opcional'nyj flag. esli peredan i ustanovlen, to:
			+ proishodit neglubokoe kopirovanie s zamenoj vseh sv-v `_2nd` v `_1st`
			+ `_1st` stanovitsya ob'edineniem `_1st` i `_2nd`
			+ [ssylka na] `_1st` dopolnitel'no vozvrashchaetsya * /
	}*/
)/*ver alt0_0WAlt0test0W .*/
{
	if(!myUtil.isDefined(params))
	{
		params={};
	}
	if(
		myUtil.isDefined(params) && 
		myUtil.isDefined(params.isInPlace) && 
		params.isInPlace
	)
	{
		for(var i in _2nd)
		{
			_1st.push(_2nd[i]);
		}
		return _1st;
	}
	else
	{
		var merged=[];
		for(var i in _1st)
		{
			merged.push(_1st[i]);
		}
		for(var i in _2nd)
		{
			merged.push(_2nd[i]);
		}
		return merged;
	}
}

exports.ARR_isEqual=function(lhs,rhs)/*ver alt0_0WAlt0test0W .*/
{
	if(lhs.length!=rhs.length)
	{
		return false;
	}
	for(var i=0; i<lhs.length; ++i)
	{
		if(lhs[i]!=rhs[i])
		{
			return false;
		}
	}
	return true;
}

exports.ARR_merge=function(
	_1st,
	_2nd,
	params/*={
		isInPlace: / * opcional'nyj flag. esli peredan i ustanovlen, to:
			+ proishodit neglubokoe kopirovanie s zamenoj vseh sv-v `_2nd` v `_1st`
			+ `_1st` stanovitsya ob'edineniem `_1st` i `_2nd`
			+ [ssylka na] `_1st` dopolnitel'no vozvrashchaetsya * /
	}*/
)/*ver alt0_2WAlt0test0W .*/
{
	if(!myUtil.isDefined(params))
	{
		params={};
	}
	if(Array.isArray(_1st) && Array.isArray(_2nd))
	{
		return mergeNumericIndexedArrays(_1st,_2nd,params);
	}
	if(
		myUtil.isDefined(params) && 
		myUtil.isDefined(params.isInPlace) && 
		params.isInPlace
	)
	{
		for(var i in _2nd)
		{
			_1st[i]=_2nd[i];
		}
		return _1st;
	}
	else
	{
		var merged={};
		for(var i in _1st)
		{
			merged[i]=_1st[i];
		}
		for(var i in _2nd)
		{
			merged[i]=_2nd[i];
		}
		return merged;
	}
}


















