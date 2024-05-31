import React from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string | number | boolean;
  type?: string;
  options?: string[]
  disabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, value, type = 'text', handleChange, options, disabled }) => {
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
          disabled={disabled}
          className="ppearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
        >
          <option value="" disabled={true} selected={true}>
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
            disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          title={name}
          value={value as string | number}
          onChange={handleChange}
          disabled={disabled}
          className="appearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
        />
      ) }
    </div>
  );
};

export default Input;
