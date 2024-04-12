export const getCities = async (country: string, offset: number, limit: number) => {

  const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?offset=${offset}&limit=${limit}&refine=cou_name_en%3A%22${country}%22&order_by=name`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results
};
