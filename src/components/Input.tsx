import React from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string | number | boolean;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, value, type = 'text', handleChange, placeholder }) => {
  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">{label}</label>
      </div>
      {type === 'checkbox' ? (
        <input
          type="checkbox"
          name={name}
          checked={Boolean(value)}
          onChange={handleChange}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value as string | number}
          onChange={handleChange}
            className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-00"
            placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
