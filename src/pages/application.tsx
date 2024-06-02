import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
//import { useEffect, useState } from "react";
// import { RotatingLines } from "react-loader-spinner";
import Input from "../components/Input";



import AddressSelectComponent from "../components/AddressSelectComponentProps";
import { useState } from "react";
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
  home_ownership: undefined;
  monthly_rent: number | null;
  rent_duration: string;
  moto_experience: string;
  daily_income: number | null;
  moto_ownership: string;
  debts: undefined;
  loan_payment_process: string;
  moto_id: number | string;
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
  files: FileData[];
}

interface FileData {
  originalname: string;
  buffer: ArrayBuffer;
}

const RegisterApplicant = () => {
  const BaseUrl = "http://159.223.111.104:7800/api/v1";

  const fetchMotos = async () => {
    const response = await fetch(`${BaseUrl}/motoleasing`)
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json()
  }

  enum STATUS {
    INGARAGU = "INGARAGU",
    NARASHATSE = "NARASHATSE",
    TWARATANDUKANYE = "TWARATANDUKANYE",
  }

  enum MOTO_OWNERSHIP {
    IYACU = "IYACU",
    TWARAPATANYE = "TWARAPATANYE",
  }

  enum KEMEZA_GUHAKANA {
    YEGO="YEGO",
    OYA="OYA"
  }

  const [selectedMotoId,] = useState<number | null>(null);
  // const [,setSelectedKinya] = useState<boolean | undefined>();
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
    home_ownership: undefined,
    monthly_rent: null,
    rent_duration: "",
    moto_experience: "",
    daily_income: null,
    moto_ownership: "",
    debts: undefined,
    loan_payment_process: "Buri Cyumweru",
    moto_id: "",
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
    },
    files: [],
  });

  const { data: motos } = useQuery({
    queryKey: ['motos', selectedMotoId],
    queryFn: fetchMotos
  });
  console.log(motos)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
  const handleMotoSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMotoId = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      moto_id: selectedMotoId,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const filesData = await Promise.all(filesArray.map(async (file) => {
        return new Promise<FileData>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              originalname: file.name,
              buffer: Buffer.from(reader.result as ArrayBuffer),
            });
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      }));

      setFormData((prevFormData) => ({
        ...prevFormData,
        files: filesData,
      }));
    }
  };

  const handleBooleanKinyarwanda = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: "home_ownership" | "debts"
  ) => {
    const value = e.target.value;
    const booleanValue = value === KEMEZA_GUHAKANA.YEGO;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: booleanValue,
    }));
  };

  // const handleBooleanKinyarwanda = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   if (value === KEMEZA_GUHAKANA.YEGO) {
  //     setSelectedKinya(true);
  //   } else if (value === KEMEZA_GUHAKANA.OYA) {
  //     setSelectedKinya(false);
  //   }
  //   // Update formData if necessary
  //   setFormData((prev) => ({
  //     ...prev,
  //     debts: value === KEMEZA_GUHAKANA.YEGO
  //   }));
  // };

  console.log(formData)

  const mutation = useMutation({
    mutationFn: async (newApplication: FormData) => {
      return await axios.post(`${BaseUrl}/application/register/`, newApplication);
    },
    // onSuccess: () => {
    //   alert("Application submitted successfully!");
    // },
    // onError: (error: unknown) => {
    //   alert(`An error occurred: ${error.message}`);
    // },
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
          className="shadow-lg border rounded px-8 pt-6 pb-8 mb-4"
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
            <div className="">
              <div className="m-3">
                <AddressSelectComponent
                  onAddressSelect={handleResidenceSelect}
                  label="Aho utuye"
                  apiUrl={`${BaseUrl}`}
                />
              </div>
              <div className="m-3">
                <AddressSelectComponent
                  onAddressSelect={handlePlaceOfBirthSelect}
                  label="Aho wavukiye"
                  apiUrl={`${BaseUrl}`}
                />
              </div>
            </div>
            <Input
              label="Icyangombwa cyo Gutwara"
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
            {/* <Input
              label="Inzu mutuyemo niyanyu"
              name="home_ownership"
              value={formData.home_ownership ? KEMEZA_GUHAKANA.YEGO : KEMEZA_GUHAKANA.OYA}
              type="select"
              handleChange={handleBooleanKinyarwanda}
              options={Object.values(KEMEZA_GUHAKANA)}
            /> */}
            <Input
              label="Inzu mutuyemo niyanyu?"
              name="home_ownership"
              value={formData.home_ownership ? KEMEZA_GUHAKANA.YEGO : KEMEZA_GUHAKANA.OYA}
              type="select"
              handleChange={(e) => handleBooleanKinyarwanda(e, 'home_ownership')}
              options={Object.values(KEMEZA_GUHAKANA)}
            />
            <Input
              label="Niba mukodesha, mwishura angahe?"
              name="monthly_rent"
              type="number"
              value={formData.monthly_rent?.toString() ?? ""}
              handleChange={handleChange}
            />

            <Input
              label="Muyimazemo igihe kingana iki?"
              name="rent_duration"
              value={formData.rent_duration}
              handleChange={handleChange}

            />
            <Input
              label="Umaze igihe kingana iki mu Kimotari?"
              name="moto_experience"
              value={formData.moto_experience.toString() ?? ""}
              handleChange={handleChange}
            />
            <Input
              label="Amafaranga winjiza ku munsi?"
              name="daily_income"
              type='number'
              value={formData.daily_income?.toString() ?? ""}
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
              label="Hari imyenda mufite?"
              name="debts"
              value={formData.debts ? KEMEZA_GUHAKANA.YEGO : KEMEZA_GUHAKANA.OYA}
              type="select"
              handleChange={(e) => handleBooleanKinyarwanda(e, 'debts')}
              options={Object.values(KEMEZA_GUHAKANA)}
            />
            <div className="mb-4">
              <select onChange={handleMotoSelect}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
              >
                <option value="">Hitamo Moto</option>
                {motos?.map((moto: { id: number, type: string }) => (

                  <option key={moto.id} value={moto.id}>
                    {moto.type}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Uzishyura mubihe buryo"
              name="loan_payment_process"
              value={formData.loan_payment_process}
              handleChange={handleChange}
              disabled={true}
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
            <label htmlFor="files" className="block font-bold md:text-center mb-1 md:mb-0 pr-4">Injiza copy y'Irangamuntu na perimi</label>
            <input
              type="file"
              name = 'files'
              multiple
              onChange={handleFileChange}
              className="m-5 appearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
            />
          </div>
          {/* <button
              type="submit"
              className="bg-blue-900 text-white font-bold w-full rounded-md p-3 shadow-blue-600 hover:dark:bg-blue-900"
            >
            Iyandikishe
            </button> */}
          <button type="submit" className="bg-blue-900 text-white font-bold w-full rounded-md p-3 shadow-blue-600 hover:dark:bg-blue-900">{mutation.isPending ?
            'Tegereza akanya gato' : 'Iyandikishe'}</button>
        </form>
        {mutation.isError && <p className='w-full text-red-500 font-light text-lg text-center'> Ntibyakunze kwiyandikiza uzuza neza
        </p>}
        {mutation.isSuccess && <p className="w-full text-green-700 text-lg font-light text-center">Kwiyandikisha byakunze neza, tuzabagezaho igisibizo</p>}

      </div>
    </div>
  );
};
export default RegisterApplicant;
