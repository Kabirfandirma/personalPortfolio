import { motion } from 'framer-motion';

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card p-3 ${className}`}>
      <div className="skeleton skeleton-image mb-3"></div>
      <div className="skeleton skeleton-text mb-2" style={{ width: '80%' }}></div>
      <div className="skeleton skeleton-text mb-2" style={{ width: '60%' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton skeleton-text mb-2"
          style={{
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${index * 0.1}s`
          }}
        ></div>
      ))}
    </div>
  );
}

export function SkeletonImage({ width = '100%', height = '200px', className = '' }) {
  return (
    <div
      className={`skeleton skeleton-image ${className}`}
      style={{ width, height }}
    ></div>
  );
}

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="d-flex justify-content-center align-items-center p-4"
    >
      <div className={`spinner-border text-primary ${sizeClasses[size]} ${className}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </motion.div>
  );
}
