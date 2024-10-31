type GetCookieOptions = {
	readonly decode?: boolean;
};

type SetCookieOptions = {
	readonly encode?: boolean;
	readonly expires?: Second;
	readonly path?: string;
};

type Second = number;

export function getCookie( name: string, options?: GetCookieOptions ): string;
export function getCookie< T = unknown >(
	name: string,
	options: GetCookieOptions & { readonly decode: true }
): T | undefined;
export function getCookie< T = unknown >(
	name: string,
	options?: GetCookieOptions
): T | undefined {
	const cookies = getCookies();
	const value = cookies[ name ];
	return options?.decode
		? decode< T >( value )
		: ( ( value ?? '' ) as unknown as T );
} //end getCookie()

export function setCookie(
	name: string,
	value: string | boolean | number,
	options?: SetCookieOptions
);
export function setCookie(
	name: string,
	value: ReadonlyArray< unknown > | Record< string, unknown >,
	options: SetCookieOptions & { readonly encode: true }
);
export function setCookie(
	name: string,
	value:
		| string
		| boolean
		| number
		| ReadonlyArray< unknown >
		| Record< string, unknown >,
	options?: SetCookieOptions
): void {
	const { path = '/', expires = 0 } = options ?? {};

	const stringValue: string =
		stringifiable( value ) && ! options?.encode
			? stringify( value )
			: encode( value );
	let cookie = `${ name }=${ stringValue };`;

	if ( 0 < expires ) {
		const expiration = new Date( Date.now() + expires * 1000 );
		cookie += ` expires=${ expiration.toUTCString() };`;
	} //end if

	cookie += ` path=${ path };`;

	document.cookie = cookie;
} //end setCookie()

export function doesCookieExist( name: string ): boolean {
	const cookies = getCookies();
	return Object.keys( cookies ).includes( name );
} //end doesCookieExist()

export function removeCookie( name: string ): void {
	document.cookie = `${ name }=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
} //end removeCookie()

// =======
// HELPERS
// =======

const getCookies = (): Record< string, string > =>
	document.cookie
		.split( ';' )
		.map( ( c ) => c.trim() )
		.map( ( c ) => c.split( '=' ) )
		.reduce( ( r, [ k, v ] ) => ( { ...r, [ k ]: v } ), {} );

const stringifiable = ( value: unknown ): value is string | number | boolean =>
	'string' === typeof value ||
	'number' === typeof value ||
	'boolean' === typeof value;

const stringify = ( value: string | number | boolean ): string => {
	switch ( typeof value ) {
		case 'string':
			return value;

		case 'number':
			return `${ value }`;

		case 'boolean':
			return value ? 'true' : 'false';
	} //end switch
};

const encode = ( value: unknown ): string =>
	encodeURIComponent( JSON.stringify( value ) );

const decode = < T >( value?: string ): T | undefined => {
	if ( undefined === value ) {
		return undefined;
	} //end if

	try {
		return JSON.parse( decodeURIComponent( value ) ) as T;
	} catch ( e ) {
		return undefined;
	} //end try
};
