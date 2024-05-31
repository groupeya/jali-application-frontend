import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface AddressSelectComponentProps {
  onAddressSelect: (id: number) => void;
  label: string;
  apiUrl: string;
}

const fetchProvinces = async (apiUrl: string) => {
  const response = await fetch(`${apiUrl}/provinces`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchDistricts = async (provinceId: number, apiUrl: string) => {
  const response = await fetch(`${apiUrl}/provinces/${provinceId}/districts`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


const fetchSectors = async(districtId: number, apiUrl: string) => {
  const response = await fetch(`${apiUrl}/districts/${districtId}/sectors`);
  console.log(response)
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}


const fetchCells = async (sectorId: number, apiUrl: string) => {
  const response = await fetch(`${apiUrl}/sectors/${sectorId}/cells`);
  console.log(response)
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

const fetchVillages = async (cellId: number, apiUrl: string) => {
  const response = await fetch(`${apiUrl}/cells/${cellId}/villages`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// const fetchMotoById = async(moto_id: number, apiUrl: string) => {
//   const response = await fetch(`${apiUrl}/api/motoleasing/${moto_id}/motos`)
//   if (!response.ok) throw new Error("Network response was not ok");
//   return response.json()
// }


const AddressSelectComponent: React.FC<AddressSelectComponentProps> = ({
  onAddressSelect,
  label,
  apiUrl,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistricts] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null)
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  //const [setSelectedVillage] = useState<number | null>(null);
  // const [selectedMotoId, setSelectedMotoId] = useState<number | null>(null);

  const { data: provinces, error: provinceError, isLoading: provinceLoading } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => fetchProvinces(apiUrl)
  }

  );

  const { data: districtsData, error: districtError, isLoading: districtLoading } = useQuery({
    queryKey: ['districts', selectedProvince],
    queryFn: () =>
      selectedProvince
        ? fetchDistricts(selectedProvince, apiUrl)
        : Promise.resolve({ districts: [] }),
    enabled: !!selectedProvince,
  });

  // const { data: motos, error: motoError, isLoading: motoLoading } = useQuery({
  //   queryKey: ['motos', selectedMotoId],
  //   queryFn: () => (selectedMotoId !== null ? fetchMotoById(selectedMotoId, apiUrl) : Promise.resolve(null)),
  //   enabled: selectedMotoId !== null,
  // });

  //console.log(motos)

  console.log(districtsData)
  const { data: sectorsData, isLoading: sectorLoading } = useQuery({
    queryKey: ["sectors", selectedDistrict],
    queryFn: () =>
      selectedDistrict
        ? fetchSectors(selectedDistrict, apiUrl)
        : Promise.resolve({ sectors: [] }),
    enabled: !!selectedDistrict,
  });

  const { data: cellsData, isLoading: cellLoading } = useQuery({
    queryKey: ['cells', selectedSector],
    queryFn: () =>
      selectedSector
        ? fetchCells(selectedSector, apiUrl)
        : Promise.resolve({ cells: [] }),
    enabled: !!selectedSector,
  });

  const { data: villagesData, isLoading: villageLoading } = useQuery({
    queryKey: ["villages", selectedCell],
    queryFn: () =>
      selectedCell
        ? fetchVillages(selectedCell, apiUrl)
        : Promise.resolve({ villages: [] }),
    enabled: !!selectedCell,
  });

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedProvince(selectedId);
    onAddressSelect(selectedId);
  };



  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedDistricts(selectedId)
    onAddressSelect(selectedId);
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedSector(selectedId);
    onAddressSelect(selectedId);
  };

  const handleCellhange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedCell(selectedId);
    onAddressSelect(selectedId);
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    //setSelectedVillage(selectedId);
    onAddressSelect(selectedId);
  };

  // const handleMotoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedId = parseInt(e.target.value, 10);
  //   setSelectedMotoId(selectedId);
  //   onAddressSelect(selectedId);
  // };

  return (
    <div className="p-4 border">
      <label className=" text-gray-700 font-bold mb-2">{label}</label>
      <div className="mb-4">
        <select onChange={handleProvinceChange} disabled={provinceLoading}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
        >
          <option value="">Hitamo Intara</option>
          {provinces && provinces.map((province: { id: number; name: string }) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProvince !== null && (
        <div className="mb-4">
          <select onChange={handleDistrictChange} disabled={districtLoading}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          >
            <option value="">Hitamo Akarere</option>
            {districtsData && districtsData.districts.map((district: { id: number; name: string }) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedDistrict !== null && (
        <div className="mb-4">
          <select onChange={handleSectorChange} disabled={sectorLoading}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          >
            <option value="">Hitamo Umurenge</option>
            {sectorsData &&
              sectorsData.sectors.map((sector: { id: number; name: string }) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
          </select>
        </div>

      )}
      {selectedSector !== null && (
        <div className="mb-4">
          <select onChange={handleCellhange} disabled={cellLoading}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          >
            <option value="">Hitamo Akagali</option>
            {cellsData &&
              cellsData.cells.map((cell: { id: number; name: string }) => (
                <option key={cell.id} value={cell.id}>
                  {cell.name}
                </option>
              ))}
          </select>
        </div>

      )}
      {selectedCell !== null && (
        <div className="mb-4">
          <select onChange={handleVillageChange} disabled={villageLoading}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          >
            <option value="">Hitamo Umudugudu</option>
            {villagesData &&
              villagesData.villages.map((village: { id: number; name: string }) => (
                <option key={village.id} value={village.id}>
                  {village.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {provinceError && <p>Error fetching provinces: {provinceError.message}</p>}
      {districtError && <p>Error fetching districts: {districtError.message}</p>}
      {/* {sectorError && <p>Error fetching sectors: {sectorError.message}</p>}
      {cellError && <p>Error fetching cells: {cellError.message}</p>}
      {villageError && <p>Error fetching villages: {villageError.message}</p>}
      {motoError && <p>Error fetching motos: {motoError.message}</p>} */}
    </div>
  );
};

export default AddressSelectComponent;
