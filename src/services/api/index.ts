export const fetchData = <T>(data: any) =>
	new Promise<T>((resolve) => setTimeout(() => resolve(data), 1000));
