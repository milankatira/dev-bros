import { useRef, useCallback, useEffect } from "react";

const useInfiniteScroll = (callback, isFetching) => {
  const observer = useRef();

  useEffect(() => {
    callback();
  }, []);

  const lastElementRef = useCallback(
    (node) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [callback, isFetching]
  );

  return [lastElementRef];
};

export default useInfiniteScroll;
