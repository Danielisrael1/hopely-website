import React from 'react';

interface Button3DProps {
  text: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'pink' | 'blue' | 'green';
  className?: string;
}

const Button3D: React.FC<Button3DProps> = ({ 
  text, 
  onClick, 
  href,
  target = '_blank',
  size = 'medium', 
  variant = 'pink',
  className = ''
}) => {
  // Size configurations
  const sizes = {
    small: 'w-20 h-8 text-xs',
    medium: 'w-24 h-10 text-sm',
    large: 'w-32 h-12 text-base'
  };

  // Color configurations
  const variants = {
    pink: {
      bg: 'bg-hopely-pink',
      shadow: '[box-shadow:0_6px_0_0_#D67B7A,0_8px_0_0_#D67B7A41]',
      activeShadow: 'active:[box-shadow:0_0px_0_0_#D67B7A,0_0px_0_0_#D67B7A41]',
      border: 'border-hopely-pink-dark'
    },
    blue: {
      bg: 'bg-blue-500',
      shadow: '[box-shadow:0_6px_0_0_#1b6ff8,0_8px_0_0_#1b70f841]',
      activeShadow: 'active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]',
      border: 'border-blue-400'
    },
    green: {
      bg: 'bg-green-500',
      shadow: '[box-shadow:0_6px_0_0_#10b981,0_8px_0_0_#10b98141]',
      activeShadow: 'active:[box-shadow:0_0px_0_0_#10b981,0_0px_0_0_#10b98141]',
      border: 'border-green-400'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = `${currentSize} ${currentVariant.bg} rounded-lg cursor-pointer select-none
    active:translate-y-1 ${currentVariant.activeShadow}
    active:border-b-[0px]
    transition-all duration-150 ${currentVariant.shadow}
    border-b-[1px] ${currentVariant.border}
    ${className}
  `;

  const content = (
    <span className="flex flex-col justify-center items-center h-full text-white font-bold">
      {text}
    </span>
  );

  if (href) {
    return (
      <a 
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </div>
  );
};

export default Button3D;
