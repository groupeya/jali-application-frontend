import React from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string | number | boolean;
  type?: string;
  options?: string[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, value, type = 'text', handleChange, options }) => {
  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">{label}</label>
      </div>

      {type === 'select' ? (
        <select
          name={name}
          title={name}
          value={value as string}
          onChange={handleChange}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 focus:shadow-outline"
        >
          <option value="" disabled>
            Hitamo
          </option>
          {options?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <input
          type="checkbox"
          title={name}
          name={name}
          checked={Boolean(value)}
          onChange={handleChange}
          className=""
        />
      ) : (
        <input
          type={type}
          name={name}
          title={name}
          value={value as string | number}
          onChange={handleChange}
          className=" appearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
        />
      )}
    </div>
  );
};

export default Input;
