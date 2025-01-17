import React, { Suspense } from "react";

// Lazy load the Users component
const LazyUsers = React.lazy(() => import("./Users"));

const UsersIndex: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Users...</div>}>
      <LazyUsers />
    </Suspense>
  );
};

export default UsersIndex;
