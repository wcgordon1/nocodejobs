declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"company": {
"warmwebsites.md": {
	id: "warmwebsites.md";
  slug: "warmwebsites";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
};
"customers": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
};
"developers": {
"bubble-developers.md": {
	id: "bubble-developers.md";
  slug: "bubble-developers";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"glide-developers.md": {
	id: "glide-developers.md";
  slug: "glide-developers";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"softr-developers.md": {
	id: "softr-developers.md";
  slug: "softr-developers";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
"webflow-developers.md": {
	id: "webflow-developers.md";
  slug: "webflow-developers";
  body: string;
  collection: "developers";
  data: any
} & { render(): Render[".md"] };
};
"helpcenter": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
};
"infopages": {
"bug-bounty.md": {
	id: "bug-bounty.md";
  slug: "bug-bounty";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"dpa.md": {
	id: "dpa.md";
  slug: "dpa";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"terms.md": {
	id: "terms.md";
  slug: "terms";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
};
"jobs": {
"Wordpress-developer-remote-id-we1243.md": {
	id: "Wordpress-developer-remote-id-we1243.md";
  slug: "wordpress-developer-remote-id-we1243";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"airtable-expert-id-hg9837.md": {
	id: "airtable-expert-id-hg9837.md";
  slug: "airtable-expert-id-hg9837";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"airtable-no-code-dev-id-ma11423.md": {
	id: "airtable-no-code-dev-id-ma11423.md";
  slug: "airtable-no-code-dev-id-ma11423";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"airtable-no-code-philippines-idmf1259.md": {
	id: "airtable-no-code-philippines-idmf1259.md";
  slug: "airtable-no-code-philippines-idmf1259";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bubble-dev-denver-id-gfh123.md": {
	id: "bubble-dev-denver-id-gfh123.md";
  slug: "bubble-dev-denver-id-gfh123";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bubble-dev-seattle-idfh123.md": {
	id: "bubble-dev-seattle-idfh123.md";
  slug: "bubble-dev-seattle-idfh123";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bubble-developer-brazil-id-mn8991.md": {
	id: "bubble-developer-brazil-id-mn8991.md";
  slug: "bubble-developer-brazil-id-mn8991";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"flutterflow-dev-ca-id-mg8940.md": {
	id: "flutterflow-dev-ca-id-mg8940.md";
  slug: "flutterflow-dev-ca-id-mg8940";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"general-ai-surge-sf-id-12fh32.md": {
	id: "general-ai-surge-sf-id-12fh32.md";
  slug: "general-ai-surge-sf-id-12fh32";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"head-of-design-webflow-id-ew2132.md": {
	id: "head-of-design-webflow-id-ew2132.md";
  slug: "head-of-design-webflow-id-ew2132";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"jr-webflow-pm-id-br-9378.md": {
	id: "jr-webflow-pm-id-br-9378.md";
  slug: "jr-webflow-pm-id-br-9378";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lead-bubble-dev-id-sd4892.md": {
	id: "lead-bubble-dev-id-sd4892.md";
  slug: "lead-bubble-dev-id-sd4892";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"lead-bubble-dev-ny-id-we21231.md": {
	id: "lead-bubble-dev-ny-id-we21231.md";
  slug: "lead-bubble-dev-ny-id-we21231";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"product-manager-bubble-brazil-id-jw8293.md": {
	id: "product-manager-bubble-brazil-id-jw8293.md";
  slug: "product-manager-bubble-brazil-id-jw8293";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"product-manager-bubble-canada-id-md1823.md": {
	id: "product-manager-bubble-canada-id-md1823.md";
  slug: "product-manager-bubble-canada-id-md1823";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"product-manager-remote-ca-id-212-32.md.md": {
	id: "product-manager-remote-ca-id-212-32.md.md";
  slug: "product-manager-remote-ca-id-212-32md";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"promp-engineer-glean-palo-alto-id-er234.md": {
	id: "promp-engineer-glean-palo-alto-id-er234.md";
  slug: "promp-engineer-glean-palo-alto-id-er234";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"senior-bubble-dev-india-id-we7293.md": {
	id: "senior-bubble-dev-india-id-we7293.md";
  slug: "senior-bubble-dev-india-id-we7293";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"senior-bubble-dev-usa-id-mg4231.md": {
	id: "senior-bubble-dev-usa-id-mg4231.md";
  slug: "senior-bubble-dev-usa-id-mg4231";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"senior-bubble-developer-austin-idgg455.md": {
	id: "senior-bubble-developer-austin-idgg455.md";
  slug: "senior-bubble-developer-austin-idgg455";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"sr-bubble-dev-voiced-id-we213.md": {
	id: "sr-bubble-dev-voiced-id-we213.md";
  slug: "sr-bubble-dev-voiced-id-we213";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-dev-buenos-aires-id-nd9302.md": {
	id: "webflow-dev-buenos-aires-id-nd9302.md";
  slug: "webflow-dev-buenos-aires-id-nd9302";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-dev-mexico-city-id-qu-2933.md": {
	id: "webflow-dev-mexico-city-id-qu-2933.md";
  slug: "webflow-dev-mexico-city-id-qu-2933";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-dev-usa-id-jj3910.md": {
	id: "webflow-dev-usa-id-jj3910.md";
  slug: "webflow-dev-usa-id-jj3910";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-developer-ny-id-gh5894.md": {
	id: "webflow-developer-ny-id-gh5894.md";
  slug: "webflow-developer-ny-id-gh5894";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-developer-remote-usa-id-bb4821.md": {
	id: "webflow-developer-remote-usa-id-bb4821.md";
  slug: "webflow-developer-remote-usa-id-bb4821";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-developer-sd-id-gl8127.md": {
	id: "webflow-developer-sd-id-gl8127.md";
  slug: "webflow-developer-sd-id-gl8127";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"webflow-pm-remote-id-fj123.md": {
	id: "webflow-pm-remote-id-fj123.md";
  slug: "webflow-pm-remote-id-fj123";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"weweb-developer-ca-id-mg5849.md": {
	id: "weweb-developer-ca-id-mg5849.md";
  slug: "weweb-developer-ca-id-mg5849";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
};
"posts": {
"how-to-get-an-interview-as-a-no-code-devloper.md": {
	id: "how-to-get-an-interview-as-a-no-code-devloper.md";
  slug: "how-to-get-an-interview-as-a-no-code-devloper";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-hire-a-bubbl-io-developer.md": {
	id: "how-to-hire-a-bubbl-io-developer.md";
  slug: "how-to-hire-a-bubbl-io-developer";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
