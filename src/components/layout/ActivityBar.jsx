import React, { useState } from 'react';

const ActivityBar = () => {
  const [active, setActive] = useState('description');

  const icons = [
    { id: 'description', icon: 'description' },
    { id: 'search', icon: 'search' },
    { id: 'account_tree', icon: 'account_tree' },
    { id: 'extension', icon: 'extension' },
  ];

  return (
    <aside className="w-[48px] shrink-0 bg-surface-container-lowest flex flex-col items-center py-4 gap-4 border-r border-outline-variant z-50">
      <div className="flex flex-col gap-6 items-center w-full">
        {icons.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`relative group cursor-pointer w-full flex justify-center py-2 ${
              active === item.id ? 'border-l-2 border-primary' : ''
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                active === item.id ? 'text-white' : 'text-outline-variant hover:text-white'
              }`}
              data-weight={active === item.id ? "fill" : "regular"}
            >
              {item.icon}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-6 items-center w-full pb-8">
        <div className="relative group cursor-pointer w-full flex justify-center py-2 text-outline-variant hover:text-white">
          <span className="material-symbols-outlined py-2">account_circle</span>
        </div>
        <div className="relative group cursor-pointer w-full flex justify-center py-2 text-outline-variant hover:text-white">
          <span className="material-symbols-outlined py-2">settings</span>
        </div>
      </div>
    </aside>
  );
};

export default ActivityBar;
