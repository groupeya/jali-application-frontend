import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Input from "../components/Input";
import AddressSelectComponent from "../components/AddressSelectComponentProps";

interface FormData {
  firstname: string;
  middlename: string;
  lastname: string;
  dob: string;
  phone: string;
  nid: string;
  residence: { village_id: number | undefined };
  place_of_birth: number | undefined;
  driving_licency: string;
  status: string;
  cooperative: string;
  home_ownership: boolean;
  monthly_rent: string;
  rent_duration: string;
  moto_experience: string;
  daily_income: string;
  moto_ownership: string;
  debts: boolean;
  loan_payment_process: string;
  partner_firstname: string;
  partner_middlename: string;
  partner_lastname: string;
  partner_phone: string;
  partner_nid: string;
  partner_occupation: string;
  insurer_one_identity: string;
  insurer_one_address_id: string;
  insurer_one_occupation: string;
  insurer_one_phone: string;
  insurer_two_identity: string;
  insurer_two_address_id: string;
  insurer_two_occupation: string;
  insurer_two_phone: string;
}

const RegisterApplicant = () => {
  const BaseUrl = "http://localhost:3000/api/v1";

  enum STATUS {
    INGARAGU = "INGARAGU",
    NARASHATSE = "NARASHATSE",
    TWARATANDUKANYE = "TWARATANDUKANYE",
  }

  enum MOTO_OWNERSHIP {
    IYACU = "IYACU",
    TWARAPATANYE = "TWARAPATANYE",
  }


  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    phone: "",
    nid: "",
    residence: { village_id: undefined },
    place_of_birth: undefined,
    driving_licency: "",
    status: "",
    cooperative: "",
    home_ownership: false,
    monthly_rent: "",
    rent_duration: "",
    moto_experience: "",
    daily_income: "",
    moto_ownership: "",
    debts: false,
    loan_payment_process: "",
    partner_firstname: "",
    partner_middlename: "",
    partner_lastname: "",
    partner_phone: "",
    partner_nid: "",
    partner_occupation: "",
    insurer_one_identity: "",
    insurer_one_address_id: "",
    insurer_one_occupation: "",
    insurer_one_phone: "",
    insurer_two_identity: "",
    insurer_two_address_id: "",
    insurer_two_occupation: "",
    insurer_two_phone: "",
  });

  // const {
  //   data: all_province,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["provinces"],
  //   queryFn: async () => {
  //     const response = await axios.get(`${BaseUrl}/provinces`);
  //     return response.data;
  //   },
  // });

  // const {data: provincesDistricts} = useQuery({
  //   queryKey: ['districts', selectedProvince],
  //   queryFn: async() => {
  //     const response = await axios.get(`${BaseUrl}/provinces/${selectedProvince}/districts`)
  //     return response.data
  //   }
  // })

  // console.log(all_province)

  // console.log(provincesDistricts)

  // useEffect(() => {
  //   if (address) {
  //     console.log("Fetched address:", address.cells.sector.district.province.name);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       address_id: address.id,
  //     }));
  //   }
  // }, [address]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleResidenceSelect = (addressId: number) => {
    setFormData((prev) => ({
      ...prev,
      residence: { village_id: addressId },
    }));
  };



  const handlePlaceOfBirthSelect = (addressId: number) => {
    setFormData((prev) => ({
      ...prev,
      place_of_birth: addressId,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <div className="flex">

        <div className="">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-900 shadow-lg border rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-xl font-bold text-blue-900 p-3 bg-white mb-9 rounded-lg">
              UZUZA UMWIRONDORO W’UMUMOTARI USHAKA GUKORANA NA JALI FINANCE Ltd
            </h1>
            <div className="">
              <Input
                label="Izina ribanza"
                name="firstname"
                value={formData.firstname}
                handleChange={handleChange}
              />
              <Input
                label="Izina ryo hagati"
                name="middlename"
                value={formData.middlename}
                handleChange={handleChange}
              />
              <Input
                label="Irindi zina"
                name="lastname"
                value={formData.lastname}
                handleChange={handleChange}
              />
              <Input
                label="Italiki y'amavuko"
                name="dob"
                value={formData.dob}
                type="date"
                handleChange={handleChange}
              />
              <Input
                label="Numero ya telefone"
                name="phone"
                value={formData.phone}
                handleChange={handleChange}
              />
              <Input
                label="Irangamuntu"
                name="nid"
                value={formData.nid}
                handleChange={handleChange}
              />
            <AddressSelectComponent
              onAddressSelect={handleResidenceSelect}
              label="Residence"
              apiUrl={`${BaseUrl}`}
            />
            <AddressSelectComponent
              onAddressSelect={handlePlaceOfBirthSelect}
              label="Place of Birth"
              apiUrl={`${BaseUrl}`}
            />
              <Input
                label="Permis yo Gutwara"
                name="driving_licency"
                value={formData.driving_licency}
                handleChange={handleChange}
              />
              <Input
                label="Irangamimerere"
                name="status"
                value={formData.status}
                type="select"
                handleChange={handleChange}
                options={Object.values(STATUS)}
              />
                  <Input
                    label="Koperative"
                    name="cooperative"
                    value={formData.cooperative}
                    handleChange={handleChange}
                  />
                  <Input
                    label="Inzu mutuyemo niyanyu"
                    name="home_ownership"
                    value={formData.home_ownership}
                    type="checkbox"
                    handleChange={handleChange}
                  />
                  <Input
                    label="Niba mukodesha, mwishura angahe?"
                    name="monthly_rent"
                    value={formData.monthly_rent}
                    handleChange={handleChange}
                  />
                  <Input
                    label="Muyumazemo igihe kingana iki?"
                    name="rent_duration"
                    value={formData.rent_duration}
                    handleChange={handleChange}
                  />
                  <Input
                    label="Umaze igihe kingana iki mu Kimotari?"
                    name="moto_experience"
                    value={formData.moto_experience}
                    handleChange={handleChange}
                  />
                  <Input
                    label="Amafaranga winjiza ku munsi?"
                    name="daily_income"
                    value={formData.daily_income}
                    handleChange={handleChange}
                  />
                  <Input
                    label="Moto yari iyande?"
                    name="moto_ownership"
                    value={formData.moto_ownership}
                    type="select"
                    handleChange={handleChange}
                    options={Object.values(MOTO_OWNERSHIP)}
                  />
                  <Input
                    label="Debts"
                    name="debts"
                    value={formData.debts}
                    type="checkbox"
                    handleChange={handleChange}
                  />
                  <Input
                    label="Loan Payment Process"
                    name="loan_payment_process"
                    value={formData.loan_payment_process}
                    handleChange={handleChange}
                  />
              <div className="p-9 m-9 border rounded-xl">
                    <div className="text-blue-900 bg-white block font-bold text-xl md:text-left mb-9 p-6 rounded">
                      <h1>Umwirondoro w'uwo mwashakanye(Simbuka niba uri ingaragu)</h1>
                </div>
                <Input
                  label="Izina bwite ry'uwo mwashakanye (Simbuka niba iri ingaragu)"
                  name="partner_firstname"
                  value={formData.partner_firstname}
                  handleChange={handleChange}
                />
                <Input
                  label="Izina ryo hagati ry'uwo mwashakanye"
                  name="partner_middlename"
                  value={formData.partner_middlename}
                  handleChange={handleChange}
                />
                <Input
                  label="Irindi zina ry'uwo mwashakanye"
                  name="partner_lastname"
                  value={formData.partner_lastname}
                  handleChange={handleChange}
                />
                <Input
                  label="Numero ya telephone"
                  name="partner_phone"
                  value={formData.partner_phone}
                  handleChange={handleChange}
                />
                <Input
                  label="Irangamuntu"
                  name="partner_nid"
                  value={formData.partner_nid}
                  handleChange={handleChange}
                />
                <Input
                  label="Icyo akora"
                  name="partner_occupation"
                  value={formData.partner_occupation}
                  handleChange={handleChange}
                />
              </div>

              <div className="p-9 m-9 border rounded-xl">
                    <div className="text-blue-900 bg-white block font-bold text-xl md:text-left mb-9 p-6 rounded">
                  Umwirondoro w'umwishingizi wa mbere
                </div>
                <Input
                  label="Insurer One Identity"
                  name="insurer_one_identity"
                  value={formData.insurer_one_identity}
                  handleChange={handleChange}
                />
                <Input
                  label="Insurer One Address ID"
                  name="insurer_one_address_id"
                  value={formData.insurer_one_address_id}
                  handleChange={handleChange}
                />
                <Input
                  label="Insurer One Occupation"
                  name="insurer_one_occupation"
                  value={formData.insurer_one_occupation}
                  handleChange={handleChange}
                />
                <Input
                  label="Insurer One Phone"
                  name="insurer_one_phone"
                  value={formData.insurer_one_phone}
                  handleChange={handleChange}
                />
              </div>
                  <div className="p-9 m-9 border rounded-xl">
                    <div className="text-blue-900 bg-white block font-bold text-xl md:text-left mb-9 p-6 rounded">
                      Umwirondoro w'umwishingizi wa mbere
                    </div>
                    <Input
                      label="Insurer Two Identity"
                      name="insurer_two_identity"
                      value={formData.insurer_two_identity}
                      handleChange={handleChange}
                    />
                    <Input
                      label="Insurer Two Address ID"
                      name="insurer_two_address_id"
                      value={formData.insurer_two_address_id}
                      handleChange={handleChange}
                    />
                    <Input
                      label="Insurer Two Occupation"
                      name="insurer_two_occupation"
                      value={formData.insurer_two_occupation}
                      handleChange={handleChange}
                    />
                    <Input
                      label="Insurer Two Phone"
                      name="insurer_two_phone"
                      value={formData.insurer_two_phone}
                      handleChange={handleChange}
                    />
              </div>

            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold w-full rounded-md p-3 shadow-red-600 hover:dark:bg-blue-600"
            >
              Iyandikishe
            </button>
          </form>
        </div>
    </div>
  );
};
export default RegisterApplicant;
