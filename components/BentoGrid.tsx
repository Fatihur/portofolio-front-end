
import React from 'react';
import { cn } from '../utils/cn';
import { LayoutIcon, CodeIcon, ServerIcon, ChartIcon } from './Icons';

// --- Internal Components for Bento ---

interface BentoGridContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const BentoGridContainer: React.FC<BentoGridContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-white border border-neutral-200 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-900 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const BentoGrid: React.FC = () => {
  const items = [
    {
      title: "Philosophy",
      description: "Believing in 'Less is More'. Design should be unobtrusive, emphasizing content and functionality.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border border-neutral-200"></div>,
      icon: <LayoutIcon className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
    {
      title: "The Stack",
      description: "Expertise in React, TypeScript, and performance tuning.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 border border-neutral-900"></div>,
      icon: <CodeIcon className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Architecture",
      description: "Building scalable systems that grow with the business needs.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-50 border border-neutral-200"></div>,
      icon: <ServerIcon className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Analytics",
      description: "Data-driven decisions for UI/UX improvements.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border border-neutral-200"></div>,
      icon: <ChartIcon className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 mb-6">About Me</h2>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl">
              A glimpse into my working philosophy and the tools I use to build digital products.
          </p>
      </div>
      <BentoGridContainer>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGridContainer>
    </div>
  );
};

export default BentoGrid;
