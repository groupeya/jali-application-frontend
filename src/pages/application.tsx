import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Input from '../components/Input';

const RegisterApplicant = () => {
  const BaseUrl = 'http://localhost:3000/api/v1';

  console.log(`${BaseUrl}/address/1`)
  const addressId = 1;
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    dob: '',
    phone: '',
    nid: '',
    driving_licency: '',
    address_id: '',
    residence: '',
    status: '',
    partner_firstname: '',
    partner_middlename: '',
    partner_lastname: '',
    partner_phone: '',
    partner_nid: '',
    partner_occupation: '',
    cooperative: '',
    home_ownership: false,
    monthly_rent: '',
    rent_duration: '',
    moto_experience: '',
    daily_income: '',
    moto_ownership: '',
    insurer_one_identity: '',
    insurer_one_address_id: '',
    insurer_one_occupation: '',
    insurer_one_phone: '',
    insurer_two_identity: '',
    insurer_two_address_id: '',
    insurer_two_occupation: '',
    insurer_two_phone: '',
    debts: false,
    loan_payment_process: '',
  });

  const { data: address, isLoading, isError, error } = useQuery({
    queryKey: ['address', addressId],
    queryFn: async () => {
      const response = await axios.get(`${BaseUrl}/address/${addressId}`);
      return response.data;
    }
  });

  useEffect(() => {
    if (address) {
      console.log('Fetched address:', address);
      setFormData((prevData) => ({
        ...prevData,
        address_id: address.id,
      }));
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit form logic here
  };

  return (
    <div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="">

              <form onSubmit={handleSubmit} className="bg-blue-900 shadow-lg border rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-bold text-white p-3 bg-red-700 mb-9 rounded-lg">UZUZA UMWIRONDORO W’UMUMOTARI USHAKA GUKORANA NA

                  JALI FINANCE Ltd</h1>
                <div className="">
              <Input label="Izina ribanza" name="firstname" value={formData.firstname} handleChange={handleChange} />
              <Input label="Izina ryo hagati" name="middlename" value={formData.middlename} handleChange={handleChange} />
              <Input label="Irindi zina" name="lastname" value={formData.lastname} handleChange={handleChange} />
              <Input label="Italiki y'amavuko" name="dob" value={formData.dob} type="date" handleChange={handleChange} />
              <Input label="Numero ya telefone" name="phone" value={formData.phone} handleChange={handleChange} />
              <Input label="Irangamuntu" name="nid" value={formData.nid} handleChange={handleChange} />
              <Input label="Aho yatangiwe" name="address_id" value={formData.address_id} handleChange={handleChange} />
              <Input label="Permis yo Gutwara" name="driving_licency" value={formData.driving_licency} handleChange={handleChange} />
              <Input label="Aho utuye" name="residence" value={formData.residence} handleChange={handleChange} />
              <Input label="Irangamimerere" name="status" value={formData.status} handleChange={handleChange} />
              <div className='p-9 m-9 border rounded-xl'>
                  <div className='text-white bg-red-700 block font-bold md:text-left mb-9 p-3 rounded'>Umwirondoro w'uwo mwashakanye(Simbuka niba uri ingaragu)</div>
                    <Input label="Izina bwite ry'uwo mwashakanye (Simbuka niba iri ingaragu)" name="partner_firstname" value={formData.partner_firstname} handleChange={handleChange} />
                    <Input label="Izina ryo hagati ry'uwo mwashakanye" name="partner_middlename" value={formData.partner_middlename} handleChange={handleChange} />
                    <Input label="Irindi zina ry'uwo mwashakanye" name="partner_lastname" value={formData.partner_lastname} handleChange={handleChange} />
                    <Input label="Numero ya telephone" name="partner_phone" value={formData.partner_phone} handleChange={handleChange} />
                    <Input label="Irangamuntu" name="partner_nid" value={formData.partner_nid} handleChange={handleChange} />
                    <Input label="Icyo akora" name="partner_occupation" value={formData.partner_occupation} handleChange={handleChange} />
              </div>
              <Input label="Koperative" name="cooperative" value={formData.cooperative} handleChange={handleChange} />
              <Input label="Inzu mutuyemo niyanyu" name="home_ownership" value={formData.home_ownership} type="checkbox" handleChange={handleChange} />
              <Input label="Niba mukodesha, mwishura angahe?" name="monthly_rent" value={formData.monthly_rent} handleChange={handleChange} />
                  <Input label="Muyumazemo igihe kingana iki?" name="rent_duration" value={formData.rent_duration} handleChange={handleChange} />
              <Input label="Umaze igihe kingana iki mu Kimotari?" name="moto_experience" value={formData.moto_experience} handleChange={handleChange} />
              <Input label="Amafaranga winjiza ku munsi?" name="daily_income" value={formData.daily_income} handleChange={handleChange} />
              <Input label="Moto yari iyande?" name="moto_ownership" value={formData.moto_ownership} handleChange={handleChange} />
              <Input label="Insurer One Identity" name="insurer_one_identity" value={formData.insurer_one_identity} handleChange={handleChange} />
              <Input label="Insurer One Address ID" name="insurer_one_address_id" value={formData.insurer_one_address_id} handleChange={handleChange} />
              <Input label="Insurer One Occupation" name="insurer_one_occupation" value={formData.insurer_one_occupation} handleChange={handleChange} />
              <Input label="Insurer One Phone" name="insurer_one_phone" value={formData.insurer_one_phone} handleChange={handleChange} />
              <Input label="Insurer Two Identity" name="insurer_two_identity" value={formData.insurer_two_identity} handleChange={handleChange} />
              <Input label="Insurer Two Address ID" name="insurer_two_address_id" value={formData.insurer_two_address_id} handleChange={handleChange} />
              <Input label="Insurer Two Occupation" name="insurer_two_occupation" value={formData.insurer_two_occupation} handleChange={handleChange} />
              <Input label="Insurer Two Phone" name="insurer_two_phone" value={formData.insurer_two_phone} handleChange={handleChange} />
              <Input label="Debts" name="debts" value={formData.debts} type="checkbox" handleChange={handleChange} />
              <Input label="Loan Payment Process" name="loan_payment_process" value={formData.loan_payment_process} handleChange={handleChange} />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold w-full rounded-md">
              Iyandikishe
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
export default RegisterApplicant