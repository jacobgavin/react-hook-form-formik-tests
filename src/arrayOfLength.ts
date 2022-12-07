export default function arrayOfLength(size:number): number[] {
	return Array.from({ length: size }).map((_, index) => index);
}