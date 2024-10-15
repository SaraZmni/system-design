import React, { useEffect, useRef, useState } from "react";

const MyComponent = () => {
  // Define the state type
  const [items, setItems] = useState<string[]>(
    Array.from({ length: 50 }, (_, i) => `List Item ${i + 1}`)
  );

  // Use Ref to store HTMLDivElement references
  const itemRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    Array.from({ length: 50 }, () => React.createRef<HTMLDivElement>())
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply animation or effect when intersecting
            console.log(`${entry.target.textContent} is in view!`);
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe each ref
    itemRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current); // Observe the div element directly
      }
    });

    return () => {
      // Cleanup: Unobserve each ref
      itemRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current); // Unobserve the div element directly
        }
      });
    };
  }, [items]);

  return (
    <div className="flex flex-col border-dashed border-gray-400 gap-y-4 border rounded-lg p-2 mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          ref={itemRefs.current[index]}
          className="border border-indigo-700 rounded-lg px-3 py-2 transition-all duration-500 ease-out opacity-0 translate-y-8"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
