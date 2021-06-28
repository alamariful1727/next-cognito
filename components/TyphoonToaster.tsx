import React from 'react';
import { toast } from 'react-toastify';

toast.configure({
  autoClose: 3000,
  draggable: true,
  hideProgressBar: true,
});

const TyphoonToaster = (
  msg: string | number = 'Toast message',
  type: 'default' | 'warning' | 'danger' | 'success' = 'default',
) => {
  return toast(
    () => (
      <div className="h-full flex items-center">
        <span className={`${type === 'default' ? 'text-black' : 'text-white'} font-medium`}>{msg}</span>
      </div>
    ),
    {
      className: `${
        type === 'warning'
          ? 'bg-yellow-500'
          : type === 'danger'
          ? 'bg-red-600'
          : type === 'success'
          ? 'bg-green-500'
          : 'bg-white'
      } mb-1 last:mb-0`,
      bodyClassName: 'm-0',
    },
  );
};

export default TyphoonToaster;
