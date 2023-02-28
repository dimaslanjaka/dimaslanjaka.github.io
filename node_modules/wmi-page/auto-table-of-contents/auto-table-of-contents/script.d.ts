declare type TocLevels = TocObject[];
declare interface TocObject extends TocDescendant {
	descendants: TocDescendant[];
	inner: TocLevels;
}
declare type TocDescendant = {
	tagname: string,
	id: string,
	text: string,
};
