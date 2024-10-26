import React, { useEffect, useRef } from 'react'

const useDimensions = (ref: React.RefObject<HTMLElement>) => {
    const dimensions = useRef({ width: 0, height: 0 });
  
    useEffect(() => {
      if (ref.current) {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
      } else {
        // Handle the case where ref.current is undefined
        dimensions.current.width = 0;
        dimensions.current.height = 0;
      }
    }, [ref]);
  
    return dimensions.current;
  };

  
export default useDimensions
