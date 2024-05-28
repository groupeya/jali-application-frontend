import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Input from "../components/Input";
import DatePicker from "react-datepicker";
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
  partner: {
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    nid: string;
    occupation: string;
  };
  insurer_one: {
    identity: string;
    occupation: string;
    phone: string;
  };
  insurer_two: {
    identity: string;
    occupation: string;
    phone: string;
  };
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
    daily_income: '',
    moto_ownership: "",
    debts: false,
    loan_payment_process: "",
    partner: {
      firstname: "",
      middlename: "",
      lastname: "",
      phone: "",
      nid: "",
      occupation: "",
    },
    insurer_one: {
      identity: "",
      occupation: "",
      phone: ""
    },
    insurer_two: {
      identity: "",
      occupation: "",
      phone: ""
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Handle nested fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof formData] as object),
          [child]: newValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
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

  console.log(formData)

  const mutation = useMutation({
    mutationFn: async(newApplication: FormData) => {
      return await axios.post(`${BaseUrl}/application/register/`, newApplication);
    },
    onSuccess: () => {
      alert("Application submitted successfully!");
    },
    onError: (error: any) => {
      alert(`An error occurred: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
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
                    type='number'
                    value={parseFloat(formData.daily_income)}
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
                name="partner.firstname"
                value={formData.partner.firstname}
                handleChange={handleChange}
              />
              <Input
                label="Izina ryo hagati ry'uwo mwashakanye"
                name="partner.middlename"
                value={formData.partner.middlename}
                handleChange={handleChange}
              />
              <Input
                label="Irindi zina ry'uwo mwashakanye"
                name="partner.lastname"
                value={formData.partner.lastname}
                handleChange={handleChange}
              />
              <Input
                label="Numero ya telephone"
                name="partner.phone"
                value={formData.partner.phone}
                handleChange={handleChange}
              />
              <Input
                label="Irangamuntu"
                name="partner.nid"
                value={formData.partner.nid}
                handleChange={handleChange}
              />
              <Input
                label="Icyo akora"
                name="partner.occupation"
                value={formData.partner.occupation}
                handleChange={handleChange}
              />
              </div>

              <div className="p-9 m-9 border rounded-xl">
                    <div className="text-blue-900 bg-white block font-bold text-xl md:text-left mb-9 p-6 rounded">
                  Umwirondoro w'umwishingizi wa mbere
                </div>
              <Input
                label="Ikumuranga"
                name="insurer_one.identity"
                value={formData.insurer_one.identity}
                handleChange={handleChange}
              />
                <Input
                  label="Icyo akora"
                  name="insurer_one.occupation"
                  value={formData.insurer_one.occupation}
                  handleChange={handleChange}
                />
                <Input
                  label="Telephone"
                  name="insurer_one.phone"
                  value={formData.insurer_one.phone}
                  handleChange={handleChange}
                />
              </div>
                  <div className="p-9 m-9 border rounded-xl">
                    <div className="text-blue-900 bg-white block font-bold text-xl md:text-left mb-9 p-6 rounded">
                      Umwirondoro w'umwishingizi wa kabiri
                    </div>
                    <Input
                      label="Ikumuranga"
                      name="insurer_two.identity"
                      value={formData.insurer_two.identity}

                      handleChange={handleChange}
                    />

                    <Input
                      label="Icyo akora"
                      name="insurer_two.occupation"
                      value={formData.insurer_two.occupation}
                      handleChange={handleChange}
                    />
                    <Input
                      label="Telephone"
                      name="insurer_two.phone"
                      value={formData.insurer_two.phone}
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
