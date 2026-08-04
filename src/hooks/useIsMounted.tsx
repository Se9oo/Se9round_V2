import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

const useIsMounted = () => {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);
};

export default useIsMounted;
