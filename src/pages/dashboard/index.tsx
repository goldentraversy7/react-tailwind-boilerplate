import React, { Suspense } from "react";

// Lazy load the Dashboard component
const LazyDashboard = React.lazy(() => import("./Dashboard"));

const DashboardIndex: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <LazyDashboard />
    </Suspense>
  );
};

export default DashboardIndex;
