import { Hero, SearchBar, CustomFilter, CarCard , ShowMore} from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types";
import { fetchCars } from "@/utils";

export default async function Home({searchParams}:any) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
  });
  const isEmpty = allCars.length === 0 || !allCars;
  return (
    <main className="overflow-hidden ">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car:CarProps) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore pageNumber = {(searchParams.limit || 10) / 10}
            isNext = {(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div>No cars</div>
        )}
      </div>
    </main>
  );
}
