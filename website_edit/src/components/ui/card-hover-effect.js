
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
 
export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
 
  return (
    (<div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-10  lg:grid-cols-3  py-5", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-neutral-100 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center">
              <div className="ml-2"> {/* Add margin for spacing */}
              <div className="flex items-center  gap-2">
              {/* <IconComponents icon={item.icon} className="mt-3"/>  */}
              <Icon className="mt-3">{item.icon}</Icon>
              <CardTitle>{item.title}</CardTitle>
              </div>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>)
  );
};
 
export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
       
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-black border dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>)
  );
};
 
export const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-dark text-xl sm:text-2xl dark:text-white font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>)
  );
};
export const Icon = ({
  className,
  children
}) => {
  return (
    (<span className={cn("inline-flex items-center", className)}>
      {children}
    </span>)
  );
};
 
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("mt-8 text-[15px] sm:text-xl text-dark dark:text-white tracking-wide leading-relaxed ", className)}>
      {children}
    </p>)
  );
};
 
// Assuming IconComponent is defined elsewhere
 