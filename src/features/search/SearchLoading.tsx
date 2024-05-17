'use client';
import { omit } from '@/lib';
import { animationFrames } from './constants';
import { useEffect, useState } from 'react';
type SearchLoadingProps = {};

const SearchLoading = ({}: SearchLoadingProps) => {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="w-[300px] h-[300px] flex flex-col items-center">
        <LoadingIcon />
        <span className="text-[20px] text-gray-500">Đang tìm kiếm</span>
      </div>
    </div>
  );
};

const LoadingIcon = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(p => {
        if (p >= animationFrames.length - 1) {
          return 0;
        }
        return p + 1;
      });
    }, 30);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={ref => {
        if (ref) {
          ref.innerHTML = '';
          ref.appendChild(svgToElement(undefined, animationFrames[currentFrame]));
        }
      }}
    ></div>
  );
};

function svgToElement(element: SVGElement | undefined, data: any) {
  let currentElement;
  if (!element) {
    element = document.createElementNS('http://www.w3.org/2000/svg', data.tagName);
    currentElement = element;
  } else {
    currentElement = document.createElementNS('http://www.w3.org/2000/svg', data.tagName);
    element.appendChild(currentElement);
  }
  for (let attr of Object.keys(omit(data, 'tagName', 'child'))) {
    if (attr.includes(':')) {
    } else {
      currentElement.setAttribute(attr, data[attr]);
    }
  }
  if (data.child) {
    for (let child of data.child) {
      svgToElement(currentElement, child);
    }
  }

  return element!;
}

export default SearchLoading;
