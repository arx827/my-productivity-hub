import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
      {description && <p className="mt-2 text-base text-gray-600">{description}</p>}
    </div>
  )
}

export default PageHeader;