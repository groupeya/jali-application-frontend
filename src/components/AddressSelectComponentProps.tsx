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

const AddressSelectComponent: React.FC<AddressSelectComponentProps> = ({
  onAddressSelect,
  label,
  apiUrl,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistricts] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null)

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
  console.log(districtsData)
  const { data: sectorsData, error: sectorsError, isLoading: sectorLoading } = useQuery({
    queryKey: ["sectors", selectedDistrict],
    queryFn: () =>
      selectedDistrict
        ? fetchSectors(selectedDistrict, apiUrl)
        : Promise.resolve({ sectors: [] }),
    enabled: !!selectedDistrict,
  });

 console.log(sectorsData)

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

  return (
    <div>
      <label>{label}</label>
      <select onChange={handleProvinceChange} disabled={provinceLoading}>
        <option value="">Select Province</option>
        {provinces && provinces.map((province: { id: number; name: string }) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
      {selectedProvince !== null && (
        <select onChange={handleDistrictChange} disabled={districtLoading}>
          <option value="">Select District</option>
          {districtsData && districtsData.districts.map((district: { id: number; name: string }) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      )}
      {selectedDistrict !== null && (
        <select onChange={handleSectorChange} disabled={sectorLoading}>
          <option value="">Select Sector</option>
          {sectorsData &&
            sectorsData.sectors.map((sector: { id: number; name: string }) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
        </select>
      )}
      {provinceError && <p>Error fetching provinces: {provinceError.message}</p>}
      {districtError && <p>Error fetching districts: {districtError.message}</p>}
    </div>
  );
};

export default AddressSelectComponent;
