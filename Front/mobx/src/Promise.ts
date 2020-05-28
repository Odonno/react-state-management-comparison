export const usePromise = async <T>(promise: Promise<T>) => {
    try {
        const result = await promise;
        return [undefined, result] as const;
    } catch (err) {
        return [err, undefined] as const;
    }
};